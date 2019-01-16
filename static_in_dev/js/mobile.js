// Turn product slider galery on Touchscreen
$(document).ready(function () {
    setupTouchProductGalery();
});

function setupTouchProductGalery() {

    $('.main-img').on('touchstart', turnGaleryStart);
};
function turnGaleryStart() {
    var touch_position = event.touches[0].pageX;
    console.info('touch_position on start', touch_position);
    $('.site-logo').html(touch_position, 'start')
    $('.main-img').on('touchend', checkTouchDirection());
};
function checkTouchDirection() {
    $('.site-logo-2').html(event.touches[0].pageX)
    console.info('on end', event.touches[0].pageX)
}

//var touch_position;
//
//function turn_start(event) {
//    touch_position = event.touches[0].pageX;
//    console.info('touch_position' ,touch_position);
//    check_direction(event, touch_position);
//}

//function check_direction(event, touch_position) {
//    var tmp_move = touch_position - (event.touches[0].pageX);
//    if (Math.abs(tmp_move) < 10) {
//        console.info('abs tmp_move < 10?', Math.abs(tmp_move), event.touches[0].pageX, tmp_move);
//    return false;
//    }
//    else {
//        if (tmp_move < 0) {
//            direction = 1;
//            console.info('tmp_move < 0?', tmp_move);
//        }
//        else {
//            console.info('event.touches[0].pageX', event.touches[0].pageX);
//            console.info('tmp_move > 0?', tmp_move);
//            direction = 0;
//        }
//    turn_page(event, direction)
//    }
//}
//
//function turn_page(event, direction) {
//    if (direction == 1) {
//        console.info('direction right?', direction);
//        target = $('div.triger-column-slider img.active').index();
//        turnProductImgGaleryRight(target);
//    }
//    else {
//        console.info('direction left?', direction);
//        target = $('div.triger-column-slider img.active').index();
//        turnProductImgGaleryLeft(target);
//    }
//}
//function turnProductImgGaleryRight(target) {
//    var triggers = $('div.triger-column-slider img');
//    var lastElem;
//    target = $('div.triger-column-slider img.active').index();
//    console.trace('Next Index selected', target);
//    if (target < (triggers.length - 1)) {
//        target === lastElem ? target = 0 : target = target + 1;
//        sliderImgResponse(target);
//        console.info('Img was turned right OK');
//    }
//    else {
//        console.info('Img was NOT turned right');
//        target = 0;
//        sliderResponse(target);
//    }
//};
//function turnProductImgGaleryLeft(target) {
//var triggers = $('div.triger-column-slider img');
//    var lastElem;
//    target = $('div.triger-column-slider img.active').index();
//    console.info('Prev Index selected', target);
//    lastElem = triggers.length - 1;
//    target === 0 ? target = lastElem : target = target - 1;
//    sliderImgResponse(target);
//    console.info('Img was turned left OK');
//};
//function sliderResponse(target) {
//    var images = $('div.row-slider div.main-img img');
//    var triggers = $('div.triger-column-slider img');
//    images.fadeOut(0).eq(target).fadeIn(0);
//    triggers.removeClass('active').eq(target).addClass('active');
//    console.info('New Img is showed OK');
//}