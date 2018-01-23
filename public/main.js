
var users = [{ id: 1, name: "adam" }]

$('#signIn').on('click', function () {
    var name = $('#userName')
    if (name.val() === "") {
        alert("please enter your name!")
    } else {
        for (var i = 0; i < users.length; i++) {
            if (name.val().toLowerCase() == users[i].name) {
                console.log("user found")
                $('.username-form').toggle();
                $('.choosecountry').toggle();
                var hello = name.val().charAt(0).toUpperCase() + name.val().slice(1).toLowerCase()
                $('.hellouser').append("Hello " + hello)
                name.val("");
            } else {
                console.log("user not found !!!!!!!!!!!")
            }
        }
    }
})


$('#submitcountry').on('click', function(){
    var country = $('#country')
    console.log(country.val())
    $('.choosecountry').toggle()
    $('.search-result').toggle()
})




