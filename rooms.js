const roomsArea = document.querySelector(".roomsArea");
const hotelsName = document.querySelector(".hotelsName");
const btnGenerate = document.querySelector(".btn-info");
var input = document.querySelector("#formFileMultiple");
var roomType1 = "standard";
var roomType2 = "King room";
var roomType3 = "Delux";
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
        <button type="button" class="btn btn-danger" id="${j}" onclick="deleteRoom(this.id)">Delete</button>
        </div>
      </div>`} else if (j % 3 == 0) {
                    roomsArea.innerHTML += `
        <section class="hotelCard card" style="width: 15rem; border: none;">
        <img src="${hotelsArray[i].data.picturesArr[j]}" alt="...">
        <div class="card-body">
        <h5 class="card-title"><strong>${roomType2}</strong></h5>
        <button type="button" class="btn btn-danger" id="${j}" onclick="deleteRoom(this.id)">Delete</button>
        </div>
      </div>`
                } else {
                    roomsArea.innerHTML += `
        <section class="hotelCard card" style="width: 15rem; border: none;">
        <img src="${hotelsArray[i].data.picturesArr[j]}" alt="...">
        <div class="card-body">
        <h5 class="card-title"><strong>${roomType3}</strong></h5>
        <button type="button" class="btn btn-danger" id="${j}" onclick="deleteRoom(this.id)">Delete</button>
        </div>
      </div>`
                }
            }
        }
    }

}

function deleteRoom(id) {
    let curhotelId = window.localStorage.getItem('currentHotelId');
    let hotelsArrayId = window.localStorage.getItem('hotelsArrayId');
    let newHotelPicArray = hotelsArray[hotelsArrayId].data.picturesArr
    console.log(newHotelPicArray)
    newHotelPicArray.splice(id, 1);
    firebase.database().ref('Hotels/' + curhotelId + "/picturesArr").set(newHotelPicArray);
    swal("Data deleted!", "success!", "success")
    .then(() => {
      window.location.href="rooms.html";
  });
}


input.addEventListener("change", function () {
    let hotelsArrayId = window.localStorage.getItem('hotelsArrayId');
    let newArr = [];
    newArr = hotelsArray[hotelsArrayId].data.picturesArr;
    newArr.splice();
    for (let i = 0; i < this.files.length; i++) {
        const reader = new FileReader();
        reader.readAsDataURL(this.files[i]);
        reader.onload = function () {
            newArr.push(reader.result);
        } 
        
    }
    
    console.log(typeof(newArr))
  
   swal("Data saved!", "success!", "success")
});


function uploadRooms() {
    let curhotelId = window.localStorage.getItem('currentHotelId');
    let hotelsArrayId = window.localStorage.getItem('hotelsArrayId');
    let newHotelPicArray = hotelsArray[hotelsArrayId].data.picturesArr;
    console.log(newHotelPicArray);
    firebase.database().ref('Hotels/' + curhotelId).update({picturesArr: newHotelPicArray});
    swal("Data uploaded!", "success!", "success").then(() => {
        window.location.href="rooms.html";
    });
}