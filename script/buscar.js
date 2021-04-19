var btsearch = document.getElementById("btSearch")
var iSearch = document.getElementById("inputSearch")
var dadosSearch

const url = 'https:/api.tumblr.com/v2/tagged';

btsearch.addEventListener('click', (event) => {
    event.preventDefault();

    if (iSearch.value != ""){
        
        if(localStorage.getItem("Status")== "Online"){
            
            requestInfo();
            

         } else{
             alert("Login Required");
         }
    }
    else{ 
         alert("Please enter a word")
    }
})

function requestInfo(){

    var iSearch = document.getElementById("inputSearch").value

    $.getJSON(url, {
    api_key: 'ggEfbaxw9nQRhSXF2Qp5Bwffeq16BYNkJwKOxIGaTBk2JwV8vj',
    tag: iSearch,
    limit: 20

}) .done(function(results){
        console.log(results)
        $.each(results.response, function(i,item){
            //if (item.type == text){
           // }
            $("<div>").html("Blog Name: "+item.blog_name).appendTo("#data");
            $("<a>").addClass("url").html("Link to tagged post: "+item.short_url).appendTo("#data");
            $("<p>").appendTo("#data");
                       
        })

        alert("top")

    
;})
}
