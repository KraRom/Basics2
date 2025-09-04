document.addEventListener("DOMContentLoaded", () => {
    // --- Swiper ---
    let brandSwiper;
    function initSwiper() {
        if (window.innerWidth < 768 && !brandSwiper) {
            brandSwiper = new Swiper(".services__brand-swiper", {
                wrapperClass: "services__swiper-wrapper",
                slideClass: "services__swiper-slide",
                slidesPerView: "auto",
                spaceBetween: 16,
                pagination: {
                    el: ".services__pagination",
                    clickable: true,
                }
            });
        } else if (window.innerWidth >= 768 && brandSwiper) {
            brandSwiper.destroy(true, true);
            brandSwiper = null;
        }
    }
    initSwiper();
    window.addEventListener("resize", initSwiper);

    // --- Кнопка "Показать все" ---
    const toggleBtn = document.querySelector('.services__brand-toggle');
    const brandList = document.querySelector('.services__swiper-wrapper');
    if (toggleBtn) {
        const textSpan = toggleBtn.querySelector('.services__brand-toggle-text');
        toggleBtn.addEventListener('click', () => {
            brandList.classList.toggle('services__swiper-wrapper--expanded');
            toggleBtn.classList.toggle('services__brand-toggle--active');
            textSpan.textContent = brandList.classList.contains('services__swiper-wrapper--expanded')
                ? 'Скрыть'
                : 'Показать все';
        });
    }

    // --- Подсветка в sidebar ---
    const menu = document.querySelector(".sidebar__menu");
    const menuItems = document.querySelectorAll(".sidebar__menu-button");
    const highlight = document.querySelector(".sidebar__highlight");

    let activeBtn = null;

    function moveHighlight(button) {
        highlight.style.top = button.offsetTop + "px";
        highlight.style.height = button.offsetHeight + "px";
    }

    if (menuItems.length && highlight) {
        // начально ставим на первую кнопку
        activeBtn = menuItems[0];
        activeBtn.classList.add("sidebar__menu-button_active");
        moveHighlight(activeBtn);

        // клик — фиксируем активную
        menuItems.forEach(btn => {
            btn.addEventListener("click", () => {
                menuItems.forEach(b => b.classList.remove("sidebar__menu-button_active"));
                btn.classList.add("sidebar__menu-button_active");
                activeBtn = btn;
                moveHighlight(activeBtn);
            });
        });

        // при движении мыши внутри всего меню
        menu.addEventListener("mousemove", (e) => {
            if (e.target.classList.contains("sidebar__menu-button")) {
                moveHighlight(e.target);
            }
        });

        // когда курсор вышел за пределы всего меню — вернуть полоску на активную
        menu.addEventListener("mouseleave", () => {
            if (activeBtn) moveHighlight(activeBtn);
        });
    }
});