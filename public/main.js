var user ={};


var fetchUser = function (email, name) { //getting data from db and then send it to a function to comare the data if the user exist 
    $.ajax({
        method: "GET",
        url: '/authorisation/' + email,
        success: function (data) {
            console.log("fetchUser successfully");
            user = data[0];
        },
        complete: function () {
            console.log(user);
            checkUserExist(email, name)
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
        }
    })
}

var checkUserExist = function (emailAdd, name) { //check if the user exist if not send to a function that open a user
    if (user==undefined){
        openUser(emailAdd, name);
    }
    else if (emailAdd.toLowerCase() == user.email) {
        console.log("user found")
        $('.username-form').toggle();
        $('.choosecountry').toggle();
        var name = user.name;
        var hello = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
        $('.hellouser').append("Hello " + hello);
        //function of render if it have data
    }
}

function openUser(email, name) { // send the data to open a user in the db and call a function to get the user from the db
    var dataToSend={
        name: name,
        email: email.toLowerCase()
    }
    var path = '/users/signup';
    $.ajax({
        method: "POST",
        url: path,
        data: dataToSend,
        dataType: 'json',
        success: function (data) {
            console.log(`Data loaded`);
        },
        complete: function () {
            fetchUser(dataToSend.email, dataToSend.name);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
        }
    })
}



$('#signIn').on('click', function () {

    var name = $('#userName');
    var email = $('#eMail');
    var emailAdd = email.val();
    if (email.val() === "" || name.val() === "") {
        alert("please enter your name and email!");
    } else {
        fetchUser(email.val(), name.val());
        name.val("");
        email.val("");
    }
})



$('#submitcountry').on('click', function () {
    var country = $('#country');
    console.log(country.val());
    $('.choosecountry').toggle();
    $('.search-result').toggle();
    $('.features').toggle();
})




