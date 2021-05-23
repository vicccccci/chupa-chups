let now = new Date();
let currentDate = document.querySelector("#currentDate");
let date = now.getDate();
let year = now.getFullYear();
let hour = now.getHours();
let minute = now.getMinutes();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aaugust",
  "September",
  "October",
  "November",
  "December"
];
let month = months[now.getMonth()];

currentTime.innerHTML = `${day} ${hour}:${minute}`;
currentDate.innerHTML = `${date} ${month} ${year}`;

let enterCityForm = document.querySelector("#enter-city");
enterCityForm.addEventListener("submit", displayCity);
let cityInput = document.querySelector("h1");

function changeCelsius() {
  fetchTemperature("metric");
}

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", changeCelsius);

function changeFahrenheit() {
  fetchTemperature("imperial");
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", changeFahrenheit);

function showTemperature(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
  let cityTemperature = document.querySelector(".temperature");
  cityTemperature.innerHTML = Math.round(response.data.main.temp);
  changeWeatherData(response.data);
}

function searchLocation(position) {
  let apiKey = `b4e1b11652927d3750ab384bb6b129db`;
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentBttn = document.querySelector(".btn-info");
currentBttn.addEventListener("click", currentLocation);

function changeWeatherData(data) {
  let feeling = document.querySelector("#feeling");
  feeling.innerHTML = `Feels like: ${data.main.feels_like}°`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${data.main.humidity}%`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind speed: ${data.wind.speed} km/h`;
  let description = document.querySelector("#description");
  description.innerHTML = data.weather[0].description;
}

function displayCity(event) {
  event.preventDefault();

  let enterCityInput = document.querySelector("#enter-city-input");
  cityInput.innerHTML = `${enterCityInput.value}`;
  fetchTemperature("metric");
}

function fetchTemperature(unit) {
  let apiKey = "b4e1b11652927d3750ab384bb6b129db";
  let city = document.querySelector("#enter-city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
