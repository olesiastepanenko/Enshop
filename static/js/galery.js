// Turn product slider galery on Touchscreen
//$('#pr-galery').scroll(function() { alert("Scrolled"); });

var touches = [];

var cacheY = new Object();
$(document).ready(function () {

    setupProductImgGalery();

});


var touch_position;
var cachePosition = new Object();

function turn_start(event) {
    cachePosition.key = event.touches[0].pageX;
    console.info('cachePosition', cachePosition)
}

function check_direction(event) {
    var tmp_move = cachePosition.key - (event.touches[0].pageX);
    console.info('cachePosition.key', cachePosition.key, 'X end', event.touches[0].pageX);
    if (Math.abs(tmp_move) < 20) {
        return false;
    }
    else if (Math.abs(tmp_move) >= 20) {
    if (tmp_move < 0) {
        direction = 1;
        console.info('direction 1?', direction, 'tmp_move', tmp_move);
    }
    else if (tmp_move) {
        direction = 0;
        console.info('direction 0?', direction,  'tmp_move', tmp_move);
    }
    else { return false }
    }

}

function turn_page(event) {
    if (direction == 1) {
        target = $('div.triger-column-slider img.active').index();
        console.info('on turn direction 1?', direction);
        turnProductImgGaleryRight(target);
        direction = 2;
    }
    else if (direction == 0) {
        target = $('div.triger-column-slider img.active').index();
        console.info('on turn direction 0?', direction);
        turnProductImgGaleryLeft(target);
        direction = 2;
    }
}

// scripts for Productfotogalerie
function setupProductImgGalery() {
    var triggers = $('div.triger-column-slider img');
    var windowSize = $(window).width();
    triggers.first().addClass('active');
    $('div.row-slider div.main-img img').hide().first().show();
    triggers.on('click', selectGaleryPreviewImg);
    console.info("Setup Event Lisener Product Img Galery for Preview IMGs onClisk...");
    $('div.row-slider a.next').on('click', turnProductImgGaleryRight);
    $('div.row-slider a.prev').on('click', turnProductImgGaleryLeft);
    console.info("Setup Event Lisener for control Product Img Galery onClisk...");
    if (windowSize > 480) {
        console.info('window is more than 480 px, ready open Modal IMG');
        $('div.main-img img').on('click', openModalProductImg);
        $('#close_product').on('click', closeModalProductImg);
    }


};
function selectGaleryPreviewImg () {
    var target;
    if (!$(this).hasClass('active')) {
        target = $(this).index();
        console.info('New Img Index, ready for show new Img');
        sliderImgResponse(target);
    }
};
function sliderImgResponse(target) {
    var images = $('div.row-slider div.main-img img');
    var triggers = $('div.triger-column-slider img');
    images.fadeOut(0).eq(target).fadeIn(0);
    triggers.removeClass('active').eq(target).addClass('active');
    console.info('New Img is showed OK');
}
function turnProductImgGaleryRight() {
    var triggers = $('div.triger-column-slider img');
    var lastElem;
    target = $('div.triger-column-slider img.active').index();
    console.trace('Next Index selected', target);
    if (target < (triggers.length - 1)) {
        target === lastElem ? target = 0 : target = target + 1;
        sliderImgResponse(target);
        console.info('Img was turned right OK');
    }
    else {
        console.info('Img was NOT turned right');
        target = 0;
        sliderImgResponse(target);
    }
};
function turnProductImgGaleryLeft() {
var triggers = $('div.triger-column-slider img');
    var lastElem;
    target = $('div.triger-column-slider img.active').index();
    console.trace('Prev Index selected', target);
    lastElem = triggers.length - 1;
    target === 0 ? target = lastElem : target = target - 1;
    sliderImgResponse(target);
    console.info('Img was turned left OK');
};
function openModalProductImg() {
   $('#cont-img').css('display', 'block');
   imgSrc = $(this).attr('src');
   $('#mod-show').attr('src', imgSrc);
   $('#mod-show').addClass('active');
};
function closeModalProductImg() {
    $('#cont-img').removeAttr('style')
//    .fadeToggle();
    $('#mod-show').removeClass('active');
    console.info('Modal Img was closed');
};
function closeModalImgESC(event) {
    if (($('#mod-show').hasClass('active')) && (event.which == 27)) {
        $('#cont-img').fadeToggle();
        $('#mod-show').removeClass('active');
        console.info('Modal Img was closed with keydown ESC');
    }
};








