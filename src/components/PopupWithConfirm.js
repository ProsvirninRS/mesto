import {Popup} from './Popup.js';

class PopupWithConfirm extends Popup {

  constructor({popupSelector, handleConfirm}) {
    super(popupSelector);
    this._handleConfirm = handleConfirm;
    this._form = this._popup.querySelector('.popup__form_type_confirm');
  }

  open(removedCard, idDeletedCard) {
    super.open();
    this._removedCard = removedCard;
    this._idDeletedCard = idDeletedCard;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleConfirm({removedCard: this._removedCard, idDeletedCard: this._idDeletedCard});
    })
  }
}

export {PopupWithConfirm}
