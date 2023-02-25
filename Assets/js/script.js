var goBtn = $("#goBtn");
var brewName0 = $("#brewName0");
var brewName1 = $("#brewName1");
var brewName2 = $("#brewName2");
var brewAddress0 = $("#brewAddress0");
var brewAddress1 = $("#brewAddress1");
var brewAddress2 = $("#brewAddress2");
var brewWebsite0 = $("#brewWebsite0");
var brewWebsite1 = $("#brewWebsite1");
var brewWebsite2 = $("#brewWebsite2");

goBtn.on("click", requestBreweries);

function requestBreweries() {
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
      for (let i = 0; i < data.length; i++) {
        if (i === 0) {
          brewName0.text(data[i].name);
          brewAddress0.text(data[i].street);
          brewWebsite0.text(data[i].website_url);
        } else if (i === 1) {
          brewName1.text(data[i].name);
          brewAddress1.text(data[i].street);
          brewWebsite1.text(data[i].website_url);
        } else {
          brewName2.text(data[i].name);
          brewAddress2.text(data[i].street);
          brewWebsite2.text(data[i].website_url);
        }
        // brewName.text(data[i].name);
        // brewAddress.text(data[i].street);
        // brewWebsite.text(data[i].website_url);
      }
    });
}
