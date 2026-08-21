"use strict";

/*
========================================================
 İMTAHAN SİSTEMİ — LANGUAGE SYSTEM
 Azərbaycan / English / Русский
========================================================
*/


/*
========================================================
 TRANSLATIONS
========================================================
*/

const translations = {

    /* =====================================================
       AZƏRBAYCAN
    ===================================================== */

    az: {

        /* APP */
        "app.name": "İmtahan Sistemi",
        "app.description": "PDF-dən avtomatik test yarat",
        "app.version": "Versiya 1.0",

        /* HERO */
        "hero.badge": "PDF → İMTAHAN",
        "hero.title": "İmtahanını hazırla",
        "hero.description":
            "PDF faylını yüklə, imtahan növünü, sual aralığını və vaxtı seç. Sistem imtahanı avtomatik hazırlayacaq.",

        /* PDF */
        "pdf.title": "PDF faylını seç",
        "pdf.subtitle": "İmtahan sualları olan PDF faylını yüklə",
        "pdf.touch": "PDF seçmək üçün toxun",
        "pdf.only": "Yalnız .pdf faylları",
        "pdf.processing": "PDF analiz edilir...",
        "pdf.questionsPreparing": "Suallar hazırlanır",

        /* EXAM TYPE */
        "type.title": "İmtahan növü",
        "type.subtitle": "İmtahanda neçə sual olacağını seç",
        "type.semester": "Semester",
        "type.semesterCount": "50 sual",
        "type.colloquium": "Kollokvium",
        "type.colloquiumCount": "30 sual",

        /* RANGE */
        "range.title": "Sual aralığı",
        "range.subtitle": "İmtahana düşəcək sualların aralığını seç",
        "range.start": "Başlanğıc sual",
        "range.end": "Son sual",
        "range.startPlaceholder": "Məsələn: 1",
        "range.endPlaceholder": "Məsələn: 200",
        "range.info":
            "PDF yükləndikdən sonra sual aralığını seçə bilərsən.",

        /* TIME */
        "time.title": "İmtahan vaxtı",
        "time.subtitle": "İmtahan müddətini seç",

        /* EXAM */
        "exam.start": "İmtahanı hazırla",
        "exam.label": "İmtahan",
        "exam.allQuestions": "Bütün suallara bax",
        "exam.questions": "Suallar",
        "exam.previous": "← Geri",
        "exam.next": "İrəli →",
        "exam.finish": "İmtahanı bitir",

        /* PREPARATION */
        "preparation.badge": "İmtahan sistemi",
        "preparation.title": "İmtahan hazırlanır",
        "preparation.description": "Suallar yoxlanılır...",
        "preparation.percent": "0%",

        /* RESULT */
        "result.completed": "İmtahan tamamlandı",
        "result.successRate": "Müvəffəqiyyət faizi",
        "result.correct": "Düzgün",
        "result.wrong": "Səhv",
        "result.empty": "Boş",
        "result.restart": "Yeni imtahan",
        "result.report": "Hesabat",
        "result.details": "Detallı nəticələr",

        /* HISTORY */
        "history.eyebrow": "İmtahanlar",
        "history.title": "Tarixçə",
        "history.empty": "Hələ imtahan yoxdur",
        "history.description":
            "Bitirdiyin imtahanlar burada görünəcək.",

        /* MENU */
        "menu.home": "Ana səhifə",
        "menu.home.description": "Yeni imtahan hazırla",

        "menu.history": "İmtahan tarixçəsi",
        "menu.history.description": "Əvvəlki nəticələrinə bax",

        "menu.about": "Haqqında",
        "menu.about.description": "Sistem haqqında məlumat",

        "menu.support": "Texniki dəstək",
        "menu.support.description": "Problemlə bağlı müraciət et",

        "menu.guide": "İstifadə qaydaları",
        "menu.guide.description": "Sistemdən necə istifadə etməli",

        "menu.privacy": "Məxfilik siyasəti",
        "menu.privacy.description": "Məlumatların qorunması",

        "menu.language": "Dil",

        /* FINISH MODAL */
        "modal.finish.title": "İmtahanı bitirmək istəyirsən?",
        "modal.finish.description":
            "Cavablandırmadığın suallar ola bilər.",
        "modal.finish.cancel": "Davam et",
        "modal.finish.confirm": "İmtahanı bitir",

        /* ABOUT */
        "about.back": "← İmtahan sisteminə qayıt",
        "about.badge": "Haqqında",
        "about.title": "İmtahan Sistemi",
        "about.description":
            "PDF fayllarındakı test suallarını avtomatik analiz edərək fərdi imtahan yaratmağa imkan verən sadə və sürətli platforma.",

        "about.system.title": "Sistem nə edir?",
        "about.system.description":
            "PDF faylı sistem tərəfindən analiz olunur, etibarlı suallar müəyyən edilir və seçdiyiniz sual aralığından təsadüfi imtahan hazırlanır.",

        "about.personal.title": "Fərdi imtahan",
        "about.personal.description":
            "Semester üçün 50, Kollokvium üçün 30 suallıq imtahan yarada, sual aralığını və imtahan müddətini özünüz seçə bilərsiniz.",

        "about.results.title": "Nəticələrin analizi",
        "about.results.description":
            "İmtahan bitdikdən sonra düzgün, səhv və boş cavabların sayı, nəticə faizi və ətraflı cavab hesabatı göstərilir.",

        "about.footer": "İmtahan Sistemi • Versiya 1.0",

        /* GUIDE */
        "guide.back": "← İmtahan sisteminə qayıt",
        "guide.badge": "Təlimat",
        "guide.title": "İstifadə qaydaları",
        "guide.description":
            "Bir neçə addımda PDF faylından şəxsi imtahanınızı hazırlaya bilərsiniz.",

        "guide.step1.title": "PDF faylını seçin",
        "guide.step1.description":
            "Test suallarının yerləşdiyi PDF faylını sistemə yükləyin və analiz tamamlanana qədər gözləyin.",

        "guide.step2.title": "İmtahan növünü seçin",
        "guide.step2.description":
            "50 suallıq Semester və ya 30 suallıq Kollokvium imtahanını seçin.",

        "guide.step3.title": "Sual aralığını müəyyən edin",
        "guide.step3.description":
            "Məsələn, 100–250 aralığını seçdikdə sistem yalnız həmin aralıqdakı etibarlı suallardan imtahan hazırlayacaq.",

        "guide.step4.title": "Vaxtı seçin",
        "guide.step4.description":
            "İmtahan üçün uyğun müddəti seçərək imtahana başlaya bilərsiniz.",

        "guide.step5.title": "Nəticəni yoxlayın",
        "guide.step5.description":
            "İmtahan tamamlandıqdan sonra nəticə faizi və bütün cavabların ətraflı hesabatına baxın.",

        "guide.footer": "İmtahan Sistemi • Versiya 1.0",

        /* PRIVACY */
        "privacy.back": "← İmtahan sisteminə qayıt",
        "privacy.badge": "Məxfilik",
        "privacy.title": "Məxfilik siyasəti",
        "privacy.description":
            "İmtahan Sistemində məlumatların istifadəsi haqqında əsas məlumatlar.",

        "privacy.pdf.title": "PDF faylları",
        "privacy.pdf.description":
            "Hazırkı versiyada PDF fayllarının emalı istifadəçinin brauzerində həyata keçirilir.",

        "privacy.history.title": "İmtahan tarixçəsi",
        "privacy.history.description":
            "İmtahan tarixçəsi hazırkı versiyada istifadəçinin brauzerinin lokal yaddaşında saxlanılır.",

        "privacy.future.title": "Gələcək dəyişikliklər",
        "privacy.future.description":
            "Sistemə hesab, server və digər onlayn xidmətlər əlavə edilərsə, bu məxfilik siyasəti həmin funksiyalara uyğun olaraq yenilənməlidir.",

        "privacy.footer": "İmtahan Sistemi • Versiya 1.0",

        /* SUPPORT */
        "support.back": "← İmtahan sisteminə qayıt",
        "support.badge": "Dəstək",
        "support.title": "Texniki dəstək",
        "support.description":
            "Sistemlə bağlı problemlə qarşılaşmısınızsa, aşağıdakı formanı doldurun. Müraciətiniz texniki dəstəyə göndəriləcək.",

        "support.name.label": "Ad və soyad",
        "support.name.placeholder": "Adınızı və soyadınızı yazın",

        "support.email.label": "E-mail",
        "support.email.placeholder": "example@gmail.com",

        "support.category.label": "Problem növü",
        "support.category.choose": "Seçin",
        "support.category.pdf": "PDF problemi",
        "support.category.questions": "Sualların çıxarılması",
        "support.category.exam": "İmtahan problemi",
        "support.category.result": "Nəticə problemi",
        "support.category.website": "Sayt problemi",
        "support.category.suggestion": "Təklif",
        "support.category.other": "Digər",

        "support.subject.label": "Mövzu",
        "support.subject.placeholder": "Problemi qısa şəkildə yazın",

        "support.message.label": "Müraciət",
        "support.message.placeholder":
            "Qarşılaşdığınız problemi ətraflı izah edin...",

        "support.submit": "Müraciəti göndər",

        "support.success.title": "Müraciət göndərildi!",
        "support.success.description":
            "Müraciətiniz uğurla texniki dəstəyə çatdırıldı. Ən qısa zamanda nəzərdən keçiriləcək.",
        "support.success.close": "Bağla",

        "support.footer": "İmtahan Sistemi • Versiya 1.0",

        "common.back": "Geri"
    },


    /* =====================================================
       ENGLISH
    ===================================================== */

    en: {

        /* APP */
        "app.name": "Exam System",
        "app.description": "Create tests automatically from PDF",
        "app.version": "Version 1.0",

        /* HERO */
        "hero.badge": "PDF → EXAM",
        "hero.title": "Prepare your exam",
        "hero.description":
            "Upload your PDF, choose the exam type, question range and duration. The system will prepare your exam automatically.",

        /* PDF */
        "pdf.title": "Select PDF file",
        "pdf.subtitle": "Upload the PDF containing your exam questions",
        "pdf.touch": "Tap to select PDF",
        "pdf.only": "PDF files only",
        "pdf.processing": "Analyzing PDF...",
        "pdf.questionsPreparing": "Preparing questions",

        /* EXAM TYPE */
        "type.title": "Exam type",
        "type.subtitle": "Choose how many questions the exam will contain",
        "type.semester": "Semester",
        "type.semesterCount": "50 questions",
        "type.colloquium": "Colloquium",
        "type.colloquiumCount": "30 questions",

        /* RANGE */
        "range.title": "Question range",
        "range.subtitle": "Choose the range of questions for the exam",
        "range.start": "First question",
        "range.end": "Last question",
        "range.startPlaceholder": "For example: 1",
        "range.endPlaceholder": "For example: 200",
        "range.info":
            "You can select the question range after uploading the PDF.",

        /* TIME */
        "time.title": "Exam duration",
        "time.subtitle": "Choose the exam duration",

        /* EXAM */
        "exam.start": "Prepare exam",
        "exam.label": "Exam",
        "exam.allQuestions": "View all questions",
        "exam.questions": "Questions",
        "exam.previous": "← Previous",
        "exam.next": "Next →",
        "exam.finish": "Finish exam",

        /* PREPARATION */
        "preparation.badge": "Exam system",
        "preparation.title": "Preparing your exam",
        "preparation.description": "Checking questions...",
        "preparation.percent": "0%",

        /* RESULT */
        "result.completed": "Exam completed",
        "result.successRate": "Success rate",
        "result.correct": "Correct",
        "result.wrong": "Incorrect",
        "result.empty": "Unanswered",
        "result.restart": "New exam",
        "result.report": "Report",
        "result.details": "Detailed results",

        /* HISTORY */
        "history.eyebrow": "Exams",
        "history.title": "History",
        "history.empty": "No exams yet",
        "history.description":
            "Your completed exams will appear here.",

        /* MENU */
        "menu.home": "Home",
        "menu.home.description": "Prepare a new exam",

        "menu.history": "Exam history",
        "menu.history.description": "View your previous results",

        "menu.about": "About",
        "menu.about.description": "Information about the system",

        "menu.support": "Technical support",
        "menu.support.description": "Contact technical support",

        "menu.guide": "User guide",
        "menu.guide.description": "Learn how to use the system",

        "menu.privacy": "Privacy policy",
        "menu.privacy.description": "Data protection and privacy",

        "menu.language": "Language",

        /* FINISH MODAL */
        "modal.finish.title": "Do you want to finish the exam?",
        "modal.finish.description":
            "You may still have unanswered questions.",
        "modal.finish.cancel": "Continue exam",
        "modal.finish.confirm": "Finish exam",

        /* ABOUT */
        "about.back": "← Back to Exam System",
        "about.badge": "About",
        "about.title": "Exam System",
        "about.description":
            "A simple and fast platform that automatically analyzes test questions in PDF files and allows you to create personalized exams.",

        "about.system.title": "What does the system do?",
        "about.system.description":
            "The PDF file is analyzed by the system, valid questions are identified, and a random exam is prepared from your selected question range.",

        "about.personal.title": "Personalized exam",
        "about.personal.description":
            "You can create a 50-question Semester exam or a 30-question Colloquium exam and choose the question range and exam duration yourself.",

        "about.results.title": "Result analysis",
        "about.results.description":
            "After the exam, the system displays the number of correct, incorrect and unanswered questions, your success rate and a detailed answer report.",

        "about.footer": "Exam System • Version 1.0",

        /* GUIDE */
        "guide.back": "← Back to Exam System",
        "guide.badge": "Guide",
        "guide.title": "User Guide",
        "guide.description":
            "Prepare your personal exam from a PDF file in just a few steps.",

        "guide.step1.title": "Select the PDF file",
        "guide.step1.description":
            "Upload the PDF file containing the test questions and wait for the analysis to be completed.",

        "guide.step2.title": "Choose the exam type",
        "guide.step2.description":
            "Choose a 50-question Semester exam or a 30-question Colloquium exam.",

        "guide.step3.title": "Set the question range",
        "guide.step3.description":
            "For example, if you select the range 100–250, the system will prepare the exam using only valid questions within that range.",

        "guide.step4.title": "Choose the duration",
        "guide.step4.description":
            "Select a suitable duration for the exam and start when you are ready.",

        "guide.step5.title": "Review your result",
        "guide.step5.description":
            "After completing the exam, review your score percentage and the detailed report of all your answers.",

        "guide.footer": "Exam System • Version 1.0",

        /* PRIVACY */
        "privacy.back": "← Back to Exam System",
        "privacy.badge": "Privacy",
        "privacy.title": "Privacy Policy",
        "privacy.description":
            "Key information about how data is handled in the Exam System.",

        "privacy.pdf.title": "PDF files",
        "privacy.pdf.description":
            "In the current version, PDF files are processed directly in the user's browser.",

        "privacy.history.title": "Exam history",
        "privacy.history.description":
            "In the current version, exam history is stored locally in the user's browser.",

        "privacy.future.title": "Future changes",
        "privacy.future.description":
            "If accounts, servers or other online services are added to the system, this privacy policy will be updated to reflect those features.",

        "privacy.footer": "Exam System • Version 1.0",

        /* SUPPORT */
        "support.back": "← Back to Exam System",
        "support.badge": "Support",
        "support.title": "Technical Support",
        "support.description":
            "If you experience a problem with the system, complete the form below. Your request will be sent to technical support.",

        "support.name.label": "Full name",
        "support.name.placeholder": "Enter your full name",

        "support.email.label": "E-mail",
        "support.email.placeholder": "example@gmail.com",

        "support.category.label": "Problem type",
        "support.category.choose": "Select",
        "support.category.pdf": "PDF problem",
        "support.category.questions": "Question extraction",
        "support.category.exam": "Exam problem",
        "support.category.result": "Result problem",
        "support.category.website": "Website problem",
        "support.category.suggestion": "Suggestion",
        "support.category.other": "Other",

        "support.subject.label": "Subject",
        "support.subject.placeholder": "Briefly describe the problem",

        "support.message.label": "Request",
        "support.message.placeholder":
            "Describe the problem you encountered in detail...",

        "support.submit": "Send request",

        "support.success.title": "Request sent!",
        "support.success.description":
            "Your request has been successfully delivered to technical support. It will be reviewed as soon as possible.",
        "support.success.close": "Close",

        "support.footer": "Exam System • Version 1.0",

        "common.back": "Back"
    },


    /* =====================================================
       РУССКИЙ
    ===================================================== */

    ru: {

        /* APP */
        "app.name": "Система экзаменов",
        "app.description": "Автоматическое создание тестов из PDF",
        "app.version": "Версия 1.0",

        /* HERO */
        "hero.badge": "PDF → ЭКЗАМЕН",
        "hero.title": "Подготовьте экзамен",
        "hero.description":
            "Загрузите PDF, выберите тип экзамена, диапазон вопросов и время. Система автоматически подготовит экзамен.",

        /* PDF */
        "pdf.title": "Выберите PDF-файл",
        "pdf.subtitle": "Загрузите PDF-файл с экзаменационными вопросами",
        "pdf.touch": "Нажмите, чтобы выбрать PDF",
        "pdf.only": "Только PDF-файлы",
        "pdf.processing": "Анализ PDF...",
        "pdf.questionsPreparing": "Подготовка вопросов",

        /* EXAM TYPE */
        "type.title": "Тип экзамена",
        "type.subtitle": "Выберите количество вопросов в экзамене",
        "type.semester": "Семестр",
        "type.semesterCount": "50 вопросов",
        "type.colloquium": "Коллоквиум",
        "type.colloquiumCount": "30 вопросов",

        /* RANGE */
        "range.title": "Диапазон вопросов",
        "range.subtitle": "Выберите диапазон вопросов для экзамена",
        "range.start": "Первый вопрос",
        "range.end": "Последний вопрос",
        "range.startPlaceholder": "Например: 1",
        "range.endPlaceholder": "Например: 200",
        "range.info":
            "После загрузки PDF вы сможете выбрать диапазон вопросов.",

        /* TIME */
        "time.title": "Время экзамена",
        "time.subtitle": "Выберите продолжительность экзамена",

        /* EXAM */
        "exam.start": "Подготовить экзамен",
        "exam.label": "Экзамен",
        "exam.allQuestions": "Посмотреть все вопросы",
        "exam.questions": "Вопросы",
        "exam.previous": "← Назад",
        "exam.next": "Далее →",
        "exam.finish": "Завершить экзамен",

        /* PREPARATION */
        "preparation.badge": "Система экзаменов",
        "preparation.title": "Подготовка экзамена",
        "preparation.description": "Проверка вопросов...",
        "preparation.percent": "0%",

        /* RESULT */
        "result.completed": "Экзамен завершён",
        "result.successRate": "Процент успеха",
        "result.correct": "Правильно",
        "result.wrong": "Неправильно",
        "result.empty": "Без ответа",
        "result.restart": "Новый экзамен",
        "result.report": "Отчёт",
        "result.details": "Подробные результаты",

        /* HISTORY */
        "history.eyebrow": "Экзамены",
        "history.title": "История",
        "history.empty": "Экзаменов пока нет",
        "history.description":
            "Завершённые экзамены будут отображаться здесь.",

        /* MENU */
        "menu.home": "Главная",
        "menu.home.description": "Подготовить новый экзамен",

        "menu.history": "История экзаменов",
        "menu.history.description": "Посмотреть предыдущие результаты",

        "menu.about": "О системе",
        "menu.about.description": "Информация о системе",

        "menu.support": "Техподдержка",
        "menu.support.description": "Обратиться в техподдержку",

        "menu.guide": "Инструкция",
        "menu.guide.description": "Как пользоваться системой",

        "menu.privacy": "Конфиденциальность",
        "menu.privacy.description": "Защита данных и конфиденциальность",

        "menu.language": "Язык",

        /* FINISH MODAL */
        "modal.finish.title": "Завершить экзамен?",
        "modal.finish.description":
            "Возможно, у вас остались вопросы без ответа.",
        "modal.finish.cancel": "Продолжить",
        "modal.finish.confirm": "Завершить экзамен",

        /* ABOUT */
        "about.back": "← Вернуться к системе экзаменов",
        "about.badge": "О системе",
        "about.title": "Система экзаменов",
        "about.description":
            "Простая и быстрая платформа, которая автоматически анализирует тестовые вопросы в PDF-файлах и позволяет создавать индивидуальные экзамены.",

        "about.system.title": "Что делает система?",
        "about.system.description":
            "Система анализирует PDF-файл, определяет корректные вопросы и создаёт случайный экзамен из выбранного вами диапазона.",

        "about.personal.title": "Индивидуальный экзамен",
        "about.personal.description":
            "Вы можете создать семестровый экзамен из 50 вопросов или коллоквиум из 30 вопросов, а также самостоятельно выбрать диапазон вопросов и продолжительность экзамена.",

        "about.results.title": "Анализ результатов",
        "about.results.description":
            "После завершения экзамена система показывает количество правильных, неправильных и оставленных без ответа вопросов, процент результата и подробный отчёт.",

        "about.footer": "Система экзаменов • Версия 1.0",

        /* GUIDE */
        "guide.back": "← Вернуться к системе экзаменов",
        "guide.badge": "Инструкция",
        "guide.title": "Инструкция по использованию",
        "guide.description":
            "Создайте персональный экзамен из PDF-файла всего за несколько шагов.",

        "guide.step1.title": "Выберите PDF-файл",
        "guide.step1.description":
            "Загрузите PDF-файл с тестовыми вопросами и дождитесь завершения анализа.",

        "guide.step2.title": "Выберите тип экзамена",
        "guide.step2.description":
            "Выберите семестровый экзамен из 50 вопросов или коллоквиум из 30 вопросов.",

        "guide.step3.title": "Укажите диапазон вопросов",
        "guide.step3.description":
            "Например, если выбрать диапазон 100–250, система подготовит экзамен только из корректных вопросов в этом диапазоне.",

        "guide.step4.title": "Выберите время",
        "guide.step4.description":
            "Выберите подходящую продолжительность экзамена и приступайте к выполнению.",

        "guide.step5.title": "Проверьте результат",
        "guide.step5.description":
            "После завершения экзамена просмотрите процент результата и подробный отчёт по всем ответам.",

        "guide.footer": "Система экзаменов • Версия 1.0",

        /* PRIVACY */
        "privacy.back": "← Вернуться к системе экзаменов",
        "privacy.badge": "Конфиденциальность",
        "privacy.title": "Политика конфиденциальности",
        "privacy.description":
            "Основная информация об использовании данных в Системе экзаменов.",

        "privacy.pdf.title": "PDF-файлы",
        "privacy.pdf.description":
            "В текущей версии обработка PDF-файлов выполняется непосредственно в браузере пользователя.",

        "privacy.history.title": "История экзаменов",
        "privacy.history.description":
            "В текущей версии история экзаменов хранится локально в браузере пользователя.",

        "privacy.future.title": "Будущие изменения",
        "privacy.future.description":
            "Если в систему будут добавлены аккаунты, серверы или другие онлайн-сервисы, политика конфиденциальности будет обновлена с учётом этих функций.",

        "privacy.footer": "Система экзаменов • Версия 1.0",

        /* SUPPORT */
        "support.back": "← Вернуться к системе экзаменов",
        "support.badge": "Поддержка",
        "support.title": "Техническая поддержка",
        "support.description":
            "Если у вас возникла проблема с системой, заполните форму ниже. Ваше обращение будет отправлено в техническую поддержку.",

        "support.name.label": "Имя и фамилия",
        "support.name.placeholder": "Введите имя и фамилию",

        "support.email.label": "E-mail",
        "support.email.placeholder": "example@gmail.com",

        "support.category.label": "Тип проблемы",
        "support.category.choose": "Выберите",
        "support.category.pdf": "Проблема с PDF",
        "support.category.questions": "Извлечение вопросов",
        "support.category.exam": "Проблема с экзаменом",
        "support.category.result": "Проблема с результатом",
        "support.category.website": "Проблема с сайтом",
        "support.category.suggestion": "Предложение",
        "support.category.other": "Другое",

        "support.subject.label": "Тема",
        "support.subject.placeholder": "Кратко опишите проблему",

        "support.message.label": "Обращение",
        "support.message.placeholder":
            "Подробно опишите возникшую проблему...",

        "support.submit": "Отправить обращение",

        "support.success.title": "Обращение отправлено!",
        "support.success.description":
            "Ваше обращение успешно отправлено в техническую поддержку. Оно будет рассмотрено в ближайшее время.",
        "support.success.close": "Закрыть",

        "support.footer": "Система экзаменов • Версия 1.0",

        "common.back": "Назад"
    }

};

