//script for dropdown show Size.
//const isMobile = /Mobile|webOS|BlackBerry|IEMobile|MeeGo|mini|Fennec|Windows Phone|Android|iP(ad|od|hone)/i.test(navigator.userAgent);
$(document).ready(function () {
    console.info("setup ready.js");

    setupDropDownSizeChoices();

    setupSideNavBarForSmallDevices();

    setupMainPromoFotoCarousel();

    setupProductImgGalery();

    setupToShoppingCart();

    setupSizeGuide();



    console.info("setup ready.js OK");

});

$(document).on('keydown', function (event) {

    closeModalImgESC(event);
    closeSizeGuideESC(event);
});

$(window).resize(function () {
    console.info("Waiting for window resize");
    changePromoCaruselSizeIfWindowResized();
});

// Scripts for Size DropDown
function setupDropDownSizeChoices(){
    console.info("Setup Event Lisener for Dropdown Size onClisk...")
    $('.dropdown-choices').on('click', сontrolOfDropDownSizeChoises);
    console.log('Whait for Size choose');
    $('div.row-size').on('click', сhooseSize);
}
function сontrolOfDropDownSizeChoises(){
    console.group("Event onClicks from dropdown-choices");
    var size_content = $(".dropdown-content");
    if (size_content.is(":hidden")) {
        console.log('Dropdown Size content is hidden, ready for open');
        size_content.slideDown("slow");
        console.log('Dropdown Size is opened OK');
    }
    else {
        console.log('It was clicked for close Dropdown Size');
        size_content.slideUp();
        console.log('Dropdown Size is closed OK');
    }
    console.groupEnd('The END of Event for Dropdown Size');
}
function сhooseSize(){
    console.log('Dropdown Size Im ready for Size selection');
    // Hover row with size and qty of Stock
    $('div.dropdown-choices div.h-text').css('color', '#333');
    var size_id = $(this).children().first().attr('data-size');
    var size = $(this).children().first().html();
    var stock = $(this).children().last().attr('data-stock');
    console.trace('Qty of stock =', stock);
    if (stock > 0) {
        console.info('Size is not out of stock');
        $('.add-to-cart').attr('data-size', size_id);
        console.info('Size-ID assigned to Add-to-cart button ');
        $(".dropdown-content").slideUp();
        $('#bask-it-size').html('SIZE ' + size);
        console.info('Busket Dropdown div.dropdown-product-basket-info has got info about selected Size =', size)
        $('div.dropdown-choices div.h-text').html(size);
        console.info('Selected Size was appeared on div.dropdown-choices')
        console.log('Size is selected');
    }

}


// Script for mobile devices Nav Panel
function setupSideNavBarForSmallDevices(){
        console.info("Setup Event Lisener Side NavBar for mobile devices onClisk...");
//        document.getElementById('mob-dev-butt-icon').addEventListener("click", openSideMobileNavBar);
        $('#mob-dev-butt-icon').on('click', openSideMobileNavBar);
//        document.getElementById('close-side-nav').addEventListener("click", closeSideMobileNavBar);
        $('#close-side-nav').on('click', closeSideMobileNavBar);
}
function openSideMobileNavBar(){
    var nav = document.getElementById('side-pan-menu');
    nav.style.display = "flex";
    $('.nav-pan-item-menu').css('display', 'flex');
    $('.cat-menu-item').on('click', controlSideMobileNavBar);
}
function closeSideMobileNavBar() {
    $('#side-pan-menu').removeAttr('style');
    if ($(".cat-menu-item.active" ).length > 0) {
        $(".cat-menu-item.active" ).removeClass('active').next().hide();
    }
//    document.getElementById('side-pan-menu').style.display = "none";

};
function controlSideMobileNavBar() {
        if ($(".cat-menu-item.active" ).length === 0) {
            console.info('all is closed');
            $(this).addClass('active').next().show();
            $(".cat-menu-item.active span.nav-icon").removeClass('lnr-chevron-down').addClass('lnr-chevron-up');

        } else {
            console.info('some is opened');
            if ($(this).hasClass('active')) {
                console.info('it curr => close');
                $(".cat-menu-item.active span.nav-icon").removeClass('lnr-chevron-up').addClass('lnr-chevron-down');
                $(this).removeClass('active').next().hide();
            } else {console.info('it new');
                $(".cat-menu-item.active span.nav-icon").removeClass('lnr-chevron-up').addClass('lnr-chevron-down');
                $(".cat-menu-item.active" ).removeClass('active').next().hide();
                console.info('old closed');
                $(this).addClass('active').next().show();
                $(".cat-menu-item.active span.nav-icon").removeClass('lnr-chevron-down').addClass('lnr-chevron-up');
                console.log('new opened');
            }

        }
};


// Scripts for Slide-promo-Carousel on main Page
function setupMainPromoFotoCarousel() {
    var container = $('.promo-slider-container');
    myCarousel(container);
};
function myCarousel(container) {
    var settings = {
        visible: 1,
        rotateBy: 1,
        speed: 1000,
        btnNext: '.promo-slider-container a.next',
        btnPrev: '.promo-slider-container a.prev',
        auto: null,
        backSlide: false
    };
    return container.each(function () {
        var $promoslider = container.children(':first');
        var itemWidth = container.width();
        var itemsTotal = $promoslider.children().length;
        var running = false;
        var intID = null;
        var sliderWidth = $('.promo-slider-container').width();
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
                $promoslider.animate({'left': leftIndent}, {
                    queue: false, duration: settings.speed, complete: function () {
                        if (!dir) {
                            $promoslider.children().slice(0, settings.rotateBy).remove();
                            $promoslider.css('left', 0);
                        } else {
                            $promoslider.children().slice(itemsTotal, itemsTotal + settings.rotateBy).remove();
                        }
                        if (settings.auto) {
                            intID = window.setInterval(function () {
                                slide(settings.backSlide);
                            }, settings.auto);
                        }
                        running = false;
                    }
                });
            }
            return false;
        }

        $(settings.btnNext).click(function () {
            return slide(false);
        });
        $(settings.btnPrev).click(function () {
            return slide(true);
        });
        if (settings.auto) {
            intID = window.setInterval(function () {
                slide(settings.backslide);
            }, settings.auto);
        }
    });
}
function changePromoCaruselSizeIfWindowResized() {
    var sliderWidth = $('.promo-slider-container').width();
        console.log('New width for Promo Carousel' , sliderWidth);
        $('.slide-item img.slide-image').css({
            'width': sliderWidth,
        });
}

