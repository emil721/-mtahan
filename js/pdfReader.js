"use strict";

/*
========================================================
 PDF READER
 PDF.js vasitəsilə PDF faylındakı mətni
 sətir-sətir və səhifə-səhifə oxuyur.
========================================================
*/

const PDFReader = (() => {

    /**
     * PDF.js worker
     */
    function configureWorker() {
        if (typeof pdfjsLib === "undefined") {
            throw new Error(
                "PDF.js kitabxanası yüklənməyib."
            );
        }

        pdfjsLib.GlobalWorkerOptions.workerSrc =
            "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
    }


    /**
     * Əsas PDF oxuma funksiyası
     */
    async function readPDF(file) {

        if (!file) {
            throw new Error("PDF faylı seçilməyib.");
        }

        if (!isPDF(file)) {
            throw new Error(
                "Seçilmiş fayl PDF formatında deyil."
            );
        }

        configureWorker();

        let arrayBuffer;

        try {
            arrayBuffer = await file.arrayBuffer();
        } catch (error) {
            console.error(error);

            throw new Error(
                "PDF faylını oxumaq mümkün olmadı."
            );
        }


        let pdf;

        try {

            pdf = await pdfjsLib.getDocument({
                data: arrayBuffer
            }).promise;

        } catch (error) {

            console.error("PDF.js error:", error);

            throw new Error(
                "PDF açıla bilmədi. Fayl zədələnmiş ola bilər."
            );
        }


        const pages = [];
        const allLines = [];


        /*
        ================================================
        HƏR SƏHİFƏNİ AYRICA OXUYURUQ
        ================================================
        */

        for (
            let pageNumber = 1;
            pageNumber <= pdf.numPages;
            pageNumber++
        ) {

            const page = await pdf.getPage(pageNumber);

            const content =
                await page.getTextContent();


            const lines =
                extractLines(content.items);


            const pageData = {
                pageNumber,
                lines
            };


            pages.push(pageData);


            /*
             * Sətirlərə səhifə məlumatı əlavə edirik.
             *
             * Parser lazım olsa hansı mətnin
             * hansı səhifədən gəldiyini biləcək.
             */
            lines.forEach(line => {

                allLines.push({
                    ...line,
                    pageNumber
                });

            });
        }


        if (allLines.length === 0) {

            throw new Error(
                "PDF-də oxuna bilən mətn tapılmadı."
            );
        }


        return {
            fileName: file.name,
            fileSize: file.size,
            pageCount: pdf.numPages,
            pages,
            lines: allLines
        };
    }


    /**
     * PDF.js item-lərini vizual sətirlərə çevirir.
     */
    function extractLines(items) {

        if (!Array.isArray(items)) {
            return [];
        }


        const usableItems = items
            .map((item, index) => {

                const text =
                    normalizeText(item.str || "");


                if (!text) {
                    return null;
                }


                /*
                 * PDF.js transform:
                 *
                 * transform[4] = X koordinatı
                 * transform[5] = Y koordinatı
                 */

                const x =
                    Number(item.transform?.[4] || 0);

                const y =
                    Number(item.transform?.[5] || 0);


                return {
                    index,
                    text,
                    x,
                    y,
                    width: Number(item.width || 0),
                    height: Number(item.height || 0)
                };

            })
            .filter(Boolean);


        /*
        ================================================
        Y KOORDİNATINA GÖRƏ SƏTİRLƏRİ QRUPLAŞDIR
        ================================================

        Eyni sətirdə olan mətn hissələrinin Y koordinatı
        bəzən tam eyni olmur.

        Ona görə kiçik tolerantlıq istifadə edirik.
        */

        const Y_TOLERANCE = 3;

        const rows = [];


        usableItems.forEach(item => {

            let row = rows.find(existingRow => {

                return Math.abs(
                    existingRow.y - item.y
                ) <= Y_TOLERANCE;

            });


            if (!row) {

                row = {
                    y: item.y,
                    items: []
                };

                rows.push(row);
            }


            row.items.push(item);
        });


        /*
         * PDF koordinatlarında yuxarıdakı mətnin
         * Y dəyəri adətən daha böyükdür.
         */
        rows.sort((a, b) => b.y - a.y);


        /*
        ================================================
        HƏR SƏTRDƏ X KOORDİNATINA GÖRƏ DÜZ
        ================================================
        */

        const lines = rows
            .map(row => {

                row.items.sort(
                    (a, b) => a.x - b.x
                );


                const text =
                    joinTextItems(row.items);


                if (!text) {
                    return null;
                }


                return {
                    text,
                    y: row.y,

                    x:
                        row.items.length
                            ? row.items[0].x
                            : 0,

                    items: row.items
                };

            })
            .filter(Boolean);


        return lines;
    }


    /**
     * Eyni sətirdəki PDF text item-lərini birləşdirir.
     */
    function joinTextItems(items) {

        if (!items.length) {
            return "";
        }


        let result = "";
        let previous = null;


        items.forEach(item => {

            if (!previous) {

                result = item.text;
                previous = item;

                return;
            }


            /*
             * Əvvəlki mətnin təxmini bitdiyi X
             */
            const previousEnd =
                previous.x + previous.width;


            const gap =
                item.x - previousEnd;


            /*
             * Arada məsafə varsa boşluq əlavə et.
             *
             * Bəzi PDF-lərdə sözlər ayrıca item kimi
             * saxlanılır.
             */
            if (
                gap > 1.5 &&
                !result.endsWith(" ")
            ) {
                result += " ";
            }


            result += item.text;

            previous = item;
        });


        return normalizeText(result);
    }


    /**
     * Mətn təmizləmə
     */
    function normalizeText(text) {

        return String(text || "")
            .replace(/\u00A0/g, " ")
            .replace(/\s+/g, " ")
            .trim();
    }


    /**
     * Fayl həqiqətən PDF-dir?
     */
    function isPDF(file) {

        if (!file) {
            return false;
        }


        const fileName =
            String(file.name || "")
                .toLowerCase();


        return (
            file.type === "application/pdf" ||
            fileName.endsWith(".pdf")
        );
    }


    /**
     * Fayl ölçüsünü istifadəçi üçün göstər.
     */
    function formatFileSize(bytes) {

        const size = Number(bytes || 0);


        if (size < 1024) {
            return `${size} B`;
        }


        if (size < 1024 * 1024) {

            return (
                size / 1024
            ).toFixed(1) + " KB";
        }


        return (
            size /
            (1024 * 1024)
        ).toFixed(1) + " MB";
    }


    /*
    ================================================
    PUBLIC API
    ================================================
    */

    return {
        readPDF,
        formatFileSize,
        normalizeText
    };

})();