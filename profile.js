function getItems() {
    var userLocalStorage = window.localStorage.getItem('user');
    var passwordLocalStorage = window.localStorage.getItem('pass');

    var usersArray = [];
    var ref = firebase.database().ref("Users").on('value', function (response) {
        response.forEach(function (item) {
            usersArray.push(generateFirebaseItem(item.key, item.val()));
        });
    });

    for (let i = 0; i < usersArray.length; i++) {
        if (usersArray[i].data.username == userLocalStorage && usersArray[i].data.password == passwordLocalStorage) {

            var user = usersArray[i].data.username;
            var pass = usersArray[i].data.password;
            var email = usersArray[i].data.mail;
            var phone = usersArray[i].data.phone;
            $("#userName").val(user);
            $("#password").val(pass);
            $("#email").val(email);
            $("#phone").val(phone);
          
        }

    }

}



function updateItems() {
    var userLocalStorage = window.localStorage.getItem('user');
    var passwordLocalStorage = window.localStorage.getItem('pass');
    var usersArray = [];
    var ref = firebase.database().ref("Users").on('value', function (response) {
        response.forEach(function (item) {
            usersArray.push(generateFirebaseItem(item.key, item.val()));
        });
    });

    for (let i = 0; i < usersArray.length; i++) {
        if (usersArray[i].data.username == userLocalStorage && usersArray[i].data.password == passwordLocalStorage) {
           
            var user = $("#userName").val();
            var pass = $("#password").val();
            var phone = $("#phone").val();
            var email = $("#email").val();
            
            firebase.database().ref('Users/' + usersArray[i].id).update(creatUser(user, pass, phone, email));
            window.localStorage.setItem('user', user);
            window.localStorage.setItem('pass', pass);
            swal("succesful update!", "data changed!", "success");
        }

    }

}

function signOut() {
        window.localStorage.setItem('tempId', '');
        window.location.href = "index.html"
}

function deletProfile(){

    var userLocalStorage = window.localStorage.getItem('user');
    var passwordLocalStorage = window.localStorage.getItem('pass');
    var usersArray = [];
    var ref = firebase.database().ref("Users").on('value', function (response) {
        response.forEach(function (item) {
            usersArray.push(generateFirebaseItem(item.key, item.val()));
        });
    });

    for (let i = 0; i < usersArray.length; i++) {
        if (usersArray[i].data.username == userLocalStorage && usersArray[i].data.password == passwordLocalStorage) {
            firebase.database().ref('Users/'+ usersArray[i].id).remove();
            window.localStorage.setItem('user', "");
            window.localStorage.setItem('pass', "");
            window.localStorage.setItem('tempId', '');
            swal("Data deleted!", "come back soon!", "success");
            window.location.href = "index.html"
            
        }

    }

    
}