const LANGUAGE_STORAGE_KEY =
    "examSystemLanguage";

const DEFAULT_LANGUAGE =
    "az";



/*
========================================================
 GET SAVED LANGUAGE
========================================================
*/

function getSavedLanguage() {

    const savedLanguage =
        localStorage.getItem(
            LANGUAGE_STORAGE_KEY
        );


    if (
        savedLanguage &&
        translations[
            savedLanguage
        ]
    ) {

        return savedLanguage;

    }


    return DEFAULT_LANGUAGE;

}



/*
========================================================
 TRANSLATE
========================================================
*/

function translate(
    key,
    language
) {

    const selectedLanguage =
        language ||
        getSavedLanguage();


    const dictionary =
        translations[
            selectedLanguage
        ];


    if (
        dictionary &&
        Object.prototype
            .hasOwnProperty
            .call(
                dictionary,
                key
            )
    ) {

        return dictionary[
            key
        ];

    }


    /*
    AZ fallback
    */

    if (
        translations.az &&
        Object.prototype
            .hasOwnProperty
            .call(
                translations.az,
                key
            )
    ) {

        return translations.az[
            key
        ];

    }


    console.warn(
        `Tərcümə tapılmadı: ${key}`
    );


    return "";

}



/*
========================================================
 APPLY TEXT TRANSLATIONS
========================================================
*/

