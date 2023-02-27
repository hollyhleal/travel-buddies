var goBtn = $("#goBtn");
var input = $("input");
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
var storedTraveler = [];

//Add event listener to go button
goBtn.on("click", requestBreweries);

//Push storedTravInfo object into storedTraveler array. Use JSON.stringify to turn array into a string for local storage.
function saveTraveler() {
  var travName = $("#typeName").val();
  var travDestination = $("#typeDestination").val();
  var storedTravInfo = {
    name: travName,
    destination: travDestination,
  };
  storedTraveler.push(storedTravInfo);
  localStorage.setItem("history", JSON.stringify(storedTraveler));
}

displayToast();

//Get previous user and destinations from localStorage to display using a toast. Display the most recent traveler and destination by targeting the array length - 1.
function displayToast() {
  if (localStorage.getItem("history") === null) {
    $("#toastDisplay").removeClass("show");
    return;
  } else {
    var travHistory = localStorage.getItem("history");
    storedTraveler = JSON.parse(travHistory);

    var i = storedTraveler.length - 1;
    $("#toastName").text(storedTraveler[i].name);
    $("#toastDest").text(storedTraveler[i].destination);
  }
}

//Utilize the BreweryDB API to access breweries by city and display 3 of the options from the returned array onto cards for the user.
function requestBreweries() {
  if (input.val() === "") {
    return;
  } else {
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
            brewWebsite0.text(data[i].name);
            brewWebsite0.attr("href", data[i].website_url);
            brewWebsite0.attr("target", "_blank");
          } else if (i === 1) {
            brewName1.text(data[i].name);
            brewAddress1.text(data[i].street);
            brewWebsite1.text(data[i].name);
            brewWebsite1.attr("href", data[i].website_url);
            brewWebsite1.attr("target", "_blank");
          } else if (i === 2) {
            brewName2.text(data[i].name);
            brewAddress2.text(data[i].street);
            brewWebsite2.text(data[i].name);
            brewWebsite2.attr("href", data[i].website_url);
            brewWebsite2.attr("target", "_blank");
          }
        }
      });
    saveTraveler();
  }
}

//event listener for the Lets go button
goBtn.on("click", requestEvents);

//this function will fetch the parameters necessary for the opage to display
function requestEvents() {
  var cityId = $("#typeDestination").val();
  var dateStart = $("#startDate").val();
  var dateEnd = $("#endDate").val();

  var ticketURL =
    `https://app.ticketmaster.com/discovery/v2/events.json?sort=date,asc&apikey=AGWa5vWEgQZJJbVa9ZHcAxkl7H76w1f4&&city=${cityId}`

  // console.log(dateStart);
  // console.log(dateEnd);
  // console.log(ticketURL);

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
        var maineventdate0 = data._embedded.events[i].dates.start.localDate;
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
