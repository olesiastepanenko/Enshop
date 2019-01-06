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
            btnNext: '.next',
            btnPrev: '.prev',
            auto: null,
            backSlide: true
        };
        return container.each(function(){
            var $promoslider = container.children(':first');
            var itemWidth = container.width();
            var itemsTotal = $promoslider.children().length;
            var running = false;
            var intID = null;
            var sliderWidth = $('.promo-slider-wrapper').width();
            $('.slide-item').css({
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
						if (!dir) { // если мы мотаем к следующему элементу (так по умолчанию)
						//вставляем после последнего элемента карусели
						//клоны стольких элементов, сколько задано
						//в параметре rotateBy (по умолчанию задан один элемент)
						    $promoslider.children(':last').after($promoslider.children().slice(0, settings.rotateBy).clone(true));
						} else {
						// если мотаем к предыдущему элементу
						/*
						* вставляем перед первым элементом карусели
						* клоны стольких элементов, сколько задано
						* в параметре rotateBy (по умолчанию задан один элемент)*/
						    $promoslider.children(':first').before($promoslider.children().slice(itemsTotal - settings.rotateBy, itemsTotal).clone(true));
						/*
						* сдвигаем карусель (<ul>) влево на ширину элемента,
						* умноженную на количество элементов, заданных
						* в параметре rotateBy (по умолчанию задан один элемент)
						*/
						    $promoslider.css('left', -itemWidth * settings.rotateBy + 'px');
						}
						/*
					* расчитываем левое смещение
					* текущее значение left + ширина одного элемента
					* количество проматываемых элементов * на направление перемещения (1 или -1)*/
					leftIndent = parseInt($promoslider.css('left')) + (itemWidth * settings.rotateBy * direction);
                        // запускаем анимацию
                    $promoslider.animate({'left': leftIndent}, {queue: false, duration: settings.speed, complete: function() {
                        // когда анимация закончена
                        if (!dir) { // если мы мотаем к следующему элементу (так по умолчанию)
                            // удаляем столько первых элементов, сколько задано в rotateBy
                            $promoslider.children().slice(0, settings.rotateBy).remove();
                            // устанавливаем сдвиг в ноль
                            $promoslider.css('left', 0);
                        } else { // если мотаем к предыдущему элементу
                            // удаляем столько последних элементов, сколько задано в rotateBy
                            $promoslider.children().slice(itemsTotal, itemsTotal + settings.rotateBy).remove();
                        }
                        if (settings.auto) { // если карусель должна проматываться автоматически
                            // запускаем вызов функции через интервал времени (auto)
                            intID = window.setInterval(function() { slide(settings.backslide); }, settings.auto);
                        }
                        running = false; // отмечаем, что анимация завершена
                        }});
				}
				return false; // возвращаем false для того, чтобы не было перехода по ссылке
                    }
                    // назначаем обработчик на событие click для кнопки next
			$(settings.btnNext).click(function() {
				return slide(false);
			});
			// назначаем обработчик на событие click для кнопки previous
			$(settings.btnPrev).click(function() {
				return slide(true);
			});
			if (settings.auto) { // если карусель должна проматываться автоматически
				// запускаем вызов функции через временной интервал
				intID = window.setInterval(function() {
				slide(settings.backslide); }, settings.auto);
				}
        });
    };