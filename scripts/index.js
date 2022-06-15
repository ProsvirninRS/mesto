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
const template = document.querySelector('#element-template');                    //template
const popupImg = document.querySelector('.popup__image');                        //картинка с попапа с большой картинкой
const popupCaption = document.querySelector('.popup__caption');                  //подпиьсь на попапе с большой картинкой
const allPopups = document.querySelectorAll('.popup');                           //массив всех попапов

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

//функция лайка
function likeListItem(event) {
  event.target.classList.toggle('element__like_active');
}

//функция удаления локации
function removeListItem(event) {
  event.target.closest(".element").remove();
}

//функция открытия большой картинки
function openPopupBigImg(titleElement, imgElement) {
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
  closePopup(popupEditProfile);
}

// функция создания копии содержимого template
function cloneTemplate(container) {
  const templateContent = container.content;
  const newTemplateContent = templateContent.cloneNode(true);
  return newTemplateContent;
}

// функция создания начальных карточек
function renderItem (object) {
  const newCard = createLocation (object);
  locationContainer.append(newCard); //вставили содержимое в конце контейнера
}

//функция добавления данных карточки в template
function createLocation (object) {
  const newCard = cloneTemplate(template); //клонировали содержимое template
  newCard.querySelector('.element__title').textContent = object.name;
  const photoElement = newCard.querySelector('.element__photo');
  photoElement.src = object.link; //наполнили содержимым массива
  photoElement.alt = object.name;
  setTemplateListeners (newCard);
  return newCard;
}

//функция сохранения попапа новой локации
function submitFormNewLocationPopup (event) {
  event.preventDefault();
  const newLocationInfo = {
    name: inputPopupTitleLocation.value,
    link: inputPopupUrlLocation.value
  }
  const addedLocation = createLocation (newLocationInfo);
  locationContainer.prepend(addedLocation); //вставили содержимое в начале контейнера
  closePopup(popupNewLocation);
}

//функция перебора массива
function renderList(array) {
  array.forEach(renderItem);
  };

//слушатель кнопки редактировать
//функция открытия попапа редактирования
buttonOpenEditPopup.addEventListener('click', function () {
  inputPopupNameProfile.value = profileName.textContent;
  inputPopupDecriptionProfile.value = profileDescription.textContent;
  resetFormValidation (formEditPopup, formConfig);
  openPopup(popupEditProfile);
});

//слушатель кнопки добавить локацию
//функция открытия попапа новая локация
buttonAddLocation.addEventListener('click', function () {
  formNewLocationPopup.reset();
  resetFormValidation (formNewLocationPopup, formConfig);
  openPopup(popupNewLocation);
});

//слушатели для всех элементов template
function setTemplateListeners (element) {
  const likeButtonElement = element.querySelector(".element__like");
  likeButtonElement.addEventListener("click", likeListItem);
  const removeButtonElement = element.querySelector(".element__del");
  removeButtonElement.addEventListener("click", removeListItem);
  const openBigImgElement = element.querySelector(".element__photo");
  openBigImgElement.addEventListener("click", (event) => {
    const imgElement = event.target;
    const titleElement = imgElement.nextElementSibling.querySelector('.element__title');
    openPopupBigImg(titleElement, imgElement);
  });
};

renderList(initialCards);
formNewLocationPopup.addEventListener('submit', submitFormNewLocationPopup);//слушатель кнопки сохранения попапа новой локации
formEditPopup.addEventListener('submit', submitFormEditPopup);//слушатель кнопки сохранения попапа редактирования

//закрытие попапов при клике по оверлэй или крестику
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
