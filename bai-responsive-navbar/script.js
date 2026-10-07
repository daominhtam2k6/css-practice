document.addEventListener("DOMContentLoaded", function () {

    const menuIcon = document.querySelector(".menu-icon");
    const navLinks = document.querySelector(".nav-links");

    menuIcon.addEventListener("click", function () {

        navLinks.classList.toggle("active");

        const isOpen = navLinks.classList.contains("active");

        menuIcon.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

        menuIcon.textContent = isOpen ? "✕" : "☰";
    });

    /* Dong menu khi click vao lien ket tren mobile */
    const links = document.querySelectorAll(".nav-links a");

    links.forEach(function (link) {

        link.addEventListener("click", function () {

            navLinks.classList.remove("active");

            menuIcon.setAttribute(
                "aria-expanded",
                "false"
            );

            menuIcon.textContent = "☰";
        });

    });

});
