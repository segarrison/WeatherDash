var searchFormEl = document.querySelector("#search-form");
var cityName = document.createElement("h1");
var bigBox = document.querySelector("#bigBox");
var tempCurrentEl = document.createElement("h5");
var humdCurrentEl = document.createElement("h5");
var windCurrentEl = document.createElement("h5");
var uviCurrentEl = document.createElement("h5");
function searchApi(query) {
  console.log(query);
  var locQueryUrl =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=17b4a3b1911b868571e81a79dfde759e&units=imperial";

  fetch(locQueryUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          var latEl = data.coord.lat;
          var lonEl = data.coord.lon;
          var tempCurrent = data.main.temp;
          var humdCurrent = data.main.humidity;
          var windCurrent = data.wind.speed;
          var icon = data.weather[0].icon;

          var getIcon = "https://openweathermap.org/img/w/" + icon + ".png";
          console.log(getIcon);
          var makeIcon = document.createElement("img");
          makeIcon.src = getIcon;
          tempCurrentEl.innerText = "Temp: " + tempCurrent + " °F";
          windCurrentEl.innerText = "Wind: " + windCurrent + " MPH";
          humdCurrentEl.innerText = "Humidity: " + humdCurrent + "%";
          cityName.innerText = query + " " + moment().format("L");
          cityName.append(makeIcon);
          console.log(cityName.innerText);
          bigBox.style.visibility = "visible";
          currentWeather.append(cityName);
          currentWeather.append(tempCurrentEl);
          currentWeather.append(windCurrentEl);
          currentWeather.append(humdCurrentEl);

          getForecast(latEl, lonEl);
        });
      }
    })

    .catch(function (error) {
      console.error(error);
    });
}

function getForecast(lat, lon) {
  var locForecastUrl =
    "http://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&exclude=minutely,hourly,alerts&appid=17b4a3b1911b868571e81a79dfde759e&units=imperial";

  fetch(locForecastUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        var uviCurrent = data.current.uvi;
        console.log(uviCurrent);
        uviCurrentEl.innerText = "UV Index: " + uviCurrent;
        if (uviCurrent <= 2) {
          uviCurrentEl.style.backgroundColor = "green";
        } else if (2 > uviCurrent < 6) {
          uviCurrentEl.style.backgroundColor = "orange";
        } else {
          uviCurrentEl.style.backgroundColor = "red";
        }
        currentWeather.append(uviCurrentEl);
      });
    }
  });
}
function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchInputVal = document.querySelector("#search-input").value;
  console.log(searchInputVal);

  if (!searchInputVal) {
    console.error("You need a search input value!");
    return;
  }

  searchApi(searchInputVal);
}

searchFormEl.addEventListener("submit", handleSearchFormSubmit);
