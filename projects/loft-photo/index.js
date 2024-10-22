
var random = function getRandomElement(array) {
    var randomIndex = parseInt(Math.random() * array.length)
    return array[randomIndex]
}



function getNextPhoto() {
    // friendsDB = Массив объектов,где в одном объекте информация об одном человека
    var randomFriend = random(friendsDB)


    var friendFirsName = randomFriend.firstName;
    
    var friendURL = randomFriend.avatar;
    return {
        name: friendFirsName,
        avatar: friendURL
    }

}


