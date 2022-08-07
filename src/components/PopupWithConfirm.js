import {Popup} from './Popup.js';

class PopupWithConfirm extends Popup {

  constructor({popupSelector, handleConfirm}) {
    super(popupSelector);
    this._handleConfirm = handleConfirm;
    this._buttonConfirm = this._popup.querySelector('.popup__save-button');
  }

  openPopup(removedCard, idDeletedCard) {
    super.openPopup();
    this._removedCard = removedCard;
    this._idDeletedCard = idDeletedCard;
  }

  setEventListeners() {
    super.setEventListeners();
    this._buttonConfirm.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._handleConfirm(this._removedCard, this._idDeletedCard);
    });
  }
}

export {PopupWithConfirm}
