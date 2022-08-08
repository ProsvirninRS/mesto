import './index.css'; // добавьте импорт главного файла стилей
import { buttonOpenEdit, buttonAddLocation, formNewLocation, formEdit } from '../utils/constants.js'
import { Card } from '../components/Card.js';
import { FormValidator  , formConfig } from '../components/FormValidator.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithConfirm } from '../components/PopupWithConfirm.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api, apiConfig} from '../components/Api.js';

// Колбэк открытия большой картинки
const handleCardClick = ({ name , link }) => {
  popupWithImage.open({ name, link });
  };

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
  descriptionSelector: '.profile__description'
});

// // Экземпляр класса попапа добавления новой карточки
// const popupWithFormLocation = new PopupWithForm({popupSelector: '.popup_type_new-location',
//   handleFormSubmit : (inputValues) => {
//     const newLocationInfo = {
//       name: inputValues.title,
//       link: inputValues.url
//     };
//     cardSection.prependItem(createCard(newLocationInfo))
//   }
// });
// popupWithFormLocation.setEventListeners();

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






// //колбэк клика на кнопку удаления карточки
// function handleClickDeleteCard (card, cardId)
//   {popupDeleteCard.openPopup(card, cardId)}

//Создание класса API
const api = new Api(apiConfig);




// const initUserData = api.getInitialProfile()
//   .then((res) => { userInfo.setUserInfo(res) })
//   .catch((err) => { console.log(err) })

// const InitCards = api.getInitialCards()
//   .then((res) => { cardSection.renderItems(res) })
//   .catch((err) => { console.log(err) })
//Изменение класса UserInfo

//Изменение класса Section


// //Создание исходных данных для загрузки от сервера
// const initUserData = api.getUserData()
//   .then((res) => userData.initUserInfo(res));
// const InitCards = api.getCards();

Promise.all([api.getInitialProfile(), api.getInitialCards()])
  .then(([userInfos, cards]) => {
    userInfo.setUserInfo(userInfos);
    // userInfo.setUserInfo(res[0]);
    // cardSection.renderItems(res[1]);

    // cards.reverse()
    cardSection.renderItems(cards.reverse());
  })
  .catch((err) => console.log(err));



// //попап с формой редактирования профиля
// const popupEditProfile = new PopupWithForm ({popupSelector: '.popup_type_edit',
// handleFormSubmit: (data) => {
//   api.updateUserData(data)
//     .then((res) => userData.setUserInfo(res))
//     .then(() => popupEditProfile.closePopup())
//     .catch((err) => console.log(err))
//     .finally(() => popupEditProfile.renderLoading(false))
// }
// });

// //попап с формой добавления карточки пользователем
// const popupAddCard = new PopupWithForm ({popupSelector: '.popup_type_confirm',
//   handleFormSubmit: (newCardData) => {
//     api.addNewCard(newCardData)
//       .then((res) => {
//         const userNewCard = createCard(res);
//         cardGallery.addItem(userNewCard);
//       })
//       .then(() => popupAddCard.closePopup())
//       .finally(() => popupAddCard.renderLoading(false))
//   }
// })

// // попап подтверждения удаления
// const popupDeleteCard = new PopupWithConfirm ({popupSelector: '.popup_type_confirm',
//   handleFormSubmit: (removedCard, cardId) => {
//     api.removeCardData(cardId)
//       .then(() => removedCard.remove())
//       .then(() => popupDeleteCard.closePopup())
//       .catch((err) => console.log(err))
//   }
// });
// popupDeleteCard.setEventListeners();

// //попап обновления аватара
// const popupUpadateAvatar = new PopupWithForm ({popupSelector: '.popup_type_update-avatar',
//   handleFormSubmit: (avatar) => {
//     api.updateUserAvatar(avatar)
//       .then((data) => {
//         userData.updateUserAvatar(data);
//       })
//       .then(() => popupUpadateAvatar.closePopup())
//       .catch((err) => console.log(err))
//       .finally(() => popupUpadateAvatar.renderLoading(false))
//   }
// });
// popupUpadateAvatar.setEventListeners();

// updateAvatarBtn.addEventListener('click', handleClickUpadateBtn);
