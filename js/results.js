"use strict";

/*
========================================================
 EXAM RESULTS
 Nəticələrin hesablanması və göstərilməsi
 AZ / EN / RU
========================================================
*/

const ExamResults = (() => {

    /*
    ========================================================
    STATE
    Son nəticəni saxlayırıq ki,
    dil dəyişəndə nəticə ekranını yenidən render edə bilək.
    ========================================================
    */

    let lastResult = null;


    /*
    ========================================================
    LANGUAGE
    ========================================================
    */

    const texts = {

        /*
        ====================================================
        AZƏRBAYCAN
        ====================================================
        */

        az: {

            calculationError:
                "Nəticəni hesablamaq üçün suallar tapılmadı.",

            wrongAnswers:
                "Səhv cavablar",

            unansweredQuestions:
                "Cavabsız suallar",

            correctAnswers:
                "Düzgün cavablar",

            question:
                "Sual {number}: {question}",

            yourAnswer:
                "Sənin cavabın: ",

            noAnswer:
                "Cavab verilməyib",

            correctAnswer:
                "Düzgün cavab: ",

            sourceQuestion:
                "PDF-də sual №{number}"

        },


        /*
        ====================================================
        ENGLISH
        ====================================================
        */

        en: {

            calculationError:
                "No questions were found to calculate the result.",

            wrongAnswers:
                "Incorrect answers",

            unansweredQuestions:
                "Unanswered questions",

            correctAnswers:
                "Correct answers",

            question:
                "Question {number}: {question}",

            yourAnswer:
                "Your answer: ",

            noAnswer:
                "Not answered",

            correctAnswer:
                "Correct answer: ",

            sourceQuestion:
                "Question №{number} in PDF"

        },


        /*
        ====================================================
        РУССКИЙ
        ====================================================
        */

        ru: {

            calculationError:
                "Не найдены вопросы для расчёта результата.",

            wrongAnswers:
                "Неправильные ответы",

            unansweredQuestions:
                "Вопросы без ответа",

            correctAnswers:
                "Правильные ответы",

            question:
                "Вопрос {number}: {question}",

            yourAnswer:
                "Ваш ответ: ",

            noAnswer:
                "Ответ не дан",

            correctAnswer:
                "Правильный ответ: ",

            sourceQuestion:
                "Вопрос №{number} в PDF"

        }

    };


    /*
    ========================================================
    CURRENT LANGUAGE
    ========================================================
    */

    function getLanguage() {

        if (
            window.examLanguage &&
            typeof window.examLanguage.getCurrentLanguage ===
                "function"
        ) {

            return (
                window.examLanguage.getCurrentLanguage() ||
                "az"
            );

        }


        return (
            localStorage.getItem(
                "examSystemLanguage"
            ) ||
            "az"
        );

    }


    /*
    ========================================================
    TRANSLATE
    ========================================================
    */

    function tr(
        key,
        values = {}
    ) {

        const language =
            getLanguage();


        let text =
            texts[language]?.[key] ??
            texts.az[key] ??
            "";


        Object.entries(
            values
        ).forEach(
            ([name, value]) => {

                text =
                    text.replaceAll(
                        `{${name}}`,
                        String(value)
                    );

            }
        );


        return text;

    }



    /*
    ========================================================
    NƏTİCƏNİ HESABLA
    ========================================================
    */

    function calculate(
        questions,
        answers
    ) {

        if (
            !Array.isArray(
                questions
            )
        ) {

            throw new Error(
                tr(
                    "calculationError"
                )
            );

        }


        const correctQuestions = [];

        const wrongQuestions = [];

        const emptyQuestions = [];


        questions.forEach(
            (
                question,
                index
            ) => {

                const userAnswer =
                    answers[index];


                const resultItem = {

                    index,

                    number:
                        index + 1,

                    sourceNumber:
                        question.sourceNumber,

                    question:
                        question.question,

                    options:
                        question.options,

                    correct:
                        question.correct,

                    userAnswer:
                        userAnswer ||
                        null

                };


                /*
                =========================
                BOŞ
                =========================
                */

                if (
                    !userAnswer
                ) {

                    resultItem.status =
                        "empty";


                    emptyQuestions.push(
                        resultItem
                    );


                    return;

                }


                /*
                =========================
                DÜZGÜN
                =========================
                */

                if (
                    userAnswer ===
                    question.correct
                ) {

                    resultItem.status =
                        "correct";


                    correctQuestions.push(
                        resultItem
                    );


                    return;

                }


                /*
                =========================
                SƏHV
                =========================
                */

                resultItem.status =
                    "wrong";


                wrongQuestions.push(
                    resultItem
                );

            }
        );


        /*
        ====================================================
        STATISTICS
        ====================================================
        */

        const correct =
            correctQuestions.length;


        const wrong =
            wrongQuestions.length;


        const empty =
            emptyQuestions.length;


        const total =
            questions.length;


        const percent =
            total > 0

                ? Math.round(
                    (
                        correct /
                        total
                    ) *
                    100
                )

                : 0;


        return {

            total,

            correct,

            wrong,

            empty,

            percent,

            wrongQuestions,

            emptyQuestions,

            correctQuestions

        };

    }



    /*
    ========================================================
    NƏTİCƏNİ EKRANDA GÖSTƏR
    ========================================================
    */

    function render(
        result
    ) {

        if (
            !result
        ) {

            return;

        }


        /*
        Dil dəyişəndə yenidən render etmək üçün
        nəticəni yadda saxlayırıq.
        */

        lastResult =
            result;


        /*
        =========================
        PERCENT
        =========================
        */

        setText(
            "resultPercent",
            result.percent + "%"
        );


        /*
        =========================
        CORRECT
        =========================
        */

        setText(
            "correctCount",
            result.correct
        );


        /*
        =========================
        WRONG
        =========================
        */

        setText(
            "wrongCount",
            result.wrong
        );


        /*
        =========================
        EMPTY
        =========================
        */

        setText(
            "emptyCount",
            result.empty
        );


        /*
        =========================
        DETAILS CONTAINER
        =========================
        */

        const container =
            document.getElementById(
                "resultDetails"
            );


        if (
            !container
        ) {

            return;

        }


        container.innerHTML =
            "";


        /*
        ====================================================
        1. SƏHV SUALLAR
        ====================================================
        */

        if (
            result.wrongQuestions.length
        ) {

            container.appendChild(

                createGroupTitle(

                    tr(
                        "wrongAnswers"
                    ),

                    result
                        .wrongQuestions
                        .length,

                    "wrong"

                )

            );


            result.wrongQuestions.forEach(
                item => {

                    container.appendChild(
                        createResultBlock(
                            item
                        )
                    );

                }
            );

        }


        /*
        ====================================================
        2. CAVABSIZ SUALLAR
        ====================================================
        */

        if (
            result.emptyQuestions.length
        ) {

            container.appendChild(

                createGroupTitle(

                    tr(
                        "unansweredQuestions"
                    ),

                    result
                        .emptyQuestions
                        .length,

                    "empty"

                )

            );


            result.emptyQuestions.forEach(
                item => {

                    container.appendChild(
                        createResultBlock(
                            item
                        )
                    );

                }
            );

        }


        /*
        ====================================================
        3. DÜZGÜN SUALLAR
        ====================================================
        */

        if (
            result.correctQuestions.length
        ) {

            container.appendChild(

                createGroupTitle(

                    tr(
                        "correctAnswers"
                    ),

                    result
                        .correctQuestions
                        .length,

                    "correct"

                )

            );


            result.correctQuestions.forEach(
                item => {

                    container.appendChild(
                        createResultBlock(
                            item
                        )
                    );

                }
            );

        }

    }



    /*
    ========================================================
    NƏTİCƏ BLOKU
    ========================================================
    */

    function createResultBlock(
        item
    ) {

        const block =
            document.createElement(
                "article"
            );


        block.className =
            "result-block " +
            getBlockClass(
                item.status
            );


        /*
        ====================================================
        SUAL
        ====================================================
        */

        const question =
            document.createElement(
                "div"
            );


        question.className =
            "result-question";


        /*
        PDF mətnini təhlükəsiz saxlamaq üçün
        textContent istifadə edirik.
        */

        question.textContent =
            tr(
                "question",
                {

                    number:
                        item.number,

                    question:
                        item.question

                }
            );


        block.appendChild(
            question
        );


        /*
        ====================================================
        İSTİFADƏÇİNİN CAVABI
        ====================================================
        */

        const userAnswer =
            document.createElement(
                "div"
            );


        userAnswer.className =
            "result-answer";


        /*
        =========================
        LABEL
        =========================
        */

        const userLabel =
            document.createElement(
                "strong"
            );


        userLabel.textContent =
            tr(
                "yourAnswer"
            );


        userAnswer.appendChild(
            userLabel
        );


        /*
        =========================
        VALUE
        =========================
        */

        const userValue =
            document.createElement(
                "span"
            );


        if (
            item.status ===
            "empty"
        ) {

            userValue.textContent =
                tr(
                    "noAnswer"
                );


            userValue.className =
                "empty-answer";

        } else {

            userValue.textContent =
                item.userAnswer;


            if (
                item.status ===
                "wrong"
            ) {

                userValue.className =
                    "wrong-answer";

            } else {

                userValue.className =
                    "correct-answer";

            }

        }


        userAnswer.appendChild(
            userValue
        );


        block.appendChild(
            userAnswer
        );


        /*
        ====================================================
        DÜZGÜN CAVAB
        ====================================================
        */

        const correctAnswer =
            document.createElement(
                "div"
            );


        correctAnswer.className =
            "result-answer";


        /*
        =========================
        LABEL
        =========================
        */

        const correctLabel =
            document.createElement(
                "strong"
            );


        correctLabel.textContent =
            tr(
                "correctAnswer"
            );


        /*
        =========================
        VALUE
        =========================
        */

        const correctValue =
            document.createElement(
                "span"
            );


        correctValue.className =
            "correct-answer";


        correctValue.textContent =
            item.correct;


        correctAnswer.appendChild(
            correctLabel
        );


        correctAnswer.appendChild(
            correctValue
        );


        block.appendChild(
            correctAnswer
        );


        /*
        ====================================================
        PDF-DƏKİ ORİJİNAL SUAL NÖMRƏSİ
        ====================================================
        */

        if (
            item.sourceNumber !==
                undefined &&
            item.sourceNumber !==
                null
        ) {

            const sourceInfo =
                document.createElement(
                    "div"
                );


            sourceInfo.style.marginTop =
                "10px";


            sourceInfo.style.fontSize =
                "11px";


            sourceInfo.style.color =
                "#94a3b8";


            sourceInfo.textContent =
                tr(
                    "sourceQuestion",
                    {

                        number:
                            item.sourceNumber

                    }
                );


            block.appendChild(
                sourceInfo
            );

        }


        return block;

    }



    /*
    ========================================================
    QRUP BAŞLIĞI
    ========================================================
    */

    function createGroupTitle(
        title,
        count,
        type
    ) {

        const wrapper =
            document.createElement(
                "div"
            );


        wrapper.style.marginTop =
            "28px";


        wrapper.style.marginBottom =
            "4px";


        /*
        =========================
        HEADING
        =========================
        */

        const heading =
            document.createElement(
                "h3"
            );


        heading.style.margin =
            "0";


        heading.textContent =
            `${title} (${count})`;


        /*
        =========================
        COLOR
        =========================
        */

        if (
            type ===
            "wrong"
        ) {

            heading.style.color =
                "#dc2626";

        } else if (
            type ===
            "empty"
        ) {

            heading.style.color =
                "#d97706";

        } else {

            heading.style.color =
                "#16a34a";

        }


        wrapper.appendChild(
            heading
        );


        return wrapper;

    }



    /*
    ========================================================
    BLOCK CLASS
    ========================================================
    */

    function getBlockClass(
        status
    ) {

        switch (
            status
        ) {

            case "correct":

                return "correct-block";


            case "empty":

                return "empty-block";


            default:

                return "wrong-block";

        }

    }



    /*
    ========================================================
    TEXT HELPER
    ========================================================
    */

    function setText(
        id,
        value
    ) {

        const element =
            document.getElementById(
                id
            );


        if (
            element
        ) {

            element.textContent =
                String(
                    value
                );

        }

    }



    /*
    ========================================================
    LANGUAGE CHANGE

    Nəticə ekranında olarkən dili dəyişsən,
    bütün dinamik nəticə blokları dərhal yenilənir.
    ========================================================
    */

    document.addEventListener(
        "languageChanged",
        () => {

            if (
                !lastResult
            ) {

                return;

            }


            const resultScreen =
                document.getElementById(
                    "resultScreen"
                );


            /*
            Nəticə ekranı açıqdırsa
            yenidən render et.
            */

            if (
                resultScreen &&
                resultScreen
                    .classList
                    .contains(
                        "active"
                    )
            ) {

                render(
                    lastResult
                );

            }

        }
    );



    /*
    ========================================================
    PUBLIC API
    ========================================================
    */

    return {

        calculate,

        render

    };

})();