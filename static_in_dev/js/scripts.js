







// скрипт для динамического изменения колличества товаров возле иконки корзины












//    // Turn Modal Galery
//    $('div.modal-slider-control span.next').click(function () {
//    console.log('click')
//        target = $('div.triger-column-slider img.active').index();
//        TurnImgModalRight(target);
//    });
//
//    $('div.modal-slider-control span.prev').click(function () {
//        target = $('div.triger-column-slider img.active').index();
//        TurnImgModalLeft(target);
//    });
//
//    function TurnImgModalRight(target) {
//       if (target < (triggers.length - 1)) {
//            target === lastElem ? target = 0 : target = target + 1;
//            modalResponse(target);
//        }
//        else {
//            target = 0;
//            modalResponse(target);
//        }
//    };
//
//    function TurnImgModalLeft(target) {
//        lastElem = triggers.length - 1;
//        target === 0 ? target = lastElem : target = target - 1;
//        modalResponse(target);
//    };
//
//    function modalResponse(target) {
//        var img = $('#mod-show');
//        triggers.removeClass('active').eq(target).addClass('active');
//        tRoot = $('div.triger-column-slider img.active').attr('src');
//        img.attr('src', tRoot);
//    };



// Turn product slider galery on Touchscreen
//var touch_position;
//
//function turn_start(event) {
//    touch_position = event.touches[0].pageX;
//}
//
//function check_direction(event) {
//    var tmp_move = touch_position - (event.touches[0].pageX);
//    if (Math.abs(tmp_move) < 10) {
//        return false;
//    }
//    if (tmp_move < 0) {
//        direction = 1;
//    }
//    else {
//        direction = 0;
//    }
//}
//
//function turn_page(event) {
//    if (direction == 1) {
//        target = $('div.triger-column-slider img.active').index();
//        TurnImgSliderRight(target);
//    }
//    else {
//        target = $('div.triger-column-slider img.active').index();
//        TurnImgSliderLeft(target);
//    }
//}

// Script for modal Size guide with resposive tabs

//$(document).ready(function () {
//    $('a.modal-menu').on('click', function () {
//        $('#size-guide').css('display', 'block');
//
//        var tablink = $('div.tab-caption');
//        var tabcont = $('div.tab-content');
//        var target;
//
//        tablink.first().addClass('active');
//        tabcont.hide().first().show();
//
//        function tabResponce(target) {
//            tabcont.fadeOut(0).eq(target).fadeIn(0);
//            tablink.removeClass('active').eq(target).addClass('active');
//        }
//
//        tablink.click(function () {
//            if (!$(this).hasClass('active')) {
//                target = $(this).index();
//                tabResponce(target);
//            }
//        });
//    });
//});


// Script for close modal Size guide Tab

//$(document).ready(function () {
//    $('div.modal-tab div.remove-cont .icon-remove').on('click', function () {
//        $('#size-guide').css('display', 'none')
//    });
//});

