function validarLogin(email, password){

    alert("dentro do validar login")
    alert(email)
    alert(password)

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
            alert(response.status)
                return false;
            
        }

    }); 

}
var login = document.getElementById("login")

login.addEventListener('click', (e) =>{
    e.preventDefault();

    alert("parte1")

    var email = document.forms["LoginForm"]["emaillogin"].value;
    var password = document.forms["LoginForm"]["senhalogin"].value;

    alert("parte2")

    if (email != "" && password != ""){
        if (email == localStorage.getItem("Email")){
            if (password == localStorage.getItem("Password")){
                alert("entrou no if")
                validarLogin(email, password)
                alert("entrou no validar login")
                return true;
            }

        } else {
            alert("login invalido")
            return false;
        }
    }else {
        alert("Nenhum campo deve ficar em branco")
    }
})
//function ativarBusca(){};