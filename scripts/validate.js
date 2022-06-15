const resetFormValidation = (formElement, formConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(formConfig.inputSelector));
  const buttonElement = formElement.querySelector(formConfig.submitButtonSelector);
  inputList.forEach((inputElement) => {
    hideInputError (formElement, inputElement, formConfig);
    toggleButtonState (inputList, buttonElement, formConfig);
  });
};

const showInputError = (formElement, inputElement, errorMessage, formConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add(formConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(formConfig.errorClass);
};

const hideInputError = (formElement, inputElement, formConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove(formConfig.inputErrorClass);
  errorElement.classList.remove(formConfig.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, formConfig) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, formConfig);
  } else {
    hideInputError(formElement, inputElement, formConfig);
  }
};

const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, formConfig) => {
  // Если есть хотя бы один невалидный инпут
if (hasInvalidInput(inputList)) {
  buttonElement.classList.add(formConfig.inactiveButtonClass);
  buttonElement.setAttribute('disabled', true);
} else {
  buttonElement.classList.remove(formConfig.inactiveButtonClass);
  buttonElement.removeAttribute('disabled');
};
};

const setEventListeners = (formElement, formConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(formConfig.inputSelector));
  const buttonElement = formElement.querySelector(formConfig.submitButtonSelector);

  // чтобы проверить состояние кнопки в самом начале
  toggleButtonState(inputList, buttonElement, formConfig);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, formConfig);
      // чтобы проверять его при изменении любого из полей
      toggleButtonState(inputList, buttonElement, formConfig);
    });
  });
};

const enableValidation = (formConfig) => {
  const formList = Array.from(document.querySelectorAll(formConfig.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, formConfig);
  });
};

// включение валидации вызовом enableValidation
// все настройки передаются при вызове

const formConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__span_visible',
};

enableValidation(formConfig);
