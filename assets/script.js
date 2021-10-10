var searchFormEl = document.querySelector("#search-form");
var searchBlockEl = document.querySelector("#search-block");
var cityName = document.createElement("h1");
var bigBox = document.querySelector("#bigBox");
var tempCurrentEl = document.createElement("h5");
var humdCurrentEl = document.createElement("h5");
var windCurrentEl = document.createElement("h5");
var uviCurrentEl = document.createElement("h5");
var savedCities = [];
var forecastEl = document.querySelector("#forecastCards");
// var nameEl = document.createElement("h5");

function searchApi(query) {
  // console.log(query);
  var locQueryUrl =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=17b4a3b1911b868571e81a79dfde759e&units=imperial";

  fetch(locQueryUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          // console.log(data);
          var latEl = data.coord.lat;
          var lonEl = data.coord.lon;
          var tempCurrent = data.main.temp;
          var humdCurrent = data.main.humidity;
          var windCurrent = data.wind.speed;
          var icon = data.weather[0].icon; // var name = data.businesses[i].name;
          //nameEl.innertext = name;
          //{idforelgoeshere}.append(nameEl);

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
        // console.log(data);
        var uviCurrent = data.current.uvi;
        // console.log(uviCurrent);
        uviCurrentEl.innerText = "UV Index: " + uviCurrent;
        if (uviCurrent <= 2.0) {
          uviCurrentEl.style.backgroundColor = "green";
        } else if (uviCurrent > 2.0 && uviCurrent < 6.0) {
          uviCurrentEl.style.backgroundColor = "orange";
        } else {
          uviCurrentEl.style.backgroundColor = "red";
        }
        currentWeather.append(uviCurrentEl);
        createForecast(data);
      });
    }
  });
}
function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchInputVal = document.querySelector("#search-input").value;
  // console.log(searchInputVal);

  if (!searchInputVal) {
    console.error("You need a search input value!");
    return;
  }
  if (savedCities.includes(searchInputVal)) {
  } else {
    savedCities.push(searchInputVal);
    localStorage.setItem("cities", JSON.stringify(savedCities));

    var historyButtons = document.createElement("button");
    historyButtons.setAttribute("class", "btn btn-info btn-block");
    historyButtons.innerText = searchInputVal;
    searchBlockEl.append(historyButtons);
  }

  searchApi(searchInputVal);
}

searchFormEl.addEventListener("submit", handleSearchFormSubmit);
searchBlockEl.addEventListener("click", function (event) {
  var searchInputVal = event.target.innerText;
  // console.log(searchInputVal);
  handleSearchFormSubmit();
});

function createForecast(data) {
  while (forecastEl.firstChild) {
    forecastEl.removeChild(forecastEl.firstChild);
  }
  // console.log(data);
  for (let i = 1; i <= 6; i++) {
    console.log(data.daily[i]);
    var tempForecast = data.daily[i].temp.day;

    var windForecast = data.daily[i].wind_speed;

    var humdForecast = data.daily[i].humidity;

    var iconForecast = data.daily[i].weather[0].icon;

    var forecastCard = document.createElement("div");
    forecastCard.classList.add("card");
    var forecastBody = document.createElement("div");
    forecastBody.classList.add("card-body");
    var forecastDate = document.createElement("h3");
    current = moment();
    date = current.add(i, "days").format("L");
    forecastDate.innerText = date;
    var getIcon = "https://openweathermap.org/img/w/" + iconForecast + ".png";
    console.log(getIcon);
    var makeIcon = document.createElement("img");
    makeIcon.src = getIcon;
    var forecastTempEl = document.createElement("p");
    forecastTempEl.innerText = "Temp: " + tempForecast + " °F";
    var forecastWindEl = document.createElement("p");
    forecastWindEl.innerText = "Wind: " + windForecast + " MPH";
    var forecastHumdEl = document.createElement("p");
    forecastHumdEl.innerText = "Humidity: " + humdForecast + "%";

    forecastEl.append(forecastCard);
    forecastCard.append(forecastBody);
    forecastBody.append(
      forecastDate,
      makeIcon,
      forecastTempEl,
      forecastWindEl,
      forecastHumdEl
    );
  }
}
