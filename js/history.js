"use strict";

/*
========================================================
 EXAM HISTORY
 İmtahan nəticələrinin localStorage-da saxlanması
 AZ / EN / RU
========================================================
*/

const ExamHistory = (() => {

    const STORAGE_KEY =
        "examHistory";

    const MAX_HISTORY =
        100;

    // 1 il
    const MAX_AGE =
        365 * 24 * 60 * 60 * 1000;


    /*
    ========================================================
    LANGUAGE
    ========================================================
    */

    const texts = {

        az: {

            semester:
                "Semester",

            colloquium:
                "Kollokvium",

            pdfExam:
                "PDF imtahanı",

            readError:
                "Tarixçə oxuna bilmədi:",

            saveError:
                "Tarixçə yadda saxlanmadı:",

            clearError:
                "Tarixçə silinə bilmədi:"

        },


        en: {

            semester:
                "Semester",

            colloquium:
                "Colloquium",

            pdfExam:
                "PDF exam",

            readError:
                "Exam history could not be read:",

            saveError:
                "Exam history could not be saved:",

            clearError:
                "Exam history could not be cleared:"

        },


        ru: {

            semester:
                "Семестр",

            colloquium:
                "Коллоквиум",

            pdfExam:
                "PDF-экзамен",

            readError:
                "Не удалось прочитать историю экзаменов:",

            saveError:
                "Не удалось сохранить историю экзаменов:",

            clearError:
                "Не удалось очистить историю экзаменов:"

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
            typeof window.examLanguage
                .getCurrentLanguage ===
                "function"
        ) {

            return (
                window.examLanguage
                    .getCurrentLanguage() ||
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
        key
    ) {

        const language =
            getLanguage();


        return (
            texts[language]?.[key] ??
            texts.az[key] ??
            ""
        );

    }


    /*
    ========================================================
    TARİXÇƏNİ OXU
    ========================================================
    */

    function getAll() {

        let history = [];


        try {

            const raw =
                localStorage.getItem(
                    STORAGE_KEY
                );


            if (raw) {

                const parsed =
                    JSON.parse(
                        raw
                    );


                if (
                    Array.isArray(
                        parsed
                    )
                ) {

                    history =
                        parsed;

                }

            }

        } catch (error) {

            console.error(
                tr(
                    "readError"
                ),
                error
            );


            history = [];

        }


        /*
        Köhnə və ya pozulmuş
        məlumatları təmizlə.
        */

        history =
            cleanup(
                history
            );


        saveRaw(
            history
        );


        return history;

    }


    /*
    ========================================================
    YENİ NƏTİCƏ SAXLA
    ========================================================
    */

    function add(
        result
    ) {

        if (
            !result
        ) {

            return null;

        }


        const history =
            getAll();


        /*
        Vacib:
        examTypeName-i dilə görə hazır mətn kimi
        saxlamağa güvənmirik.

        Əsas məlumat examType-dır.
        Beləliklə tarixçə sonradan başqa dilə
        keçiriləndə də düzgün göstərilə bilər.
        */

        const examType =
            result.examType ===
            "colloquium"
                ? "colloquium"
                : "semester";


        const record = {

            id:
                createID(),

            date:
                new Date()
                    .toISOString(),

            examType,

            /*
            Geri uyğunluq üçün saxlayırıq,
            amma UI göstərərkən getExamTypeName()
            istifadə etmək daha düzgündür.
            */

            examTypeName:
                getExamTypeName(
                    examType
                ),

            fileName:
                result.fileName ||
                tr(
                    "pdfExam"
                ),

            total:
                Number(
                    result.total ||
                    0
                ),

            correct:
                Number(
                    result.correct ||
                    0
                ),

            wrong:
                Number(
                    result.wrong ||
                    0
                ),

            empty:
                Number(
                    result.empty ||
                    0
                ),

            percent:
                Number(
                    result.percent ||
                    0
                ),

            durationMinutes:
                Number(
                    result.durationMinutes ||
                    0
                )

        };


        /*
        Ən yeni imtahan
        yuxarıda olsun.
        */

        history.unshift(
            record
        );


        /*
        Maksimum 100 nəticə.
        */

        const limitedHistory =
            history.slice(
                0,
                MAX_HISTORY
            );


        saveRaw(
            limitedHistory
        );


        return record;

    }


    /*
    ========================================================
    BİR NƏTİCƏNİ TAP
    ========================================================
    */

    function getById(
        id
    ) {

        const history =
            getAll();


        return (
            history.find(
                item =>
                    item.id ===
                    id
            ) ||
            null
        );

    }


    /*
    ========================================================
    BİR NƏTİCƏNİ SİL
    ========================================================
    */

    function remove(
        id
    ) {

        const history =
            getAll();


        const filtered =
            history.filter(
                item =>
                    item.id !==
                    id
            );


        saveRaw(
            filtered
        );


        return filtered;

    }


    /*
    ========================================================
    BÜTÜN TARİXÇƏNİ SİL
    ========================================================
    */

    function clear() {

        try {

            localStorage.removeItem(
                STORAGE_KEY
            );

        } catch (error) {

            console.error(
                tr(
                    "clearError"
                ),
                error
            );

        }

    }


    /*
    ========================================================
    TƏMİZLƏMƏ
    ========================================================
    */

    function cleanup(
        history
    ) {

        const now =
            Date.now();


        return history
            .filter(
                item => {

                    if (
                        !item ||
                        !item.date
                    ) {

                        return false;

                    }


                    const date =
                        new Date(
                            item.date
                        )
                            .getTime();


                    if (
                        !Number.isFinite(
                            date
                        )
                    ) {

                        return false;

                    }


                    /*
                    1 ildən köhnə
                    nəticələri sil.
                    */

                    return (
                        now -
                        date
                    ) <=
                    MAX_AGE;

                }
            )
            .slice(
                0,
                MAX_HISTORY
            );

    }


    /*
    ========================================================
    RAW SAVE
    ========================================================
    */

    function saveRaw(
        history
    ) {

        try {

            localStorage.setItem(

                STORAGE_KEY,

                JSON.stringify(
                    history
                )

            );

        } catch (error) {

            console.error(
                tr(
                    "saveError"
                ),
                error
            );

        }

    }


    /*
    ========================================================
    ID
    ========================================================
    */

    function createID() {

        if (
            window.crypto &&
            typeof crypto.randomUUID ===
                "function"
        ) {

            return (
                crypto.randomUUID()
            );

        }


        return (
            Date.now()
                .toString(
                    36
                ) +

            "-" +

            Math.random()
                .toString(
                    36
                )
                .slice(
                    2
                )
        );

    }


    /*
    ========================================================
    İMTAHAN NÖVÜ
    ========================================================
    */

    function getExamTypeName(
        type
    ) {

        if (
            type ===
            "colloquium"
        ) {

            return tr(
                "colloquium"
            );

        }


        return tr(
            "semester"
        );

    }


    /*
    ========================================================
    TARİX FORMATLA
    ========================================================
    */

    function formatDate(
        dateString
    ) {

        const date =
            new Date(
                dateString
            );


        if (
            Number.isNaN(
                date.getTime()
            )
        ) {

            return "";

        }


        /*
        Dilə uyğun locale
        */

        const language =
            getLanguage();


        const localeMap = {

            az:
                "az-AZ",

            en:
                "en-US",

            ru:
                "ru-RU"

        };


        const locale =
            localeMap[language] ||
            "az-AZ";


        try {

            return new Intl.DateTimeFormat(

                locale,

                {

                    day:
                        "2-digit",

                    month:
                        "2-digit",

                    year:
                        "numeric",

                    hour:
                        "2-digit",

                    minute:
                        "2-digit"

                }

            ).format(
                date
            );

        } catch {

            return (
                date.toLocaleString(
                    locale
                )
            );

        }

    }


    /*
    ========================================================
    PUBLIC API
    ========================================================
    */

    return {

        getAll,

        add,

        getById,

        remove,

        clear,

        formatDate,

        /*
        app.js tarixçəni render edərkən
        istifadə edə bilər.
        */

        getExamTypeName

    };

})();