function applyTextTranslations(
    language
) {

    const elements =
        document.querySelectorAll(
            "[data-i18n]"
        );


    elements.forEach(
        element => {

            const key =
                element.getAttribute(
                    "data-i18n"
                );


            if (!key) {
                return;
            }


            const value =
                translate(
                    key,
                    language
                );


            if (
                value !== ""
            ) {

                element.textContent =
                    value;

            }

        }
    );

}



/*
========================================================
 APPLY PLACEHOLDERS
========================================================
*/

function applyPlaceholderTranslations(
    language
) {

    const elements =
        document.querySelectorAll(
            "[data-i18n-placeholder]"
        );


    elements.forEach(
        element => {

            const key =
                element.getAttribute(
                    "data-i18n-placeholder"
                );


            if (!key) {
                return;
            }


            const value =
                translate(
                    key,
                    language
                );


            if (
                value !== ""
            ) {

                element.setAttribute(
                    "placeholder",
                    value
                );

            }

        }
    );

}



/*
========================================================
 LANGUAGE BUTTONS
========================================================
*/

function updateLanguageButtons(
    language
) {

    const buttons =
        document.querySelectorAll(
            ".language-button[data-lang]"
        );


    buttons.forEach(
        button => {

            const buttonLanguage =
                button.dataset.lang;


            const isActive =
                buttonLanguage ===
                language;


            button.classList.toggle(
                "active",
                isActive
            );


            button.setAttribute(
                "aria-pressed",
                String(
                    isActive
                )
            );

        }
    );

}



