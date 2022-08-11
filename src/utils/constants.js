const buttonOpenEdit = document.querySelector('.profile__edit-button');         //кнопка открыть попап редактировать
const buttonAddLocation = document.querySelector('.profile__add-button');       //кнопка открыть попап новой локации
const formNewLocation = document.querySelector('.popup__form_type_new-location');//форма попапа новой локации
const formEdit = document.querySelector('.popup__form_type_edit');              //форма попапа редактирования
const buttonEditAvatar = document.querySelector('.profile__button');            //кнопка открыть попап замены аватара
const formUpdateAvatar = document.querySelector('.popup__form_type_update-avatar');              //форма попапа замены аватара

const apiConfig = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-46/',
  token: '99d4074a-8cff-4dcb-bc43-c6fec3e71a0e',
  contentType: 'application/json'
};

export { buttonOpenEdit, buttonAddLocation, buttonEditAvatar, formNewLocation,
  formEdit, formUpdateAvatar, apiConfig };
