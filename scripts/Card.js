class Card {

  constructor(item, templateSelector, handleOpenViewPopup) {
    this._name = item.name;
    this._link = item.link;
    this._templateSelector = templateSelector;
    this._handleOpenViewPopup = handleOpenViewPopup;
  }

  _getTemplate() {
    // забираем разметку из HTML и клонируем элемент
      const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    // вернём DOM-элемент карточки
      return cardElement;
  }

  _likeListItem() {
    this._like.classList.toggle('element__like_active');
  }

  _removeListItem() {
    this._element.remove();
  }

  _handleImageClick = () => {
    this._handleOpenViewPopup({name: this._name, link: this._link});
  };

  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._likeListItem();
    });
    this._element.querySelector('.element__del').addEventListener('click', () => {
      this._removeListItem();
    });
    this._element.querySelector('.element__photo').addEventListener('click', () => {
      this._handleImageClick();
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._like = this._element.querySelector('.element__like');
    this._setEventListeners();

    this._element.querySelector('.element__title').textContent = this._name;
    const photoElement = this._element.querySelector('.element__photo');
    photoElement.src = this._link;
    photoElement.alt = this._name;

    return this._element;
  }
};

export {Card};
