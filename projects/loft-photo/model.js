try {
  VK.init({
    apiId: 51763030
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

    const photos = await this.getFriendPhotos(friend.id);
    console.log('Возврат фото', photos);



    if (photos.items.length === 0) {
      return {
        friend, id: friend.id, url: "https://mirtex.ru/wp-content/uploads/2023/04/unnamed.jpg"
      }
    }

    const photo = this.getRandomElement(photos.items);
    const sizePhoto = this.findSize(photo);
    console.log('Eto sizePhoto', sizePhoto)
    return {
      friend, id: photo.id, url: sizePhoto.url
    }
    // console.log("suka", photo)


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

      }, 2 | 4);

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
    params.v = "5.199";
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


  // findSize() {
  //   let filteredPhoto = [];

  //   photos.items.forEach(iterationPhotos => {
  //     for (let size of iterationPhotos.sizes) {
  //       if (size.width >= 360) {
  //         filteredPhoto.push(size.url);
  //         break;
  //       }
  //     }
  //   });

  //   this.photoCache[id] = filteredPhotos;
  // },

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

  // getFriendPhotos Третья задача
  // возможность получать список фотографий друга (в методе getFriendPhotos)
  async getFriendPhotos(id) {

    const photos = this.photoCache[id];

    if (photos) {
      return photos;
    }




    const photosResult = await this.getPhotos(id);
    // console.log('После')
    // console.log('Вызов photosResult',photosResult)
    this.photoCache[id] = photosResult;
    return photosResult;


  },

};


