function displayTime(date) {
    let weekDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let day = weekDays[date.getDay()];
    let hour = date.getHours();
    let min = date.getMinutes();
  
    if (hour < 10) {
      hour = `0${hour}`;
    }
    if (min < 10) {
      min = `0${min}`;
    }
    return `${hour}:${min} ${day}`;
    }
let h2 = document.querySelector("h2");
  let currentDate = new Date();
  h2.innerHTML = displayTime(currentDate);

function formatDay(timestamp){
  let date= new Date(timestamp*1000);
  let day = date.getDay();
  let days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
  ];
  return days[day];
}

  function displayForecast(response){
    let forecastElement = document.querySelector(".forecast");
    let forecast= response.data.daily;
    let forecastHTML = `<div class = "row">`;
    forecast.forEach(function (forecastDay, index) {
      if (index<6){ 
     forecastHTML= forecastHTML + `
        <div class="col-2">
        <div class="forecast-day">${formatDay(forecastDay.dt)}</div>
        <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="50">
      <div class="forecast-temperatures">
<span class="forecast-temp-max">${Math.round(forecastDay.temp.max)}°</span>
<span class="forecast-temp-min">${Math.round(forecastDay.temp.min)}°</span>
      </div>
    </div>
     `; };
    });

    forecastHTML= forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
    
  }
  
  function receiveForecast(coordinates){
    let apiKey = "c12144c45d93a92cd906b74d7711e356";
    let apiUrl=`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
  console.log(apiUrl);
  }
  
  function showTemperature(response) {
    celsiusTemp = response.data.main.temp;
    document.querySelector("#current-temperature").innerHTML = Math.round(
      response.data.main.temp
    );
    document.querySelector("#description").innerHTML =
      response.data.weather[0].description;
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(
      response.data.wind.speed
    );
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);
   console.log(response.data.coord);
   receiveForecast(response.data.coord);

  }
  function search(city) {
    let units = "metric";
    let apiKey = "c12144c45d93a92cd906b74d7711e356";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(showTemperature);
    console.log(apiUrl.data)
  }
  
  function searchCity(event) {
    event.preventDefault();
    let city = document.querySelector("#enter-city").value;
    search(city);
  }
  let submitInput = document.querySelector("#city-input-form");
  submitInput.addEventListener("submit", searchCity);
  
  
  function getLocation(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = "c12144c45d93a92cd906b74d7711e356";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showTemperature);
  }
  function getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(getLocation);
  }
  
  let currentButton = document.querySelector("#current-city");
  currentButton.addEventListener("click", getCurrentPosition);
  
    search("Stockholm");
  
  