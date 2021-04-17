$("#LoginForm").submit(function (event) {
    event.preventDefault();

//function validarLogin(){
    $.ajax({
        url: "https://reqres.in/api/login",
        type: POST,
        data: {
            email:  document.forms["LoginForm"]["emaillogin"].value,
            senha:  document.forms["LoginForm"]["senhalogin"].value
        },
        alert(response);

    });
    alert(senha)
    if (response.status == 200){
        alert("Login Success");
        localStorage("Status", "Online");
        alert("deu bom");

    }else if (response.status == 400){
        alert(response);
        localStorage("Status", "Offline");
        alert("deu ruim");
    }
})

//function ativarBusca(){};