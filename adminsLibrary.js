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

        const email = hotelsArray[i].data.email;
        const HotelName = hotelsArray[i].data.HotelName;
        const address = hotelsArray[i].data.address;
        const phone = hotelsArray[i].data.phone;
        const about = hotelsArray[i].data.about;
        const userCategory = hotelsArray[i].data.userCategory;


        adminCardsArea.innerHTML += `
        <section class="hotelCard card" style="width: 37.7rem">
        <img src="${hotelsArray[i].data.profPicture[0]}" alt="...">
        <div class="card-body">
          <h5 class="card-title"><strong>${HotelName}</strong></h5>
          <p class="card-text"><strong>Email:</strong> ${email}</p>
          <p class="card-text"><strong>Phone:</strong> ${phone}</p>
          <h6>About hotel</h6>
          <p class="card-text" style="text-align:justify; width:300px">${about}</p>
          <p class="card-text"><strong>Adress:</strong> ${address}</p>
          <a href="#" class="btn btn-primary">${userCategory}</a>
          <button type="button" class="btn btn-danger" id="${hotelsArray[i].id}" onclick="deleteHotel(this.id)">Delete</button>
          <button type="button" class="btn btn-success" id="${hotelsArray[i].id}" onclick="getHotelInfo(this.id)">Info</button>
        </div>
      </div>
      </section>`

        //  for (let j = 0; j < hotelsArray[i].data.picturesArr.length; j++) {
        //             adminCardsArea.innerHTML += `<section class="hotelCard card" style="width: -15rem; border: none;">
        //             <img src="${hotelsArray[i].data.picturesArr[j]}" alt="...">`
        //         }

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

function getHotelInfo(id) {

    for (let i = 0; i < hotelsArray.length; i++) {
        if (hotelsArray[i].id == id) {
            const hotelId = hotelsArray[i].id
            const email = hotelsArray[i].data.email;
            const HotelName = hotelsArray[i].data.HotelName;
            const address = hotelsArray[i].data.address;
            const phone = hotelsArray[i].data.phone;
            const about = hotelsArray[i].data.about;

            $("#hotelId").val(hotelId);
            $("#userName").val(HotelName);
            $("#address1").val(address);
            $("#email").val(email);
            $("#phone").val(phone);
            $('#about1').val(about);

        }

    }

}


function updateItems() {
    const hotelId = $("#hotelId").val();
    const HotelName = $("#userName").val();
    const address = $("#address1").val();
    const email = $("#email").val();
    const phone = $("#phone").val();
    const about = $('#about1').val();
console.log(email, HotelName, address, phone, about)
    firebase.database().ref('Hotels/' + hotelId).update(creatHotelUser(email, HotelName, address, phone, about));
    swal("succesful update!", "data changed!", "success")
}

function creatHotelUser(email, HotelName, address, phone, about) {
    return {
        email: email,
        HotelName: HotelName,
        address: address,
        phone: phone,
        about: about,
        
    };
}