$(".save").on("click", function(){
    var id = $(this).attr("data-id");
    
    $.ajax({
        url: "/news/save/" + id,
        method: "POST"
    }).then(function(data){
        window.location = "/saved"
    })
});