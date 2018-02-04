var user = {};
var currentTripId;

// on-SignIn-click check if user exists and if yes fetch, if no - alert to sign up
function signIn(email) {
    $.ajax({
        method: "GET",
        url: '/check/' + email,
        success: function (data) {
            if (data) {
                console.log('user found');
                fetch(email);
            } else {
                alert("Oooops, seems you are new to MyTrip! Please, sign up");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
        }
    })
}

function fetch(email) {
    $.ajax({
        method: "GET",
        url: '/authorisation/' + email,
        success: function (data) {
            user = data;
            console.log(data);
            _renderExistingTripsList();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
        }
    })
}
function _renderExistingTripsList() {
    // render greeting
    var name = user.name;
    var hello = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    $('.page-header').hide();
    $('#loginbox').hide();
    $('.hellouser').show();
    $('.hellouser').append("Hello " + hello);
    // render trips
    if (user.trips.length) {
        for (var i in user.trips) {
            var country = user.trips[i].country;
            // render list of existing countries
            countryToShow = country.charAt(0).toUpperCase() + country.slice(1).toLowerCase();
            $('.exTrips').append(
                `<a class="existCountry"
               data-tripId="${user.trips[i]._id}"
               data-countryName="${country}">${countryToShow}</a>  <span class="bar">|</span>
               `);
        }
    }
}

// on-SignUp-click check if user exists and if yes - alert to sign in, if no - add user to the DB
function singUp(email, name) {
    $.ajax({
        method: "GET",
        url: '/check/' + email,
        success: function (data) {
            if (data) {
                alert("Seems you are already registered - please, sign in!");
            } else {
                addUser(email, name);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
        }
    })
}

function addUser(emailAdd, firstname) { // send the data to open a user in the db and call a function to get the user from the db
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


$('.mytrip-logo').on('click', function () {
    window.location.reload()
})

$('#signInBtn').on('click', function () {
    var $email = $('#eMailSignIn');
    var email = $email.val();
    if (email === "") {
        $('.loginreq').show();
    } else {
        $('.loginreq').hide();
        signIn(email);
        $('.hello').show();
        $email.val("");
    }
})

$('#signUpBtn').on('click', function () {
    var $name = $('#userName');
    var $email = $('#eMailSignUp');
    var name = $name.val();
    var email = $email.val();
    if (email === "" || name === "") {
        $('.signupreq').show();
    } else {
        $('.signupreq').hide();
        signUp(email, name);
        $('.hello').show();
        $name.val("");
        $email.val("");
    }
})

$('#addtrip').on('click', function () {
    $('.choosecountry').show();
    $('.hasTrips').show();

})

// When the user chooses existing trip
$('.hello').on('click', '.existCountry', function () {
    var tripId = $(this).data().tripid;
    currentTripId = tripId;
    var countryName = $(this).data().countryname;
    // $('.choosecountry').toggle();

    fetchCountryData(countryName);
    renderToDo();
    $('.features').show();
    $('.featuresBar').show();


})