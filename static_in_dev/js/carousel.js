function myCarousel(container){
        // настройки карусели которые можно всегда изменить JSON
        var settings = {
            visible: 1, //видимый элемент 1
            rotateBy: 1, // мотаем по 1 элементу за раз
            speed: 800,
            btnNext: '.next', // кнопка перемотки к следующему элементу
            btnPrev: '.prev', // кнопка перемотки к предыдущему элементу
            auto: 4000, // время задержки (в миллисекундах) при автоматической перемотке
            backSlide: true // будет ли карусель крутиться в обратную сторону при автоматической перемотке
        };
        return container.each(function(){ // чтобы плагин работал со всеми найденными элементами нам надо использовать метод .each()
            //// сохраняем контекст ($this будет ссылаться на объект jQuery)
           // if (options) { // если в функцию передали опции
                //метод .extend() сливает два объекта, заменяя совпадающие свойства, которые есть в объекте settings
				//новыми свойствами из объекта options и возвращает измененный settings
				//$.extend(settings, options);
            //} // определяем переменные для этого плагина
            var $promoslider = container.children(':first'); //// находим первого потомка
            //(хз будет ли работать тк у меня еще и нав есть, буду разбираться), т.е. <ul>
            var itemWidth = $promoslider.children().outerWidth(); // находим ширину одного элемента внутри нашего контейнера
            var itemsTotal = $promoslider.children().length; // определяем сколько всего элементов у нашей карусели
            var running = false; // флаг, который хранит информацию о том проигрывается ли анимация на данный момент
            var intID = null; // ID интервала (нужен для сброса интервала)

            // присваиваем необходимые стили для элементов карусели
			// сначала для контейнера
			container.css({
				'position': 'relative', // необходимо для нормального отображения в ИЕ6(7)
				'overflow': 'hidden', // прячем все, что не влезает в контейнер
				'width': settings.visible * itemWidth + 'px' // ширину контейнера ставим равной ширине всех видимых элементов
			});
			// потом для внутреннего элемента
			$promoslider.css({
				'position': 'relative', // относительное позиционирование нужно для того, чтобы можно было использовать сдвиг влево
				'width': 9999 + 'px', // ставим ширину побольше, чтобы точно влезли все элементы
				'left': 0 // устанавливаем нулевой левый сдвиг
			});
			// параметр направления dir(boolean) - false(сдедующий), true(предыдущий)
			function slide(dir) {
			// выбираем направление в зависимости от переданного параметра (влево или вправо)
			    var direction = !dir ? -1 : 1;
			    var leftIndent = 0; // левое смещение (для <ul>)
			    if (!running) { // если анимация завершена (или еще не запущена)
			        running = true; // ставим флажок, что анимация в процессе
			        if (intID) { // если запущен интервал
						window.clearInterval(intID); // очищаем интервал
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