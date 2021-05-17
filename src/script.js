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
  console.log(response.data);
}

let apiKey = "80791a0ef9679c89428b222ffd6823ff";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Philadelphia&appid=${apiKey}&units=imperial`;

axios.get(apiUrl).then(showWeather);
