import pages from './pages';
import model from './model';

export default {
  async getNextPhoto() {
    const { friend, id, url } = await model.getNextPhoto();
    this.setFriendAndPhoto(friend, id, url);
  },

  setFriendAndPhoto(friend, id, url) {

    const componentPhoto = document.querySelector('.component-photo');
    const componentHeaderPhoto = document.querySelector('.component-header-photo');
    const componentHeaderName = document.querySelector('.component-header-name');



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
  },
};

