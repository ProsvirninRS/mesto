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

function renderList(data) {
  data.forEach(item => renderItem())
  }

function renderItem(text) {

}

renderList(initialCards);


// let buttonEdit = document.querySelector('.profile__edit-button');                //кнопка редактировать
// let popupEdit = document.querySelector('.popup__type_edit');                     //попап редактировать
// let formElement = document.querySelector('.popup__form');                        //форма попап редактировать
// let closeButton = document.querySelector('.popup__close-button');                //форма попап кнопка закрыть
// let profileName = document.querySelector('.profile__name');                      //профиль имя
// let profileDescription = document.querySelector('.profile__description');        //профиль описание
// let inputNameProfile = document.querySelector('.popup__input_profile_name');     //попап ввод имя профиль
// let inputDecriptionProfile = document.querySelector('.popup__input_profile_description');//попап ввод описание профиль
// let elements = document.querySelector('.elements');
// let popupNewLocation = document.querySelector('.popup__type_new-location');//попап новая локация
// let popupBigImg = document.querySelector('.popup__type_big-img');          //попап большая картинка
// let buttonAddLocation = document.querySelector('.profile__add-button');    //кнопка добавить локацию
// let inputLocationTitle = document.querySelector('.popup__input_location_title'); //попап ввод название локации
// let inputLocationUrl = document.querySelector('.popup__input_location_url');     //попап ввод URL локации

// //слушатель кнопки редактировать
// //функция открытия попапа редактирования
// buttonEdit.addEventListener('click', function () {
//   popupEdit.classList.add('popup_opened');
//   inputNameProfile.value = profileName.textContent;
//   inputDecriptionProfile.value = profileDescription.textContent;
// });

// //слушатель кнопки добавить локацию
// //функция открытия попапа новая локация
// buttonAddLocation.addEventListener('click', function () {
//   popupNewLocation.classList.add('popup_opened');
//   inputLocationTitle.value = '';
//   inputLocationUrl.value = '';
// });

// //функция закрытия попапа редактирования
// function closePopup () {
//   popupEdit.classList.remove('popup_opened');
// }

// //слушатель кнопки закрытия попапа редактирования
// closeButton.addEventListener('click', closePopup);

// //функция сохранения попапа редактирования
// function formSubmitHandler (evt) {
//   evt.preventDefault();
//   profileName.textContent = inputNameProfile.value;
//   profileDescription.textContent = inputDecriptionProfile.value;
//   closePopup ();
// }
// //слушатель кнопки сохранения попапа редактирования
// formElement.addEventListener('submit', formSubmitHandler);

// //функция добавления элеметов из массива
// function addElement (nameCard, linkCard) {
//   let elementTemplate = document.querySelector('#element-template').content; //присвоили содержимое template
//   const cloneElement = elementTemplate.querySelector('.element').cloneNode(true); //клонировали содержимое template

//   cloneElement.querySelector('.element__title').textContent = nameCard;
//   cloneElement.querySelector('.element__photo').src = linkCard; //наполнили содержимым массива
//   cloneElement.querySelector('.element__photo').alt = nameCard;

//   elements.append(cloneElement); //вставили содержимое в конце контейнера
// }

// цикл обработки массива
// for (var i = 0; i < initialCards.length; i++) {
//   addElement (initialCards[i].name, initialCards[i].link);
// }
