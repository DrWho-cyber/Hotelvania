const adminCardsArea = document.querySelector(".adminCardsArea");
const hotelsArray = [];
var ref = firebase.database().ref("Hotels").on('value', function (response) {
    response.forEach(function (item) {
        hotelsArray.push(generateFirebaseItem(item.key, item.val()));
    });
});

console.log(hotelsArray);

function getItems() {
    for (let i = 0; i < hotelsArray.length; i++) {

        var email = hotelsArray[i].data.email;
        var HotelName = hotelsArray[i].data.HotelName;
        var address = hotelsArray[i].data.address;
        var phone = hotelsArray[i].data.phone;
        var about = hotelsArray[i].data.about;
        var userCategory = hotelsArray[i].data.userCategory;
        for (let j = 0; j < hotelsArray[i].data.picturesArr.length; j++) {
            adminCardsArea.innerHTML += `<section class="hotelCard card" style="width: 15rem; border: none;">
            <img src="${hotelsArray[i].data.picturesArr[j]}" alt="...">`
        }
        adminCardsArea.innerHTML += `
        <div class="card-body">
          <h5 class="card-title">${HotelName}</h5>
          <p class="card-text">Email: ${email}</p>
          <p class="card-text">Phone: ${phone}</p>
          <h6>About hotel</h6>
          <p class="card-text">${about}</p>
          <p class="card-text">Adress: ${address}</p>
          <a href="#" class="btn btn-primary">${userCategory}</a>
          <button type="button" class="btn btn-danger" id="${hotelsArray[i].id}" onclick="deleteHotel(this.id)">Delete</button>
        </div>
      </div>
      </section>
       
`


    }

}





function deleteHotel(id) {
    firebase.database().ref('Hotels/' + id).remove();
    window.localStorage.setItem('hotelId', '');
    swal("Data deleted!", "come back soon!", "success")
        .then((value) => {
            window.location.href = "adminsLibrary.html"
        });
}

