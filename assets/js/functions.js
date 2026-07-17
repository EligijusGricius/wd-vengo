
if($('select').length) {
    $('select').selectpicker();
}

document.addEventListener("DOMContentLoaded", function () {

    if(document.querySelector("[data-fancybox]")) {
        Fancybox.bind("[data-fancybox]", {});
    }

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
            direction: 'vertical',
            slidesPerView: 7,
            spaceBetween: 8,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            navigation: false,
            slideToClickedSlide: true,
    
            breakpoints: {
                0: {
                    slidesPerView: 3.2,
                    spaceBetween: 5,
                    direction: 'horizontal',
                },

                576: {
                    direction: 'horizontal',
                    slidesPerView: 5.5,
                    spaceBetween: 8,
                },
    
                992: {
                    direction: 'vertical',
                    slidesPerView: 6,
                    spaceBetween: 8,
                },

                1200: {
                    direction: 'vertical',
                    slidesPerView: 7,
                    spaceBetween: 8,
                },
            }
        });
    
        const mainSwiper = new Swiper('.product-images .swiper-container-main', {
            spaceBetween: 10,
            loop: true,
            navigation: {
                nextEl: '.product-images .swiper-button-next',
                prevEl: '.product-images .swiper-button-prev',
            },
            thumbs: {
                swiper: thumbnailSwiper
            }
        });
    
        // Handle click on thumbnails to sync main swiper and move thumbnails
        thumbnailSwiper.on('click', function () {
            // Check if window size is greater than 1200px
            if (window.innerWidth > 575) {
                const clickedIndex = thumbnailSwiper.clickedIndex;
    
                if (clickedIndex !== undefined) {
                    // Move the main swiper to the clicked thumbnail
                    mainSwiper.slideToLoop(clickedIndex);
    
                    // Move thumbnail swiper to keep the selected thumbnail visible
                    thumbnailSwiper.slideTo(Math.max(0, clickedIndex - 1));
                }
            }
        });
    
        // Ensure thumbnails stay in sync when main swiper changes
        mainSwiper.on('slideChange', function () {
            if (window.innerWidth > 575) {
                const currentMainIndex = mainSwiper.realIndex;
                thumbnailSwiper.slideTo(currentMainIndex);
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

        /* Scoped Search with "Nothing found" message */

    const sidebarWidgets = document.querySelectorAll('.sidebar .widget');

    sidebarWidgets.forEach(widget => {
        const searchField = widget.querySelector('.search-filter');
        const filterList = widget.querySelector('ul[class*="filter-list"]');

        if (searchField && filterList) {
            const listItems = filterList.querySelectorAll('li');

            let noResults = widget.querySelector('.no-results-message');

            if (!noResults) {
                noResults = document.createElement('div');
                noResults.className = 'no-results-message';
                noResults.textContent = 'Nekas netika atrasts.'; 
                noResults.style.display = 'none'; 
                noResults.style.padding = '10px 0';
                noResults.style.color = '#707070';
                
                filterList.parentNode.insertBefore(noResults, filterList.nextSibling);
            }

            searchField.addEventListener('input', function() {
                const query = this.value.toLowerCase().trim();
                let hasMatches = false;

                listItems.forEach(li => {
                    const text = li.textContent.toLowerCase();

                    if (text.includes(query)) {
                        li.style.display = ""; 
                        hasMatches = true; 
                    } else {
                        li.style.display = "none";
                    }
                });


                if (!hasMatches && query !== "") {
                    noResults.style.display = "block";
                } else {
                    noResults.style.display = "none";
                }
            });
        }
    });

    /* Widget Accordion Toggle with Animation */

    const widgets = document.querySelectorAll('.sidebar .widget');

    if (widgets.length > 0) {
        widgets.forEach(widget => {
            const title = widget.querySelector('.widget-title');
            const content = widget.querySelector('.widget__content');

            if (title && content) {
                content.style.maxHeight = content.scrollHeight + "px";

                title.addEventListener('click', () => {
                    widget.classList.toggle('close');

                    if (widget.classList.contains('close')) {
                        content.style.maxHeight = "0px";
                        content.style.opacity = "0";
                    } else {
                        content.style.maxHeight = content.scrollHeight + "px";
                        content.style.opacity = "1";
                    }
                });
            }
        });
    }

    /* Widget filter list "Show more" button */

    document.querySelectorAll('.wc-filter-list').forEach(list => {
        const hasLogos = list.querySelector('.link-logo');
        const hasSearch = list.closest('.widget__content')?.querySelector('.search-filter');

        if (hasLogos || hasSearch) return;

        const visibleCount = 4;
        const batchSize = 5;
        const items = Array.from(list.children);

        if (items.length <= visibleCount) return;

        items.forEach((item, index) => {
            if (index >= visibleCount) item.hidden = true;
        });

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'wc-filter-list__more';
        list.insertAdjacentElement('afterend', button);

        const updateButton = () => {
            const hiddenItems = items.filter(item => item.hidden);

            if (hiddenItems.length === 0) {
                button.remove();
                return;
            }

            const nextBatch = Math.min(batchSize, hiddenItems.length);
            button.textContent = `+ Parādīt vēl ${nextBatch}`;
        };

        button.addEventListener('click', () => {
            const hiddenItems = items.filter(item => item.hidden);
            hiddenItems.slice(0, batchSize).forEach(item => item.hidden = false);
            updateButton();
        });

        updateButton();
    });

    /* Mobile filters toggle */

    document.querySelector('.toolbar .toolbar__filter-toggle')?.addEventListener('click', () => {
        document.body.classList.add('show-mobile-filters');
    });

    document.querySelector('.sidebar .close-sidebar')?.addEventListener('click', () => {
        document.body.classList.remove('show-mobile-filters');
    });


    /* Delivery accordion toggle */

    document.querySelectorAll('.delivery-accordion__item').forEach(item => {
        const head = item.querySelector('.delivery-accordion__head');

        head.addEventListener('click', () => {
            item.classList.toggle('delivery-accordion__item--open');
        });
    });
    
});
