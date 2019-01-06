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
            auto: null,
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
			container.css({
				'position': 'relative',
				'overflow': 'hidden',
				//'width': settings.visible * itemWidth + 'px' // ширину контейнера ставим равной ширине всех видимых элементов
			});
			$promoslider.css({
				'position': 'relative',
				'width': 9999 + 'px',
				'left': 0
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
    console.log(sliderWidth);

});


