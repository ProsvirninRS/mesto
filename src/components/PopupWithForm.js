import {Popup} from './Popup.js';

class PopupWithForm extends Popup {

  constructor({popupSelector, handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._submitBtn = this._popup.querySelector('.popup__save-button');

  }

  loading(bool) {
    if (bool) {  this._submitBtn.textContent = 'Сохранение...' }
    else {  this._submitBtn.textContent = 'Сохранить' }
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form = this._popup.querySelector('.popup__form');
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.loading(true);
      this._handleFormSubmit(this._getInputValues());
    });
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}

export {PopupWithForm};
