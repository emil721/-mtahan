"use strict";

/*
========================================================
 MAIN APPLICATION
 PDF → PARSER → RANGE → EXAM → RESULT → HISTORY
========================================================
*/

document.addEventListener("DOMContentLoaded", () => {

    /*
    ========================================================
    STATE
    ========================================================
    */

    let selectedFile = null;

    let parsedQuestions = [];
    let rejectedQuestions = [];

    let selectedExamType = "semester";
    let selectedDuration = 90;

    let lastParserStats = null;

    let isPreparingExam = false;


    /*
    ========================================================
    DYNAMIC LANGUAGE HELPERS
    ========================================================
    */

    const dynamicTranslations = {

        az: {

            pdfReadingTitle:
                "PDF oxunur...",

            pdfReadingText:
                "Səhifələr və mətn strukturu analiz edilir.",

            questionsSearching:
                "Suallar axtarılır...",

            pagesRead:
                "{count} səhifə oxundu.",

            noValidQuestions:
                "PDF-dən etibarlı sual çıxarıla bilmədi.",

            pdfTooFew:
                "PDF oxundu, amma yalnız {valid} etibarlı sual tapıldı. {type} üçün ən azı {required} sual lazımdır.{rejected}",

            rejectedSuffix:
                " {count} sual parser tərəfindən etibarsız sayıldı.",

            pdfReady:
                "PDF hazırdır",

            validFound:
                "{count} etibarlı sual tapıldı",

            rejectedShort:
                " • {count} sual kənarlaşdırıldı",

            pdfProcessError:
                "PDF işlənərkən xəta baş verdi.",

            minute:
                "{count} dəq",

            totalTooFew:
                "{type} üçün {required} sual lazımdır, amma PDF-dən {count} etibarlı sual tapılıb.",

            choosePdfFirst:
                "Əvvəlcə PDF faylını seç.",

            validNeeded:
                "{type} üçün ən azı {required} etibarlı sual lazımdır.",

            invalidRange:
                "Seçilmiş sual aralığı imtahan üçün uyğun deyil.",

            examStartError:
                "İmtahan başlatmaq mümkün olmadı.",

            preparing:
                "İmtahan hazırlanır...",

            choosePdfShort:
                "Əvvəlcə PDF seç",

            pdfPreparing:
                "PDF hazırlanır...",

            atLeastNeeded:
                "Ən azı {required} sual lazımdır",

            startTypeExam:
                "{type} imtahanına başla",

            historyDetails:
                "{total} sual • {correct} düz • {wrong} səhv • {empty} boş",

            rangeDefault:
                "PDF yükləndikdən sonra sual aralığını seçə bilərsən.",

            rangeEnter:
                "Başlanğıc və son sual nömrəsini daxil et.",

            rangeOrder:
                "Başlanğıc sual son sualdan böyük ola bilməz.",

            pdfRange:
                "PDF-də mövcud aralıq: {min}–{max}.",

            rangeTooFew:
                "{start}–{end} aralığında {available} etibarlı sual var. {type} üçün ən azı {required} sual lazımdır.",

            rangeReady:
                "{start}–{end} aralığında {available} etibarlı sual var. {required} sual təsadüfi seçiləcək.",

            semester:
                "Semester",

            colloquium:
                "Kollokvium",

            prepTitle:
                "İmtahan hazırlanır",

            prepStarting:
                "Hazırlıq başlayır...",

            prepPdf:
                "PDF məlumatları yoxlanılır...",

            prepRange:
                "Sual aralığı hazırlanır...",

            prepRandom:
                "{count} sual təsadüfi seçilir...",

            prepOptions:
                "Cavab variantları qarışdırılır...",

            prepReadyText:
                "İmtahan başlamağa hazırdır.",

            prepReadyTitle:
                "İmtahan hazırdır"

        },


        /*
        ====================================================
        ENGLISH
        ====================================================
        */

        en: {

            pdfReadingTitle:
                "Reading PDF...",

            pdfReadingText:
                "Analyzing pages and text structure.",

            questionsSearching:
                "Searching for questions...",

            pagesRead:
                "{count} pages read.",

            noValidQuestions:
                "No valid questions could be extracted from the PDF.",

            pdfTooFew:
                "The PDF was read, but only {valid} valid questions were found. At least {required} questions are required for {type}.{rejected}",

            rejectedSuffix:
                " {count} questions were rejected by the parser.",

            pdfReady:
                "PDF is ready",

            validFound:
                "{count} valid questions found",

            rejectedShort:
                " • {count} questions excluded",

            pdfProcessError:
                "An error occurred while processing the PDF.",

            minute:
                "{count} min",

            totalTooFew:
                "{type} requires {required} questions, but only {count} valid questions were found in the PDF.",

            choosePdfFirst:
                "Please select a PDF file first.",

            validNeeded:
                "At least {required} valid questions are required for {type}.",

            invalidRange:
                "The selected question range is not suitable for this exam.",

            examStartError:
                "The exam could not be started.",

            preparing:
                "Preparing exam...",

            choosePdfShort:
                "Select a PDF first",

            pdfPreparing:
                "Preparing PDF...",

            atLeastNeeded:
                "At least {required} questions required",

            startTypeExam:
                "Start {type} exam",

            historyDetails:
                "{total} questions • {correct} correct • {wrong} incorrect • {empty} unanswered",

            rangeDefault:
                "You can select the question range after uploading the PDF.",

            rangeEnter:
                "Enter the first and last question numbers.",

            rangeOrder:
                "The first question cannot be greater than the last question.",

            pdfRange:
                "Available PDF range: {min}–{max}.",

            rangeTooFew:
                "There are {available} valid questions in the {start}–{end} range. At least {required} questions are required for {type}.",

            rangeReady:
                "There are {available} valid questions in the {start}–{end} range. {required} questions will be selected randomly.",

            semester:
                "Semester",

            colloquium:
                "Colloquium",

            prepTitle:
                "Preparing exam",

            prepStarting:
                "Starting preparation...",

            prepPdf:
                "Checking PDF data...",

            prepRange:
                "Preparing question range...",

            prepRandom:
                "Randomly selecting {count} questions...",

            prepOptions:
                "Shuffling answer choices...",

            prepReadyText:
                "The exam is ready to start.",

            prepReadyTitle:
                "Exam is ready"

        },


        /*
        ====================================================
        РУССКИЙ
        ====================================================
        */

        ru: {

            pdfReadingTitle:
                "Чтение PDF...",

            pdfReadingText:
                "Анализ страниц и структуры текста.",

            questionsSearching:
                "Поиск вопросов...",

            pagesRead:
                "Прочитано страниц: {count}.",

            noValidQuestions:
                "Не удалось извлечь корректные вопросы из PDF.",

            pdfTooFew:
                "PDF прочитан, но найдено только {valid} корректных вопросов. Для экзамена «{type}» требуется минимум {required} вопросов.{rejected}",

            rejectedSuffix:
                " Парсер отклонил вопросов: {count}.",

            pdfReady:
                "PDF готов",

            validFound:
                "Найдено корректных вопросов: {count}",

            rejectedShort:
                " • исключено вопросов: {count}",

            pdfProcessError:
                "Произошла ошибка при обработке PDF.",

            minute:
                "{count} мин",

            totalTooFew:
                "Для экзамена «{type}» требуется {required} вопросов, но в PDF найдено только {count} корректных вопросов.",

            choosePdfFirst:
                "Сначала выберите PDF-файл.",

            validNeeded:
                "Для экзамена «{type}» требуется минимум {required} корректных вопросов.",

            invalidRange:
                "Выбранный диапазон вопросов не подходит для экзамена.",

            examStartError:
                "Не удалось запустить экзамен.",

            preparing:
                "Подготовка экзамена...",

            choosePdfShort:
                "Сначала выберите PDF",

            pdfPreparing:
                "Подготовка PDF...",

            atLeastNeeded:
                "Требуется минимум {required} вопросов",

            startTypeExam:
                "Начать экзамен «{type}»",

            historyDetails:
                "{total} вопросов • {correct} правильно • {wrong} неправильно • {empty} без ответа",

            rangeDefault:
                "После загрузки PDF можно выбрать диапазон вопросов.",

            rangeEnter:
                "Введите номера первого и последнего вопросов.",

            rangeOrder:
                "Первый вопрос не может быть больше последнего.",

            pdfRange:
                "Доступный диапазон PDF: {min}–{max}.",

            rangeTooFew:
                "В диапазоне {start}–{end} найдено {available} корректных вопросов. Для экзамена «{type}» требуется минимум {required} вопросов.",

            rangeReady:
                "В диапазоне {start}–{end} найдено {available} корректных вопросов. Случайным образом будет выбрано {required} вопросов.",

            semester:
                "Семестр",

            colloquium:
                "Коллоквиум",

            prepTitle:
                "Подготовка экзамена",

            prepStarting:
                "Начинаем подготовку...",

            prepPdf:
                "Проверка данных PDF...",

            prepRange:
                "Подготовка диапазона вопросов...",

            prepRandom:
                "Случайный выбор {count} вопросов...",

            prepOptions:
                "Перемешивание вариантов ответов...",

            prepReadyText:
                "Экзамен готов к началу.",

            prepReadyTitle:
                "Экзамен готов"

        }

    };


    /*
    ========================================================
    CURRENT LANGUAGE
    ========================================================
    */

    function currentLanguage() {

        return (
            window.examLanguage
                ?.getCurrentLanguage?.() ||
            localStorage.getItem(
                "examSystemLanguage"
            ) ||
            "az"
        );

    }


    /*
    ========================================================
    DYNAMIC TRANSLATE
    ========================================================
    */

    function dt(
        key,
        values = {}
    ) {

        const lang =
            currentLanguage();


        let value =
            dynamicTranslations[lang]?.[key] ??
            dynamicTranslations.az[key] ??
            "";


        Object.entries(
            values
        ).forEach(
            ([name, replacement]) => {

                value =
                    value.replaceAll(
                        `{${name}}`,
                        String(replacement)
                    );

            }
        );


        return value;

    }



    /*
    ========================================================
    ELEMENTS
    ========================================================
    */

    const pdfFile =
        document.getElementById(
            "pdfFile"
        );


    const selectedFileBox =
        document.getElementById(
            "selectedFile"
        );


    const selectedFileName =
        document.getElementById(
            "selectedFileName"
        );


    const selectedFileSize =
        document.getElementById(
            "selectedFileSize"
        );


    const removeFileButton =
        document.getElementById(
            "removeFileButton"
        );


    const parserStatus =
        document.getElementById(
            "parserStatus"
        );


    const parserStatusTitle =
        document.getElementById(
            "parserStatusTitle"
        );


    const parserStatusText =
        document.getElementById(
            "parserStatusText"
        );


    const setupError =
        document.getElementById(
            "setupError"
        );


    const startExamButton =
        document.getElementById(
            "startExamButton"
        );


    const timeOptions =
        document.getElementById(
            "timeOptions"
        );


    const rangeStart =
        document.getElementById(
            "rangeStart"
        );


    const rangeEnd =
        document.getElementById(
            "rangeEnd"
        );


    const rangeInfo =
        document.getElementById(
            "rangeInfo"
        );


    /*
    ========================================================
    SCREENS
    ========================================================
    */

    const setupScreen =
        document.getElementById(
            "setupScreen"
        );


    const examScreen =
        document.getElementById(
            "examScreen"
        );


    const resultScreen =
        document.getElementById(
            "resultScreen"
        );


    const historyScreen =
        document.getElementById(
            "historyScreen"
        );


    /*
    ========================================================
    EXAM ELEMENTS
    ========================================================
    */

    const examProgress =
        document.getElementById(
            "examProgress"
        );


    const progressBar =
        document.getElementById(
            "progressBar"
        );


    const timer =
        document.getElementById(
            "timer"
        );


    const questionNumber =
        document.getElementById(
            "questionNumber"
        );


    const questionText =
        document.getElementById(
            "questionText"
        );


    const options =
        document.getElementById(
            "options"
        );


    const previousButton =
        document.getElementById(
            "previousButton"
        );


    const nextButton =
        document.getElementById(
            "nextButton"
        );


    const finishExamButton =
        document.getElementById(
            "finishExamButton"
        );


    /*
    ========================================================
    QUESTION NAVIGATOR
    ========================================================
    */

    const toggleQuestionsButton =
        document.getElementById(
            "toggleQuestionsButton"
        );


    const questionNavigatorPanel =
        document.getElementById(
            "questionNavigatorPanel"
        );


    const questionsArrow =
        document.getElementById(
            "questionsArrow"
        );


    const questionNavigator =
        document.getElementById(
            "questionNavigator"
        );


    const answeredInfo =
        document.getElementById(
            "answeredInfo"
        );


    /*
    ========================================================
    RESULT
    ========================================================
    */

    const resultPercent =
        document.getElementById(
            "resultPercent"
        );


    const correctCount =
        document.getElementById(
            "correctCount"
        );


    const wrongCount =
        document.getElementById(
            "wrongCount"
        );


    const emptyCount =
        document.getElementById(
            "emptyCount"
        );


    const resultDetails =
        document.getElementById(
            "resultDetails"
        );


    const restartButton =
        document.getElementById(
            "restartButton"
        );


    /*
    ========================================================
    HISTORY
    ========================================================
    */

    const historyButton =
        document.getElementById(
            "historyButton"
        );


    const menuHistoryButton =
        document.getElementById(
            "menuHistoryButton"
        );


    const menuHomeButton =
        document.getElementById(
            "menuHomeButton"
        );


    const closeHistoryButton =
        document.getElementById(
            "closeHistoryButton"
        );


    const historyList =
        document.getElementById(
            "historyList"
        );


    const emptyHistory =
        document.getElementById(
            "emptyHistory"
        );


    /*
    ========================================================
    FINISH MODAL
    ========================================================
    */

    const finishModal =
        document.getElementById(
            "finishModal"
        );


    const cancelFinishButton =
        document.getElementById(
            "cancelFinishButton"
        );


    const confirmFinishButton =
        document.getElementById(
            "confirmFinishButton"
        );


    /*
    ========================================================
    EXAM PREPARATION
    ========================================================
    */

    const examPreparation =
        document.getElementById(
            "examPreparation"
        );


    const preparationVisual =
        document.getElementById(
            "preparationVisual"
        );


    const preparationTitle =
        document.getElementById(
            "preparationTitle"
        );


    const preparationText =
        document.getElementById(
            "preparationText"
        );


    const preparationProgressBar =
        document.getElementById(
            "preparationProgressBar"
        );


    const preparationPercent =
        document.getElementById(
            "preparationPercent"
        );


    /*
    ========================================================
    INITIALIZE
    ========================================================
    */

    initialize();


    /*
    ========================================================
    LANGUAGE CHANGE
    ========================================================
    */

    document.addEventListener(
        "languageChanged",
        () => {

            renderTimeOptions();

            updateStartButton();


            if (
                selectedFile &&
                parsedQuestions.length
            ) {

                validateRange();

            } else if (rangeInfo) {

                rangeInfo.textContent =
                    dt("rangeDefault");

            }


            const historyScreen =
                document.getElementById(
                    "historyScreen"
                );


            if (
                historyScreen
                    ?.classList
                    .contains("active")
            ) {

                renderHistory();

            }

        }
    );


    /*
    ========================================================
    INITIALIZE FUNCTION
    ========================================================
    */

    function initialize() {

        renderTimeOptions();

        bindEvents();

        updateStartButton();

    }


    /*
    ========================================================
    EVENTS
    ========================================================
    */

    function bindEvents() {


        /*
        =========================
        PDF SEÇ
        =========================
        */

        pdfFile?.addEventListener(
            "change",
            async event => {

                const file =
                    event.target.files?.[0];


                if (!file) {
                    return;
                }


                await handleFile(
                    file
                );

            }
        );


        /*
        =========================
        PDF SİL
        =========================
        */

        removeFileButton
            ?.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    event.stopPropagation();

                    clearSelectedFile();

                }
            );


        /*
        =========================
        RANGE START
        =========================
        */

        rangeStart
            ?.addEventListener(
                "input",
                () => {

                    validateRange();

                }
            );


        /*
        =========================
        RANGE END
        =========================
        */

        rangeEnd
            ?.addEventListener(
                "input",
                () => {

                    validateRange();

                }
            );


        /*
        =========================
        İMTAHAN NÖVÜ
        =========================
        */

        document
            .querySelectorAll(
                'input[name="examType"]'
            )
            .forEach(
                input => {

                    input.addEventListener(
                        "change",
                        event => {

                            selectedExamType =
                                event.target.value;


                            renderTimeOptions();

                            validateRange();

                        }
                    );

                }
            );


        /*
        =========================
        İMTAHANA BAŞLA
        =========================
        */

        startExamButton
            ?.addEventListener(
                "click",
                startExam
            );


        /*
        =========================
        BÜTÜN SUALLARA BAX
        =========================
        */

        toggleQuestionsButton
            ?.addEventListener(
                "click",
                () => {

                    const isHidden =
                        questionNavigatorPanel
                            ?.classList
                            .contains(
                                "hidden"
                            );


                    if (isHidden) {

                        questionNavigatorPanel
                            ?.classList
                            .remove(
                                "hidden"
                            );


                        questionsArrow
                            ?.classList
                            .add(
                                "open"
                            );

                    } else {

                        questionNavigatorPanel
                            ?.classList
                            .add(
                                "hidden"
                            );


                        questionsArrow
                            ?.classList
                            .remove(
                                "open"
                            );

                    }

                }
            );


        /*
        =========================
        GERİ
        =========================
        */

        previousButton
            ?.addEventListener(
                "click",
                () => {

                    ExamEngine.previous();

                }
            );


        /*
        =========================
        İRƏLİ
        =========================
        */

        nextButton
            ?.addEventListener(
                "click",
                () => {

                    ExamEngine.next();

                }
            );


        /*
        =========================
        İMTAHANI BİTİR
        =========================
        */

        finishExamButton
            ?.addEventListener(
                "click",
                () => {

                    ExamEngine.requestFinish();

                }
            );


        cancelFinishButton
            ?.addEventListener(
                "click",
                () => {

                    ExamEngine.cancelFinish();

                }
            );


        confirmFinishButton
            ?.addEventListener(
                "click",
                () => {

                    ExamEngine.finish({
                        reason: "manual"
                    });

                }
            );


        /*
        =========================
        MODAL BACKDROP
        =========================
        */

        finishModal
            ?.querySelector(
                ".modal-backdrop"
            )
            ?.addEventListener(
                "click",
                () => {

                    ExamEngine.cancelFinish();

                }
            );


        /*
        =========================
        TARİXÇƏ
        =========================
        */

        const openHistory = () => {

            renderHistory();

            showScreen(
                "historyScreen"
            );


            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        };


        historyButton
            ?.addEventListener(
                "click",
                openHistory
            );


        menuHistoryButton
            ?.addEventListener(
                "click",
                openHistory
            );


        /*
        =========================
        MENYU — ANA SƏHİFƏ
        =========================
        */

        menuHomeButton
            ?.addEventListener(
                "click",
                () => {

                    showScreen(
                        "setupScreen"
                    );


                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });

                }
            );


        /*
        =========================
        TARİXÇƏNİ BAĞLA
        =========================
        */

        closeHistoryButton
            ?.addEventListener(
                "click",
                () => {

                    showScreen(
                        "setupScreen"
                    );


                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });

                }
            );


        /*
        =========================
        YENİ İMTAHAN
        =========================
        */

        restartButton
            ?.addEventListener(
                "click",
                () => {

                    ExamTimer.stop();

                    closeQuestionNavigator();


                    showScreen(
                        "setupScreen"
                    );


                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });

                }
            );

    }


    /*
    ========================================================
    PDF HANDLE
    ========================================================
    */

    async function handleFile(
        file
    ) {

        hideError();


        parsedQuestions = [];

        rejectedQuestions = [];

        lastParserStats = null;

        selectedFile = file;


        /*
        =========================
        FILE INFO
        =========================
        */

        if (selectedFileName) {

            selectedFileName.textContent =
                file.name;

        }


        if (selectedFileSize) {

            selectedFileSize.textContent =
                PDFReader.formatFileSize(
                    file.size
                );

        }


        selectedFileBox
            ?.classList
            .remove(
                "hidden"
            );


        /*
        =========================
        PARSER STATUS
        =========================
        */

        setParserStatus(
            true,
            dt("pdfReadingTitle"),
            dt("pdfReadingText")
        );


        updateStartButton();


        try {

            /*
            =========================
            PDF READER
            =========================
            */

            const pdfData =
                await PDFReader.readPDF(
                    file
                );


            setParserStatus(
                true,
                dt("questionsSearching"),
                dt(
                    "pagesRead",
                    {
                        count:
                            pdfData.pageCount
                    }
                )
            );
            await wait(50);


            /*
            =========================
            PARSER
            =========================
            */

            const parserResult =
                QuestionParser.parse(
                    pdfData
                );


            parsedQuestions =
                parserResult.questions;


            rejectedQuestions =
                parserResult.rejectedQuestions;


            lastParserStats =
                parserResult.stats;


            /*
            =========================
            DEFAULT RANGE
            =========================
            */

            setDefaultRange();


            /*
            =========================
            STATS
            =========================
            */

            const valid =
                parserResult.stats.valid;


            const rejected =
                parserResult.stats.rejected;


            if (valid === 0) {

                throw new Error(
                    dt("noValidQuestions")
                );

            }


            const required =
                getRequiredQuestionCount();


            if (
                valid <
                required
            ) {

                setParserStatus(
                    false
                );


                showError(
                    dt(
                        "pdfTooFew",
                        {
                            valid,

                            type:
                                getExamTypeName(),

                            required,

                            rejected:
                                rejected > 0
                                    ? dt(
                                        "rejectedSuffix",
                                        {
                                            count:
                                                rejected
                                        }
                                    )
                                    : ""
                        }
                    )
                );


                updateStartButton();

                return;

            }


            /*
            =========================
            PDF HAZIRDIR
            =========================
            */

            setParserStatus(
                true,

                dt(
                    "pdfReady"
                ),

                dt(
                    "validFound",
                    {
                        count:
                            valid
                    }
                ) +

                (
                    rejected > 0
                        ? dt(
                            "rejectedShort",
                            {
                                count:
                                    rejected
                            }
                        )
                        : ""
                )
            );


            /*
            =========================
            LOADER SUCCESS
            =========================
            */

            const loader =
                parserStatus
                    ?.querySelector(
                        ".loader"
                    );


            if (loader) {

                loader.style.animation =
                    "none";


                loader.style.borderColor =
                    "#86efac";


                loader.style.borderTopColor =
                    "#16a34a";

            }


            validateRange();


            /*
            =========================
            DEBUG
            =========================
            */

            console.log(
                "PDF parser nəticəsi:",
                {
                    pdfData,
                    parserResult
                }
            );


        } catch (error) {

            console.error(
                "PDF işlənərkən xəta:",
                error
            );


            parsedQuestions = [];

            rejectedQuestions = [];


            setParserStatus(
                false
            );


            showError(
                error?.message ||
                dt(
                    "pdfProcessError"
                )
            );


            updateStartButton();

        }

    }



    /*
    ========================================================
    PDF SİL
    ========================================================
    */

    function clearSelectedFile() {

        selectedFile =
            null;


        parsedQuestions =
            [];


        rejectedQuestions =
            [];


        lastParserStats =
            null;


        if (pdfFile) {

            pdfFile.value =
                "";

        }


        if (selectedFileName) {

            selectedFileName.textContent =
                "";

        }


        if (selectedFileSize) {

            selectedFileSize.textContent =
                "";

        }


        /*
        =========================
        RANGE RESET
        =========================
        */

        if (rangeStart) {

            rangeStart.value =
                "1";


            rangeStart.removeAttribute(
                "max"
            );

        }


        if (rangeEnd) {

            rangeEnd.value =
                "";


            rangeEnd.removeAttribute(
                "max"
            );

        }


        if (rangeInfo) {

            rangeInfo.textContent =
                dt(
                    "rangeDefault"
                );

        }


        selectedFileBox
            ?.classList
            .add(
                "hidden"
            );


        setParserStatus(
            false
        );


        hideError();


        updateStartButton();

    }



    /*
    ========================================================
    TIME OPTIONS
    ========================================================
    */

    function renderTimeOptions() {

        if (!timeOptions) {

            return;

        }


        timeOptions.innerHTML =
            "";


        const timeList =
            ExamTimer.getTimeOptions(
                selectedExamType
            );


        /*
        =========================
        DEFAULT TIME
        =========================
        */

        if (
            selectedExamType ===
            "semester"
        ) {

            if (
                !timeList.includes(
                    selectedDuration
                )
            ) {

                selectedDuration =
                    90;

            }

        } else {

            if (
                !timeList.includes(
                    selectedDuration
                )
            ) {

                selectedDuration =
                    50;

            }

        }


        /*
        =========================
        BUTTONS
        =========================
        */

        timeList.forEach(
            minutes => {

                const button =
                    document.createElement(
                        "button"
                    );


                button.type =
                    "button";


                button.className =
                    "time-option";


                button.textContent =
                    dt(
                        "minute",
                        {
                            count:
                                minutes
                        }
                    );


                if (
                    minutes ===
                    selectedDuration
                ) {

                    button.classList.add(
                        "selected"
                    );

                }


                button.addEventListener(
                    "click",
                    () => {

                        selectedDuration =
                            minutes;


                        renderTimeOptions();

                    }
                );


                timeOptions.appendChild(
                    button
                );

            }
        );


        validateCurrentQuestionCount();

    }



    /*
    ========================================================
    QUESTION COUNT
    ========================================================
    */

    function validateCurrentQuestionCount() {

        if (
            !selectedFile ||
            !parsedQuestions.length
        ) {

            return;

        }


        const required =
            getRequiredQuestionCount();


        if (
            parsedQuestions.length <
            required
        ) {

            showError(
                dt(
                    "totalTooFew",
                    {
                        type:
                            getExamTypeName(),

                        required,

                        count:
                            parsedQuestions.length
                    }
                )
            );

        } else {

            hideError();

        }


        updateStartButton();

    }



    /*
    ========================================================
    START EXAM
    ========================================================
    */

    async function startExam() {

        /*
        Double click qarşısı
        */

        if (isPreparingExam) {

            return;

        }


        hideError();


        /*
        =========================
        PDF CHECK
        =========================
        */

        if (!selectedFile) {

            showError(
                dt(
                    "choosePdfFirst"
                )
            );

            return;

        }


        const required =
            getRequiredQuestionCount();


        /*
        =========================
        TOTAL QUESTION CHECK
        =========================
        */

        if (
            parsedQuestions.length <
            required
        ) {

            showError(
                dt(
                    "validNeeded",
                    {
                        type:
                            getExamTypeName(),

                        required
                    }
                )
            );

            return;

        }


        /*
        =========================
        RANGE CHECK
        =========================
        */

        const rangeIsValid =
            validateRange();


        if (!rangeIsValid) {

            showError(
                dt(
                    "invalidRange"
                )
            );

            return;

        }


        const rangeQuestions =
            getQuestionsInSelectedRange();


        isPreparingExam =
            true;


        updateStartButton();


        try {

            /*
            =========================
            PREMIUM ANIMATION
            =========================
            */

            await showExamPreparation(
                required
            );


            /*
            =========================
            EXAM CREATE
            =========================
            */

            ExamEngine.create({

                sourceQuestions:
                    rangeQuestions,

                type:
                    selectedExamType,

                duration:
                    selectedDuration,

                sourceFileName:
                    selectedFile.name

            });


            /*
            =========================
            NAVIGATOR RESET
            =========================
            */

            closeQuestionNavigator();


            /*
            =========================
            START
            =========================
            */

            ExamEngine.start();


            /*
            =========================
            OVERLAY CLOSE
            =========================
            */

            hideExamPreparation();


            window.scrollTo({

                top: 0,

                behavior:
                    "smooth"

            });


        } catch (error) {

            console.error(
                "İmtahan başladılarkən xəta:",
                error
            );


            hideExamPreparation();


            showError(
                error?.message ||
                dt(
                    "examStartError"
                )
            );


        } finally {

            isPreparingExam =
                false;


            updateStartButton();

        }

    }



    /*
    ========================================================
    START BUTTON
    ========================================================
    */

    function updateStartButton() {

        if (!startExamButton) {

            return;

        }


        const required =
            getRequiredQuestionCount();


        const rangeQuestions =
            getQuestionsInSelectedRange();


        const start =
            Number(
                rangeStart?.value
            );


        const end =
            Number(
                rangeEnd?.value
            );


        const validRange =
            Number.isInteger(
                start
            ) &&

            Number.isInteger(
                end
            ) &&

            start <= end;


        const ready =
            selectedFile &&

            parsedQuestions.length > 0 &&

            validRange &&

            rangeQuestions.length >=
                required &&

            !isPreparingExam;


        startExamButton.disabled =
            !ready;


        /*
        =========================
        PREPARING
        =========================
        */

        if (isPreparingExam) {

            startExamButton.textContent =
                dt(
                    "preparing"
                );

            return;

        }


        /*
        =========================
        PDF YOXDUR
        =========================
        */

        if (!selectedFile) {

            startExamButton.textContent =
                dt(
                    "choosePdfShort"
                );

            return;

        }


        /*
        =========================
        PDF PARSE OLUNUR
        =========================
        */

        if (
            selectedFile &&
            !parsedQuestions.length
        ) {

            startExamButton.textContent =
                dt(
                    "pdfPreparing"
                );

            return;

        }


        /*
        =========================
        SUAL AZDIR
        =========================
        */

        if (
            parsedQuestions.length <
            required
        ) {

            startExamButton.textContent =
                dt(
                    "atLeastNeeded",
                    {
                        required
                    }
                );

            return;

        }


        /*
        =========================
        RANGE UYĞUN DEYİL
        =========================
        */

        if (
            !validRange ||
            rangeQuestions.length <
                required
        ) {

            startExamButton.textContent =
                dt(
                    "atLeastNeeded",
                    {
                        required
                    }
                );

            return;

        }


        /*
        =========================
        READY
        =========================
        */

        startExamButton.textContent =
            dt(
                "startTypeExam",
                {
                    type:
                        getExamTypeName()
                }
            );

    }



    /*
    ========================================================
    REQUIRED QUESTION COUNT
    ========================================================
    */

    function getRequiredQuestionCount() {

        return (
            selectedExamType ===
            "colloquium"
        )
            ? 30
            : 50;

    }



    /*
    ========================================================
    EXAM TYPE NAME
    ========================================================
    */

    function getExamTypeName() {

        return (
            selectedExamType ===
            "colloquium"
        )
            ? dt(
                "colloquium"
            )
            : dt(
                "semester"
            );

    }



    /*
    ========================================================
    DEFAULT RANGE
    ========================================================
    */

    function setDefaultRange() {

        if (
            !parsedQuestions.length
        ) {

            return;

        }


        const pdfRange =
            getPdfQuestionRange();


        if (!pdfRange) {

            return;

        }


        if (rangeStart) {

            rangeStart.value =
                String(
                    pdfRange.min
                );


            rangeStart.min =
                String(
                    pdfRange.min
                );


            rangeStart.max =
                String(
                    pdfRange.max
                );

        }


        if (rangeEnd) {

            rangeEnd.value =
                String(
                    pdfRange.max
                );


            rangeEnd.min =
                String(
                    pdfRange.min
                );


            rangeEnd.max =
                String(
                    pdfRange.max
                );

        }


        validateRange();

    }



    /*
    ========================================================
    PDF QUESTION RANGE
    ========================================================
    */

    function getPdfQuestionRange() {

        if (
            !parsedQuestions.length
        ) {

            return null;

        }


        const numbers =
            parsedQuestions
                .map(
                    question =>
                        Number(
                            question.number
                        )
                )
                .filter(
                    number =>
                        Number.isFinite(
                            number
                        )
                );


        if (!numbers.length) {

            return {
                min: 1,
                max:
                    parsedQuestions.length
            };

        }


        return {

            min:
                Math.min(
                    ...numbers
                ),

            max:
                Math.max(
                    ...numbers
                )

        };

    }



    /*
    ========================================================
    QUESTIONS IN SELECTED RANGE
    ========================================================
    */

    function getQuestionsInSelectedRange() {

        if (
            !parsedQuestions.length
        ) {

            return [];

        }


        const start =
            Number(
                rangeStart?.value
            );


        const end =
            Number(
                rangeEnd?.value
            );


        if (
            !Number.isInteger(
                start
            ) ||
            !Number.isInteger(
                end
            ) ||
            start > end
        ) {

            return [];

        }


        return parsedQuestions.filter(
            (
                question,
                index
            ) => {

                const questionNumber =
                    Number(
                        question.number
                    );


                const effectiveNumber =
                    Number.isFinite(
                        questionNumber
                    )
                        ? questionNumber
                        : index + 1;


                return (
                    effectiveNumber >=
                        start &&

                    effectiveNumber <=
                        end
                );

            }
        );

    }



    /*
    ========================================================
    VALIDATE RANGE
    ========================================================
    */

    function validateRange() {

        if (!rangeInfo) {

            return false;

        }


        /*
        =========================
        PDF YOXDUR
        =========================
        */

        if (
            !selectedFile ||
            !parsedQuestions.length
        ) {

            rangeInfo.textContent =
                dt(
                    "rangeDefault"
                );


            rangeInfo.classList.remove(
                "error",
                "success"
            );


            updateStartButton();

            return false;

        }


        const start =
            Number(
                rangeStart?.value
            );


        const end =
            Number(
                rangeEnd?.value
            );


        /*
        =========================
        EMPTY / INVALID NUMBER
        =========================
        */

        if (
            !Number.isInteger(
                start
            ) ||
            !Number.isInteger(
                end
            )
        ) {

            rangeInfo.textContent =
                dt(
                    "rangeEnter"
                );


            rangeInfo.classList.remove(
                "success"
            );


            rangeInfo.classList.add(
                "error"
            );


            updateStartButton();

            return false;

        }


        /*
        =========================
        START > END
        =========================
        */

        if (
            start >
            end
        ) {

            rangeInfo.textContent =
                dt(
                    "rangeOrder"
                );


            rangeInfo.classList.remove(
                "success"
            );


            rangeInfo.classList.add(
                "error"
            );


            updateStartButton();

            return false;

        }


        const pdfRange =
            getPdfQuestionRange();


        if (!pdfRange) {

            return false;

        }


        /*
        =========================
        PDF RANGE-DƏN KƏNAR
        =========================
        */

        if (
            start <
                pdfRange.min ||
            end >
                pdfRange.max
        ) {

            rangeInfo.textContent =
                dt(
                    "pdfRange",
                    {
                        min:
                            pdfRange.min,

                        max:
                            pdfRange.max
                    }
                );


            rangeInfo.classList.remove(
                "success"
            );


            rangeInfo.classList.add(
                "error"
            );


            updateStartButton();

            return false;

        }


        const availableQuestions =
            getQuestionsInSelectedRange();


        const required =
            getRequiredQuestionCount();


        /*
        =========================
        ARALIQDA SUAL AZDIR
        =========================
        */

        if (
            availableQuestions.length <
            required
        ) {

            rangeInfo.textContent =
                dt(
                    "rangeTooFew",
                    {
                        start,

                        end,

                        available:
                            availableQuestions.length,

                        type:
                            getExamTypeName(),

                        required
                    }
                );


            rangeInfo.classList.remove(
                "success"
            );


            rangeInfo.classList.add(
                "error"
            );


            updateStartButton();

            return false;

        }


        /*
        =========================
        RANGE HAZIRDIR
        =========================
        */

        rangeInfo.textContent =
            dt(
                "rangeReady",
                {
                    start,

                    end,

                    available:
                        availableQuestions.length,

                    required
                }
            );


        rangeInfo.classList.remove(
            "error"
        );


        rangeInfo.classList.add(
            "success"
        );


        updateStartButton();

        return true;

    }
        /*
    ========================================================
    HISTORY
    ========================================================
    */

    function renderHistory() {

        if (
            !historyList ||
            !emptyHistory
        ) {
            return;
        }


        historyList.innerHTML =
            "";


        let history = [];


        /*
        ExamHistory modulundan tarixçəni alırıq.
        Müxtəlif versiyalarla uyğunluq üçün
        bir neçə metod yoxlanılır.
        */

        try {

            if (
                typeof ExamHistory !==
                "undefined"
            ) {

                if (
                    typeof ExamHistory.getAll ===
                    "function"
                ) {

                    history =
                        ExamHistory.getAll() || [];

                } else if (
                    typeof ExamHistory.getHistory ===
                    "function"
                ) {

                    history =
                        ExamHistory.getHistory() || [];

                } else if (
                    typeof ExamHistory.load ===
                    "function"
                ) {

                    history =
                        ExamHistory.load() || [];

                }

            }

        } catch (error) {

            console.error(
                "Tarixçə oxunarkən xəta:",
                error
            );

            history = [];

        }


        /*
        =========================
        EMPTY
        =========================
        */

        if (
            !Array.isArray(history) ||
            history.length === 0
        ) {

            emptyHistory.classList.remove(
                "hidden"
            );

            return;

        }


        emptyHistory.classList.add(
            "hidden"
        );


        /*
        =========================
        ITEMS
        =========================
        */

        history.forEach(
            item => {

                const card =
                    document.createElement(
                        "div"
                    );


                card.className =
                    "history-card";


                /*
                -------------------------
                HEADER
                -------------------------
                */

                const header =
                    document.createElement(
                        "div"
                    );


                header.className =
                    "history-card-header";


                const title =
                    document.createElement(
                        "strong"
                    );


                title.textContent =
                    item.type ===
                    "colloquium"
                        ? dt(
                            "colloquium"
                        )
                        : dt(
                            "semester"
                        );


                const percent =
                    document.createElement(
                        "span"
                    );


                const calculatedPercent =
                    Number.isFinite(
                        Number(
                            item.percent
                        )
                    )
                        ? Number(
                            item.percent
                        )
                        : (
                            Number(
                                item.total
                            ) > 0
                                ? Math.round(
                                    (
                                        Number(
                                            item.correct
                                        ) /
                                        Number(
                                            item.total
                                        )
                                    ) *
                                    100
                                )
                                : 0
                        );


                percent.textContent =
                    `${calculatedPercent}%`;


                header.appendChild(
                    title
                );


                header.appendChild(
                    percent
                );


                /*
                -------------------------
                DETAILS
                -------------------------
                */

                const details =
                    document.createElement(
                        "p"
                    );


                let formattedDate =
                    item.date || "";


                try {

                    if (
                        typeof ExamHistory !==
                            "undefined" &&
                        typeof ExamHistory.formatDate ===
                            "function"
                    ) {

                        formattedDate =
                            ExamHistory.formatDate(
                                item.date
                            );

                    }

                } catch (error) {

                    console.warn(
                        "Tarix formatlanmadı:",
                        error
                    );

                }


                details.textContent =
                    (
                        formattedDate
                            ? `${formattedDate} • `
                            : ""
                    ) +

                    dt(
                        "historyDetails",
                        {
                            total:
                                item.total ?? 0,

                            correct:
                                item.correct ?? 0,

                            wrong:
                                item.wrong ?? 0,

                            empty:
                                item.empty ?? 0
                        }
                    );


                /*
                -------------------------
                FILE NAME
                -------------------------
                */

                if (
                    item.sourceFileName
                ) {

                    const file =
                        document.createElement(
                            "small"
                        );


                    file.className =
                        "history-file";


                    file.textContent =
                        item.sourceFileName;


                    card.appendChild(
                        header
                    );


                    card.appendChild(
                        details
                    );


                    card.appendChild(
                        file
                    );

                } else {

                    card.appendChild(
                        header
                    );


                    card.appendChild(
                        details
                    );

                }


                historyList.appendChild(
                    card
                );

            }
        );

    }



    /*
    ========================================================
    SHOW SCREEN
    ========================================================
    */

    function showScreen(
        screenId
    ) {

        const screens =
            document.querySelectorAll(
                ".screen"
            );


        screens.forEach(
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


        target?.classList.add(
            "active"
        );

    }



    /*
    ========================================================
    PARSER STATUS
    ========================================================
    */

    function setParserStatus(
        visible,
        title = "",
        text = ""
    ) {

        if (!parserStatus) {

            return;

        }


        if (!visible) {

            parserStatus.classList.add(
                "hidden"
            );

            return;

        }


        parserStatus.classList.remove(
            "hidden"
        );


        if (
            parserStatusTitle &&
            title
        ) {

            parserStatusTitle.textContent =
                title;

        }


        if (
            parserStatusText &&
            text
        ) {

            parserStatusText.textContent =
                text;

        }


        /*
        Loader əvvəlki uğurlu vəziyyətdən
        normal spinner vəziyyətinə qaytarılır.
        */

        const loader =
            parserStatus.querySelector(
                ".loader"
            );


        if (loader) {

            loader.style.animation =
                "";


            loader.style.borderColor =
                "";


            loader.style.borderTopColor =
                "";

        }

    }



    /*
    ========================================================
    ERROR
    ========================================================
    */

    function showError(
        message
    ) {

        if (!setupError) {

            return;

        }


        setupError.textContent =
            message;


        setupError.classList.remove(
            "hidden"
        );

    }



    function hideError() {

        if (!setupError) {

            return;

        }


        setupError.textContent =
            "";


        setupError.classList.add(
            "hidden"
        );

    }



    /*
    ========================================================
    QUESTION NAVIGATOR CLOSE
    ========================================================
    */

    function closeQuestionNavigator() {

        questionNavigatorPanel
            ?.classList
            .add(
                "hidden"
            );


        questionsArrow
            ?.classList
            .remove(
                "open"
            );

    }



    /*
    ========================================================
    EXAM PREPARATION
    PREMIUM ANIMATION
    ========================================================
    */

    async function showExamPreparation(
        questionCount
    ) {

        if (!examPreparation) {

            return;

        }


        /*
        =========================
        RESET
        =========================
        */

        examPreparation.classList.remove(
            "hidden"
        );


        document.body.classList.add(
            "preparing-exam"
        );


        if (preparationVisual) {

            preparationVisual.classList.remove(
                "success"
            );

        }


        if (preparationTitle) {

            preparationTitle.textContent =
                dt(
                    "prepTitle"
                );

        }


        if (preparationText) {

            preparationText.textContent =
                dt(
                    "prepStarting"
                );

        }


        if (preparationProgressBar) {

            preparationProgressBar.style.width =
                "0%";

        }


        setPreparationPercent(
            0
        );


        /*
        =========================
        STEP 1
        =========================
        */

        await wait(
            180
        );


        updatePreparation(
            15,
            dt(
                "prepPdf"
            )
        );


        /*
        =========================
        STEP 2
        =========================
        */

        await wait(
            300
        );


        updatePreparation(
            38,
            dt(
                "prepRange"
            )
        );


        /*
        =========================
        STEP 3
        =========================
        */

        await wait(
            320
        );


        updatePreparation(
            65,
            dt(
                "prepRandom",
                {
                    count:
                        questionCount
                }
            )
        );


        /*
        =========================
        STEP 4
        =========================
        */

        await wait(
            320
        );


        updatePreparation(
            86,
            dt(
                "prepOptions"
            )
        );


        /*
        =========================
        STEP 5
        =========================
        */

        await wait(
            280
        );


        updatePreparation(
            100,
            dt(
                "prepReadyText"
            )
        );


        /*
        =========================
        SUCCESS
        =========================
        */

        if (preparationVisual) {

            preparationVisual.classList.add(
                "success"
            );


            preparationVisual.innerHTML =
                `
                    <div
                        class="preparation-check"
                        aria-hidden="true"
                    >
                        ✓
                    </div>
                `;

        }


        if (preparationTitle) {

            preparationTitle.textContent =
                dt(
                    "prepReadyTitle"
                );

        }


        await wait(
            500
        );

    }



    /*
    ========================================================
    UPDATE PREPARATION
    ========================================================
    */

    function updatePreparation(
        percent,
        text
    ) {

        if (
            preparationProgressBar
        ) {

            preparationProgressBar.style.width =
                `${percent}%`;

        }


        setPreparationPercent(
            percent
        );


        if (
            preparationText &&
            text
        ) {

            preparationText.textContent =
                text;

        }

    }



    /*
    ========================================================
    PREPARATION PERCENT
    ========================================================
    */

    function setPreparationPercent(
        percent
    ) {

        if (!preparationPercent) {

            return;

        }


        /*
        preparationPercent index.html-da
        div və ya içində span ola bilər.
        Hər iki variantı dəstəkləyirik.
        */

        const span =
            preparationPercent.querySelector(
                "span"
            );


        if (span) {

            span.textContent =
                `${percent}%`;

        } else {

            preparationPercent.textContent =
                `${percent}%`;

        }

    }



    /*
    ========================================================
    HIDE PREPARATION
    ========================================================
    */

    function hideExamPreparation() {

        if (!examPreparation) {

            return;

        }


        examPreparation.classList.add(
            "hidden"
        );


        document.body.classList.remove(
            "preparing-exam"
        );


        /*
        Növbəti imtahan üçün
        success ikonunu spinnerə qaytar.
        */

        if (preparationVisual) {

            preparationVisual.classList.remove(
                "success"
            );


            preparationVisual.innerHTML =
                `
                    <div
                        class="preparation-spinner"
                    ></div>
                `;

        }


        if (preparationProgressBar) {

            preparationProgressBar.style.width =
                "0%";

        }


        setPreparationPercent(
            0
        );

    }



    /*
    ========================================================
    WAIT
    ========================================================
    */

    function wait(
        milliseconds
    ) {

        return new Promise(
            resolve => {

                setTimeout(
                    resolve,
                    milliseconds
                );

            }
        );

    }



    /*
    ========================================================
    GLOBAL CALLBACKS
    exam.js / results.js ilə əlaqə
    ========================================================
    */

    window.ExamApp = {

        /*
        Ekranı dəyiş
        */

        showScreen,


        /*
        İmtahan ekranındakı elementlər
        */

        elements: {

            examProgress,

            progressBar,

            timer,

            questionNumber,

            questionText,

            options,

            previousButton,

            nextButton,

            finishExamButton,

            questionNavigator,

            answeredInfo,

            finishModal,

            resultPercent,

            correctCount,

            wrongCount,

            emptyCount,

            resultDetails

        },


        /*
        Dil
        */

        getLanguage() {

            return currentLanguage();

        },


        /*
        Dinamik tərcümə
        */

        translate(
            key,
            values = {}
        ) {

            return dt(
                key,
                values
            );

        },


        /*
        Nəticə ekranını göstərmək üçün
        */

        showResultScreen() {

            closeQuestionNavigator();


            showScreen(
                "resultScreen"
            );


            window.scrollTo({

                top: 0,

                behavior:
                    "smooth"

            });

        },


        /*
        İmtahan ekranını göstərmək üçün
        */

        showExamScreen() {

            showScreen(
                "examScreen"
            );


            window.scrollTo({

                top: 0,

                behavior:
                    "smooth"

            });

        },


        /*
        Tarixçəni yenilə
        */

        refreshHistory() {

            renderHistory();

        }

    };



    /*
    ========================================================
    INITIAL LANGUAGE REFRESH
    language.js app.js-dən sonra yükləndiyi üçün
    onun hazır olmasını gözləyirik.
    ========================================================
    */

    setTimeout(
        () => {

            renderTimeOptions();

            updateStartButton();


            if (
                !selectedFile
            ) {

                if (rangeInfo) {

                    rangeInfo.textContent =
                        dt(
                            "rangeDefault"
                        );

                }

            } else {

                validateRange();

            }

        },
        0
    );


});