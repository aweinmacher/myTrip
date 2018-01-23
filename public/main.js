
var users = [{name: "adam"}]

$('#signIn').on('click', function(){
    var name = $('#userName')
    if(name.val() === ""){
    alert("please enter your name!")
    } else {
        for(var i = 0; i < users.length; i++){
        if (name.val() == users[i].name)
        

        name.val("");
        }
}
console.log("user not found !")
})


