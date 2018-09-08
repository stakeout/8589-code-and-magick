'use strict';

var CLOUD_WIDTH = 420; // ширина облака
var CLOUD_HEIGHT = 270; // высота облака
var CLOUD_POSITION_X = 100; // горизонтальная координата облака
var CLOUD_POSITION_Y = 10; // вертикальная координата облака
var STEP = 10; // смещение тени относительно координат облака
var FONT_STEP = 15; // расстояние между строк
var HISTOGRAM_HEIGHT = 150; // высота гистограммы
var BAR_WIDTH = 40; // ширина столбика
var BAR_STEP = 50; // расстояние между столбиками
var TEXT = 'Ура! Вы победили!';
var TEXT_TITLE = 'Список результатов:';
var TEXT_COLOR = '#000';
var RED = 'rgba(255, 0, 0, 1)';
var RGBA_BLACK_0_7 = 'rgba(0, 0, 0, .7)';
var WHITE_COLOR = '#fff';

// Функция отрисовки облака
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

// Функция нахождения максимального элемента в массиве

var getMaxOfArray = function (array) {
  return Math.max.apply(null, array);
};

// Функция отрисовки текста

var renderText = function (ctx, color, font, textBaseline, text, x, y) {
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.textBaseline = textBaseline;
  ctx.fillText(text, x, y);
};

// Функция нахождения случайного оттенка

var getBlueShade = function () {
  return 'rgba(0, 0, 255, ' + Math.random() + ')';

};

// Функция отрисовки столбиков

var renderBar = function (ctx, color, name, time, index, barHeight, x) {
  var positionX = x + BAR_STEP + (BAR_WIDTH + BAR_STEP) * index;
  ctx.fillStyle = color;
  ctx.fillRect(positionX, CLOUD_HEIGHT - barHeight - STEP * 2, BAR_WIDTH, barHeight);
  ctx.fillStyle = TEXT_COLOR;
  ctx.fillText(name, positionX, CLOUD_HEIGHT - STEP);
  ctx.fillText(time, positionX, CLOUD_HEIGHT - barHeight - STEP * 5);
};


window.renderStatistics = function (ctx, names, times) {

  renderCloud(ctx, CLOUD_POSITION_X + STEP, CLOUD_POSITION_Y + STEP, RGBA_BLACK_0_7);

  renderCloud(ctx, CLOUD_POSITION_X, CLOUD_POSITION_Y, WHITE_COLOR);

  renderText(ctx, TEXT_COLOR, '16px PT Mono', 'top', TEXT, CLOUD_POSITION_X + STEP * 3, CLOUD_POSITION_Y + STEP * 1.5);

  renderText(ctx, TEXT_COLOR, '16px PT Mono', 'top', TEXT_TITLE, CLOUD_POSITION_X + STEP * 3, CLOUD_POSITION_Y + STEP * 1.5 + FONT_STEP);

  var maxTime = getMaxOfArray(times);

  for (var i = 0; i < names.length; i++) {
    var barHeight = HISTOGRAM_HEIGHT * times[i] / maxTime;
    var barColor = names[i] === 'Вы' ? RED : getBlueShade();
    renderBar(ctx, barColor, names[i], Math.floor(times[i]), i, barHeight, CLOUD_POSITION_X);
  }
};

