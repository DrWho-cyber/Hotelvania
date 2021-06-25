const roomsArea = document.querySelector(".roomsArea");
const hotelsName = document.querySelector(".hotelsName");
const btnGenerate = document.querySelector(".btn-info");
const cart = document.querySelector(".fa-cart-plus");
var input = document.querySelector("#formFileMultiple");
var roomType1 = "standard";
var price1 = 100 + " $";
var roomType2 = "King room";
var price2 = 150 + " $";
var roomType3 = "Delux";
var price3 = 200 + " $";
cart.innerHTML = 0;
const hotelsArray = [];
var ref = firebase.database().ref("Hotels").on('value', function (response) {
    response.forEach(function (item) {
        hotelsArray.push(generateFirebaseItem(item.key, item.val()));
    });
});

console.log(hotelsArray);

function genarateRooms() {
   
    for (let i = 0; i < hotelsArray.length; i++) {
        
        if (window.localStorage.getItem('currentHotelId') == hotelsArray[i].id) {
            window.localStorage.setItem('hotelsArrayId', i);
            hotelsName.innerHTML = hotelsArray[i].data.HotelName;
            for (let j = 0; j < hotelsArray[i].data.picturesArr.length; j++) {
      
                if (j % 2 == 0) {

                    roomsArea.innerHTML += `
        <section class="hotelCard card" style="width: 15rem; border: none;">
        <img src="${hotelsArray[i].data.picturesArr[j]}" alt="...">
        <div class="card-body">
        <h5 class="card-title"><strong>${roomType1}</strong></h5>
        <p>${price1}</p>
        <button type="button" class="btn btn-success" id="${j}" onclick="reserveRoom(this.id, 100)">Reserve</button>
        </div>
      </div>`} else if (j % 3 == 0) {
                    roomsArea.innerHTML += `
        <section class="hotelCard card" style="width: 15rem; border: none;">
        <img src="${hotelsArray[i].data.picturesArr[j]}" alt="...">
        <div class="card-body">
        <h5 class="card-title"><strong>${roomType2}</strong></h5>
        <p>${price2}</p>
        <button type="button" class="btn btn-success" id="${j}" onclick="reserveRoom(this.id, 150)">Reserve</button>
        </div>
      </div>`
                } else {
                    roomsArea.innerHTML += `
        <section class="hotelCard card" style="width: 15rem; border: none;">
        <img src="${hotelsArray[i].data.picturesArr[j]}" alt="...">
        <div class="card-body">
        <h5 class="card-title"><strong>${roomType3}</strong></h5>
        <p>${price3}</p>
        <button type="button" class="btn btn-success" id="${j}" onclick="reserveRoom(this.id, 200)">Reserve</button>
        </div>
      </div>`
                }
            }
        }
    }

}

var newHotelPicArray = [];

function reserveRoom(id, price) {
    let curhotelId = window.localStorage.getItem('currentHotelId');
    const btnBackColor = document.getElementById(id);
    let hotelsArrayId = window.localStorage.getItem('hotelsArrayId');
    let element = hotelsArray[hotelsArrayId].data.picturesArr.splice(id, 1).toString();
    console.log(element)
    let obj = {
          id: curhotelId,
          name:element,
          price: price,
        }
    console.log(obj)
    console.log(btnBackColor != "blue")
    if (btnBackColor.style.backgroundColor != "blue"){
    btnBackColor.style.backgroundColor = "blue";
    newHotelPicArray.push(obj);
    console.log(newHotelPicArray)
    cart.innerHTML++
    } else if (btnBackColor.style.backgroundColor == "blue") {
        btnBackColor.style.backgroundColor = "rgb(40, 167, 69)";
        newHotelPicArray.pop(obj);
        console.log(newHotelPicArray)
        cart.innerHTML--
    } else {};
}