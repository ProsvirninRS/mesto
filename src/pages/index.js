import './index.css'; // добавьте импорт главного файла стилей
import { buttonOpenEdit, buttonAddLocation, inputNameProfile, inputDecriptionProfile,
   locationContainer, formNewLocation, formEdit } from '../utils/constants.js'
import { initialCards } from '../utils/initialCards.js';
import { Card } from '../components/Card.js';
import { FormValidator  , formConfig } from '../components/FormValidator.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';

// Колбэк открытия большой картинки
const handleCardClick = ({ name , link }) => {
  popupWithImage.open({ name, link });
  };

// Экземпляр класса отрисовки карточек на странице
const cardSection = new Section({
  items: initialCards,
  renderer: (item) =>
    {
      const card = new Card(item, '#element-template', handleCardClick)
      const cardElement = card.generateCard();
      cardSection.addItem(cardElement);
    },
  containerSelector: '.elements'
});
cardSection.renderItems();

// Экземпляр класса информации о пользователе
const userInfo = new UserInfo({nameSelector: '.profile__name',
  descriptionSelector: '.profile__description'});

// Экземпляр класса попапа добавления новой карточки
const popupWithFormLocation = new PopupWithForm({popupSelector: '.popup_type_new-location',
  handleFormSubmit : (inputValues) => {
    const newLocationInfo = {
      name: inputValues.title,
      link: inputValues.url
    };
    locationContainer.prepend(createCard(newLocationInfo)); //вставили содержимое в начале контейнера
  }
});
popupWithFormLocation.setEventListeners();

// Экземпляр класса попапа редактирования данных о пользователе
const popupWithFormProfile = new PopupWithForm({popupSelector: '.popup_type_edit',
  handleFormSubmit: ({name, description}) => {
    userInfo.setUserInfo({name, description});
  }
});
popupWithFormProfile.setEventListeners();

// Экземпляр класса попапа большой картинки
const popupWithImage = new PopupWithImage({popupSelector: '.popup_type_big-img'});
popupWithImage.setEventListeners();

// Экземпляр класса для валидации формы редактирования
const formEditValid = new FormValidator(formConfig, formEdit);
formEditValid.enableValidation();

// Экземпляр класса для валидации формы добавления новой карточки
const formNewLocationValid = new FormValidator(formConfig, formNewLocation);
formNewLocationValid.enableValidation();

// Функция создания новой карточки для вставки в DOM
function createCard(item) {
  const newCard = new Card(item, '#element-template', handleCardClick);
  const cardElement = newCard.generateCard();
  return cardElement
}

//слушатель кнопки редактировать
//функция открытия попапа редактирования
buttonOpenEdit.addEventListener('click', () => {
  const profile = userInfo.getUserInfo();
  inputNameProfile.value = profile.name;
  inputDecriptionProfile.value = profile.description;
  formEditValid.resetFormValidation();
  popupWithFormProfile.open();
});

//слушатель кнопки добавить локацию
//функция открытия попапа новая локация
buttonAddLocation.addEventListener('click', function () {
  formNewLocation.reset();
  formNewLocationValid.resetFormValidation();
  popupWithFormLocation.open();
});







