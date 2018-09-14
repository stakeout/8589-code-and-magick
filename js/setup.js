'use strict';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARDS_COUNT = 4;

var setupBlock = document.querySelector('.setup');
setupBlock.classList.remove('hidden');
setupBlock.querySelector('.setup-similar').classList.remove('hidden');

var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item'); // шаблон, который будем клонировать

var getRandomValueFromArray = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getArrayOfObjects = function (wizardsCount) {
  var wizards = [];
  for (var i = 0; i < wizardsCount; ++i) {
    var wizard = {
      name: getRandomValueFromArray(NAMES) + ' ' + getRandomValueFromArray(SURNAMES),
      coatColor: getRandomValueFromArray(COAT_COLOR),
      eyesColor: getRandomValueFromArray(EYES_COLOR)
    };
    wizards.push(wizard);
  }
  return wizards;
};

// создания DOM-элемента
function renderWizard(item) {
  var wizardElement = wizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = item.name;
  wizardElement.querySelector('.wizard-coat').style.fill = item.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = item.eyesColor;

  return wizardElement;
}

function getFragment(arrayOfWizards) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arrayOfWizards.length; ++i) {
    fragment.appendChild(renderWizard(arrayOfWizards[i]));
  }
  return fragment;
}

function renderWizards(arrayOfWizardObjects) {
  var setupSimilarList = setupBlock.querySelector('.setup-similar-list'); // эл-т, куда вставляем похожих магов
  setupSimilarList.appendChild(getFragment(arrayOfWizardObjects));
}

renderWizards(getArrayOfObjects(WIZARDS_COUNT));
