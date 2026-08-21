"use strict";

/*
========================================================
 SIDE MENU
========================================================
*/

document.addEventListener("DOMContentLoaded", function () {

    const menuButton =
        document.getElementById("menuButton");

    const sideMenu =
        document.getElementById("sideMenu");

    const menuOverlay =
        document.getElementById("menuOverlay");

    const closeMenuButton =
        document.getElementById("closeMenuButton");

    const menuHomeButton =
        document.getElementById("menuHomeButton");

    const menuHistoryButton =
        document.getElementById("menuHistoryButton");


    /*
    ========================================================
    DEBUG
    ========================================================
    */

    console.log("MENU SYSTEM LOADED");

    console.log({
        menuButton,
        sideMenu,
        menuOverlay,
        closeMenuButton
    });


    /*
    ========================================================
    OPEN MENU
    ========================================================
    */

    function openMenu() {

        if (!sideMenu) {
            console.error(
                "sideMenu tapılmadı."
            );

            return;
        }

        sideMenu.classList.add(
            "open"
        );

        menuOverlay?.classList.add(
            "open"
        );

        sideMenu.setAttribute(
            "aria-hidden",
            "false"
        );

        menuButton?.setAttribute(
            "aria-expanded",
            "true"
        );

        document.body.classList.add(
            "menu-open"
        );

    }


    /*
    ========================================================
    CLOSE MENU
    ========================================================
    */

    function closeMenu() {

        sideMenu?.classList.remove(
            "open"
        );

        menuOverlay?.classList.remove(
            "open"
        );

        sideMenu?.setAttribute(
            "aria-hidden",
            "true"
        );

        menuButton?.setAttribute(
            "aria-expanded",
            "false"
        );

        document.body.classList.remove(
            "menu-open"
        );

    }


    /*
    ========================================================
    MENU BUTTON
    ========================================================
    */

    if (menuButton) {

        menuButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();

                console.log(
                    "MENU BUTTON CLICKED"
                );

                openMenu();

            }
        );

    } else {

        console.error(
            "menuButton tapılmadı."
        );

    }


    /*
    ========================================================
    CLOSE BUTTON
    ========================================================
    */

    closeMenuButton?.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            closeMenu();

        }
    );


    /*
    ========================================================
    OVERLAY
    ========================================================
    */

    menuOverlay?.addEventListener(
        "click",
        closeMenu
    );


    /*
    ========================================================
    ESC
    ========================================================
    */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape"
            ) {

                closeMenu();

            }

        }
    );


    /*
    ========================================================
    HOME
    ========================================================
    */

    menuHomeButton?.addEventListener(
        "click",
        function () {

            closeMenu();

        }
    );


    /*
    ========================================================
    HISTORY
    ========================================================
    */

    menuHistoryButton?.addEventListener(
        "click",
        function () {

            closeMenu();

        }
    );

});