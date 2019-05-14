// Script for nav-bar for Ipad and so on
$(document).ready(function(){
var target;
    $('li.nav-hover a').on('click', function(){
        target = $(this).index();
    });
    $('.resp-nav span').on('click', function(){
        $('.main-nav-bar').show().css('display', 'flex');
    })
    $('.close-pop-up span').on('click', function(){
        $('.main-nav-bar').css('display', 'none');
    });
    $('li.nav-hover div.resp-nav-wrap').on('click', function(){
    var span = $(this).find('span');
    var subnav = $(this).next()
        if (subnav.is(":hidden")){
            subnav.slideDown('slow');
            span.removeClass('lnr-chevron-down').addClass('lnr-chevron-up');
        }
        else {
            subnav.slideUp('slow');
            span.removeClass('lnr-chevron-up').addClass('lnr-chevron-down');
        }
    })
});

$(document).ready(function(){
var icon = $('#icon-resp-nav');
    icon.on('click', function(){
    })
});




//    // скрипт для динамического изменения колличества товаров возле иконки корзины
//$(document).ready(function () {
//    $('.add-to-cart').on('click', function () {
//        if ($(this).attr('data-size')) {
//            product_slug = $(this).attr('data-slug');
//            product_title = $(this).attr('data-title');
//            product_price = $(this).attr('data-price');
//            product_size = $(this).attr('data-size');
//            var cur_src = $('div.main-img img').first().attr('src');
//            data = {
//                product_slug: product_slug,
//                product_size: product_size,
//                product_title: product_title,
//                product_price: product_price,
//            }
//            $('#curent-img').attr('src', cur_src);
//            $.ajax({
//                type: 'GET',
//                url: '{% url "add_to_cart" %}',
//                data: data,
//                success: function (data) {
//                    $('#cart-total-amount').html(data.cart_total_amount);
//                    $('#bask-it-title').html(product_title);
//                    $('#bask-it-pr').html(product_price + ' EUR');
//                    $('#dropdownMenuBasket').show(500).delay(1000).fadeOut(500);
//                }
//            });
//        }
//        else {
//         $('div.dropdown-choices div.h-text').css('color', 'red');
//        }
//    });
//});



// Slide-promo-carousel on main Page
$(document).ready(function() {
    var container = $('.promo-slider-wrapper');
		myCarousel(container);
	});
function myCarousel(container){
        var settings = {
            visible: 1,
            rotateBy: 1,
            speed: 1000,
            btnNext: '.promo-slider-wrapper a.next',
            btnPrev: '.promo-slider-wrapper a.prev',
            auto: 4000,
            backSlide: false
        };
        return container.each(function(){
            var $promoslider = container.children(':first');
            var itemWidth = container.width();
            var itemsTotal = $promoslider.children().length;
            var running = false;
            var intID = null;
            var sliderWidth = $('.promo-slider-wrapper').width();
            $('.slide-item img.slide-image').css({
                'width': sliderWidth,
            });
				//'width': settings.visible * itemWidth + 'px' // ширину контейнера ставим равной ширине всех видимых элементов
			$promoslider.css({
				'width': 9999 + 'px',
			});

			function slide(dir) {
			    var direction = !dir ? -1 : 1;
			    var leftIndent = 0;
			    if (!running) {
			        running = true;
			        if (intID) {
						window.clearInterval(intID);
						}
						if (!dir) {
						    $promoslider.children(':last').after($promoslider.children().slice(0, settings.rotateBy).clone(true));
						} else {
						    $promoslider.children(':first').before($promoslider.children().slice(itemsTotal - settings.rotateBy, itemsTotal).clone(true));
						    $promoslider.css('left', -itemWidth * settings.rotateBy + 'px');
						}
					leftIndent = parseInt($promoslider.css('left')) + (itemWidth * settings.rotateBy * direction);
                    $promoslider.animate({'left': leftIndent}, {queue: false, duration: settings.speed, complete: function() {
                        if (!dir) {
                            $promoslider.children().slice(0, settings.rotateBy).remove();
                            $promoslider.css('left', 0);
                        } else {
                            $promoslider.children().slice(itemsTotal, itemsTotal + settings.rotateBy).remove();
                        }
                        if (settings.auto) {
                            intID = window.setInterval(function() { slide(settings.backSlide); }, settings.auto);
                        }
                        running = false;
                        }});
				}
				return false;
                    }
			$(settings.btnNext).click(function() {
				return slide(false);
			});
			$(settings.btnPrev).click(function() {
				return slide(true);
			});
			if (settings.auto) {
				intID = window.setInterval(function() {
				slide(settings.backslide); }, settings.auto);
				}
        });
    };

$(window).resize(function() {
    var container = $('.promo-slider-wrapper');
    var sliderWidth = $('.promo-slider-wrapper').width();
            $('.slide-item img.slide-image').css({
                'width': sliderWidth,
            });
});

    // скрипт для динамического изменения колличества товаров возле иконки корзины
$(document).ready(function () {
    $('.add-to-cart').on('click', function () {
        if ($(this).attr('data-size')) {
            product_slug = $(this).attr('data-slug');
            product_title = $(this).attr('data-title');
            product_price = $(this).attr('data-price');
            product_size = $(this).attr('data-size');
            var cur_src = $('div.main-img img').first().attr('src');
            data = {
                product_slug: product_slug,
                product_size: product_size,
                product_title: product_title,
                product_price: product_price,
            }
            $('#curent-img').attr('src', cur_src);
            $.ajax({
                type: 'GET',
                url: '{% url "add_to_cart" %}',
                data: data,
                success: function (data) {
                    $('#cart-total-amount').html(data.cart_total_amount);
                    $('#bask-it-title').html(product_title);
                    $('#bask-it-pr').html(product_price + ' EUR');
                    $('#dropdownMenuBasket').show(500).delay(1000).fadeOut(500);
                }
            });
        }
        else {
         $('div.dropdown-choices div.h-text').css('color', 'red');
        }
    });
});

