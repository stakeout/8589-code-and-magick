'use strict';
var setupBlock = document.querySelector('.setup');

setupBlock.classList.remove('hidden');
setupBlock.querySelector('.setup-similar').classList.remove('hidden');

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARDS_COUNT = 4;

var getRandomValue = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

function createArrayOfObjects(number) {
  var wizards = [];
  for (var i = 0; i < number; ++i) {
    var wizard = {
      name: getRandomValue(NAMES) + ' ' + getRandomValue(SURNAMES),
      coatColor: getRandomValue(COAT_COLOR),
      eyesColor: getRandomValue(EYES_COLOR)
    };
    wizards[i] = wizard;
  }
  return wizards;
}

// создания DOM-элемента
function renderWizard(item) {
  var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item'); // шаблон, который будем клонировать
  var wizardElement = wizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = item.name;
  wizardElement.querySelector('.wizard-coat').style.fill = item.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = item.eyesColor;

  return wizardElement;
}

function getFragment(array) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < array.length; ++i) {
    fragment.appendChild(renderWizard(array[i]));
  }
  return fragment;
}

function renderWizards(arrObjects) {
  var setupSimilarList = setupBlock.querySelector('.setup-similar-list'); // эл-т, куда вставляем похожих магов
  setupSimilarList.appendChild(getFragment(arrObjects));
}

renderWizards(createArrayOfObjects(WIZARDS_COUNT));
