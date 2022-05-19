let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__form');
let closeButton = document.querySelector('.popup__close-button');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__description');


editButton.addEventListener('click', function () {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
});

closeButton.addEventListener('click', function () {
  popup.classList.remove('popup_opened');
});

function formSubmitHandler (evt) {
evt.preventDefault();
profileName.textContent = nameInput.value;
profileDescription.textContent = jobInput.value;
popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);
