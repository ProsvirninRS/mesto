const buttonOpenEdit = document.querySelector('.profile__edit-button');         //кнопка открыть попап редактировать
const buttonAddLocation = document.querySelector('.profile__add-button');       //кнопка открыть попап новой локации
const inputNameProfile = document.querySelector('.popup__input_name_name');     //попап ввод имени профиля
const inputDecriptionProfile = document.querySelector('.popup__input_name_description');//попап ввод описания профиля
const locationContainer = document.querySelector('.elements');                  //контейнер для локаций
const formNewLocation = document.querySelector('.popup__form_type_new-location');//форма попапа новой локации
const formEdit = document.querySelector('.popup__form_type_edit');              //форма попапа редактирования

export { buttonOpenEdit, buttonAddLocation, inputNameProfile,
  inputDecriptionProfile, locationContainer, formNewLocation, formEdit }
