'use strict';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLOR = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARDS_COUNT = 4;

var FIREBALL_COLOR = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var userAvatar = document.querySelector('.setup-open');
var setup = document.querySelector('.setup');
var setupFormClose = setup.querySelector('.setup-close');
var userNameInput = setup.querySelector('.setup-user-name');
setup.querySelector('.setup-similar').classList.remove('hidden');

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
var renderWizard = function (item) {
  var wizardElement = wizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = item.name;
  wizardElement.querySelector('.wizard-coat').style.fill = item.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = item.eyesColor;

  return wizardElement;
};

var getFragment = function (arrayOfWizards) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arrayOfWizards.length; ++i) {
    fragment.appendChild(renderWizard(arrayOfWizards[i]));
  }
  return fragment;
};

var renderWizards = function (arrayOfWizardObjects) {
  var setupSimilarList = setup.querySelector('.setup-similar-list'); // эл-т, куда вставляем похожих магов
  setupSimilarList.appendChild(getFragment(arrayOfWizardObjects));
};

renderWizards(getArrayOfObjects(WIZARDS_COUNT));

// module4-task1
var wizard = setup.querySelector('.setup-player');
var wizardCoat = wizard.querySelector('.setup-wizard .wizard-coat');
var wizardEyes = wizard.querySelector('.setup-wizard .wizard-eyes');
var coatColorInput = wizard.querySelector('input[name="coat-color"]');
var eyesColorInput = wizard.querySelector('input[name="eyes-color"]');
var fireballColorInput = wizard.querySelector('input[name="fireball-color"]');

var wizardCoatClickHandler = function () {
  var color = getRandomValueFromArray(COAT_COLOR);
  wizardCoat.style.fill = color;
  coatColorInput.value = color;
};

var wizardEyesClickHandler = function () {
  var color = getRandomValueFromArray(EYES_COLOR);
  wizardEyes.style.fill = color;
  eyesColorInput.value = color;
};

var changeWizardAttributesColor = function (e) {
  var target = e.target;
  var color = getRandomValueFromArray(FIREBALL_COLOR);
  if (target.className === 'setup-fireball') {
    target.parentNode.style.background = color;
    fireballColorInput.value = color;
  } else if (target.classList.contains('wizard-coat')) {
    wizardCoatClickHandler();
  } else if (target.classList.contains('wizard-eyes')) {
    wizardEyesClickHandler();
  }
};

var popupPressEscHandler = function (e) {
  if (e.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', popupPressEscHandler);
  userNameInput.addEventListener('focus', function () {
    document.removeEventListener('keydown', popupPressEscHandler);
  });
  userNameInput.addEventListener('blur', function () {
    document.addEventListener('keydown', popupPressEscHandler);
  });
  wizard.addEventListener('click', function (e) {
    changeWizardAttributesColor(e);
  });
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', popupPressEscHandler);
  wizard.removeEventListener('click', function (e) {
    changeWizardAttributesColor(e);
  });
};

setupFormClose.addEventListener('click', function () {
  closePopup();
});

setupFormClose.addEventListener('keydown', function (e) {
  if (e.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

userAvatar.addEventListener('click', function () {
  openPopup();
});

userAvatar.addEventListener('keydown', function (e) {
  if (e.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});