// Shopping Cart page scripts
function setupToShoppingCart (){
    console.info("Setup Event Lisener Add to Cart Button onClisk...");
    // Script add to cart and show shoppingCart qty next to Cart Icon
    $('.add-to-cart').on('click', addToCartAndShowQty);
    // remove from Shoppingcart
    $('.remove-from-cart').on('click', removeFromCart);
    $('.cart-item-amount').on('click', changeCartProductItemAmount);
    var cart_val = $('#cart-is-empty').attr('data-target');
        if (cart_val == 0){
            $('#cart-is-empty').css('display', 'block');
        };
};
function addToCartAndShowQty(){
    if ($(this).attr('data-size')) {
            product_slug = $(this).attr('data-slug');
            console.log('product_slug is', product_slug);
            product_title = $(this).attr('data-title');
            console.log('product_title is', product_title);
            product_price = $(this).attr('data-price');
            console.log('product_price is', product_price);
            product_size = $(this).attr('data-size');
            console.log('product_size is', product_size);
            var cur_src = $('div.main-img img').first().attr('src');
            console.log('Our src is', cur_src);
            data = {
                product_slug: product_slug,
                product_size: product_size,
                product_title: product_title,
                product_price: product_price,
            };
            $('#curent-product-img').attr('src', cur_src);
            console.log('add our src to DD busket');
            console.log('Ready for Ajax');
            $.ajax({
                type: 'GET',
                url: '/add_to_cart/',
                data: data,
                success: function (data) {
                    console.log('It was success');
                    $('#basket-total-amount').html(data.cart_total_amount);
                    $('#bask-it-title').html(product_title);
                    $('#bask-it-pr').html('PRICE ' + product_price + ' EUR');
                    $('#dropdown-product-basket').show(500).delay(1000).fadeOut(500);
                }
            });
        }
        else {
        console.log($(this).attr('data-size'))
            $('div.dropdown-choices div.h-text').css('color', 'red');
        }
};

function removeFromCart() {
            product_slug = $(this).attr('data-slug')
            item_product_id = $(this).attr('data-id')
            data = {
                product_slug: product_slug
                 }
                 $.ajax({
                    type: 'GET',
                    url: '/remove_from_cart/',
                    data: data,
                    success: function(data){
//                        $('#cart-total-amount').html(data.cart_total_amount);
                        $('#basket-total-amount').html(data.cart_total_amount);
                        $('.cart-item-' + item_product_id).css('display', 'none');
                        $('#cart-total-summ').html('Total: ' + data.cart_summ + ' EUR');
                        if (parseInt(data.cart_total_amount) == 0){
                            $('#shoppingBasket').css('display', 'none');
                            $('#cart-total-summ').css('display', 'none');
                            $('#cart-is-empty').css('display', 'block');
                        }
                    }
                });
};
function changeCartProductItemAmount() {
    product_slug = $(this).attr('data-slug')
    amount = $(this).val();
            item_id = $(this).attr('data-id')
            data = {
                product_slug:product_slug,
                amount: amount,
                item_id: item_id
            }
            $.ajax({
                type: 'GET',
                url: '/change_item_amount/',
                data: data,
                success: function(data){
                    $('#basket-total-amount').html(data.cart_total_amount);
                    console.log(data.cart_total_amount)
                    $('#cart-item-total-'+item_id).html(parseFloat(data.item_total_price).toFixed(2));
                    $('#cart-total-summ').html('Total: ' + data.cart_summ + ' EUR');

                }
             });
};

//дописать чтоб количество возле корзинки менялось и когда кол мен-ся на стр корзина


// Script for modal Size guide with resposive tabs
function setupSizeGuide () {
    $('a.modal-menu').on('click', openSizeGuide);
    $('#size-guide .icon-close').on('click', closeSizeGuide)
}
function openSizeGuide() {
    $('#size-guide').css('display', 'block');
    $('#size-guide').addClass('active');
    console.info('Size guide is opened OK');
    controlSizeGuide();
}
function closeSizeGuide () {
    $('#size-guide').css('display', 'none');
    console.info('Size guide was closed');
}
function closeSizeGuideESC(event) {
    if (($('#size-guide').hasClass('active')) && (event.which == 27)) {
        $('#size-guide').css('display', 'none');
        $('#size-guide').removeClass('active');
        console.info('Size Guide was closed with keydown ESC');
    }
}
function controlSizeGuide() {
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
}
function closeModalImgESC(){
if (($('#size-guide').hasClass('active')) && (event.which == 27)) {
        $('#size-guide').css('display', 'none');
        $('#size-guide').removeClass('active');
        console.info('Size Guide was closed with keydown ESC');
    }
        if (($('#mod-show').hasClass('active')) && (event.which == 27)){
            $('.modal-product-galerie').css('display', 'none');
            $('#mod-show').removeClass('active');
        };
    });}
//git remote add origin https://github.com/olesiastepanenko/Enshop.git
//pa_autoconfigure_django.py https://github.com/olesiastepanenko/Enshop.git