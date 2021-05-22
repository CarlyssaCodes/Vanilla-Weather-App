function formatDate(timestamp) {
  let date = new Date(timestamp);
  let currentTime = date.toLocaleString(undefined, {
    minute: "2-digit",
    hour: "2-digit",
  });

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${currentTime}`;
}

function showWeather(response) {
  let cityElement = (document.querySelector("#city").innerHTML =
    response.data.name);

  let temperatureElement = (document.querySelector(
    "#temp"
  ).innerHTML = Math.round(response.data.main.temp));

  let descriptionElement = (document.querySelector("#description").innerHTML =
    response.data.weather[0].description);

  let feelsLikeElement = (document.querySelector(
    "#feels-like"
  ).innerHTML = Math.round(response.data.main.feels_like));

  let humidityElement = (document.querySelector("#humidity").innerHTML =
    response.data.main.humidity);

  let windElement = (document.querySelector(
    "#wind-speed"
  ).innerHTML = Math.round(response.data.wind.speed));

  let dateElememnt = (document.querySelector("#date").innerHTML = formatDate(
    response.data.dt * 1000
  ));

  fahrenheitTemp = response.data.main.temp;

  let iconElement = document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
}

function search(city) {
  let apiKey = "80791a0ef9679c89428b222ffd6823ff";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function showCelsiusTemp(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let temperatureElement = document.querySelector("#temp");
  let celsiusTemp = ((fahrenheitTemp - 32) * 5) / 9;
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

let fahrenheitTemp = null;

function showFahrenheitTemp(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

search("Philadelphia");
