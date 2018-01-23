var users = []


var fetch = function (email) {
    $.ajax({
        method: "GET",
        url: '/authorisation/' + email,
        success: function (data) {
            console.log("fetch successfully");
            users = data;
        },
        complete: function () {
            checkUserInArr(email)
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
        }
    })
}

var checkUserInArr = function (emailAdd) {
    for (var i = 0; i < users.length; i++) {
        if (emailAdd.toLowerCase() == users[i].email) {
            console.log("user found")
            $('.username-form').toggle();
            $('.choosecountry').toggle();
            var name = users[i].name
            var hello = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
            $('.hellouser').append("Hello " + hello)
        }
    }
}



$('#signIn').on('click', function () {

    var name = $('#userName')
    var email = $('#eMail')
    var emailAdd = email.val()
    if (emailAdd === "") {
        alert("please enter your name and email!")
    } else {
        fetch(emailAdd)
        name.val("");
        email.val("")
    }
}
)



$('#submitcountry').on('click', function () {
    var country = $('#country')
    console.log(country.val())
    $('.choosecountry').toggle()
    $('.search-result').toggle()
    $('.features').toggle()

})




