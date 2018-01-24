var country={}, wheather, fahrenheit; //object for the info and var for the tempreture

var fetchCountryData = function (country) { //get the country data from the api
    $.ajax({
        method: "GET",
        url: 'https://api.thebasetrip.com/v2/countries/'+country ,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'x-api-key': '77c599fb9dd83623cc39879e2cd34e7d6fc3f5a60148b7faac1befca6a9c'
        },
        success: function (data) {
            console.log(data);
            saveData(data);
            fetchWheather(data.basic.capital.name);
            toggleEnterce();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $('.countrynotfound').toggle();
            console.log(textStatus);
        }
    });
};

var fetchWheather = function (city) { //get the weather data from the api
    $.ajax({
        method: "GET",
        url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&appid=d703871f861842b79c60988ccf3b17ec',
        success: function (data) {
             wheather= data.main.temp.toFixed(0);
             fahrenheit = (wheather * 9 / 5 + 32).toFixed(0);
             weathericon = data.weather[0].icon
             renderInfo();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
            
        }
    });
    
};



function saveData(data){ //save the data of the country  
    country.name=data.basic.name.common;
    country.capital=data.basic.capital.name;
    country.flagLink=data.basic.flag.png;
    country.languages=data.basic.languages;
    country.continent=data.basic.location.region;
    country.wikipediaLink=data.basic.wikipediaUrl;
}

function renderInfo(){ //display the data in html by handelbars
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
    var country = $("#country").val();
    fetchCountryData(country);
    $('.searchingcountry').toggle()
    //console.log(country.val());
});

 function toggleEnterce(){
    $('.choosecountry').toggle();
    $('.search-result').toggle();
    $('.features').toggle();
 }


function toggleBookFlight(){ 
    console.log("user wants to book a flight")
    $('.bookflight').toggle();
}

