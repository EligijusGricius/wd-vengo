
if($('select').length) {
    $('select').selectpicker();
}

document.addEventListener("DOMContentLoaded", function () {

    Fancybox.bind("[data-fancybox]", {
    // Your custom options
    });

    /* Header on scroll */

    const masthead = document.getElementById("masthead");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 200) {
            masthead.classList.add("on-scroll");
        } else {
            masthead.classList.remove("on-scroll");
        }
    });

    /* Mobile toggle btn */

    const menuToggle = document.querySelector('#masthead .menu-toggle');
        
    if (menuToggle) {
        menuToggle.addEventListener('click', function (e) {
            document.documentElement.classList.toggle('mobile-nav-open');
            this.classList.toggle('opened');

            e.preventDefault();
        });
    }

    /* Hero swiper */

    document.querySelectorAll('.home-hero').forEach(holder => {
        const swiperContainer = holder.querySelector('.swiper');

        if (swiperContainer) {
            new Swiper(swiperContainer, {
                slidesPerView: 1,
                spaceBetween: 20,
                loop: false, 
                pagination: {
                    el: holder.querySelector(".swiper-pagination"),
                    clickable: true,
                },
                navigation: {
                    nextEl: holder.querySelector(".swiper-button-next"),
                    prevEl: holder.querySelector(".swiper-button-prev"),
                }
            });
        }
    });  


    /* Mobile menu dropdowns */

    const menuLinks = document.querySelectorAll(`
        .site-header #site-navigation .menu-item-has-children > a, 
        .site-header #site-navigation .has-children > a
    `);

    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (window.innerWidth < 1121) {
                
                const parentLi = this.parentElement;
                const dropdown = parentLi.querySelector('.dropdown-menu, .submenu');

                if (dropdown) {
                    e.preventDefault();
                    e.stopPropagation(); 
                    
                    toggleDropdown(dropdown, parentLi);
                }
            }
        });
    });

    function toggleDropdown(element, parent) {
        if (!element.classList.contains('is-open')) {
            parent.classList.add('opened'); 

            element.style.display = 'block';
            element.style.overflow = 'hidden';

            element.animate([
                { height: '0px', opacity: 0 },
                { height: element.scrollHeight + 'px', opacity: 1 }
            ], {
                duration: 350,
                easing: 'ease-out'
            }).onfinish = () => {
                element.classList.add('is-open');
                element.style.height = 'auto'; 
            };
        } else {
            parent.classList.remove('opened'); 

            element.animate([
                { height: element.scrollHeight + 'px', opacity: 1 },
                { height: '0px', opacity: 0 }
            ], {
                duration: 300,
                easing: 'ease-in'
            }).onfinish = () => {
                element.classList.remove('is-open');
                element.style.display = 'none';
                element.style.height = '0px';
            };
        }
    }

   /* Dropdown menu border radius handling */

    const menuList = document.querySelector('.site-header #site-navigation #primary-menu-list');

    if (menuList) {
        menuList.addEventListener('mouseover', (e) => {
            const link = e.target.closest('a');

            if (!link) return;

            const categoryItem = link.closest('.dropdown-menu__categories > li');
            const dropdownMenu = link.closest('.dropdown-menu');

            if (dropdownMenu && categoryItem) {
                if (categoryItem.classList.contains('has-children')) {
                    dropdownMenu.classList.add('no-border-radius');
                } else {
                    dropdownMenu.classList.remove('no-border-radius');
                }
            }
        });

        // Papildomai: nuimame klasę, kai pelė visiškai palieka pagrindinį meniu
        menuList.addEventListener('mouseleave', () => {
            const openDropdowns = document.querySelectorAll('.dropdown-menu.no-border-radius');
            openDropdowns.forEach(menu => menu.classList.remove('no-border-radius'));
        });
    }

    /* Header Search Toggle and Scroll Logic */

    const searchToggle = document.querySelector('.site-header .wd-header-search__toggle');
    const searchParent = document.querySelector('.wd-header-search');

    if (searchToggle && searchParent) {
        // Handle the click event to toggle the search form
        searchToggle.addEventListener('click', function(e) {
            e.preventDefault();
            searchParent.classList.toggle('show-form');
        });

        // Remove the 'show-form' class when the user scrolls
        window.addEventListener('scroll', function() {
            if (searchParent.classList.contains('show-form')) {
                searchParent.classList.remove('show-form');
            }
        }, { passive: true }); // Using passive for better scroll performance
    }

    /* Products swiper */

    document.querySelectorAll('.products-swiper .swiper-holder').forEach(holder => {
        const swiperContainer = holder.querySelector('.swiper');

        if (swiperContainer) {
            const isGrid = swiperContainer.classList.contains('swiper--grid');

            const swiperConfig = {
                slidesPerView: 4,
                spaceBetween: 20,
                loop: false,
                pagination: false,
                navigation: {
                    nextEl: holder.querySelector(".swiper-button-next"),
                    prevEl: holder.querySelector(".swiper-button-prev"),
                },
                breakpoints: {
                    0: {
                        slidesPerView: 2,
                        spaceBetween: 8,

                        scrollbar: {
                            el: holder.querySelector(".swiper-scrollbar"),
                            draggable: true,
                        },
                    },

                    768: {
                        slidesPerView: 3,
                        spaceBetween: 15,
                    },

                    992: {
                        scrollbar: false,
                    },

                    1200: {
                        slidesPerView: 5,
                        spaceBetween: 20,
                    },
                }
            };

            if (isGrid) {
                swiperConfig.grid = { rows: 2, fill: 'row' };
                Object.values(swiperConfig.breakpoints).forEach(bp => {
                    bp.grid = { rows: 2, fill: 'row' };
                });
            }

            new Swiper(swiperContainer, swiperConfig);
        }
    });

    /* Logo swiper */

    document.querySelectorAll('.logo-swiper .swiper').forEach(swiperContainer => {
        if (swiperContainer) {
            new Swiper(swiperContainer, {
                slidesPerView: 5,
                spaceBetween: 20,
                loop: false,
                pagination: false,
                navigation: {
                    nextEl: swiperContainer.closest('.logo-swiper').querySelector(".swiper-button-next"),
                    prevEl: swiperContainer.closest('.logo-swiper').querySelector(".swiper-button-prev"),
                },

                breakpoints: {
                    0: {
                        slidesPerView: 2.1,
                        spaceBetween: 6.5,
                    },

                    768: {
                        slidesPerView: 3.1,
                        spaceBetween: 6.5,
                    },

                    992: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },

                    1200: {
                        slidesPerView: 5,
                    },
                }
            });
        }
    });

    /* --- Quantity Selector Logic --- */

    const quantityContainers = document.querySelectorAll('.quantity');

    quantityContainers.forEach(container => {
        const input = container.querySelector('.input-text.qty');
        const plusBtn = container.querySelector('.plus');
        const minusBtn = container.querySelector('.minus');

        if (input && plusBtn && minusBtn) {
            // Handle plus button click
            plusBtn.addEventListener('click', () => {
                input.stepUp();
                input.dispatchEvent(new Event('change', { bubbles: true }));
            });

            // Handle minus button click
            minusBtn.addEventListener('click', () => {
                const min = parseFloat(input.getAttribute('min')) || 1;
                const currentValue = parseFloat(input.value) || 0;

                // Prevent decreasing below the minimum value
                if (currentValue > min) {
                    input.stepDown();
                    input.dispatchEvent(new Event('change', { bubbles: true }));
                }
            });

            // Validation: reset to minimum if user types an invalid number manually
            input.addEventListener('blur', function() {
                const min = parseFloat(this.getAttribute('min')) || 1;
                if (parseFloat(this.value) < min || this.value === "") {
                    this.value = min;
                    this.dispatchEvent(new Event('change', { bubbles: true }));
                }
            });
        }
    });

    /* Single product gallery */

    if (document.querySelector('.single-product-page .product-images')) {
        const thumbnailSwiper = new Swiper('.single-product-page .swiper-container-thumbs', {
            slidesPerView: 6,
            spaceBetween: 8,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            navigation: false,
            slideToClickedSlide: true,
    
            breakpoints: {
                0: {
                    slidesPerView: 6,
                    spaceBetween: 8,
                },

                610: {
                    slidesPerView: 8,
                    spaceBetween: 8,
                },

                992: {
                    slidesPerView: 6,
                    spaceBetween: 8,
                },
            }
        });
    
        const mainSwiper = new Swiper('.product-images .swiper-container-main', {
            spaceBetween: 10,
            loop: true,
            navigation: {
                nextEl: '.single-product-page .swiper-button-next',
                prevEl: '.single-product-page .swiper-button-prev',
            },
            thumbs: {
                swiper: thumbnailSwiper
            }
        });
    
    }
    
    /* /Single product gallery */


    /* Phone prefix */

    const phoneInputs = document.querySelectorAll(".phone");

    if (phoneInputs.length > 0) {
        phoneInputs.forEach(phoneInput => {
            window.intlTelInput(phoneInput, {
                initialCountry: "lv",
                preferredCountries: ["lv", "lt", "ee"],
                separateDialCode: false,
                showSelectedDialCode: false,
                loadUtils: () => import("/intl-tel-input/js/utils.js?1758116186324"),
                i18n: {
                    searchPlaceholder: "Meklēt...",
                }
            });
        });
    }

    /* Show/hide password toggle */

    const passwordToggles = document.querySelectorAll('.show-password-input');

    if (passwordToggles.length > 0) {
        passwordToggles.forEach(toggle => {
            toggle.addEventListener('click', () => {
            const input = toggle.previousElementSibling;

            if (input && input.tagName === 'INPUT') {
                input.type = input.type === 'password' ? 'text' : 'password';
                toggle.classList.toggle('active');
            }
            });
        });
    }

    /* Header mini cart toggle */

    const cartTrigger = document.querySelector('#masthead .buttons__cart');
    const cartWidget = document.querySelector('.cart-widget-side');
    const closeTrigger = document.querySelector('.cart-widget-side .close-side-widget');
    const body = document.body;

    if (cartTrigger && cartWidget) {
        cartTrigger.addEventListener('click', (e) => {
            e.preventDefault(); 
            cartWidget.classList.add('wc-opened');
            body.classList.add('mini-cart-opened');
        });
    }

    if (closeTrigger && cartWidget) {
        closeTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            cartWidget.classList.remove('wc-opened');
            body.classList.remove('mini-cart-opened');
        });
    }

    /* Related products swiper */

    document.querySelectorAll('.related-products-swiper .swiper-holder').forEach(holder => {
        const swiperContainer = holder.querySelector('.swiper');
        
        if (swiperContainer) {
            new Swiper(swiperContainer, {
                slidesPerView: 4,
                spaceBetween: 20,
                loop: false,
                pagination: {
                    el: holder.querySelector(".swiper-pagination"),
                    clickable: true,
                },
                breakpoints: {
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },

                    480: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },


                    768: {
                        slidesPerView: 3,
                    },
                    
                    1200: {
                        slidesPerView: 4,
                    },
                }
            });
        }
    });

    /* Products tabs */

    const productsTabs = document.querySelectorAll('.products-tabs__tab');

    productsTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = document.querySelector(tab.dataset.tabTarget);
            if (!target) return;

            productsTabs.forEach(t => t.classList.remove('products-tabs__tab--active'));
            document.querySelectorAll('.products-tabs__pane').forEach(p => p.classList.remove('products-tabs__pane--active'));

            tab.classList.add('products-tabs__tab--active');
            target.classList.add('products-tabs__pane--active');
        });
    });

    /* Product tabs mobile toggle */

    document.querySelectorAll('.product-tabs__mobile-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            const pane = btn.closest('.product-tabs__pane');
            pane.classList.toggle('product-tabs__pane--active');
        });
    });

    /* Posts swiper */

    if (document.querySelector('.posts-swiper')) {
        document.querySelectorAll('.posts-swiper').forEach(swiperContainer => {
            new Swiper(swiperContainer, {
                slidesPerView: 4,
                spaceBetween: 20,
                loop: true,
                pagination: {
                    el: swiperContainer.querySelector(".swiper-pagination"),
                    clickable: true,
                },
                breakpoints: {
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },

                    480: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },


                    768: {
                        slidesPerView: 3,
                    },

                    992: {
                        slidesPerView: 3,
                        pagination: false,
                    },
                    
                    1200: {
                        slidesPerView: 4,
                    },
                }
            });
        });
    }

    /* Social media swiper */

    if (document.querySelector('.social-media-swiper')) {
        document.querySelectorAll('.social-media-swiper').forEach(swiperContainer => {
            new Swiper(swiperContainer, {
                slidesPerView: 4,
                spaceBetween: 20,
                loop: false,
                pagination: {
                    el: swiperContainer.querySelector(".swiper-pagination"),
                    clickable: true,
                },
                breakpoints: {
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },

                    390: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },

                    576: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },


                    769: {
                        slidesPerView: 4,
                    },
                    
                    1200: {
                        slidesPerView: 5,
                    },
                }
            });
        });
    }

    /* Header mobile search toggle */

    const mobileSearchToggle = document.querySelector('.site-header .mobile-search-toggle');

    if (mobileSearchToggle) {
        mobileSearchToggle.addEventListener('click', function(e) {
            e.preventDefault();
            const searchForm = document.querySelector('.site-header .wd-header-search');

            if (searchForm) {
                searchForm.classList.toggle('show-form');
            }
        });

        //on scroll, hide the search form if it's open
        window.addEventListener('scroll', function() {
            const searchForm = document.querySelector('.site-header .wd-header-search');
            if (searchForm && searchForm.classList.contains('show-form')) {
                searchForm.classList.remove('show-form');
            }
        }, { passive: true });
    }

    /* Footer widget titles toggle on mobile */

    const footerTitles = document.querySelectorAll('#main-footer .widget-title');

    footerTitles.forEach(title => {
        title.addEventListener('click', () => {
            if (window.innerWidth < 769) {
                const parent = title.closest('.menu-col');
                
                if (parent) {
                    parent.classList.toggle('opened');
                }
            }
        });
    });
});
