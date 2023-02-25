var goBtn = $("#goBtn");

goBtn.on("click", requestRestaurants);

function requestRestaurants() {
  var city = $("#typeDestination").val();
  var breweryURL =
    "https://api.openbrewerydb.org/breweries?by_city=" + city + "&per_page=3";

  fetch(breweryURL)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}