//// choose size script
//$('div.row-size').on('click', function(){
//    $('div.dropdown-choices div.h-text').css('color', '#333');
//    var size_id = $(this).children().first().attr('data-size');
//    var size = $(this).children().first().html();
//    var stock = $(this).children().last().attr('data-stock');
//    if (stock > 0) {
//        $('.add-to-cart').attr('data-size', size_id);
//        $(".dropdown-content").slideUp();
//        $('#bask-it-size').html(size);
//        $('div.dropdown-choices div.h-text').html(size);
//    }
//});



    // script for fotogalerie

    var triggers = $('div.triger-column-slider img');
    var images = $('div.row-slider div.main-img img');
    var target;
    var lastElem;

    triggers.first().addClass('active');
    images.hide().first().show();

    function sliderResponse(target) {
        images.fadeOut(0).eq(target).fadeIn(0);
        triggers.removeClass('active').eq(target).addClass('active');
    };

    triggers.click(function () {
        if (!$(this).hasClass('active')) {
            target = $(this).index();
            sliderResponse(target);
        }
    });

    function TurnImgSliderRight(target) {
        if (target < (triggers.length - 1)) {
            target === lastElem ? target = 0 : target = target + 1;
            sliderResponse(target);
        }
        else {
            target = 0;
            sliderResponse(target);
        }
    };

    function TurnImgSliderLeft(target) {
        lastElem = triggers.length - 1;
        target === 0 ? target = lastElem : target = target - 1;
        sliderResponse(target);
    };

    // Turn product slider galery
    $('div.row-slider a.next').click(function () {
        target = $('div.triger-column-slider img.active').index();
        TurnImgSliderRight(target);
    });

    $('div.row-slider a.prev').click(function () {
        target = $('div.triger-column-slider img.active').index();
        TurnImgSliderLeft(target);
    });

    // Script for modal Img
    $(document).ready(function () {
        var windowSize = $(window).width();
        if (windowSize > 480) {
            $('div.main-img img').on('click', function () {
                $('#cont-img').css('display', 'block');
                imgSrc = $(this).attr('src');
                $('#mod-show').attr('src', imgSrc);
                $('#mod-show').addClass('active')
            });
        }
    });

    // Turn Modal Galery
    $('div.modal-slider-control span.next').click(function () {
        target = $('div.triger-column-slider img.active').index();
        TurnImgModalRight(target);
    });

    $('div.modal-slider-control span.prev').click(function () {
        target = $('div.triger-column-slider img.active').index();
        TurnImgModalLeft(target);
    });

    function TurnImgModalRight(target) {
       if (target < (triggers.length - 1)) {
            target === lastElem ? target = 0 : target = target + 1;
            modalResponse(target);
        }
        else {
            target = 0;
            modalResponse(target);
        }
    };

    function TurnImgModalLeft(target) {
        lastElem = triggers.length - 1;
        target === 0 ? target = lastElem : target = target - 1;
        modalResponse(target);
    };

    function modalResponse(target) {
        var img = $('#mod-show');
        triggers.removeClass('active').eq(target).addClass('active');
        tRoot = $('div.triger-column-slider img.active').attr('src');
        img.attr('src', tRoot);
    };

    // Script for close modal Img

//$('span.lnr.lnr-cross.icon-remove').on('click', function () {
//    console.log(this);
//    $('.modal-product-galerie').fadeToggle();
//    $('#mod-show').removeClass('active');
//
//});
//
//    $(document).on('keydown', function(event){
//        if (($('#mod-show').hasClass('active')) && (event.which == 27)){
//            $('.modal-product-galerie').fadeToggle();
//        };
//    });

    // Turn product slider galery on Touchscreen
    var touch_position;

    function turn_start(event) {
        touch_position = event.touches[0].pageX;
    }

    function check_direction(event) {
        var tmp_move = touch_position - (event.touches[0].pageX);
        if (Math.abs(tmp_move) < 10) {
            return false;
        }
        if (tmp_move < 0) {
            direction = 1;
        }
        else {
            direction = 0;
        }
    };

    function turn_page(event) {
        if (direction == 1) {
            target = $('div.triger-column-slider img.active').index();
            TurnImgSliderRight(target);
        }
        else {
            target = $('div.triger-column-slider img.active').index();
            TurnImgSliderLeft(target);
        }
    };







    // Script for modal Size guide with resposive tabs

    $(document).ready(function () {
        $('a.modal-menu').on('click', function () {
            $('#size-guide').css('display', 'block');

            var tablink = $('div.tab-caption');
            var tabcont = $('div.tab-content');
            var target;

            tablink.first().addClass('active');
            tabcont.hide().first().show();

            function tabResponce(target) {
                tabcont.fadeOut(0).eq(target).fadeIn(0);
                tablink.removeClass('active').eq(target).addClass('active');
            }

            tablink.click(function () {
                if (!$(this).hasClass('active')) {
                    target = $(this).index();
                    tabResponce(target);
                }
            });
        });
    });


    // Script for close modal Size guide Tab

    $(document).ready(function () {
        $('div.modal-tab div.remove-cont .glyphicon-remove').on('click', function () {
            $('#size-guide').css('display', 'none')
        });
    });

