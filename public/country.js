var country = {}, wheather, fahrenheit; //object for the info and var for the tempreture

var fetchUserForCountry = function (emailAdd) { //getting data from db after user added country
    $.ajax({
        method: "GET",
        url: '/authorisation/' + emailAdd,
        success: function (data) {
            console.log("fetchUser successfully");
            user = data;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
        }
    })
}

// send the data to open a user in the db and call a function to get the user from the db
function addCountryToUser(country, userid, emailAdd) {
    var userId = userid;
    var dataToSend = { 'country': country };
    var path = '/users/' + userId + '/trips';
    $.ajax({
        method: "POST",
        url: path,
        data: dataToSend,
        dataType: 'json',
        success: function (data) {
            console.log(`Added country`)
            console.log(dataToSend)
            fetchUserForCountry(emailAdd);

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
        }
    })
}

//get the country data from the api
var fetchCountryData = function (country) {
    $.ajax({
        method: "GET",
        url: 'https://api.thebasetrip.com/v2/countries/' + country,
        headers: {
            'Content-Type': 'application/json',
            'Origin': 'https://mytrip-106.herokuapp.com',
            'Access-Control-Request-Method': 'GET',
            'Accept': 'application/json',
            'x-api-key': '77c599fb9dd83623cc39879e2cd34e7d6fc3f5a60148b7faac1befca6a9c'
        },
        success: function (data) {
            _saveData(data);
            fetchWheather(data.basic.capital.name);
            renderCountries()
            toggleEnterce();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $('.countrynotfound').toggle();
            console.log(textStatus);
        }
    });
};
function _saveData(data) { //save the data of the country  
    country.name = data.basic.name.common;
    country.capital = data.basic.capital.name;
    country.flagLink = data.basic.flag.png;
    country.languages = data.basic.languages;
    country.continent = data.basic.location.region;
    country.wikipediaLink = data.basic.wikipediaUrl;
}
//get the weather data from the api
var fetchWheather = function (city) {
    $.ajax({
        method: "GET",
        url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&appid=d703871f861842b79c60988ccf3b17ec',
        headers: {
            'Origin': 'https://mytrip-106.herokuapp.com',
            'Access-Control-Request-Method': 'GET'
        },
        success: function (data) {
            wheather = data.main.temp.toFixed(0);
            fahrenheit = (wheather * 9 / 5 + 32).toFixed(0);
            weathericon = data.weather[0].icon
            _renderWeather();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);

        }
    });

};

//display weather data in html by handelbars
function _renderWeather() {
    country.tempc = wheather
    country.far = fahrenheit
    country.icon = weathericon
    var source = $('#post-item').html();
    var template = Handlebars.compile(source);
    $(".search-result").empty();
    var newHTML = template(country);
    $('.search-result').append(newHTML);
}

$("#submitcountry").click(function () {
    var countryname = $("#country").val().toLowerCase();
    var userId = user._id
    var emailAdd = user.email
    for (var i = 0; i < user.trips.length; i++) {
        if (user.trips[i].country == countryname) {
            fetchCountryData(countryname);
            return
        }
    }
    //check in countriesList if country exists in api
    for (var i = 0; i < countryInApi.length; i++) {
        if (countryInApi[i].name.toLowerCase() == countryname) {
            addCountryToUser(countryname, userId, emailAdd)
            fetchCountryData(countryname);
            $('.searchingcountry').toggle()
            return
            // if country is not found display error message
            // } else {
            //     $('.countryreq').show()     
        }
    }
});

function renderCountries() {
    $('.exTrips').empty()
    for (var i in user.trips) {
        var country = user.trips[i].country;
        countryToShow = country.charAt(0).toUpperCase() + country.slice(1).toLowerCase();
        $('.exTrips').append(
            `<a class="existCountry"
            data-tripId="${user.trips[i]._id}"
            data-countryName="${country}">${countryToShow}</a>  <span class="bar">|</span>
            `);
    }
}

function toggleEnterce() {
    $('.choosecountry').toggle();
    $('.search-result').show();
}
function toggleBookFlight() {
    console.log("user wants to book a flight")
    $('.bookflight').toggle();
}