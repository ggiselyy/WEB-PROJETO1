function validarLogin(email, password){

    $.ajax({
        
        url: "https://reqres.in/api/login",
        type: "POST",
        data: {
            email: email,
            password: password
        },
        success: function(response){
            
            TokenGuardado = localStorage.getItem("Token")

            if (response.token == TokenGuardado && response.token != ""){
                localStorage.setItem("Status", "Online");
                localStorage.setItem("Token", response.token);
                document.getElementById('error-login').innerHTML = "Login Successfully";
                return true;
           }else {
                document.getElementById('error-login').innerHTML = "Login Failed";
                localStorage.setItem("Status", "Offline");

           }
        } ,
        error: function(response){
            document.getElementById('error-login').innerHTML = "Login Failed";
            localStorage.setItem("Status", "Offline");
                return false;
            
        }
});

}
var login = document.getElementById("login3")

    login.addEventListener('click', (e) =>{
    e.preventDefault();

    var email = document.forms["LoginForm"]["emaillogin"].value;
    var password = document.forms["LoginForm"]["senhalogin"].value


    if (email != "" && password != ""){
        if (email.length < 3 ){
            document.getElementById('error-login').innerHTML = "Email must have 3+ characters";
            return false;
        }
        if (password.length < 3){
            document.getElementById('error-login').innerHTML = "Password must have 3+ characters";
            return false;
        } 
        
        validarLogin(email, password)
        window.location.href = "././buscar.html";
        return true;
        
        
    }else {
        document.getElementById('error-login').innerHTML = "Please no empty fields";
        return false;
    }
})
