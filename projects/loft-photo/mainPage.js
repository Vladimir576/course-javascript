import pages from './pages';
import model from './model';
import profilePage from './profilePage';
// import { ModuleFilenameHelpers } from 'webpack';


export default {
  async getNextPhoto() {
    const { friend, id, url } = await model.getNextPhoto();
    this.setFriendAndPhoto(friend, id, url);
  },

  setFriendAndPhoto(friend, id, url) {

    const componentPhoto = document.querySelector('.component-photo');
    const componentHeaderPhoto = document.querySelector('.component-header-photo');
    const componentHeaderName = document.querySelector('.component-header-name');
    const componentFooterPhoto = document.querySelector('.component-footer-photo');

    this.friend = friend; //


    let userAvatar;
    let userInfoPromise = new Promise(async (resolve, reject) => {
      try {
        resolve();
        let userInfo = await model.getUsers();
        console.log('userInfoMainPage', userInfo)
        userAvatar = userInfo[0].photo_50;
        componentFooterPhoto.style.backgroundImage = `url(${userAvatar})`
        componentFooterPhoto.style.backgroundPosition = 'center';
        console.log(userAvatar)
      }
      catch (error) {
        reject(error)
      }
    });
    userInfoPromise
      .then(() => { console.log('UserInfoPromise successful') })
      .catch(() => console.warn('UserInfoPromise take error',))

    componentPhoto.style.backgroundImage = `url(${url})`;
    componentHeaderPhoto.style.backgroundImage = `url(${friend.photo_50})`;
    componentHeaderName.textContent = `${friend.first_name ?? ""} ${friend.last_name ?? ""}`;

  },




  handleEvents() {
    let startI;
    const self = this;
    document.querySelector('.component-photo').addEventListener('touchstart', function (e) {
      e.preventDefault();
      startI = { y: e.changedTouches[0].pageY };
    });

    document.querySelector('.component-photo').addEventListener('touchend', async function (e) {
      const direction = e.changedTouches[0].pageY - startI.y;
      if (direction < 0) {
        await self.getNextPhoto();
      }
    });

    // 

    // let callAllPhotos = model.getPhotos();
    // console.log(callAllPhotos)

    document.querySelector('.component-header-photo').addEventListener('click', () => {
      profilePage.setUser(this.friend)
      pages.openPage('profile')
    });

    document.querySelector('.component-footer-photo').addEventListener('click', () => {
      profilePage.setUser(model.authUser[0])
      pages.openPage('profile')
    });
    // 

  },
};

