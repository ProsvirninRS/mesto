class Card {

  constructor(item, templateSelector, handleCardClick, handleClickDeleteCard, addLike, removeLike, userId) {
    this._cardItem = item;
    this._name = item.name;
    this._link = item.link;
    this._likes = item.likes;
    this._count = item.likes.length;
    this._ownerId = item.owner._id;
    this._cardId = item._id
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleClickDeleteCard = handleClickDeleteCard;
    this._addLike = addLike;
    this._removeLike = removeLike;
    this._userId = userId;
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

  // _likeListItem() {
  //   this._like.classList.toggle('element__like_active');
  // }

  _handleImageClick = () => {
    this._handleCardClick({name: this._name, link: this._link});
  };

  _setEventListeners() {
    this._like.addEventListener('click', () => {
      if (this._likes.some((item) => item['_id'] === this._userId))
        { this._removeLike(this._cardId, ) }
      else { this._addLike(this._cardId) }
      }
    );
    this._del.addEventListener('click', () => {
      this._handleClickDeleteCard(this._element, this._cardId);
    });
    this._photo.addEventListener('click', () => {
      this._handleImageClick();
    });
  }

  generateCard() {
    this._element = this._getTemplate();

    this._del = this._element.querySelector('.element__del');
    this._like = this._element.querySelector('.element__like');
    this._photo = this._element.querySelector('.element__photo');
    this._title = this._element.querySelector('.element__title');
    this._likeCounter = this._element.querySelector('.element__like-counter');

    this._setEventListeners();

    if (this._ownerId !== this._userId) {
      this._del.classList.add('element__del_hide');
    }

    if (this._likes.some((item) => item['_id'] === this._userId)) {
      this._like.classList.add('element__like_active')
    }

    this._title.textContent = this._name;
    this._photo.src = this._link;
    this._photo.alt = this._name;
    this._likeCounter.textContent = this._count;

    // this._renderLikesCounter(this._likes, this._likeCounter)

    return this._element;
  }

};

export {Card};
