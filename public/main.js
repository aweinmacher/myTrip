var users = []


var fetch = function () {
    $.ajax({
        method: "GET",
        url: '/users',
        success: function (data) {
            console.log("fetch successfully");
            users = data;
            console.log(users);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
        }
    })
}

fetch()


$('#signIn').on('click', function () {
    var name = $('#userName')
    var email = $('#eMail')
    if (name.val() === "" || email.val() === "") {
        alert("please enter your name and email!")
    } else {
        // for (var i = 0; i < users.length; i++) {
        if (name.val().toLowerCase() == users.name && email.val().toLowerCase() == users.email) {
            console.log("user found")
            $('.username-form').toggle();
            $('.choosecountry').toggle();
            var hello = name.val().charAt(0).toUpperCase() + name.val().slice(1).toLowerCase()
            $('.hellouser').append("Hello " + hello)
            name.val("");
            email.val("")
        } else {
            alert("user not found ! try again")
        }
    }
})


$('#submitcountry').on('click', function () {
    var country = $('#country')
    console.log(country.val())
    $('.choosecountry').toggle()
    $('.search-result').toggle()
})




