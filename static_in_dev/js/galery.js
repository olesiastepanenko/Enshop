// Turn product slider galery on Touchscreen
//$('#pr-galery').scroll(function() { alert("Scrolled"); });

var touches = [];
var cacheX = new Object();
var cacheY = new Object();
$(document).ready(function () {

    setupProductImgGalery();

});


$(init);

function init() {
//$(document).ready(function () {

//var touchStartX;
console.info('Wait for touch');
  document.getElementById("pr-galery").addEventListener("touchstart", xOnTouchStart);
  document.getElementById("pr-galery").addEventListener("touchend", xOnTouchEnd);
  document.getElementById("pr-galery").addEventListener("touchcancel", xOnTouchEnd);

};



function xOnTouchStart(e) {
  e.preventDefault();
  var touchList = e.changedTouches;
  for(var i = 0; i < touchList.length; i++)
    {
        cacheX.key = touchList[i].screenX;
        cacheY.key = touchList[i].screenY
    }
//    cacheX.key = touchStartX;
//    cacheY.key = touchStartY
    console.info('cacheX', cacheX, 'cacheY', cacheY);
};
function xOnTouchEnd(e) {
  var touchList = e.changedTouches;
  var direction;
//  var touchstartX = cacheX.key;
  for(var i = 0; i < touchList.length; i++)
  {
    touchEndX = touchList[i].screenX;
    touchEndY = touchList[i].screenY;
    console.info('touchEndY', touchEndY, 'touchEndX', touchEndX);

    }
    directionH = touchEndX - cacheX.key;
    directionV = touchEndY - cacheY.key;
    if (Math.abs(directionH) > 20) {
        checkHorizontalTouchDirection(directionH);
    }
    else if (Math.abs(directionV) > 10) {
        checkVerticalTouchDirection(directionV);
    }
    else {return false};

//    checkTouchDirection(direction);
};
function checkHorizontalTouchDirection(directionH) {
    console.info(directionH, Math.abs(directionH));
        if (directionH > 0) {
            console.info('to right');
            turnProductImgGaleryRight();
        } else {
            turnProductImgGaleryLeft();
            console.info('to left');
        }
}
function checkVerticalTouchDirection(directionV) {
    if (directionV > 0) {
        y = Math.round(Math.abs(directionV))
        console.info(directionV, 'scroll up', 'y', y);
        window.scrollBy(0, -y);
    } else {
        window.scrollBy(0, Math.round(Math.abs(directionV)));
        console.info(directionV, 'scroll down', Math.abs(directionV));
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
        $('#closyaka_product').on('click', closeModalProductImg);
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
    $('#cont-img').fadeToggle();
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








