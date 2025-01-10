try {
  VK.init({
    apiId: 52910378
  });
  console.log("ApiID проинициализированны успешны")
} catch (error) {
  console.error("ApiId инициализация не удалась", error);
}

import getNextPhoto from "./mainPage"

export default {
  getRandomElement(array) {
    var randomIndex = parseInt(Math.random() * array.length);
    return array[randomIndex]
  },

  async getNextPhoto() {
    //  friend, id, url 
    console.log('Вызов вообще ее')
    // 
    const friend = this.getRandomElement(this.friends.items);
    console.log('Возврат во friend:', friend);
    // return { friend: 'egor', id:'2005', url:'gregurl' }

    const photo = await this.getFriendPhotos(friend.id);
    console.log('Возврат фото', photo);

    

  },

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

      }, 2);

    });
  },

  async init() { // {fields: 'city, country, photo_100'} один из параметров
    // params.v = "5.195";
    // return new Promise((resolve, reject) => {
    //   VK.api(method = 'friends.get', params, (data) => {
    //     if (data.error) {
    //       reject(data.error);
    //     } else {
    //       resolve(data.response);
    //     }
    //   })
    // })

    this.friends = await this.getFriends();
    console.log(this.friends);

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

  callApi(method, params) {
    params.v = "5.195";
    return new Promise((resolve, reject) => {
      VK.api(method, params, (data) => {
        if (data.error) {
          reject(data.error);
        } else {
          resolve(data.response);
        }
      })
    })
  },


  photoCache: {},
  friends: {},

  // getFriendPhotos Третья задача
  // возможность получать список фотографий друга (в методе getFriendPhotos)
  async getFriendPhotos(id) {

    const photos = this.photoCache[id];
    
    if (photos) {
      return photos;
    }


    // photos = await this.callApi("photos.get", { user_id: id })

    // let filteredPhotos = [];

    // photos.items.forEach(iterationPhotos => {
    //   for (let size of iterationPhotos.sizes) {
    //     if (size.width >= 360) {
    //       filteredPhotos.push(size.url);
    //       break;
    //     }
    //   }
    // });

    // this.photoCache[id] = filteredPhotos;
    const photosResult = await this.getPhotos(id);
    // console.log('После')
    console.log('Вызов photosResult',photosResult)
    this.photoCache[id] = photosResult;
    return photosResult;


  },

};


