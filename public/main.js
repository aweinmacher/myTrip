var user = {};
var currentTripId;

var fetchUser = function (email, name) { //getting data from db and then send it to a function to comare the data if the user exist 
    $.ajax({
        method: "GET",
        url: '/authorisation/' + email,
        success: function (data) {
            console.log("fetchUser successfully");
            user = data;
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


// ADDING EXISTING TRIPS --- ADDING EXISTING TRIPS --- ADDING EXISTING TRIPS

var checkUserExist = function (emailAdd, name) { //check if the user exist if not send to a function that open a user
    if (user == "") {
        openUser(emailAdd, name);
    }
    else if (emailAdd.toLowerCase() == user.email) {
        console.log("user found")
        $('.username-form').toggle();
        // $('.choosecountry').toggle();
        var name = user.name;
        var hello = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
        // look over trips and append existing countries
        // function of render if it have data
        $('.hellouser').append("Hello " + hello);
        // if there are trips, show them and hide the AddCountry form
        if (user.trips.length) {
            for (var i in user.trips) {
                $('.exTrips').append(`<a class="existCountry">  ${user.trips[i].country}  </a>`);
            }
        } else {
            $('.choosecountry').toggle(); // if no existing trips, show the form...
            $('.hasTrips'). toggle(); // ... and hide the trips
        }
    }
}

function openUser(emailAdd, firstname) { // send the data to open a user in the db and call a function to get the user from the db
    var dataToSend = {
        name: firstname,
        email: emailAdd.toLowerCase(),
        trips: []
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


$('.mytrip-logo').on('click', function(){
    window.location.reload()
})


$('#signIn').on('click', function () {
    var name = $('#userName');
    var email = $('#eMail');
    var emailAdd = email.val();
    if (email.val() === "" || name.val() === "") {
        $('.loginreq').toggle()
    } else {
        fetchUser(emailAdd, name.val());
        $('.signingin').toggle();
        $('.hello').toggle();
        name.val("");
        email.val("");
    }
})

$('#addtrip').on('click', function () {
    $('.choosecountry').toggle();
})






