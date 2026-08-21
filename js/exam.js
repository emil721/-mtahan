"use strict";

/*
========================================================
 EXAM ENGINE
 AZ / EN / RU
========================================================
*/

const ExamEngine = (() => {

    /*
    ========================================================
    STATE
    ========================================================
    */

    let questions = [];
    let answers = {};
    let currentQuestionIndex = 0;

    let examType = "semester";
    let durationMinutes = 90;
    let fileName = "";

    let examFinished = false;


    /*
    ========================================================
    LANGUAGE
    ========================================================
    */

    const texts = {

        az: {

            noQuestions:
                "İmtahan üçün suallar tapılmadı.",

            notPrepared:
                "İmtahan hazırlanmayıb.",

            pdfExam:
                "PDF imtahanı",

            semester:
                "Semester",

            colloquium:
                "Kollokvium",

            insufficientQuestions:
                "{type} üçün ən azı {required} düzgün oxunmuş sual lazımdır. Hazırda {available} sual mövcuddur.",

            questionProgress:
                "Sual {current} / {total}",

            questionNumber:
                "Sual {current}",

            answered:
                "{answered} / {total} cavablandırılıb",

            unansweredWarning:
                "{count} cavablandırılmamış sualın var. İmtahanı bitirsən həmin suallar boş hesablanacaq.",

            allAnswered:
                "Bütün sualları cavablandırmısan. İmtahanı bitirmək istəyirsən?"

        },


        en: {

            noQuestions:
                "No questions were found for the exam.",

            notPrepared:
                "The exam has not been prepared.",

            pdfExam:
                "PDF exam",

            semester:
                "Semester",

            colloquium:
                "Colloquium",

            insufficientQuestions:
                "At least {required} valid questions are required for {type}. Currently, {available} questions are available.",

            questionProgress:
                "Question {current} / {total}",

            questionNumber:
                "Question {current}",

            answered:
                "{answered} / {total} answered",

            unansweredWarning:
                "You have {count} unanswered questions. If you finish the exam, those questions will be counted as unanswered.",

            allAnswered:
                "You have answered all questions. Do you want to finish the exam?"

        },


        ru: {

            noQuestions:
                "Вопросы для экзамена не найдены.",

            notPrepared:
                "Экзамен не подготовлен.",

            pdfExam:
                "PDF-экзамен",

            semester:
                "Семестр",

            colloquium:
                "Коллоквиум",

            insufficientQuestions:
                "Для экзамена «{type}» требуется минимум {required} корректно распознанных вопросов. Сейчас доступно {available}.",

            questionProgress:
                "Вопрос {current} / {total}",

            questionNumber:
                "Вопрос {current}",

            answered:
                "{answered} / {total} отвечено",

            unansweredWarning:
                "У вас осталось {count} вопросов без ответа. Если завершить экзамен, они будут засчитаны как вопросы без ответа.",

            allAnswered:
                "Вы ответили на все вопросы. Хотите завершить экзамен?"

        }

    };


    /*
    ========================================================
    CURRENT LANGUAGE
    ========================================================
    */

    function getLanguage() {

        /*
        Əsas language.js sistemi
        */

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


        /*
        Fallback
        */

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
    İMTAHANI HAZIRLA
    ========================================================
    */

    function create({

        sourceQuestions,
        type,
        duration,
        sourceFileName

    }) {

        if (
            !Array.isArray(
                sourceQuestions
            )
        ) {

            throw new Error(
                tr(
                    "noQuestions"
                )
            );

        }


        /*
        =========================
        TYPE
        =========================
        */

        examType =
            type === "colloquium"
                ? "colloquium"
                : "semester";


        /*
        =========================
        DURATION
        =========================
        */

        durationMinutes =
            Number(
                duration
            ) ||
            90;


        /*
        =========================
        FILE NAME
        =========================
        */

        fileName =
            sourceFileName ||
            tr(
                "pdfExam"
            );


        /*
        =========================
        QUESTION COUNT

        Semester   = 50
        Kollokvium = 30
        =========================
        */

        const requiredQuestionCount =
            examType === "semester"
                ? 50
                : 30;


        if (
            sourceQuestions.length <
            requiredQuestionCount
        ) {

            throw new Error(

                tr(
                    "insufficientQuestions",
                    {

                        type:
                            getExamTypeName(),

                        required:
                            requiredQuestionCount,

                        available:
                            sourceQuestions.length

                    }
                )

            );

        }


        /*
        =========================
        SUALLARI QARIŞDIR
        =========================
        */

        questions =
            shuffle(
                sourceQuestions
            )
                .slice(
                    0,
                    requiredQuestionCount
                )
                .map(
                    question => ({

                        ...question,

                        /*
                        Variantları da
                        yenidən qarışdır.
                        */

                        options:
                            shuffle(
                                question.options
                            )

                    })
                );


        /*
        =========================
        RESET
        =========================
        */

        answers = {};

        currentQuestionIndex = 0;

        examFinished = false;


        return getState();

    }



    /*
    ========================================================
    İMTAHANI BAŞLAT
    ========================================================
    */

    function start() {

        if (
            !questions.length
        ) {

            throw new Error(
                tr(
                    "notPrepared"
                )
            );

        }


        /*
        =========================
        EXAM SCREEN
        =========================
        */

        showScreen(
            "examScreen"
        );


        /*
        =========================
        FIRST RENDER
        =========================
        */

        render();


        /*
        =========================
        TIMER
        =========================
        */

        ExamTimer.start({

            minutes:
                durationMinutes,

            onTick:
                handleTimerTick,

            onFinish:
                handleTimeFinished

        });

    }



    /*
    ========================================================
    SUALI GÖSTƏR
    ========================================================
    */

    function render() {

        if (
            !questions.length
        ) {

            return;

        }


        const question =
            questions[
                currentQuestionIndex
            ];


        /*
        =========================
        PROGRESS TEXT
        =========================
        */

        setText(

            "examProgress",

            tr(
                "questionProgress",
                {

                    current:
                        currentQuestionIndex + 1,

                    total:
                        questions.length

                }
            )

        );


        /*
        =========================
        QUESTION NUMBER
        =========================
        */

        setText(

            "questionNumber",

            tr(
                "questionNumber",
                {

                    current:
                        currentQuestionIndex + 1

                }
            )

        );


        /*
        =========================
        QUESTION TEXT
        =========================
        */

        setText(
            "questionText",
            question.question
        );


        /*
        =========================
        PROGRESS BAR
        =========================
        */

        const progress =
            (
                (
                    currentQuestionIndex + 1
                ) /
                questions.length
            ) *
            100;


        const progressBar =
            document.getElementById(
                "progressBar"
            );


        if (
            progressBar
        ) {

            progressBar.style.width =
                `${progress}%`;

        }


        /*
        =========================
        OPTIONS
        =========================
        */

        renderOptions(
            question
        );


        /*
        =========================
        NAVIGATOR
        =========================
        */

        renderNavigator();


        /*
        =========================
        ANSWERED INFO
        =========================
        */

        updateAnsweredInfo();


        /*
        =========================
        BUTTON STATUS
        =========================
        */

        updateNavigationButtons();

    }



    /*
    ========================================================
    VARİANTLARI GÖSTƏR
    ========================================================
    */

    function renderOptions(
        question
    ) {

        const container =
            document.getElementById(
                "options"
            );


        if (
            !container
        ) {

            return;

        }


        container.innerHTML =
            "";


        const letters = [

            "A",
            "B",
            "C",
            "D",
            "E",
            "F"

        ];


        question.options.forEach(
            (
                option,
                index
            ) => {

                /*
                =========================
                OPTION BUTTON
                =========================
                */

                const button =
                    document.createElement(
                        "button"
                    );


                button.type =
                    "button";


                button.className =
                    "option";


                /*
                =========================
                SELECTED
                =========================
                */

                if (
                    answers[
                        currentQuestionIndex
                    ] === option
                ) {

                    button.classList.add(
                        "selected"
                    );

                }


                /*
                =========================
                LETTER
                =========================
                */

                const letter =
                    document.createElement(
                        "span"
                    );


                letter.className =
                    "option-letter";


                letter.textContent =
                    letters[index] ||
                    String(
                        index + 1
                    );


                /*
                =========================
                OPTION TEXT
                =========================
                */

                const text =
                    document.createElement(
                        "span"
                    );


                text.textContent =
                    option;


                /*
                =========================
                BUILD
                =========================
                */

                button.appendChild(
                    letter
                );


                button.appendChild(
                    text
                );


                /*
                =========================
                SELECT ANSWER
                =========================
                */

                button.addEventListener(
                    "click",
                    () => {

                        selectAnswer(
                            option
                        );

                    }
                );


                container.appendChild(
                    button
                );

            }
        );

    }



    /*
    ========================================================
    CAVAB SEÇ
    ========================================================
    */

    function selectAnswer(
        option
    ) {

        if (
            examFinished
        ) {

            return;

        }


        answers[
            currentQuestionIndex
        ] =
            option;


        render();

    }



    /*
    ========================================================
    NÖVBƏTİ SUAL
    ========================================================
    */

    function next() {

        if (
            currentQuestionIndex >=
            questions.length - 1
        ) {

            return;

        }


        currentQuestionIndex++;


        render();


        scrollExamTop();

    }



    /*
    ========================================================
    ƏVVƏLKİ SUAL
    ========================================================
    */

    function previous() {

        if (
            currentQuestionIndex <=
            0
        ) {

            return;

        }


        currentQuestionIndex--;


        render();


        scrollExamTop();

    }



    /*
    ========================================================
    KONKRET SUALA KEÇ
    ========================================================
    */

    function goToQuestion(
        index
    ) {

        const target =
            Number(
                index
            );


        if (

            !Number.isInteger(
                target
            ) ||

            target < 0 ||

            target >=
                questions.length

        ) {

            return;

        }


        currentQuestionIndex =
            target;


        render();


        scrollExamTop();

    }



    /*
    ========================================================
    SUAL NAVİQATORU
    ========================================================
    */

    function renderNavigator() {

        const navigator =
            document.getElementById(
                "questionNavigator"
            );


        if (
            !navigator
        ) {

            return;

        }


        navigator.innerHTML =
            "";


        questions.forEach(
            (
                _,
                index
            ) => {

                const button =
                    document.createElement(
                        "button"
                    );


                button.type =
                    "button";


                button.className =
                    "question-nav-button";


                button.textContent =
                    String(
                        index + 1
                    );


                /*
                =========================
                ANSWERED
                =========================
                */

                if (
                    answers[index]
                ) {

                    button.classList.add(
                        "answered"
                    );

                }


                /*
                =========================
                CURRENT
                =========================
                */

                if (
                    index ===
                    currentQuestionIndex
                ) {

                    button.classList.add(
                        "current"
                    );

                }


                /*
                =========================
                CLICK
                =========================
                */

                button.addEventListener(
                    "click",
                    () => {

                        goToQuestion(
                            index
                        );

                    }
                );


                navigator.appendChild(
                    button
                );

            }
        );

    }



    /*
    ========================================================
    CAVABLANDIRILAN SUAL SAYI
    ========================================================
    */

    function updateAnsweredInfo() {

        const answered =
            getAnsweredCount();


        setText(

            "answeredInfo",

            tr(
                "answered",
                {

                    answered,

                    total:
                        questions.length

                }
            )

        );

    }



    /*
    ========================================================
    ANSWERED COUNT
    ========================================================
    */

    function getAnsweredCount() {

        return questions.reduce(
            (
                total,
                _,
                index
            ) => {

                return (
                    total +
                    (
                        answers[index]
                            ? 1
                            : 0
                    )
                );

            },
            0
        );

    }



    /*
    ========================================================
    GERİ / İRƏLİ BUTTON
    ========================================================
    */

    function updateNavigationButtons() {

        const previousButton =
            document.getElementById(
                "previousButton"
            );


        const nextButton =
            document.getElementById(
                "nextButton"
            );


        if (
            previousButton
        ) {

            previousButton.disabled =
                currentQuestionIndex ===
                0;

        }


        if (
            nextButton
        ) {

            nextButton.disabled =
                currentQuestionIndex ===
                questions.length - 1;

        }

    }



    /*
    ========================================================
    TIMER
    ========================================================
    */

    function handleTimerTick(
        state
    ) {

        const timer =
            document.getElementById(
                "timer"
            );


        if (
            !timer
        ) {

            return;

        }


        timer.textContent =
            state.formatted;


        /*
        =========================
        SON 5 DƏQİQƏ
        =========================
        */

        if (
            state.isWarning
        ) {

            timer.classList.add(
                "warning"
            );

        } else {

            timer.classList.remove(
                "warning"
            );

        }

    }



    /*
    ========================================================
    VAXT BİTDİ
    ========================================================
    */

    function handleTimeFinished() {

        if (
            examFinished
        ) {

            return;

        }


        finish({

            reason:
                "time"

        });

    }



    /*
    ========================================================
    BİTİRMƏ MODALINI AÇ
    ========================================================
    */

    function requestFinish() {

        if (
            examFinished
        ) {

            return;

        }


        const unanswered =
            questions.length -
            getAnsweredCount();


        const modal =
            document.getElementById(
                "finishModal"
            );


        const modalText =
            document.getElementById(
                "finishModalText"
            );


        /*
        =========================
        MODAL TEXT
        =========================
        */

        if (
            modalText
        ) {

            if (
                unanswered > 0
            ) {

                modalText.textContent =
                    tr(
                        "unansweredWarning",
                        {

                            count:
                                unanswered

                        }
                    );

            } else {

                modalText.textContent =
                    tr(
                        "allAnswered"
                    );

            }

        }


        /*
        =========================
        SHOW MODAL
        =========================
        */

        if (
            modal
        ) {

            modal.classList.remove(
                "hidden"
            );

        }

    }



    /*
    ========================================================
    MODALI BAĞLA
    ========================================================
    */

    function cancelFinish() {

        const modal =
            document.getElementById(
                "finishModal"
            );


        if (
            modal
        ) {

            modal.classList.add(
                "hidden"
            );

        }

    }



    /*
    ========================================================
    İMTAHANI BİTİR
    ========================================================
    */

    function finish({

        reason = "manual"

    } = {}) {

        if (
            examFinished
        ) {

            return;

        }


        examFinished =
            true;


        cancelFinish();


        /*
        =========================
        TIMER STOP
        =========================
        */

        ExamTimer.stop();


        /*
        =========================
        RESULT CALCULATE
        =========================
        */

        const result =
            ExamResults.calculate(
                questions,
                answers
            );


        /*
        =========================
        COMPLETE RESULT
        =========================
        */

        const completeResult = {

            ...result,

            examType,

            examTypeName:
                getExamTypeName(),

            durationMinutes,

            fileName,

            finishReason:
                reason

        };


        /*
        =========================
        HISTORY
        =========================
        */

        ExamHistory.add(
            completeResult
        );


        /*
        =========================
        RESULT RENDER
        =========================
        */

        ExamResults.render(
            completeResult
        );


        /*
        =========================
        RESULT SCREEN
        =========================
        */

        showScreen(
            "resultScreen"
        );


        window.scrollTo({

            top: 0,

            behavior:
                "smooth"

        });


        return completeResult;

    }



    /*
    ========================================================
    İMTAHAN NÖVÜ
    ========================================================
    */

    function getExamTypeName() {

        return (
            examType ===
            "colloquium"
        )
            ? tr(
                "colloquium"
            )
            : tr(
                "semester"
            );

    }



    /*
    ========================================================
    SCREEN DƏYİŞ
    ========================================================
    */

    function showScreen(
        screenId
    ) {

        document
            .querySelectorAll(
                ".screen"
            )
            .forEach(
                screen => {

                    screen.classList.remove(
                        "active"
                    );

                }
            );


        const target =
            document.getElementById(
                screenId
            );


        if (
            target
        ) {

            target.classList.add(
                "active"
            );

        }

    }



    /*
    ========================================================
    SCROLL
    ========================================================
    */

    function scrollExamTop() {

        const examScreen =
            document.getElementById(
                "examScreen"
            );


        if (
            !examScreen
        ) {

            return;

        }


        const top =
            examScreen
                .getBoundingClientRect()
                .top +

            window.scrollY -

            80;


        window.scrollTo({

            top,

            behavior:
                "smooth"

        });

    }



    /*
    ========================================================
    STATE
    ========================================================
    */

    function getState() {

        return {

            questions:
                [...questions],

            answers:
                {...answers},

            currentQuestionIndex,

            examType,

            durationMinutes,

            fileName,

            examFinished,

            answered:
                getAnsweredCount(),

            total:
                questions.length

        };

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
    FISHER-YATES SHUFFLE
    ========================================================
    */

    function shuffle(
        array
    ) {

        const result =
            [...array];


        for (

            let i =
                result.length - 1;

            i > 0;

            i--

        ) {

            const j =
                Math.floor(
                    Math.random() *
                    (
                        i + 1
                    )
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
    LANGUAGE CHANGE
    ========================================================

    İmtahan açıq olduğu halda dili dəyişəndə:
    Question → Вопрос → Sual
    answered → отвечено → cavablandırılıb

    dərhal yenilənir.
    ========================================================
    */

    document.addEventListener(
        "languageChanged",
        () => {

            if (
                questions.length &&
                !examFinished
            ) {

                render();

            }


            /*
            Finish modal açıqdırsa
            onun mətnini də yenilə.
            */

            const modal =
                document.getElementById(
                    "finishModal"
                );


            if (
                modal &&
                !modal.classList.contains(
                    "hidden"
                ) &&
                !examFinished
            ) {

                requestFinish();

            }

        }
    );



    /*
    ========================================================
    PUBLIC API
    ========================================================
    */

    return {

        create,

        start,

        render,

        next,

        previous,

        goToQuestion,

        requestFinish,

        cancelFinish,

        finish,

        getState

    };

})();