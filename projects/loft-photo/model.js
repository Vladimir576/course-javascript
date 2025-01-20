import getNextPhoto from "./mainPage"
import pages from "./pages";

try {
  VK.init({
    apiId: 51763030
  });
  console.log("ApiID проинициализированны успешны")
} catch (error) {
  console.error("ApiId инициализация не удалась", error);
}

export default {

  login() {
    return new Promise((resolve, reject) => {
      VK.Auth.login((response) => {
        if (response) {
          resolve(response);
          console.log("Вход в аккаунт успешно завершен")
        } else {
          reject(response);
          console.warn("Вход в аккаунт провален")
        }
        console.log("Вывод response из login()", response);
      }, 2 | 4);
    });
  },

  logout() {
    return new Promise((resolve) => {
      VK.Auth.revokeGrants(resolve);
    })
  },

  callApi(method, params) {
    params.v = "5.199";
    return new Promise((resolve, reject) => {
      VK.api(method, params, (data) => {
        if (data.error) {
          reject(data.error);
        } else {
          resolve(data.response);
          // console.log('data.rasponse', data.response)
        }
      })
    })
  },

  async init() {
    this.friends = await this.getFriends();
    console.log('Вывод friends', this.friends)

    let me = await this.getUsers();
    this.authUser = me;
    console.log("Мои данные объект:", this.authUser);
  },



  async getNextPhoto() {

    const friend = this.getRandomElement(this.friends.items);
    const photos = await this.getFriendPhotos(friend.id);

    if (photos.items.length === 0) {
      return {
        friend, id: friend.id, url: "https://mirtex.ru/wp-content/uploads/2023/04/unnamed.jpg"
      }
    }

    const photo = this.getRandomElement(photos.items);
    const sizePhoto = this.findSize(photo);

    return {
      friend, id: photo.id, url: sizePhoto.url
    }

  },

  getRandomElement(array) {
    var randomIndex = parseInt(Math.random() * array.length);
    return array[randomIndex]
  },

  async getFriendPhotos(id) {

    const photos = this.photoCache[id];

    if (photos) {
      return photos;
    }

    const photosResult = await this.getPhotos(id);
    this.photoCache[id] = photosResult;

    return photosResult;

  },


  getPhotos(id) {
    const params = {
      owner_id: id
    }
    return this.callApi('photos.getAll', params)
  },

  getFriends() {
    const params = {
      fields: ['photo_50', 'photo_100'],
    }
    return this.callApi('friends.get', params)
  },

  photoCache: {},
  friends: {},

  findSize(photo) {
    const size = photo.sizes.find((size) => size.width >= 360);
    if (!size) {
      return photo.sizes.reduce((biggest, current) => {
        if (current.width > biggest.width) {
          return current;
        }
        return biggest;
      }, photo.sizes[0]);
    }
    return size;
  },

  // getFriends() {}, -- пока что закоментированна потому что не сделана и ломает код из за этого

  getUsers(ids) {

    const params = {
      fields: ['photo_50', 'photo_100'],
    }

    if (ids) {
      params.user_ids = ids;
    }

    return this.callApi('users.get', params)
  },
};


