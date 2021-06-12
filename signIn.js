var request = new XMLHttpRequest();

request.addEventListener("load", function(evt){
    console.log(evt);
}, false);

request.open('GET', 'index.html', true),
request.send();

 function checkUserData() {
    var user = $("#userName").val();
    var pass = $("#password").val();

    usersArray.forEach(element => {
        if (element.data.username == user && element.data.password == pass) {
            window.location.href = "index.html"
            document.getElementById("fbottomdiv").style.display = "none";
            document.querySelector(".btn-dark").innerHTML = "Signed";
            document.querySelector(".btn-dark").style.color = "rgb(129, 206, 129)";
            document.querySelector(".btn-dark").style.borderColor = "rgb(129, 206, 129)";
        }
        else {
            document.querySelector("#userName").value = '';
            document.querySelector("#password").value = '';
            swal("Some Data in Incorrect!", "please try again!", "error");
        }

    });

    


}


