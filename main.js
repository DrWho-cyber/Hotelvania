function creatUser(username, password, phone, mail){
    return {
      username:username,
      password: password,
      phone: phone,
      mail: mail
    };
  }
  
  
  var firebaseConfig = {
    apiKey: "AIzaSyD91ARO5oNPPPA9OFOPUMl_xTclVWXFDpY",
    authDomain: "hotelusers-a9a77.firebaseapp.com",
    databaseURL: "https://hotelusers-a9a77-default-rtdb.firebaseio.com",
    projectId: "hotelusers-a9a77",
    storageBucket: "hotelusers-a9a77.appspot.com",
    messagingSenderId: "855834337043",
    appId: "1:855834337043:web:42731ad720375c24ae84e6",
    measurementId: "G-BM0PGZLMVD"
  };
  
  firebase.initializeApp(firebaseConfig);
  var database = firebase.database();
  
  
  
  
  function creatNewUser(){
  var unicId = Math.floor(Math.random() * 1000000000000 + Math.random() * 1000000000000 + Math.random() * 1000000000000 + Math.random() * 1000000000000 + Math.random() * 1000000000000 + Math.random() * 1000000000000 + Math.random() * 1000000000000 + Math.random() * 1000000000000);
  const username = $("#userName").val();
  const password = $("#password").val()
  const phone = $("#phone").val()
  const email = $("#email").val()
  if (username == "" || password == "" || phone == "" || email == ""){
    swal("All feilds are required!", "please try again!", "error");
  } else {
  firebase.database().ref("Users/" + unicId).set(creatUser(username, password, phone, email));
  window.localStorage.setItem('user', username);
  window.localStorage.setItem('pass', password);
  swal("You are signed!", "Thanks!", "success");
  }
  
  $("#formSignIn")[0].reset();
  
  }
  
  var arr = null;
  
  var ref = firebase.database().ref("Users/");
  ref.on("value",(item) =>{
   arr = item.val();
  })


  function registrationAlert(){
    
    if(document.getElementById("fbottomdiv").style.display == "none"){
    
    }else{
        swal("registration required!", "please register!", "error");
    }
  }


  function generateFirebaseItem(key,value){
    return {
        id:key,
        data:value
    }
}


var usersArray = [];
var ref = firebase.database().ref("Users").on('value', function (response) {
response.forEach(function (item) {
  usersArray.push(generateFirebaseItem(item.key,item.val()));
});
});







