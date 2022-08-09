import {Popup} from './Popup.js';

class PopupWithConfirm extends Popup {

  constructor({popupSelector, handleConfirm}) {
    super(popupSelector);
    this._handleConfirm = handleConfirm;
    this._buttonConfirm = this._popup.querySelector('.popup__save-button');
  }

  open(removedCard, idDeletedCard) {
    super.open();
    this._removedCard = removedCard;
    this._idDeletedCard = idDeletedCard;
  }

  setEventListeners() {
    super.setEventListeners();
    this._buttonConfirm.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._handleConfirm({removedCard: this._removedCard, idDeletedCard: this._idDeletedCard});
    })
  }
}

export {PopupWithConfirm}
