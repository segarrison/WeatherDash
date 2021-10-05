var searchFormEl = document.querySelector("#search-form");
var cityName = document.createElement("h1");
var bigBox = document.querySelector("#bigBox");
function searchApi(query) {
  console.log(query);
  var locQueryUrl =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=17b4a3b1911b868571e81a79dfde759e&units=imperial";

  fetch(locQueryUrl)
    .then(function (response) {
      console.log(response);
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          var latEl = data.coord.lat;
          var lonEl = data.coord.lon;
          var tempCurrent = data.main.temp;
          var humdCurrent = data.main.humidity;
          var windCurrent = data.wind.speed;
          var tempCurrentEl = document.createElement("h5");
          var humdCurrentEl = document.createElement("h5");
          var windCurrentEl = document.createElement("h5");
          tempCurrentEl.innerText = "Temp: " + tempCurrent + " °F";
          windCurrentEl.innerText = "Wind: " + windCurrent + " MPH";
          humdCurrentEl.innerText = "Humidity: " + humdCurrent + "%";
          cityName.innerText = query;
          console.log(cityName.innerText);
          bigBox.style.visibility = "visible";
          currentWeather.append(cityName);
          currentWeather.append(tempCurrentEl);
          currentWeather.append(windCurrentEl);
          currentWeather.append(humdCurrentEl);
        });
      }
    })

    .catch(function (error) {
      console.error(error);
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
