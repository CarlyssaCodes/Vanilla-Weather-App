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

function formatDaily(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function showForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDays, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
              <div class="col-2">
                <div class="weather-forecast-date">${formatDaily(
                  forecastDays.dt
                )}</div>
                <img src="http://openweathermap.org/img/wn/${
                  forecastDays.weather[0].icon
                }@2x.png" alt="Rainy" width="60px"/>
              
              <div class="weather-forecast-temp">
                <span class="weather-forecast-temp-min">${Math.round(
                  forecastDays.temp.min
                )}°</span> <span class="weather-forecast-temp-max">${Math.round(
          forecastDays.temp.max
        )}°</span> 
              </div>
            </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coords) {
  let apiKey = "80791a0ef9679c89428b222ffd6823ff";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showForecast);
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

  getForecast(response.data.coord);
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

let fahrenheitTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Philadelphia");
