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
    let day = weekDays[currentDate.getDay()];
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

  function displayForecast(){
    let forecastElement = document.querySelector(".forecast");
    let days = ["Sun","Mon","Tue","Wen","Thu"];
     
    let forecastHTML = `<div class = "row">`;
    days.forEach(function (day) {
     forecastHTML= forecastHTML + `
        <div class="col-2">
        <div class="forecast-day">${day}</div>
        <img src="http://openweathermap.org/img/wn/01d@2x.png" alt="" width="50">
      <div class="forecast-temperatures">
<span class="forecast-temp-max">25°</span>
<span class="forecast-temp-min">17°</span>
      </div>
    </div>
     `;
    });

    forecastHTML= forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;

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
  
  function convertToFahrenheit(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#current-temperature");
    let tempFahrenheit = Math.round((celsiusTemp * 9) / 5 + 32);
    temperatureElement.innerHTML = tempFahrenheit;
  }

  function displayCelsiusTemp (event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#current-temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemp);
  }

  let fahrenheitElement = document.querySelector("#fahrenheit-unit");
  fahrenheitElement.addEventListener("click", convertToFahrenheit);
  let celsiusElement = document.querySelector("#celsius-unit");
  celsiusElement.addEventListener("click", displayCelsiusTemp);

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
  
  let celsiusTemp = null;

  search("Stockholm");
  displayForecast();
  