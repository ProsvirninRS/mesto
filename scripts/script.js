const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const buttonOpenEditProfile = document.querySelector('.profile__edit-button');  //кнопка редактировать
const buttonAddLocation = document.querySelector('.profile__add-button');       //кнопка добавить локацию
const buttonClosePopup = document.querySelector('.popup__close-button');        //кнопка закрыть попап
const profileName = document.querySelector('.profile__name');                   //профиль имя
const profileDescription = document.querySelector('.profile__description');     //профиль описание
const inputPopupNameProfile = document.querySelector('.popup__input_name_name');//попап ввод имя профиль
const inputPopupDecriptionProfile = document.querySelector('.popup__input_name_description');//попап ввод описание профиль
const locationContainer = document.querySelector('.elements');                  //контейнер для локаций
const inputPopupTitleLocation = document.querySelector('.popup__input_name_title');//попап ввод название локации
const inputPopupUrlLocation = document.querySelector('.popup__input_name_url'); //попап ввод URL локации

//функция закрытия попапа
function closePopup() {
  ThisPopup = document.querySelector('.popup_opened');
  ThisPopup.classList.remove('popup_opened');
}

//функция лайка
function likeListItem(event) {
  let buttonElement = event.target;
  buttonElement.classList.toggle('element__like_active');
}

//функция удаления локации
function removeListItem(event) {
  let buttonElement = event.target;
  let listItemElement = buttonElement.closest(".element");
  listItemElement.remove();
}

//функция открытия большой картинки
function openPopupBigImg(event) {
  const popupBigImg = document.querySelector('.popup_type_big-img');//попап большая картинка
  popupBigImg.classList.add('popup_opened');
  let imgElement = event.target;
  let titleWrapper = imgElement.nextElementSibling;
  let titleElement = titleWrapper.querySelector('.element__title');
  let popupImg = document.querySelector('.popup__image');
  let popupCaption = document.querySelector('.popup__caption');
  popupImg.src = imgElement.src;
  popupImg.alt = imgElement.alt;
  popupCaption.textContent = titleElement.textContent;
  closePopupListener(popupBigImg);
}

//функция сохранения попапа редактирования
function submitFormEditPopup (event) {
  event.preventDefault();
  profileName.textContent = inputPopupNameProfile.value;
  profileDescription.textContent = inputPopupDecriptionProfile.value;
  console.log(profileDescription.textContent);
  closePopup();
}

//функция сохранения попапа новой локации
function submitFormNewLocationPopup (event) {
  event.preventDefault();
  const elementTemplate = document.querySelector('#element-template').content; //присвоили содержимое template
  const cloneElement = elementTemplate.querySelector('.element').cloneNode(true); //клонировали содержимое template
  cloneElement.querySelector('.element__title').textContent = inputPopupTitleLocation.value;
  cloneElement.querySelector('.element__photo').src = inputPopupUrlLocation.value; //наполнили содержимым массива
  cloneElement.querySelector('.element__photo').alt = inputPopupTitleLocation.value;
  templateListeners (cloneElement);
  locationContainer.prepend(cloneElement); //вставили содержимое в начале контейнера
  closePopup();
}

//функция добавления элеметов из массива
function renderItem (item) {
  const elementTemplate = document.querySelector('#element-template').content; //присвоили содержимое template
  const cloneElement = elementTemplate.querySelector('.element').cloneNode(true); //клонировали содержимое template
  cloneElement.querySelector('.element__title').textContent = item.name;
  cloneElement.querySelector('.element__photo').src = item.link; //наполнили содержимым массива
  cloneElement.querySelector('.element__photo').alt = item.name;
  templateListeners (cloneElement);
  locationContainer.append(cloneElement); //вставили содержимое в конце контейнера
}

//функция перебора массива
function renderList(array) {
  array.forEach(function(item) {
    renderItem(item);
  });
}

//слушатель кнопки редактировать
//функция открытия попапа редактирования
buttonOpenEditProfile.addEventListener('click', function () {
  const popupEditProfile = document.querySelector('.popup_type_edit');//попап редактировать
  popupEditProfile.classList.add('popup_opened');
  inputPopupNameProfile.value = profileName.textContent;
  inputPopupDecriptionProfile.value = profileDescription.textContent;
  submitEditPopupListener();
  closePopupListener(popupEditProfile);
});

//слушатель кнопки добавить локацию
//функция открытия попапа новая локация
buttonAddLocation.addEventListener('click', function () {
  const popupNewLocation = document.querySelector('.popup_type_new-location');//попап новая локация
  popupNewLocation.classList.add('popup_opened');
  inputPopupTitleLocation.value = '';
  inputPopupUrlLocation.value = '';
  submitNewLocationPopupListener();
  closePopupListener(popupNewLocation);
});

//слушатель закрытия попапа
function closePopupListener(popup) {
  let thisPopupCloseBotton = popup.querySelector(".popup__close-button");
  thisPopupCloseBotton.addEventListener("click", closePopup);
}

//слушатель кнопки сохранения попапа редактирования
function submitEditPopupListener () {
  const formEditPopup = document.querySelector('.popup__form_type_edit');//форма попапа редактирования
  formEditPopup.addEventListener('submit', submitFormEditPopup);
}

//слушатели для всех элементов template
function templateListeners (cloneElement) {
  let likeButtonElement = cloneElement.querySelector(".element__like");
  likeButtonElement.addEventListener("click", likeListItem);
  let removeButtonElement = cloneElement.querySelector(".element__del");
  removeButtonElement.addEventListener("click", removeListItem);
  let openBigImgElement = cloneElement.querySelector(".element__photo");
  openBigImgElement.addEventListener("click", openPopupBigImg);
}

//слушатель кнопки сохранения попапа новой локации
function submitNewLocationPopupListener () {
  const formNewLocationPopup = document.querySelector('.popup__form_type_new-location');//форма попапа новой локации
  formNewLocationPopup.addEventListener('submit', submitFormNewLocationPopup);
}

renderList(initialCards);
