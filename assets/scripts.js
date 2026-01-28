(function ($, root, undefined) {
    $(function () {

        $('.phone-nav').click(function () {
            $("body").toggleClass("navShown");
        });


        
        var headerD = new Headroom(document.querySelector('.header-section'), {
            classes: {
                initial: 'headroom',
                pinned: 'slidedown',
                unpinned: 'slideup'
            }
        });
        headerD.init();


        
        // Function to animate <a> elements within the newly active .mega-menu-item-child
        function triggerAnimationOnNewActive(newActiveElement) {
          let links = newActiveElement.find('a');
          
          if (links.length > 0) {
              gsap.fromTo(links,
                  {
                      scale: 1.1,
                      opacity: 0
                  },
                  {
                      scale: 1,
                      opacity: 1,
                      duration: 0.5,
                      stagger: 0.2,
                      ease: "back.out(1.7)"
                  }
              );
          }
        }

        // Track the currently active index to prevent redundant animations
        let currentActiveIndex = 0;

        // Monitor `mouseenter` and `mouseleave` on .mega-menu-item to set active class and trigger animation
        $('.mega-menu-item').on('mouseenter', function() {
          let index = $(this).index('.mega-menu-item');

          // Remove the 'active' class from all items, then add it to the currently hovered item
          $('.mega-menu-item').removeClass('active');
          $(this).addClass('active');
          
          if (index !== currentActiveIndex) {
              currentActiveIndex = index;
              
              // Remove 'active' from all child items, then add it to the current index
              $('.mega-menu-item-child').removeClass('active');
              let newActiveElement = $('.mega-menu-item-child').eq(index).addClass('active');
              
              // Trigger the animation only on the newly active element
            //   triggerAnimationOnNewActive(newActiveElement);
          }
        });

        if ($(window).width() > 1023) {
            $('.has-sub-menu-item').on('mouseenter', function() {
                $(this).find('.sub-menu').stop(true, true).slideDown(300);
                $('body').addClass('subMenuShown');
              }).on('mouseleave', function() {
                $(this).find('.sub-menu').stop(true, true).slideUp(300);
                $('body').removeClass('subMenuShown');
              });

        }

        if ($(window).width() < 1024) {
          if ($('.upsell-slider').length) {
              $(".filter-options").hide();
              
              const selectedMain = $(".selected > a").text();
              const selectedChild = $(".selected .selected-child > a").text();
              if (selectedMain || selectedChild) {
                  $(".selected-option").text(selectedChild || selectedMain);
              }
      
              $(".selected-option").on("click", function() {
                  $(this).toggleClass('active');
                  $(".filter-options").slideToggle();
              });
              $(".has-nested > a").on("click", function(e) {
                e.preventDefault();
              });
              $(".main-option").on("click", function(e) {
                  const parentLi = $(this).parent();
                  
                  // Only prevent default behavior and toggle nested items if there are nested options
                  if (parentLi.hasClass("has-nested")) {
                      e.preventDefault();
                      parentLi.find(".nested").slideToggle();
                  }
      
                  $(".selected").removeClass("selected");
                  parentLi.addClass("selected");
                  $(".selected-option").text($(this).text());
      
                  $(".selected-child").removeClass("selected-child");
      
                  $(".filter-options").slideUp();
                  $(".selected-option").removeClass('active');
              });
      
              $(".sub-option").on("click", function(e) {
                  $(".selected-option").removeClass('active');
                  // e.preventDefault();
      
                  $(".selected-child").removeClass("selected-child");
                  $(this).parent().addClass("selected-child");
                  $(".selected-option").text($(this).text());
      
                  $(".filter-options").slideUp();
              });
          }
      }
      

        
       
        

        const preloadImages = (selector = 'img') => {
            return new Promise((resolve) => {
            imagesLoaded(document.querySelectorAll(selector), resolve);
            });
        };
    
        preloadImages();

        
        if ($('.marquee-slider').length) {
          var logoSlider = new Swiper('.marquee-slider', {
              loop: true,
              slidesPerView: 'auto',
              speed: 4000,
              allowTouchMove: false,
              autoplay: {
                  delay: 1,  // Autoplay delay for a continuous scrolling effect
              },
              spaceBetween: 38,
          });
        }

        if ($('.product-slider').length) {
          var productSlider = new Swiper('.product-slider', {
              loop: true,
              slidesPerView: 1.33,
              spaceBetween: 20,
              breakpoints: {
                  640: {
                      slidesPerView: 2,
                      spaceBetween: 20,
                  },
                  1024: {
                      slidesPerView: 3.03,
                      spaceBetween: 60,
                      shortSwipes:false,
                      navigation: {
                          nextEl: ".swiper-button-next",
                          prevEl: ".swiper-button-prev",
                      }
                  }
              }
          });
        }

        if ($('.upsell-slider').length) {
          var upselltSlider = new Swiper('.upsell-slider', {
            'onInit': function(){
                if ( upselltSlider.slides.length > 2 ) {
                  this.loop = false
                }
              },
              loop: false,
              slidesPerView: 1.23,
              spaceBetween: 16,
              shortSwipes:true,
              paginationClickable: true,
              pagination: {
              el: ".swiper-pagination",
              clickable: true
              }
          });
        }


        if ($(window).width() < 1024) {

          if ($('.mobile-marquee-slider').length) {

            var mlogoSlider = new Swiper('.mobile-marquee-slider', {
                loop: true,
                slidesPerView: 'auto',
                speed: 5000,
                allowTouchMove: false,
                autoplay: {
                    delay: 1,  // Autoplay delay for a continuous scrolling effect
                },
                spaceBetween: 38,
            });

          }

          if ($('.featured-product-grid').length) {

            var fproductSlider = new Swiper('.featured-product-grid', {
                loop: false,
                slidesPerView: 1.22,
                spaceBetween: 20,
                breakpoints: {
                    640: {
                        slidesPerView: 2.22
                    },
                }
            });
          }
            
        }



        if ($('.product-featured-images').length) {

          var productThumb = new Swiper(".product-image-thumbnails", {
            spaceBetween: 12,
            slidesPerView: "auto",
            freeMode: true,
            watchSlidesProgress: true,
          });
          var productFeatured = new Swiper(".product-featured-images", {
            spaceBetween: 10,
            thumbs: {
              swiper: productThumb,
            },
          });

        }

        // var socialmarqueeSlider = new Swiper('.social-marquee-slider', {
        //     loop: true,
        //     slidesPerView: 'auto',
        //     speed: 3500,
        //     allowTouchMove: false,
        //     autoplay: {
        //         delay: 1,  // Autoplay delay for a continuous scrolling effect
        //     },
        // });


        if ($('.trust-marquee-slider').length) {

          function initializeTestimonialMarqueeSlider() {
              if ($(window).width() < 1024) {
                  return new Swiper('.trust-marquee-slider', {
                      loop: true,
                      slidesPerView: 1,
                      spaceBetween: 24,
                      navigation: {
                          nextEl: ".swiper-button-next",
                          prevEl: ".swiper-button-prev",
                      },
                      breakpoints: {
                          640: {
                              slidesPerView: 2
                          },
                      }
                  });
              } else {
                  return new Swiper('.trust-marquee-slider', {
                      loop: true,
                      slidesPerView: 'auto',
                      speed: 7000,
                      allowTouchMove: false,
                      autoplay: {
                          delay: 1,  // Autoplay delay for a continuous scrolling effect
                      }
                  });
              }
          }

          var testimonialmarqueeSlider = initializeTestimonialMarqueeSlider();

          $(window).resize(function() {
              testimonialmarqueeSlider.destroy(true, true);
              testimonialmarqueeSlider = initializeTestimonialMarqueeSlider();
          });
        }

        


        var insta = new Swiper('.social-marquee-slider', {
            loop: true,
            slidesPerView: 'auto',
            speed: 5000,
            allowTouchMove: false,
            autoplay: {
                delay: 1,  // Autoplay delay for a continuous scrolling effect
            }
        });

                // Ensure GSAP and ScrollTrigger are available

        // var $container = $('.scroll-fixed-marquee');

        // if ($container.length) {
        //     var maxScrollLeft = $container[0].scrollWidth - $container.outerWidth();
        //     var speedFactor = 0.2;  // Adjust the speed factor to control scroll speed
            
        //     // Use GSAP ScrollTrigger to start animation when the container is in view
        //     ScrollTrigger.create({
        //         trigger: $container,  // Start the animation when the container enters the viewport
        //         start: "top bottom",  // When the top of the container hits the bottom of the viewport
        //         end: "bottom top",    // When the bottom of the container hits the top of the viewport
        //         scrub: true,          // Smooth scrubbing, link the animation to scroll position
        //         onUpdate: function(self) {
        //             // Calculate the scroll percentage relative to the scroll progress in the section
        //             var scrollPercent = self.progress;  // ScrollTrigger automatically gives us the progress value (0 to 1)

        //             // Apply the speed factor to slow down the horizontal scroll
        //             var newScrollLeft = -scrollPercent * maxScrollLeft * speedFactor;

        //             // Apply the calculated horizontal scroll position to the container
        //             $container.css('transform', 'translateX(' + newScrollLeft + 'px)');
        //         }
        //     });
        // }


        

        $('.dropdown select').selectric();

        $(".tab-title").click(function(e){
          e.preventDefault();
          $(".tab-title").removeClass('active');
          $(this).addClass('active');
          $(".tab-item").hide();
  
          var activeTab = $(this).attr('href');
          $(activeTab).show();
          $(activeTab).addClass('active');
          return false;
      });

      $(".ModalTrigger").click(function(e){
        e.preventDefault();
        
        $('body').addClass('modalShown');

        var activeTab = $(this).attr('href');
        $(activeTab).fadeIn();
        return false;
    });

    $(".modal-close").click(function(e){
        e.preventDefault();
        
        $('body').removeClass('modalShown');
        $('.modal-container').fadeOut();
    });

    $(".nav__cart").on("click touch", function (e) {
        e.preventDefault();
        $('body').addClass('cartShown cartPopulated');
    });
    
    // Handle the close button
    $(".cart-close").on("click touch", function (e) {
        e.preventDefault();
        closeCart();
    });
    
    // Close the cart if clicked outside
    $(document).on("click touch", function (e) {
        if (!$(e.target).closest('.cart-drawer, .showCart').length && $('body').hasClass('cartShown')) {
            closeCart();
        }
    });
    
    // Function to handle closing the cart
    function closeCart() {
        $('body').removeClass('cartShown cartPopulated cartEmpty');
    }
    

        // GSAP
        function initParallaxEffect() {
            

            $('.parallax-top').each(function() {
                const image = $(this).find('img'); 
                const parentTrigger = $(this).closest('.parallax-trigger'); // Find the closest parent with the class 'parallax-trigger'
              
                gsap.to(image, {
                  y: "-20%", // Move the image up by 10% of its height
                  ease: "none", // No easing for a linear parallax effect
                  scrollTrigger: {
                    trigger: parentTrigger[0], // Use the raw DOM element of the parent as the trigger
                    start: "top bottom", // Start when the top of the parent enters the bottom of the viewport
                    end: "bottom 20%", // End when the bottom of the parent leaves the top of the viewport
                    scrub: true, // Smooth parallax effect synced with scrolling
                  }
                });
              });
        }
        
        
        // Initialize the parallax effect for elements with the 'parallax-large' class
        initParallaxEffect();

        // Define the mobile breakpoint width (adjust as needed)
        const mobileBreakpoint = 1024;

        $(window).on('resize', function() {
            // Re-run the parallax effect on window resize, if needed
            initParallaxMidEffect();
        }).trigger('resize');

        function initParallaxMidEffect() {
            $('.parallax-mid').each(function() {
                const image = $(this).find('img'); 
                const parentTrigger = $(this).closest('.parallax-trigger'); // Find the closest parent with the class 'parallax-trigger'
                
                // Skip applying parallax effect if window width is below the mobile breakpoint and element has 'desktopOnly' class
                if ($(window).width() < mobileBreakpoint && $(this).hasClass('desktopOnly')) return;
                
                // Apply GSAP parallax effect to the image within each .parallax-mid element
                gsap.to(image, {
                    y: "-10%",       // Move the image up by 10% of its height
                    ease: "none",    // No easing for a linear parallax effect
                    scrollTrigger: {
                        trigger: parentTrigger[0], // Use the raw DOM element of the parent as the trigger
                        start: "top 80%",          // Start when the top of the parent enters the bottom of the viewport
                        end: "bottom 20%",         // End when the bottom of the parent leaves the top of the viewport
                        scrub: true,               // Smooth parallax effect synced with scrolling
                    }
                });
            });
        }


        function animateChipsWithScroll() {
            // Use jQuery to select all elements with the 'chip' class
            $('.animate-down').each(function(index) {
              const chip = $(this).find('img'); // Current chip element
              const parentTrigger = $(this).closest('.parallax-trigger'); // Find the closest parent with the class 'parallax-trigger'
              const speedFactor = (index + 1) * 40; // Different speeds for each chip (based on index)
          
              // Apply GSAP ScrollTrigger animation to each chip
              gsap.to(chip, {
                y: speedFactor, // Move the chip by a value proportional to its speed
                ease: "none",   // No easing for a linear parallax effect
                scrollTrigger: {
                  trigger: parentTrigger[0],  // Use the parent with class 'parallax-trigger' as the trigger
                  start: "top bottom",        // Start the animation when the parent enters the viewport
                  end: "bottom top",          // End the animation when the parent leaves the viewport
                  scrub: true,                // Sync the movement to scroll
                //   markers: true               // Debugging markers to visualize the scroll trigger points (remove in production)
                }
              });
            });
          }
        
          animateChipsWithScroll();

          function animateDownMidScroll() {
            // Use jQuery to select all elements with the 'chip' class
            $('.animate-down-mid').each(function(index) {
              const chip = $(this).find('img'); // Current chip element
              const parentTrigger = $(this).closest('.parallax-trigger'); // Find the closest parent with the class 'parallax-trigger'
              const speedFactor = (index + 1) * 40; // Different speeds for each chip (based on index)
          
              // Apply GSAP ScrollTrigger animation to each chip
              gsap.to(chip, {
                y: speedFactor, // Move the chip by a value proportional to its speed
                ease: "none",   // No easing for a linear parallax effect
                scrollTrigger: {
                  trigger: parentTrigger[0],  // Use the parent with class 'parallax-trigger' as the trigger
                  start: "top bottom",        // Start the animation when the parent enters the viewport
                  end: "bottom top",          // End the animation when the parent leaves the viewport
                  scrub: true,                // Sync the movement to scroll
                }
              });
            });
          }
        
          animateDownMidScroll();

          function animateUpWithScroll() {
            // Use jQuery to select all elements with the 'chip' class
            $('.chip').each(function(index) {
              const chip = $(this).find('img'); // Current chip element
              const parentTrigger = $(this).closest('.parallax-trigger'); // Find the closest parent with the class 'parallax-trigger'
              const speedFactor = -(index + 1) * 60; // Different speeds for each chip (based on index)
          
              // Apply GSAP ScrollTrigger animation to each chip
              gsap.to(chip, {
                y: speedFactor, // Move the chip by a value proportional to its speed
                ease: "none",   // No easing for a linear parallax effect
                scrollTrigger: {
                  trigger: parentTrigger[0],  // Use the parent with class 'parallax-trigger' as the trigger
                  start: "top bottom",        // Start the animation when the parent enters the viewport
                  end: "bottom top",          // End the animation when the parent leaves the viewport
                  scrub: true,                // Sync the movement to scroll
                }
              });
            });
          }
        
          animateUpWithScroll();

          function animateUpScroll() {
            // Use jQuery to select all elements with the 'chip' class
            $('.animate-up').each(function(index) {
              const chip = $(this).find('img'); // Current chip element
              const parentTrigger = $(this).closest('.parallax-trigger'); // Find the closest parent with the class 'parallax-trigger'
              const speedFactor = -(index + 1) * 80; // Different speeds for each chip (based on index)
          
              // Apply GSAP ScrollTrigger animation to each chip
              gsap.to(chip, {
                y: speedFactor, // Move the chip by a value proportional to its speed
                ease: "none",   // No easing for a linear parallax effect
                scrollTrigger: {
                  trigger: parentTrigger[0],  // Use the parent with class 'parallax-trigger' as the trigger
                  start: "top bottom",        // Start the animation when the parent enters the viewport
                  end: "bottom top",          // End the animation when the parent leaves the viewport
                  scrub: true,                // Sync the movement to scroll
                //   markers: true               // Debugging markers to visualize the scroll trigger points (remove in production)
                }
              });
            });
          }
        
          animateUpScroll();

          function animateRotateAndScrollUpOnScroll() {
            // Select all elements with the 'animate-rotate' class
            $('.animate-rotate').each(function(index) {
              const item = $(this); // Current item element
              const parentTrigger = $(this).closest('.animate-rotate-trigger'); // Closest parent with class 'parallax-trigger'
              const rotationSpeed = (index + 1) * 45; // Vary rotation speed based on index for a unique effect
              const scrollUpSpeed = (index + 1) * 60; // Different vertical scroll speeds based on index
          
              // Apply GSAP ScrollTrigger animation for both rotation and upward movement
              gsap.to(item, {
                rotation: rotationSpeed, // Rotate the item based on its unique rotation speed
                y: -scrollUpSpeed,       // Move the item up by its unique scroll-up speed
                ease: "none",            // No easing for a linear effect
                scrollTrigger: {
                  trigger: parentTrigger[0], // Use the parent with class 'parallax-trigger' as the trigger
                  start: "top bottom",       // Start the animation when parent enters the viewport
                  end: "bottom top",         // End the animation when parent leaves the viewport
                  scrub: true,               // Sync the rotation and movement to scroll
                }
              });
            });
          }
          
          animateRotateAndScrollUpOnScroll();
          

          


          let revealContainers = document.querySelectorAll(".underline-animation");

            revealContainers.forEach((container) => {
                let image = container.querySelector("img");
                let tl = gsap.timeline({
                    scrollTrigger: {
                    trigger: container,
                    toggleActions: "restart none none reset"
                    }
                });

                tl.set(container, { autoAlpha: 1 });
                tl.from(container, 0.8, {
                    xPercent: -100,
                    ease: Power1.out
                });
                tl.from(image, 0.8, {
                    xPercent: 100,
                    delay: -0.8,
                    ease: Power1.out
                });
            });

            

            $('.animationTrigger').each(function() {
                // Target all .staggerItem elements inside each .animationTrigger container
                let staggerItems = $(this).find('.staggerItem');
                
                // Apply GSAP animation to each .staggerItem within the current .animationTrigger container
                gsap.fromTo(staggerItems,
                  {
                    scale: 1.2,  // Start slightly scaled up
                    opacity: 0   // Initially hidden
                  },
                  {
                    scale: 1,    // Scale to normal size
                    opacity: 1,  // Fade in
                    duration: 0.8,  // Animation duration for each item
                    stagger: 0.2,   // Stagger delay between items
                    ease: "back.out(1.7)",  // Elastic easing for a 'drop-in' effect
                    scrollTrigger: {
                      trigger: $(this),   // Use the current .animationTrigger container as the trigger
                      start: "top 50%",   // Trigger when the top of the container hits 80% of the viewport
                      toggleActions: "restart none none none",
                    //   markers: true
                    }
                  }
                );
              });

              const animateRevealUp = () => {
                document.querySelectorAll('.fadeIn').forEach(box => {
                    
                    gsap.fromTo(box, {
                    autoAlpha: 0, 
                    y: 30
                      }, {
                      scrollTrigger: {
                        trigger: box,
                        start: "top 75%",
                        toggleActions: 'play none none none',
                        once: true,
                        // markers: true
                      },
                      duration: 1, 
                      autoAlpha: 1, 
                      y: 0
                    });
                });
            };
            animateRevealUp();

              



              class Button {
                constructor(buttonElement) {
                  this.$block = $(buttonElement);
                  this.init();
                  this.initEvents();
                }
              
                init() {
                  this.$flair = this.$block.find(".button__flair");
              
                  this.xSet = gsap.quickSetter(this.$flair[0], "xPercent");
                  this.ySet = gsap.quickSetter(this.$flair[0], "yPercent");
                }
              
                getXY(e) {
                  const { left, top, width, height } = this.$block[0].getBoundingClientRect();
              
                  const xTransformer = gsap.utils.pipe(
                    gsap.utils.mapRange(0, width, 0, 100),
                    gsap.utils.clamp(0, 100)
                  );
              
                  const yTransformer = gsap.utils.pipe(
                    gsap.utils.mapRange(0, height, 0, 100),
                    gsap.utils.clamp(0, 100)
                  );
              
                  return {
                    x: xTransformer(e.clientX - left),
                    y: yTransformer(e.clientY - top)
                  };
                }
              
                initEvents() {
                  this.$block.on("mouseenter", (e) => {
                    const { x, y } = this.getXY(e);
              
                    this.xSet(x);
                    this.ySet(y);
              
                    gsap.to(this.$flair, {
                      scale: 1,
                      duration: 0.4,
                      ease: "power2.out"
                    });
                  });
              
                  this.$block.on("mouseleave", (e) => {
                    const { x, y } = this.getXY(e);
              
                    gsap.killTweensOf(this.$flair);
              
                    gsap.to(this.$flair, {
                      xPercent: x > 90 ? x + 20 : x < 10 ? x - 20 : x,
                      yPercent: y > 90 ? y + 20 : y < 10 ? y - 20 : y,
                      scale: 0,
                      duration: 0.4,
                      ease: "power2.out"
                    });
                  });
              
                  this.$block.on("mousemove", (e) => {
                    const { x, y } = this.getXY(e);
              
                    gsap.to(this.$flair, {
                      xPercent: x,
                      yPercent: y,
                      duration: 0.4,
                      ease: "power2"
                    });
                  });
                }
              }
              
              $('[data-block="button"]').each(function() {
                new Button(this);
              });


              
              
              

          




              $(".accordion-item").each(function () {
                var $this = $(this);
                $this.find(" > .accordion-title").on("click touch", function () {
                    $(".accordion-item").removeClass("active-item")
                    $(".accordion-item .accordion-content").slideUp();
                    if ($this.find(".accordion-content:visible").length) {
                        $(".accordion-item").removeClass("active-item")
                        $(".accordion-item .accordion-content").slideUp();
                    } else {
                        $this.addClass("active-item")
                        $(".accordion-item .accordion-content").slideUp();
                        $this.find(" > .accordion-content").slideDown();
                    }
                })
            })

        


        

        
            


		
	});//End jQqery ready

	$(window).on("load",function() {
       
		
	});//End jQuery load
	
})(jQuery, this);

function increaseCount(e, el) {
  var input = el.previousElementSibling;
  var value = parseInt(input.value, 10);
  value = isNaN(value) ? 0 : value;
  value++;
  input.value = value;

  var decreaseButton = el.previousElementSibling.previousElementSibling;
  decreaseButton.classList.remove('button-opacity');
}

function decreaseCount(e, el) {
  var input = el.nextElementSibling;
  var value = parseInt(input.value, 10);
  value = isNaN(value) ? 0 : value;

  if (value > 1) {
      value--;
      input.value = value;

      // Add or remove the 'button-opacity' class based on the value
      if (value === 1) {
          el.classList.add('button-opacity');
      } else {
          el.classList.remove('button-opacity');
      }
  }
  
}