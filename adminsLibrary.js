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
        const idForUserCategoryBtn = hotelsArray[i].id + 1;
        console.log(userCategory);
        adminCardsArea.innerHTML += `
        <section class="hotelCard card" style="width: 37.7rem">
        <img class="${hotelsArray[i].id}" src="${hotelsArray[i].data.profPicture[0]}" alt="...">
        <div class="uploadProfile">
            <label for="${hotelsArray[i].id}"><i class="fas fa-camera"></i></label>
            <input type="file" class="form-control-file uploadFile" id="${hotelsArray[i].id}" onchange="pictureUpload(this.id, event)">
        </div>
        <div class="card-body">
          <h5 class="card-title"><strong>${HotelName}</strong></h5>
          <p class="card-text"><strong>Email:</strong> ${email}</p>
          <p class="card-text"><strong>Phone:</strong> ${phone}</p>
          <h6>About hotel</h6>
          <p class="card-text" style="text-align:justify; width:300px">${about}</p>
          <p class="card-text"><strong>Adress:</strong> ${address}</p>
          <button type="button" id="${idForUserCategoryBtn}" class="btn btn-primary" onclick="changeStatus(this.id)"></button>
          <button type="button" class="btn btn-danger" id="${hotelsArray[i].id}" onclick="deleteHotel(this.id)">Delete</button>
          <button type="button" class="btn btn-primary" id="${hotelsArray[i].id}" onclick="getHotelInfo(this.id)">Update Info</button>
          <a href="rooms.html" class="btn btn-success" id="${hotelsArray[i].id}" onclick="saveIdInLocalStorage(this.id)">rooms</a>
        </div>
      </div>
      </section>`


        let element = document.getElementById(`${idForUserCategoryBtn}`);
        if (userCategory == 0) {
            element.innerHTML = "User";
            element.style.backgroundColor = "blue";
        } else {
            element.innerHTML = "VIP";
            element.style.backgroundColor = "rgb(255,204,51)";
            element.style.color = "blue";
        }
    }

}


function changeStatus(id) {
    let element = document.getElementById(`${id}`);
    let hotelId = id.slice(0, -1)
    console.log(hotelId)
    if (element.innerHTML == "User") {
        element.innerHTML = "VIP";
        element.style.backgroundColor = "rgb(255,204,51)";
        element.style.color = "blue";
        firebase.database().ref('Hotels/' + hotelId).update({userCategory: 1});
    } else {
        element.value = 0;
        element.innerHTML = "User";
        element.style.backgroundColor = "blue";
        element.style.color = "white";
        firebase.database().ref('Hotels/' + hotelId).update({userCategory: 0});
    };
}
function creatHotelUserCategory(userCategory) {
    return {
        userCategory: userCategory
    };
}


function saveIdInLocalStorage(id){
    window.localStorage.setItem('currentHotelId', id);
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

    firebase.database().ref('Hotels/' + hotelId).update(creatHotelUser(email, HotelName, address, phone, about));
    swal("succesful update!", "data changed!", "success")
}

function creatHotelUser(email, HotelName, address, phone, about) {
    return {
        email: email,
        HotelName: HotelName,
        address: address,
        phone: phone,
        about: about
    };
}

var input = document.querySelector("#formFileMultiple");

var picturesArr = [];


function pictureUpload(id, event) {
    if (event.target.files.length > 0) {
        let src
        console.log(src = URL.createObjectURL(event.target.files[0]));
        console.log(event.target.files[0]);
        console.log($(`.${id}`).attr("src", src));
        firebase.database().ref('Hotels/' + id + "/profPicture/0").set(`${src}`);

        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = function () {
            let profPicture = [];
            profPicture.push(reader.result);
            firebase.database().ref('Hotels/' + id + "/profPicture/0").set(`${profPicture[0]}`);
        }
    }

}

function creatHotelUserProfPic(profPicture) {
    return {
        profPicture: profPicture
    };
}

input.addEventListener("change", function () {
    for (let i = 0; i < this.files.length; i++) {
        const reader = new FileReader();
        reader.readAsDataURL(this.files[i]);
        reader.onload = function () {
            picturesArr.push(reader.result);
            console.log(picturesArr);
        }
    }
});

