function validarLogin(email, password){

    let newUser ={
        password,
        email
    };

    $.ajax({
        url: "/signIn",
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(newUser),
        success: function(response){
            if (result.status === 1) {
                location.href = "/index";
              } else {
                alert(email)
                document.getElementById("login-msg").innerHTML = result.msg;
              }
            }

            
            //TokenGuardado = localStorage.getItem("Token")

           // if (response.token == TokenGuardado && response.token != ""){
             //   localStorage.setItem("Token", response.token);
             //   document.getElementById('error-login').innerHTML = "Login Successfully";
             //   return true;
          // }else {
           //     document.getElementById('error-login').innerHTML = "Login Failed";
           //     localStorage.setItem("Status", "Offline");

         //  }
      // } ,
   //     error: function(response){
       //     document.getElementById('error-login').innerHTML = "Login Failed";
        //    localStorage.setItem("Status", "Offline");
       //         return false;
            
      //  }
});

}

var login = document.getElementById("login3")

    login.addEventListener('click', (e) =>{
    e.preventDefault();

    let email = $("input#emaillogin").val();
    let password = $("input#senhalogin").val();

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
        location.href = "buscar.html";
        return true;
        
        
    }else {
        document.getElementById('error-login').innerHTML = "Please no empty fields";
        return false;
    }
})
