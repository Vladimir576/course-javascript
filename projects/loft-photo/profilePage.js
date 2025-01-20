import model from './model';
import mainPage from './mainPage';
import pages from './pages';

export default {
  async setUser(user) {
    // console.log('SetUser - User', user);
    const photoComp = document.querySelector('.component-user-info-photo');
    const photosComp = document.querySelector('.component-user-photos');
    const nameComp = document.querySelector('.component-user-info-name');
    const photos = await model.getPhotos(user.id);

    // console.log('PhotosSetUser - photos', photos)

    this.user = user;
    photoComp.style.backgroundImage = `url(${user.photo_100})`;
    nameComp.innerText = `${user.first_name ?? ''} ${user.last_name ?? ''}`;

    photosComp.innerHTML = "";

    for (let photo of photos.items) {

      let trueSize = await model.findSize(photo);

      this.trueSizeUrl = trueSize.url;
      this.trueSizeId = photo.id;

      let element = document.createElement('div');
      element.style.backgroundImage = `url(${this.trueSizeUrl})`;
      element.dataset.id = this.trueSizeId;

      element.classList.add('component-user-photo');

      element.addEventListener('click', async (e) => {
        mainPage.setFriendAndPhoto(this.user, photo.id, trueSize.url);
      })

      photosComp.append(element);

    }

  },



  handleEvents() {
    document
      .querySelector('.component-user-photos')
      .addEventListener('click', async (e) => {
        if (e.target) {
          // mainPage.setFriendAndPhoto(this.user, this.trueSizeId, this.trueSizeUrl);
          pages.openPage('main');
        }
        // console.log('Попытка 1');
        // mainPage.setFriendAndPhoto(this.user, this.trueSizeId, this.trueSizeUrl);
        // console.log('Попытка 2')
      })

    // let currentClickPhoto = new Promise((resolve, reject) => {
    // this.document.querySelector('.component-user-photo').addEventListener('click', () => {
    // pages.openPage('main')
    // })
    // });
    // currentClickPhoto
    // .then(() => { console.log(' successful') })


    // currentClickPhoto.addEventListener('click', async()=> {
    // pages.openPage('main');
    // })

    document.querySelector('.page-profile-back').addEventListener('click', async () => {
      pages.openPage('main');
    })

    document.querySelector('.page-profile-exit').addEventListener('click', async () => {
      model.logout();
      pages.openPage('login');
    })

  },
};
