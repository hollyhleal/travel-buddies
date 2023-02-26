var goBtn = $("#goBtn");
var appPage = $(".app-page");
var loginPage = $(".login-page");
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
  loginPage.addClass("hide");
  appPage.removeClass("hide");
  var city = $("#typeDestination").val();
  var breweryURL = "https://api.openbrewerydb.org/breweries?by_city=" + city;

  fetch(breweryURL)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      if (city === "") {
        return;
      }
      for (let i = 0; i < 3; i++) {
        if (i === 0) {
          brewName0.text(data[i].name);
          brewAddress0.text(data[i].street);
          brewWebsite0.text(data[i].website_url);
          brewWebsite0.attr("href", data[i].website_url);
          brewWebsite0.attr("target", "_blank");
        } else if (i === 1) {
          brewName1.text(data[i].name);
          brewAddress1.text(data[i].street);
          brewWebsite1.text(data[i].website_url);
          brewWebsite1.attr("href", data[i].website_url);
          brewWebsite1.attr("target", "_blank");
        } else if (i === 2) {
          brewName2.text(data[i].name);
          brewAddress2.text(data[i].street);
          brewWebsite2.text(data[i].website_url);
          brewWebsite2.attr("href", data[i].website_url);
          brewWebsite2.attr("target", "_blank");
        }
      }
    });
}

var ticketApiKey = "AGWa5vWEgQZJJbVa9ZHcAxkl7H76w1f4";
goBtn.on("click", requestEvents);

function requestEvents() {
  var cityId = $("#typeDestination").val();
  var dateStart = $("#startDate").val();
  // var newstartDate = dateStart.moment().format('YYYY-MM-DD');
  var dateEnd = $("#endDate").val();
  var ticketURL =
    // "https://app.ticketmaster.com/discovery/v2/events.json?apikey=AGWa5vWEgQZJJbVa9ZHcAxkl7H76w1f4&sort=date,asc" + "&city=" + cityId + "&countryCode=US" + "&startDateTime=" + dateStart;
    "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=AGWa5vWEgQZJJbVa9ZHcAxkl7H76w1f4&" +
    "&city=" +
    cityId +
    "&starteDateTime=" +
    dateStart;
  console.log(dateStart);
  console.log(dateEnd);
  console.log(ticketURL);

  fetch(ticketURL)
    .then(function (response) {
      // console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      // first event
      for (i = 0; i < 4; i++) {
        var mainEvent0 = data._embedded.events[i].name;
        // console.log(mainEvent0);
        var maineventdate0 = data._embedded.events[1].dates.start.localDate;
        // console.log(maineventdate0);
        var venue = data._embedded.events[i]._embedded.venues[0].name;
        // console.log(venue);
        var purchaseURL = data._embedded.events[i].url;
        // console.log(purchaseURL)

        // using jquery to tie the variables.
        $("#event" + i).html(mainEvent0);
        $("#date" + i).html(maineventdate0);
        $("#venue" + i).html(venue);
        $("#purchase-tickets" + i).html(purchaseURL);
        // console.log(mainEvent0);
        // add date parameter to url (&=)
        // var for date range
      }

      // document.getElementById("").addEventListener("click", purchaseURL);
    });
}