/*
========================================================
 HTML LANGUAGE
========================================================
*/

function updateHtmlLanguage(
    language
) {

    document.documentElement.lang =
        language;

}



/*
========================================================
 DOCUMENT TITLE
========================================================
*/

function updateDocumentTitle(
    language
) {

    /*
    Səhifənin öz title açarı varsa
    əvvəl onu istifadə edirik.
    */

    const pageTitleKey =
        document.body
            ?.dataset
            ?.titleI18n;


    if (
        pageTitleKey
    ) {

        const pageTitle =
            translate(
                pageTitleKey,
                language
            );


        if (
            pageTitle
        ) {

            document.title =
                pageTitle;

            return;

        }

    }


    const appName =
        translate(
            "app.name",
            language
        );


    if (
        appName
    ) {

        document.title =
            appName;

    }

}



/*
========================================================
 SET LANGUAGE
========================================================
*/

function setLanguage(
    language
) {

    if (
        !translations[
            language
        ]
    ) {

        console.warn(
            "Dəstəklənməyən dil:",
            language
        );

        return;

    }


    /*
    Yadda saxla
    */

    localStorage.setItem(
        LANGUAGE_STORAGE_KEY,
        language
    );


    /*
    HTML lang
    */

    updateHtmlLanguage(
        language
    );


    /*
    Mətnlər
    */

    applyTextTranslations(
        language
    );


    /*
    Placeholder
    */

    applyPlaceholderTranslations(
        language
    );


    /*
    Dil düymələri
    */

    updateLanguageButtons(
        language
    );


    /*
    Browser title
    */

    updateDocumentTitle(
        language
    );


    /*
    Digər JS faylları
    */

    document.dispatchEvent(

        new CustomEvent(
            "languageChanged",
            {

                detail: {
                    language
                }

            }
        )

    );

}



/*
========================================================
 CURRENT LANGUAGE
========================================================
*/

function getCurrentLanguage() {

    return getSavedLanguage();

}



/*
========================================================
 GLOBAL t()
========================================================
*/

function t(
    key
) {

    return translate(
        key,
        getCurrentLanguage()
    );

}



/*
========================================================
 INITIALIZE
========================================================
*/

function initializeLanguageSystem() {

    const languageButtons =
        document.querySelectorAll(
            ".language-button[data-lang]"
        );


    /*
    BUTTON CLICK
    */

    languageButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const language =
                        button.dataset.lang;


                    if (
                        !language
                    ) {

                        return;

                    }


                    setLanguage(
                        language
                    );

                }
            );

        }
    );


    /*
    SAVED LANGUAGE
    */

    const initialLanguage =
        getSavedLanguage();


    setLanguage(
        initialLanguage
    );

}



/*
========================================================
 START
========================================================
*/

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeLanguageSystem
    );

} else {

    initializeLanguageSystem();

}



/*
========================================================
 GLOBAL ACCESS
========================================================
*/

window.examLanguage = {

    setLanguage,

    getCurrentLanguage,

    t,

    translate,

    translations

};