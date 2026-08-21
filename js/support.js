"use strict";

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const form =
            document.getElementById(
                "supportForm"
            );

        const submitButton =
            document.getElementById(
                "supportSubmit"
            );

        const successModal =
            document.getElementById(
                "supportSuccessModal"
            );

        const successClose =
            document.getElementById(
                "supportSuccessClose"
            );


        if (!form) {
            return;
        }


        /*
        =========================
        MODALI AÇ
        =========================
        */

        function openSuccessModal() {

            successModal?.classList.add(
                "open"
            );

            successModal?.setAttribute(
                "aria-hidden",
                "false"
            );

            document.body.style.overflow =
                "hidden";
        }


        /*
        =========================
        MODALI BAĞLA
        =========================
        */

        function closeSuccessModal() {

            successModal?.classList.remove(
                "open"
            );

            successModal?.setAttribute(
                "aria-hidden",
                "true"
            );

            document.body.style.overflow =
                "";
        }


        successClose?.addEventListener(
            "click",
            closeSuccessModal
        );


        successModal?.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    successModal
                ) {
                    closeSuccessModal();
                }

            }
        );


        document.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Escape"
                ) {
                    closeSuccessModal();
                }

            }
        );


        /*
        =========================
        FORM GÖNDƏR
        =========================
        */

        form.addEventListener(
            "submit",
            async event => {

                event.preventDefault();


                if (!form.checkValidity()) {

                    form.reportValidity();

                    return;
                }


                const originalText =
                    submitButton.textContent;


                submitButton.disabled =
                    true;

                submitButton.textContent =
                    "Göndərilir...";


                try {

                    const formData =
                        new FormData(form);


                    const response =
                        await fetch(
                            "https://formspree.io/f/xzepogva",
                            {
                                method: "POST",

                                body: formData,

                                headers: {
                                    "Accept":
                                        "application/json"
                                }
                            }
                        );


                    if (!response.ok) {

                        throw new Error(
                            "Göndərilmə xətası"
                        );
                    }


                    /*
                    =========================
                    UĞURLU
                    =========================
                    */

                    form.reset();

                    openSuccessModal();


                } catch (error) {

                    console.error(
                        "Support xətası:",
                        error
                    );


                    alert(
                        "Müraciət göndərilmədi. İnternet bağlantısını yoxlayıb yenidən cəhd edin."
                    );


                } finally {

                    submitButton.disabled =
                        false;

                    submitButton.textContent =
                        originalText;
                }

            }
        );

    }
);