"use strict";

/*
========================================================
 EXAM TIMER
========================================================
*/

const ExamTimer = (() => {

    let interval = null;
    let remainingSeconds = 0;
    let totalSeconds = 0;

    let onFinishCallback = null;
    let onTickCallback = null;


    /*
    ========================================================
    İMTAHAN NÖVÜNƏ GÖRƏ MÜDDƏTLƏR
    ========================================================
    */

    const timeOptions = {

        semester: [
            50,
            80,
            90,
            120
        ],

        colloquium: [
            30,
            50,
            90
        ]

    };


    /*
    ========================================================
    MÜDDƏTLƏRİ AL
    ========================================================
    */

    function getTimeOptions(examType) {

        if (!timeOptions[examType]) {
            return [];
        }

        return [...timeOptions[examType]];
    }


    /*
    ========================================================
    TAYMERİ BAŞLAT
    ========================================================
    */

    function start({
        minutes,
        onFinish,
        onTick
    }) {

        stop();

        const parsedMinutes =
            Number(minutes);


        if (
            !Number.isFinite(parsedMinutes) ||
            parsedMinutes <= 0
        ) {

            throw new Error(
                "İmtahan vaxtı düzgün seçilməyib."
            );

        }


        totalSeconds =
            Math.floor(
                parsedMinutes * 60
            );


        remainingSeconds =
            totalSeconds;


        onFinishCallback =
            typeof onFinish === "function"
                ? onFinish
                : null;


        onTickCallback =
            typeof onTick === "function"
                ? onTick
                : null;


        /*
         * İlk saniyəni dərhal göstər.
         */
        emitTick();


        interval =
            setInterval(() => {

                remainingSeconds--;


                if (
                    remainingSeconds <= 0
                ) {

                    remainingSeconds = 0;

                    emitTick();

                    stopIntervalOnly();


                    if (onFinishCallback) {

                        onFinishCallback();

                    }


                    return;

                }


                emitTick();

            }, 1000);

    }


    /*
    ========================================================
    TICK
    ========================================================
    */

    function emitTick() {

        if (!onTickCallback) {
            return;
        }


        onTickCallback({

            remainingSeconds,

            totalSeconds,

            formatted:
                formatTime(
                    remainingSeconds
                ),

            percentage:
                getRemainingPercentage(),

            isWarning:
                remainingSeconds <= 5 * 60

        });

    }


    /*
    ========================================================
    DAYANDIR
    ========================================================
    */

    function stop() {

        stopIntervalOnly();

        remainingSeconds = 0;
        totalSeconds = 0;

        onFinishCallback = null;
        onTickCallback = null;

    }


    function stopIntervalOnly() {

        if (interval !== null) {

            clearInterval(interval);

            interval = null;

        }

    }


    /*
    ========================================================
    PAUSE
    ========================================================
    */

    function pause() {

        stopIntervalOnly();

    }


    /*
    ========================================================
    DAVAM ET
    ========================================================
    */

    function resume() {

        if (
            interval !== null ||
            remainingSeconds <= 0
        ) {
            return;
        }


        interval =
            setInterval(() => {

                remainingSeconds--;


                if (
                    remainingSeconds <= 0
                ) {

                    remainingSeconds = 0;

                    emitTick();

                    stopIntervalOnly();


                    if (onFinishCallback) {
                        onFinishCallback();
                    }


                    return;

                }


                emitTick();

            }, 1000);

    }


    /*
    ========================================================
    FORMAT
    ========================================================

    5399 -> 89:59
    */

    function formatTime(seconds) {

        const safeSeconds =
            Math.max(
                0,
                Math.floor(
                    Number(seconds) || 0
                )
            );


        const minutes =
            Math.floor(
                safeSeconds / 60
            );


        const secs =
            safeSeconds % 60;


        return (
            String(minutes).padStart(2, "0") +
            ":" +
            String(secs).padStart(2, "0")
        );

    }


    /*
    ========================================================
    QALAN FAİZ
    ========================================================
    */

    function getRemainingPercentage() {

        if (totalSeconds <= 0) {
            return 0;
        }


        return Math.max(
            0,
            Math.min(
                100,

                (
                    remainingSeconds /
                    totalSeconds
                ) * 100
            )
        );

    }


    /*
    ========================================================
    STATUS
    ========================================================
    */

    function getState() {

        return {

            running:
                interval !== null,

            remainingSeconds,

            totalSeconds,

            formatted:
                formatTime(
                    remainingSeconds
                ),

            percentage:
                getRemainingPercentage()

        };

    }


    /*
    ========================================================
    PUBLIC API
    ========================================================
    */

    return {

        getTimeOptions,

        start,

        stop,

        pause,

        resume,

        formatTime,

        getState

    };

})();