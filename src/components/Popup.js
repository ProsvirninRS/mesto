class Popup {

  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._submitButton = this._popup.querySelector('.popup__save-button');

  }

  renderLoading(bool) {
    this._submitButtonText  = this._submitButton.textContent;
    if (bool) {this._submitButton.textContent = 'Сохранение'}
    else {this._submitButton.textContent = this._submitButtonText}
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      };
      if (evt.target.classList.contains('popup__close-button')) {
        this.close();
      };
    });
  }
}

export {Popup};
