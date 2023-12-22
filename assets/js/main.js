function getCityKey() {
//debugger
    var CityName = document.getElementById('cityInput').value.trim();
    console.log("Cityname:" + CityName);
    //City Name Required
    if (CityName === ""){
        alert("Please Enter the City Name");
        location.reload();
    }
    //new request
    var xhr = new XMLHttpRequest();
    //Api url with params
    var apiUrl = "http://dataservice.accuweather.com/locations/v1/cities/search?apikey=%09Itf8ZKkHrufmBW3UtcGV6e6Al9nTeTZQ&q=" + encodeURIComponent(CityName);
    //console.log("api:"+apiUrl)
    // Configure request
    xhr.open('GET', apiUrl, true);
    
    xhr.onload = function() {
        //console.log("response:"+ xhr.responseText);
        if(xhr.status === 200){
            
            var locationData = JSON.parse(xhr.responseText);
            //console.log(locationData);
            if(locationData.length == 0 ){
                alert("Invalid City Name!");
                location.reload();
            }
            //CityKey from Response
            var cityKey = locationData[0].Key;
            //console.log('cityKey'+ cityKey);
            getWeatherData(cityKey);
        }
        else{
            alert("Request Failed"+ xhr.status);
        }
    }
    xhr.onerror = function(){
        alert('Network Error Occurred');
    }
    //Request Send
    xhr.send();

}

function getWeatherData(cityKey){
    //console.log(cityKey);
    if(!cityKey){
        alert('!City Name not found');
    }
    //new request
    var xhr = new XMLHttpRequest();
    //Api url with params
    var apiUrl = 'http://dataservice.accuweather.com/forecasts/v1/daily/1day/' + cityKey + '?apikey=%09Itf8ZKkHrufmBW3UtcGV6e6Al9nTeTZQ';
    //console.log("api:"+apiUrl)
    // Configure request
    xhr.open('GET', apiUrl, true);
    
    xhr.onload = function() {
        if(xhr.status === 200){
            var weatherResponse = JSON.parse(xhr.responseText);
            console.log(weatherResponse);
            displayWeatherData(weatherResponse);
        }
        else {
            alert('Request Failed:'+ xhr.status);
        }
    }
    xhr.onerror = function(){
        alert('Network Error Occurred');
    }
    //Request Send
    xhr.send();
}

function displayWeatherData(data){
    var weatherResponseElement = document.getElementById('weatherResponse');

    data.DailyForecasts.forEach(function (forecast,index) {
        
        var forecastDiv = document.createElement('div');
        forecastDiv.innerHTML = '<h3 class="text-white"> Weather status of today </h3>'+ 
        '<p class="text-white"> Date <i class="bi bi-calendar3"></i> : ' + forecast.Date + '</p>' + 
         '<p class="text-white"> Max Temperature <i class="bi bi-thermometer-high"></i> : ' + forecast.Temperature.Maximum.Value + ' ' + forecast.Temperature.Maximum.Unit  + '</p>' +
         '<p class="text-white"> Min Temperature <i class="bi bi-thermometer"></i> : ' + forecast.Temperature.Minimum.Value+ ' ' +forecast.Temperature.Minimum.Unit + '</p>'+  
         '<p class="text-white"> Day <i class="bi bi-brightness-high-fill"></i> : ' + forecast.Day.IconPhrase + '</p>' + 
         '<p class="text-white"> Night <i class="bi bi-moon-stars"></i> : ' + forecast.Night.IconPhrase + '</p>';

         weatherResponseElement.appendChild(forecastDiv);
    });


   
}