var searchFormEl = document.querySelector("#search-form");

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
