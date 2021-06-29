function checkUserData() {
    var user = $("#userName").val();
    var pass = $("#password").val();

    usersArray.forEach(element => {
        if (element.data.username == user && element.data.password == pass) {
            window.location.href = "index.html"
            window.localStorage.setItem('tempId',  537);
            
            if (element.data.username == "admin" && element.data.password == 0987){
            window.location.href = "administrator.html"
            window.localStorage.setItem('tempId',  389);
        }
        } else if (element.data.username !== user && element.data.password !== pass){
            document.querySelector("#userName").value = '';
            document.querySelector("#password").value = '';
            
        }else{alert("error")}

    });
 
}

