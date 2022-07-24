import { initialCards } from './cards.js';
import { Card } from './Card.js';
import { FormValidator  , formConfig } from './FormValidator.js';

const buttonOpenEditPopup = document.querySelector('.profile__edit-button');    //кнопка открыть попап редактировать
const buttonAddLocation = document.querySelector('.profile__add-button');       //кнопка открыть попап новой локации
const profileName = document.querySelector('.profile__name');                   //профиль имя
const profileDescription = document.querySelector('.profile__description');     //профиль описание
const inputPopupNameProfile = document.querySelector('.popup__input_name_name');//попап ввод имени профиля
const inputPopupDecriptionProfile = document.querySelector('.popup__input_name_description');//попап ввод описания профиля
const locationContainer = document.querySelector('.elements');                  //контейнер для локаций
const inputPopupTitleLocation = document.querySelector('.popup__input_name_title');//попап ввод названия новой локации
const inputPopupUrlLocation = document.querySelector('.popup__input_name_url'); //попап ввод URL новой локации
const formNewLocationPopup = document.querySelector('.popup__form_type_new-location');//форма попапа новой локации
const formEditPopup = document.querySelector('.popup__form_type_edit');         //форма попапа редактирования
const popupNewLocation = document.querySelector('.popup_type_new-location');    //попап новая локация
const popupEditProfile = document.querySelector('.popup_type_edit');            //попап редактировать
const popupBigImg = document.querySelector('.popup_type_big-img');              //попап большая картинка
const popupImg = document.querySelector('.popup__image');                       //картинка с попапа с большой картинкой
const popupCaption = document.querySelector('.popup__caption');                 //подпиьсь на попапе с большой картинкой
const allPopups = document.querySelectorAll('.popup');                          //массив всех попапов

//функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscClosePopup);
}

//функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscClosePopup);
}

//функция закрытия попапов по Escape
function handleEscClosePopup(evt) {
  if (evt.key === 'Escape') {
    allPopups.forEach(popup => {
      if(popup.classList.contains('popup_opened')) {
        closePopup(popup);
      };
    });
  };
};

//функция сохранения попапа редактирования
function submitFormEditPopup (event) {
  event.preventDefault();
  profileName.textContent = inputPopupNameProfile.value;
  profileDescription.textContent = inputPopupDecriptionProfile.value;
  closePopup(popupEditProfile);
}

//функция сохранения попапа новой локации
function submitFormNewLocationPopup (event) {
  event.preventDefault();
  const newLocationInfo = {
    name: inputPopupTitleLocation.value,
    link: inputPopupUrlLocation.value
  }
  const newCard = new Card(newLocationInfo, '#element-template', handleOpenViewPopup);
  const cardElement = newCard.generateCard();
  locationContainer.prepend(cardElement); //вставили содержимое в начале контейнера
  closePopup(popupNewLocation);
}

//слушатель кнопки редактировать
//функция открытия попапа редактирования
buttonOpenEditPopup.addEventListener('click', function () {
  inputPopupNameProfile.value = profileName.textContent;
  inputPopupDecriptionProfile.value = profileDescription.textContent;
  const formEditValid = new FormValidator(formConfig, formEditPopup);
  formEditValid.enableValidation();
  formEditValid.resetFormValidation();
  openPopup(popupEditProfile);
});

//слушатель кнопки добавить локацию
//функция открытия попапа новая локация
buttonAddLocation.addEventListener('click', function () {
  formNewLocationPopup.reset();
  const formNewLocationValid = new FormValidator(formConfig, formNewLocationPopup);
  formNewLocationValid.enableValidation();
  formNewLocationValid.resetFormValidation();
  openPopup(popupNewLocation);
});

//открытие большой картинки
const handleOpenViewPopup = ({ name, link }) => {
  popupImg.src = link;
  popupImg.alt =  name;
  popupCaption.textContent = name;
  openPopup(popupBigImg);
  };

formNewLocationPopup.addEventListener('submit', submitFormNewLocationPopup);//слушатель кнопки сохранения попапа новой локации
formEditPopup.addEventListener('submit', submitFormEditPopup);//слушатель кнопки сохранения попапа редактирования

// закрытие попапов при клике по оверлэй или крестику
allPopups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target === evt.currentTarget) {
          closePopup(evt.target);
        };
        if (evt.target.classList.contains('popup__close-button')) {
          closePopup(popup)
        };
    });
});

// отрисовка начальных карточек
initialCards.forEach((item) => {
  const newCard = new Card(item, '#element-template', handleOpenViewPopup);
  const cardElement = newCard.generateCard();
  locationContainer.append(cardElement);
});
