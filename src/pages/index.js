import './index.css'; // добавьте импорт главного файла стилей
import { buttonOpenEdit, buttonAddLocation, buttonEditAvatar, formNewLocation, formEdit, formUpdateAvatar} from '../utils/constants.js'
import { Card } from '../components/Card.js';
import { FormValidator  , formConfig } from '../components/FormValidator.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithConfirm } from '../components/PopupWithConfirm.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api, apiConfig} from '../components/Api.js';


//Создание класса API
const api = new Api(apiConfig);

Promise.all([api.getInitialProfile(), api.getInitialCards()])
  .then(([serverProfile, serverCards]) => {
    userInfo.setUserInfo(serverProfile);
    cardSection.renderItems(serverCards.reverse());
  })
  .catch((err) => console.log(err));

// Экземпляр класса отрисовки карточек на странице
const cardSection = new Section({
  renderer: (item) => {
    cardSection.prependItem(createCard(item));
   },
  containerSelector: '.elements'
});

// Экземпляр класса информации о пользователе
const userInfo = new UserInfo({
  avatarSelector: '.profile__avatar',
  nameSelector: '.profile__name',
  descriptionSelector: '.profile__description',
});

// Экземпляр класса попапа большой картинки
const popupWithImage = new PopupWithImage({popupSelector: '.popup_type_big-img'});
popupWithImage.setEventListeners();

// Экземпляр класса для валидации формы редактирования
const formEditValid = new FormValidator(formConfig, formEdit);
formEditValid.enableValidation();

// Экземпляр класса для валидации формы добавления новой карточки
const formNewLocationValid = new FormValidator(formConfig, formNewLocation);
formNewLocationValid.enableValidation();

// Экземпляр класса для валидации формы замены аватара
const formUpdateAvatarValid = new FormValidator(formConfig, formUpdateAvatar);
formUpdateAvatarValid.enableValidation();

//слушатель кнопки редактировать
//функция открытия попапа редактирования
buttonOpenEdit.addEventListener('click', () => {
  const profile = userInfo.getUserInfo();
  popupWithFormProfile.setInputValues(profile);
  formEditValid.resetFormValidation();
  popupWithFormProfile.open();
});

//слушатель кнопки добавить локацию
//функция открытия попапа новая локация
buttonAddLocation.addEventListener('click', function () {
  formNewLocationValid.resetFormValidation();
  popupWithFormLocation.open();
});

//слушатель кнопки заменить аватар
//функция открытия попапа заменить аватар
buttonEditAvatar.addEventListener('click', function () {
  formNewLocationValid.resetFormValidation();
  popupEditAvatar.open();
});

// Экземпляр класса попапа замены аватара
const popupEditAvatar = new PopupWithForm({popupSelector: '.popup_type_update-avatar',
  handleFormSubmit: ({url}) => {
      api.updateUserAvatar({url})
        .then((res) => userInfo.setUserInfo(res))
        .then(() => popupEditAvatar.close())
        .catch((err) => console.log(err))
        .finally(() => popupEditAvatar.loading(false))
  }
});
popupEditAvatar.setEventListeners();

// Экземпляр класса попапа редактирования данных о пользователе
const popupWithFormProfile = new PopupWithForm({popupSelector: '.popup_type_edit',
  handleFormSubmit: ({name, description}) => {
      api.updateUserData({name, description})
        .then((res) => userInfo.setUserInfo(res))
        .then(() => popupWithFormProfile.close())
        .catch((err) => console.log(err))
        .finally(() => popupWithFormProfile.loading(false))
  }
});
popupWithFormProfile.setEventListeners();

// Экземпляр класса попапа добавления новой карточки
const popupWithFormLocation = new PopupWithForm({popupSelector: '.popup_type_new-location',
  handleFormSubmit : (inputValues) => {
    const newLocationInfo = {
      name: inputValues.title,
      link: inputValues.url
    };
    api.addNewCard(newLocationInfo)
      .then((data) => {
        cardSection.prependItem(createCard(data))
      })
      .then(() => popupWithFormLocation.close())
      .catch((err) => console.log(err))
      .finally(() => popupWithFormLocation.loading(false))
  }
});
popupWithFormLocation.setEventListeners();

// Экземпляр класса попапа подвержения удаления карточки
const popupDeleteCard = new PopupWithConfirm ({
  popupSelector: '.popup_type_confirm',
  handleConfirm: ({removedCard, idDeletedCard}) => {
    api.deleteCard(idDeletedCard)
      .then(() => removedCard.remove())
      .then(() => popupDeleteCard.close())
      .catch((err) => console.log(err));
  }
})
popupDeleteCard.setEventListeners();


// Функция создания новой карточки для вставки в DOM
function createCard(item) {
  const newCard = new Card(item, '#element-template', handleCardClick,  handleClickDeleteCard,
   userInfo._id, handleLikeClick, isMyCard);
  const cardElement = newCard.generateCard();
  return cardElement
}

// Колбэк проверки стоит лайк юзера на карточке или нет
const isMyCard = (cards) => {
  return cards.some((item) => {return userInfo._id === item._id})
}

// Колбэк открытия большой картинки
const handleCardClick = ({ name , link }) => {
  popupWithImage.open({ name, link });
  };

  //колбэк клика на кнопку удаления карточки
const handleClickDeleteCard = (removedCard, idDeletedCard) => {
  popupDeleteCard.open(removedCard, idDeletedCard)
}

// Колбэк установки/снятия лайков
const handleLikeClick = (card, cardId) => {
  if (!card._isLiked) {
    api.likeCard(cardId)
      .then((data) => card.like(data))
      .catch((err) => console.log(err));
  }
  else {
    api.deleteLikeCard(cardId)
      .then((data) => card.like(data))
      .catch((err) => console.log(err));
  }

}
