var input = document.querySelector("#formFileMultiple");
var inputProfile = document.querySelector("#uploadFile");
var picturesArr = [];
var profPicture = [];

inputProfile.addEventListener("change", function () {
        
        const reader = new FileReader();
        reader.readAsDataURL(this.files[0]);
        reader.onload = function () {
            profPicture.push(reader.result);
            console.log(profPicture);
        }
    
});

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

function creatNewHotelinf() {
    var unicId = Math.floor(Math.random() * 1000000000000 + Math.random() * 1000000000000 + Math.random() * 1000000000000 + Math.random() * 1000000000000 + Math.random() * 1000000000000 + Math.random() * 1000000000000 + Math.random() * 1000000000000 + Math.random() * 1000000000000);
    const email = $("#email").val();
    const HotelName = $("#HotelName").val();
    const address = $("#address").val();
    const phone = $("#tel").val();
    const about = $("#textarea").val();
    const userCategory = $("#select").val();

    if (email == "" || HotelName == "" || address == "" || phone == "" || about == "") {
        alert("All feilds are required!, please try again!")
    } else {
        firebase.database().ref("Hotels/" + unicId).set(creatHotelUser(email, HotelName, address, phone, about, userCategory, picturesArr, profPicture));
        alert("Registered!");
    }
     picturesArr = [];
     profPicture = [];
    $("#HotelRegistration")[0].reset();
}


function creatHotelUser(email, HotelName, address, phone, about, userCategory, picturesArr, profPicture) {
    return {
        email: email,
        HotelName: HotelName,
        address: address,
        phone: phone,
        about: about,
        userCategory: userCategory,
        picturesArr: picturesArr,
        profPicture: profPicture
    };
}


function generateHotelsForAmin(){
    window.location.href = "adminsLibrary.html";
}

