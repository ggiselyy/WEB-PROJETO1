var cadastro = document.getElementById("login2");

//Validar dados de cadastro
function validarCampos(){

   // var nome = $("input#nomelogin")
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
        document.getElementById('error-password').innerHTML = "Please Enter A Valid Password (6 or more characteres)";
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
            localStorage.setItem("Nome", nome);
            localStorage.setItem("Email", email);
            localStorage.setItem("Senha", password);
            alert("deu bom");
        } else {
            alert("email ja cadastrado");
        }
        return true;

    }else {
        alert("deu ruim")
        return false
    }
};


