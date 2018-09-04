'use strict';

var CLOUD_WIDTH = 420; //ширина облака
var CLOUD_HEIGHT = 270; //высота облака
var CLOUD_POSITION_X = 100; //горизонтальная координата облака
var CLOUD_POSITION_Y = 10; //вертикальная координата облака
var STEP = 10; //смещение тени относительно координат облака
var FONT_STEP = 15; //расстояние между строк
var HISTOGRAM_HEIGHT = 150; //высота гистограммы
var BAR_WIDTH = 40; //ширина столбика
var BAR_STEP = 50; //расстояние между столбиками

//Функция отрисовки облака
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + CLOUD_WIDTH / 2, y - STEP);
  ctx.lineTo(x + CLOUD_WIDTH, y);
  ctx.lineTo(x + CLOUD_WIDTH + STEP * 3, y + CLOUD_HEIGHT / 2);
  ctx.lineTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT);
  ctx.lineTo(x + CLOUD_WIDTH / 2, y + CLOUD_HEIGHT + STEP);
  ctx.lineTo(x, y + CLOUD_HEIGHT);
  ctx.lineTo(x - STEP * 3, y + CLOUD_HEIGHT / 2);
  ctx.fill();
};

//Функция нахождения максимального элемента в массиве

var getMaxElement = function (array) {
  var maxElement = 0;
  if (array.length === '') {
    return false;
  }
  for (var i = 0; i < array.length; ++i) {
    maxElement = array[i] > maxElement ? array[i] : maxElement;
  }
  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {

  renderCloud(ctx, CLOUD_POSITION_X + STEP, CLOUD_POSITION_Y + STEP, 'rgba(0, 0, 0, .7)');

  renderCloud(ctx, CLOUD_POSITION_X, CLOUD_POSITION_Y, '#fff');

  ctx.fillStyle = '#000';

  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'top';
  ctx.fillText('Ура! Вы победили!', CLOUD_POSITION_X + STEP * 2, CLOUD_POSITION_Y + STEP * 1.5);
  ctx.fillText('Список результатов:', CLOUD_POSITION_X + STEP * 2, CLOUD_POSITION_Y + STEP * 1.5 + FONT_STEP);


  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; ++i) {
    ctx.fillStyle = 'rgba(0, 0, 255, ' + Math.random() + ')';
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    }
    ctx.fillRect(CLOUD_POSITION_X + BAR_STEP + (BAR_WIDTH + BAR_STEP) * i, CLOUD_HEIGHT - HISTOGRAM_HEIGHT * times[i] / maxTime - STEP * 2, BAR_WIDTH, HISTOGRAM_HEIGHT * times[i] / maxTime);

    ctx.fillStyle = '#000';
    ctx.fillText(names[i], CLOUD_POSITION_X + BAR_STEP + (BAR_WIDTH + BAR_STEP) * i, CLOUD_HEIGHT - STEP);

    ctx.fillText(Math.floor(times[i]), CLOUD_POSITION_X + BAR_STEP + (BAR_WIDTH + BAR_STEP) * i, CLOUD_HEIGHT - HISTOGRAM_HEIGHT * times[i] / maxTime - STEP * 5);
  }
};
