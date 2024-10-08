let weather = {
  apiKey: "4f8c9d7653ce525c1873dc385b8a8d75",
  fetchWeather: function (city) {
    fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}
        &limit=5&appid=${this.apiKey}`
    )
      .then((response) => response.json())

      .then((data) => {
        const lat = data[0].lat;
        const lon = data[0].lon;
        const state = data[0].state;
        console.log(lat, lon, state);
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${this.apiKey}`
        )
          .then((response) => response.json())
          .then((data) => this.displayWeather(data, state));
      });
  },
  displayWeather: function (data, state) {
    const { country } = data.sys.country;
    let currentState = null;
    if (data.sys.country == "US") {
      currentState = ", " + state;
    } else {
      currentState = "";
    }
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    document.querySelector(
      ".city"
    ).innerText = `Weather in \n${name}${currentState}`;
    document.querySelector(".icon").src =
      "http://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = Math.ceil(temp) + "°F";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind Speed: " + Math.ceil(speed) + " mph";
    document.querySelector(".weather").classList.remove("loading");
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});
document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Atlanta");
