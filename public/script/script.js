var cadastro = document.getElementById("login2");

cadastro.addEventListener('click', (e) =>{
    e.preventDefault();
//Validar dados de cadastro
//function validarCampos(){

    var nome = document.forms["Cadastro"]["nomelogin"].value;
    var email = document.forms["Cadastro"]["emaillogin"].value;
    var senha = document.forms["Cadastro"]["senhalogin"].value;
    var controle = true;

    // verifica se os dados estão corretos
    if (nome == ""){
        document.getElementById('error-name').innerHTML = " Please Enter Your Name";
        controle = false;

    } else if  (email == ""){
        document.getElementById('error-email').innerHTML = " Please Enter Your Email";
        controle = false;

    } else if  (senha == ""){
        document.getElementById('error-password').innerHTML = "Please Enter Your Password";
        controle = false;

    }else if(senha.length < 5){
        document.getElementById('error-password').innerHTML = "Minimum 6 characters";
        controle = false;

    }else if(email.indexOf("@") == -1){
        document.getElementById('error-email').innerHTML = "Please Enter A Valid Email";
        controle = false;

    } else {
        controle = true;
    }

    if (controle == true){
        //verifica se e-mail ja esta cadastrado antes de adicionar novo registro
        if (localStorage.getItem(email) != email){
            cadreq(email, senha)
            if (cadreq){
                document.getElementById('error-register').innerHTML = "Register Successfully";
                return true;
            } else {
                document.getElementById('error-register').innerHTML = "Fail To Register";
                return false;
            }
        } else {
            return false;
        }
        return true;

    }else {
        document.getElementById('error-register').innerHTML = "Fail To Register";
        return false
    }
//};
})

function cadreq(email, password){

    $.ajax({
        
        url: "https://reqres.in/api/register",
        type: "POST",
        data: {
            email: email,
            password: password
        },
        success: function(response){
            if (response.token != ""){
                localStorage.setItem("Token", response.token);
                return true;

           }else {
                return false;

           }
        } ,
        error: function(response){
                return false;
            
        }

    }); 

}

