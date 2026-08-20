"use strict";

/*
========================================================
 UNEC PDF QUESTION PARSER
========================================================

Gözlənilən format:

1. Sualın mətni?
• Variant
• Variant
√ Düzgün variant
• Variant
• Variant

Parser:
- həqiqi sual başlanğıclarını müəyyən edir
- • variantlarını götürür
- √ variantını düzgün cavab edir
- çoxsətirli sualları birləşdirir
- çoxsətirli variantları birləşdirir
- səhifə dəyişməsindən təsirlənmir
- düzgün cavabı olmayan sualı etibarsız sayır
*/


const QuestionParser = (() => {

    /*
    ========================================================
    ƏSAS PARSER
    ========================================================
    */

    function parse(pdfData) {

        if (
            !pdfData ||
            !Array.isArray(pdfData.lines)
        ) {
            throw new Error(
                "Parser üçün düzgün PDF məlumatı verilməyib."
            );
        }


        const lines = pdfData.lines;

        const questions = [];

        const rejectedQuestions = [];

        let currentQuestion = null;

        let currentOption = null;


        /*
        ====================================================
        SƏTİRLƏRİ BİR-BİR OXU
        ====================================================
        */

        for (let i = 0; i < lines.length; i++) {

            const lineObject = lines[i];

            const text =
                normalize(lineObject.text);

            if (!text) {
                continue;
            }


            /*
            =================================================
            1. YENİ SUAL?
            =================================================
            */

            const questionStart =
                detectQuestionStart(text);


            if (questionStart) {

                /*
                 * Əvvəlki variantı bağla.
                 */
                if (
                    currentQuestion &&
                    currentOption
                ) {
                    pushOption(
                        currentQuestion,
                        currentOption
                    );

                    currentOption = null;
                }


                /*
                 * Əvvəlki sualı bağla.
                 */
                if (currentQuestion) {

                    finalizeQuestion(
                        currentQuestion,
                        questions,
                        rejectedQuestions
                    );
                }


                currentQuestion = {

                    sourceNumber:
                        questionStart.number,

                    question:
                        questionStart.text,

                    options: [],

                    correct: null,

                    pageNumber:
                        lineObject.pageNumber || null

                };


                continue;
            }


            /*
             * Hələ sual başlamayıbsa
             * PDF başlığı kimi qəbul et.
             */
            if (!currentQuestion) {
                continue;
            }


            /*
            =================================================
            2. VARİANT?
            =================================================
            */

            const optionStart =
                detectOptionStart(text);


            if (optionStart) {

                /*
                 * Əvvəlki variant varsa əvvəlcə
                 * onu sualın variantlarına əlavə et.
                 */
                if (currentOption) {

                    pushOption(
                        currentQuestion,
                        currentOption
                    );

                }


                currentOption = {

                    text: optionStart.text,

                    correct:
                        optionStart.correct

                };


                continue;
            }


            /*
            =================================================
            3. DAVAM SƏTRİ
            =================================================

            Variant başlayıbsa -> variantın davamıdır.

            Variant başlamayıbsa -> sual mətninin davamıdır.
            */

            if (currentOption) {

                currentOption.text =
                    joinText(
                        currentOption.text,
                        text
                    );

            } else {

                currentQuestion.question =
                    joinText(
                        currentQuestion.question,
                        text
                    );

            }

        }


        /*
        ====================================================
        SON VARİANT VƏ SON SUAL
        ====================================================
        */

        if (
            currentQuestion &&
            currentOption
        ) {

            pushOption(
                currentQuestion,
                currentOption
            );

        }


        if (currentQuestion) {

            finalizeQuestion(
                currentQuestion,
                questions,
                rejectedQuestions
            );

        }


        /*
        ====================================================
        NƏTİCƏ
        ====================================================
        */

        return {

            questions,

            rejectedQuestions,

            stats: {

                detected:
                    questions.length +
                    rejectedQuestions.length,

                valid:
                    questions.length,

                rejected:
                    rejectedQuestions.length

            }

        };

    }


    /*
    ========================================================
    SUAL BAŞLANĞICINI TAP
    ========================================================

    Qəbul edir:

    1. Sual
    25. Sual
    174. Sual

    Amma sadəcə "1." kimi alt-bəndi avtomatik
    sual hesab etmirik. Nöqtədən sonra real mətn
    olmalıdır.
    */

    function detectQuestionStart(text) {

        const match =
            text.match(
                /^(\d{1,4})\.\s+(.+)$/
            );


        if (!match) {
            return null;
        }


        const number =
            Number(match[1]);


        const questionText =
            normalize(match[2]);


        if (
            !Number.isInteger(number) ||
            number <= 0 ||
            !questionText
        ) {
            return null;
        }


        return {
            number,
            text: questionText
        };

    }


    /*
    ========================================================
    VARİANT BAŞLANĞICI
    ========================================================

    • adi variant
    √ düzgün variant

    Əlavə fallback:
    ●
    ▪
    ◦
    */

    function detectOptionStart(text) {

        if (!text) {
            return null;
        }


        /*
         * Düzgün cavab
         */
        if (text.startsWith("√")) {

            const cleanText =
                normalize(
                    text.replace(/^√\s*/, "")
                );


            if (!cleanText) {
                return null;
            }


            return {
                text: cleanText,
                correct: true
            };

        }


        /*
         * Adi variant
         */
        if (
            /^[•●▪◦]/.test(text)
        ) {

            const cleanText =
                normalize(
                    text.replace(
                        /^[•●▪◦]\s*/,
                        ""
                    )
                );


            if (!cleanText) {
                return null;
            }


            return {
                text: cleanText,
                correct: false
            };

        }


        return null;

    }


    /*
    ========================================================
    VARİANTI SUALA ƏLAVƏ ET
    ========================================================
    */

    function pushOption(
        question,
        option
    ) {

        if (
            !question ||
            !option
        ) {
            return;
        }


        const text =
            normalize(option.text);


        if (!text) {
            return;
        }


        /*
         * Eyni variant təsadüfən iki dəfə
         * gəlirsə təkrarlamırıq.
         */
        const alreadyExists =
            question.options.some(
                existing =>
                    normalize(existing) === text
            );


        if (!alreadyExists) {
            question.options.push(text);
        }


        /*
         * √ olan variant
         */
        if (option.correct) {

            /*
             * Birdən PDF-də iki √ olsa,
             * validation bunu sonra tutacaq.
             */
            if (!question._correctAnswers) {
                question._correctAnswers = [];
            }


            question._correctAnswers.push(text);

        }

    }


    /*
    ========================================================
    SUALI TAMAMLA
    ========================================================
    */

    function finalizeQuestion(
        rawQuestion,
        validQuestions,
        rejectedQuestions
    ) {

        const question = {

            sourceNumber:
                rawQuestion.sourceNumber,

            question:
                normalize(
                    rawQuestion.question
                ),

            options:
                rawQuestion.options
                    .map(normalize)
                    .filter(Boolean),

            correct: null,

            pageNumber:
                rawQuestion.pageNumber

        };


        const correctAnswers =
            Array.isArray(
                rawQuestion._correctAnswers
            )
                ? rawQuestion._correctAnswers
                    .map(normalize)
                    .filter(Boolean)
                : [];


        /*
        ====================================================
        VALIDATION
        ====================================================
        */


        // Sual mətni yoxdur

        if (!question.question) {

            reject(
                question,
                "Sual mətni tapılmadı.",
                rejectedQuestions
            );

            return;
        }


        // Ən azı 2 variant olmalıdır

        if (
            question.options.length < 2
        ) {

            reject(
                question,
                "Kifayət qədər cavab variantı tapılmadı.",
                rejectedQuestions
            );

            return;
        }


        /*
         * Düzgün cavab yoxdur.
         *
         * ƏVVƏLKİ SİSTEMDƏKİ KİMİ
         * BİRİNCİ VARİANTI DÜZGÜN ETMİRİK!
         */

        if (
            correctAnswers.length === 0
        ) {

            reject(
                question,
                "√ işarəli düzgün cavab tapılmadı.",
                rejectedQuestions
            );

            return;
        }


        /*
         * Birdən çox √
         */

        if (
            correctAnswers.length > 1
        ) {

            reject(
                question,
                "Birdən çox düzgün cavab aşkarlandı.",
                rejectedQuestions
            );

            return;
        }


        const correct =
            correctAnswers[0];


        /*
         * √ variant options içində olmalıdır
         */

        if (
            !question.options.includes(correct)
        ) {

            reject(
                question,
                "Düzgün cavab variantlar arasında tapılmadı.",
                rejectedQuestions
            );

            return;
        }


        question.correct =
            correct;


        /*
        ====================================================
        VARİANTLARI QARIŞDIR
        ====================================================
        */

        question.options =
            shuffle(question.options);


        /*
         * Etibarlı sual
         */
        validQuestions.push(question);

    }


    /*
    ========================================================
    ETİBARSIZ SUAL
    ========================================================
    */

    function reject(
        question,
        reason,
        rejectedQuestions
    ) {

        rejectedQuestions.push({

            ...question,

            reason

        });

    }


    /*
    ========================================================
    MƏTN BİRLƏŞDİRMƏ
    ========================================================
    */

    function joinText(
        first,
        second
    ) {

        const a =
            normalize(first);

        const b =
            normalize(second);


        if (!a) {
            return b;
        }


        if (!b) {
            return a;
        }


        /*
         * Sətir tire ilə bitirsə:
         *
         * "müəyyənləş-"
         * "dirilməsi"
         *
         * -> "müəyyənləşdirilməsi"
         */

        if (a.endsWith("-")) {

            return normalize(
                a.slice(0, -1) + b
            );

        }


        return normalize(
            `${a} ${b}`
        );

    }


    /*
    ========================================================
    NORMALIZE
    ========================================================
    */

    function normalize(text) {

        return String(text || "")
            .replace(/\u00A0/g, " ")
            .replace(/\s+/g, " ")
            .trim();

    }


    /*
    ========================================================
    FISHER-YATES SHUFFLE
    ========================================================
    */

    function shuffle(array) {

        const result =
            [...array];


        for (
            let i = result.length - 1;
            i > 0;
            i--
        ) {

            const j =
                Math.floor(
                    Math.random() *
                    (i + 1)
                );


            [
                result[i],
                result[j]
            ] = [
                result[j],
                result[i]
            ];

        }


        return result;

    }


    /*
    ========================================================
    PUBLIC
    ========================================================
    */

    return {
        parse
    };

})();