//deixar o campo vazio ao clicar (ajustar)
function changeEmpty(){
        document.getElementById("nomelogin").value = "";
}
//Cadastrar novo usuário
$('Cadastro').on('submit', function(event) {
    event.preventDefault();

$.ajax({
    url: "https://reqres.in/api/users",
    type: "POST",
    data: {
        nome: document.getElementsById('nomelogin')[0].value,
        email: document.getElementsById('emaillogin')[0].value,
        password: document.getElementsById('senhalogin')[0].value,
    },
    success: function(response){
        //console.log(response);
    }

});

//Logar usuário
$('Login').on('submit', function(event) {
    event.preventDefault();

$.ajax({
    url: "https://reqres.in/api/login",
    type: "POST",
    data: {
        email: document.getElementsById('emaillogin')[0].value,
        password: document.getElementsById('senhalogin')[0].value,
    },
    success: function(response){
        //console.log(response);
    }

});

if (response.value == 200){
    window.alert("ok");}
else {
    window.alert("erro");
    }
 

});

