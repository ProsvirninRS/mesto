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
const bottonCloseEditPopup = popupEditProfile.querySelector('.popup__close-button');//кнопка закрыть попап редактирования
const bottonCloseAddLocationPopup = popupNewLocation.querySelector('.popup__close-button');//кнопка закрыть попап новой локации
const bottonCloseBigImgPopup = popupBigImg.querySelector('.popup__close-button');//кнопка закрыть попап большой картинки
const template = document.querySelector('#element-template');                    //template

//функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

//функция закрытия попапа
function closePopup(event) {
  event.target.closest('.popup').classList.remove('popup_opened');
}

//функция лайка
function likeListItem(event) {
  event.target.classList.toggle('element__like_active');
}

//функция удаления локации
function removeListItem(event) {
  event.target.closest(".element").remove();
}

//функция открытия большой картинки
function openPopupBigImg(event) {
  const imgElement = event.target;
  const titleElement = imgElement.nextElementSibling.querySelector('.element__title');
  const popupImg = document.querySelector('.popup__image');
  const popupCaption = document.querySelector('.popup__caption');
  popupImg.src = imgElement.src;
  popupImg.alt = imgElement.alt;
  popupCaption.textContent = titleElement.textContent;
  openPopup(popupBigImg);
}

//функция сохранения попапа редактирования
function submitFormEditPopup (event) {
  event.preventDefault();
  profileName.textContent = inputPopupNameProfile.value;
  profileDescription.textContent = inputPopupDecriptionProfile.value;
  popupEditProfile.classList.remove('popup_opened');
}

// функция создания копии содержимого template
function cloneTemplate(container) {
  const templateContent = container.content;
  const newTemplateContent = templateContent.cloneNode(true);
  return newTemplateContent;
}

// функция создания начальных карточек
function renderItem (item) {
  const arrayName = item.name;
  const arrayLink = item.link;
  const newCard = addLocation (arrayName, arrayLink);
  setTemplateListeners (newCard);
  locationContainer.append(newCard); //вставили содержимое в конце контейнера
}

//функция добавления данных карточки в template
function addLocation (arrayName, arrayLink) {
  const newCard = cloneTemplate(template); //клонировали содержимое template
  newCard.querySelector('.element__title').textContent = arrayName;
  const photoElement = newCard.querySelector('.element__photo');
  photoElement.src = arrayLink; //наполнили содержимым массива
  photoElement.alt = arrayName;
  return newCard;
}

//функция сохранения попапа новой локации
function submitFormNewLocationPopup (event) {
  event.preventDefault();
  const arrayName = inputPopupTitleLocation.value;
  const arrayLink = inputPopupUrlLocation.value;
  const addedLocation = addLocation (arrayName, arrayLink);
  setTemplateListeners(addedLocation);
  locationContainer.prepend(addedLocation); //вставили содержимое в начале контейнера
  popupNewLocation.classList.remove('popup_opened');
}

//функция перебора массива
function renderList(array) {
  array.forEach(function(item) {
    renderItem(item);
  });
}

//слушатель кнопки редактировать
//функция открытия попапа редактирования
buttonOpenEditPopup.addEventListener('click', function () {
  inputPopupNameProfile.value = profileName.textContent;
  inputPopupDecriptionProfile.value = profileDescription.textContent;
  openPopup(popupEditProfile);
});

//слушатель кнопки добавить локацию
//функция открытия попапа новая локация
buttonAddLocation.addEventListener('click', function () {
  inputPopupTitleLocation.value = '';
  inputPopupUrlLocation.value = '';
  openPopup(popupNewLocation);
});

//слушатели для всех элементов template
function setTemplateListeners (element) {
  const likeButtonElement = element.querySelector(".element__like");
  likeButtonElement.addEventListener("click", likeListItem);
  const removeButtonElement = element.querySelector(".element__del");
  removeButtonElement.addEventListener("click", removeListItem);
  const openBigImgElement = element.querySelector(".element__photo");
  openBigImgElement.addEventListener("click", openPopupBigImg);
}

renderList(initialCards);
formNewLocationPopup.addEventListener('submit', submitFormNewLocationPopup);//слушатель кнопки сохранения попапа новой локации
formEditPopup.addEventListener('submit', submitFormEditPopup);//слушатель кнопки сохранения попапа редактирования
bottonCloseEditPopup.addEventListener("click", closePopup);//слушатель закрытия попапа редактирования
bottonCloseAddLocationPopup.addEventListener("click", closePopup);//слушатель закрытия попапа новой локации
bottonCloseBigImgPopup.addEventListener("click", closePopup);//слушатель закрытия попапа большой картинки
