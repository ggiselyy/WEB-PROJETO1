function validarLogin(email, password){

    $.ajax({
        
        url: "https://reqres.in/api/login",
        type: "POST",
        data: {
            email: email,
            password: password
        },
        success: function(response){
            if (response.status == 200){
                localStorage.setItem("Status", "Online");
                return true;
           }else {
                localStorage.setItem("Status", "Offline");

           }
        } ,
        error: function(response){
            alert("Fail to login")
                return false;
            
        }

    }); 

}
var login = document.getElementById("login")

login.addEventListener('click', (e) =>{
    e.preventDefault();

    var email = document.forms["LoginForm"]["emaillogin"].value;
    var password = document.forms["LoginForm"]["senhalogin"].value

    if (email != "" && password != ""){
        if (email == localStorage.getItem("Email")){
            if (password == localStorage.getItem("Password")){
                alert("Login Successfully")
                localStorage.setItem("Status", "Online");
                return true;
            }else {
                validarLogin(email, password)
                return true;
        } 
        }
    }else {
        alert("Please, no empty fields")
        return false;
    }
})
