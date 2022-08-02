class UserInfo {

  constructor({nameSelector, descriptionSelector}) {
    this._nameProfile = document.querySelector(nameSelector);
    this._descriptionProfile = document.querySelector(descriptionSelector);
  }

  getUserInfo() {
    const profile = {};
    profile.name = this._nameProfile.textContent;
    profile.description = this._descriptionProfile.textContent;
    return profile;
  }

  setUserInfo({name, description}) {
    this._nameProfile.textContent = name;
    this._descriptionProfile.textContent = description;
  }
}

export {UserInfo};
