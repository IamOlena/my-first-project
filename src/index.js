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
  
  function showTemperature(response) {
    document.querySelector("#current-temperature").innerHTML = Math.round(
      response.data.main.temp
    );
    document.querySelector("#description").innerHTML =
      response.data.weather[0].main;
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(
      response.data.wind.speed
    );
  }
  function search(city) {
    let units = "metric";
    let apiKey = "c12144c45d93a92cd906b74d7711e356";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(showTemperature);
  }
  
  function searchCity(event) {
    event.preventDefault();
    let city = document.querySelector("#enter-city").value;
    search(city);
  }
  let submitInput = document.querySelector(".city-input-form");
  submitInput.addEventListener("submit", searchCity);
  
  function convertToF(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#current-temperature");
    let tempFahrenheit = Math.round((19 * 9) / 5 + 32);
    temperatureElement.innerHTML = tempFahrenheit;
  }
  let fahrenheitTemp = document.querySelector("#fahrenheit-unit");
  fahrenheitTemp.addEventListener("click", convertToF);
  
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
  