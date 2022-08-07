class UserInfo {

  constructor({avatarSelector, nameSelector, descriptionSelector}) {
    this._avatar = document.querySelector(avatarSelector);
    this._nameProfile = document.querySelector(nameSelector);
    this._descriptionProfile = document.querySelector(descriptionSelector);
  }

  getUserInfo() {
    const profile = {};
    profile.name = this._nameProfile.textContent;
    profile.description = this._descriptionProfile.textContent;
    return profile;
  }

  setUserInfo(res) {
    this._avatar.src = res.avatar;
    this._nameProfile.textContent = res.name;
    this._descriptionProfile.textContent = res.about;
    this._id = res._id;
  }
}

export {UserInfo};
