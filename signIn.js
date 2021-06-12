 function checkUserData() {
    var user = $("#userName").val();
    var pass = $("#password").val();

    usersArray.forEach(element => {
        if (element.data.username == user && element.data.password == pass) {
            window.location.href = "index.html"
            window.localStorage.setItem('tempId',  537);
        }
        else {
            document.querySelector("#userName").value = '';
            document.querySelector("#password").value = '';
            swal("Some Data in Incorrect!", "please try again!", "error");
        }

    });

    


}

