class Card {
  constructor(item, templateSelector, handleCardClick, handleClickDeleteCard,
     userId, handleLikeClick) {

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
      this._userId = userId;
      this._handleLikeClick = handleLikeClick;

  }
  // Проверка есть ли лайк юзера на карточке
  isMyCard() {
    return this._likes.some((item) => {return this._userId === item._id})
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

  _handleImageClick = () => {
    this._handleCardClick({name: this._name, link: this._link});
  };

  _setEventListeners() {
    this._like.addEventListener('click', () => {
      this._handleLikeClick(this, this._cardId);
    }
    );
    this._del.addEventListener('click', () => {
      this._handleClickDeleteCard(this._element, this._cardId);
    });
    this._photo.addEventListener('click', () => {
      this._handleImageClick();
    });
  }

  like(data) {
    this._like.classList.toggle('element__like_active');
    this._likeCounter.textContent = data.likes.length;
    this._isLiked = !this._isLiked;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._del = this._element.querySelector('.element__del');
    this._like = this._element.querySelector('.element__like');
    this._photo = this._element.querySelector('.element__photo');
    this._title = this._element.querySelector('.element__title');
    this._likeCounter = this._element.querySelector('.element__like-counter');

    if (this._ownerId !== this._userId) {
      this._del.classList.add('element__del_hide');
    } else {
      this._del.classList.remove('element__del_hide');
    }

    this._isLiked = this.isMyCard();

    if (this._isLiked) {
      this._like.classList.add('element__like_active');
    } else {
      this._like.classList.remove('element__like_active');
    }

    this._title.textContent = this._name;
    this._photo.src = this._link;
    this._photo.alt = this._name;
    this._likeCounter.textContent = this._count;

    this._setEventListeners();
    return this._element;
  }

};

export {Card};
