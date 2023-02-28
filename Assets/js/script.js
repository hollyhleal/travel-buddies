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

//Add event listener to go button to run requestBreweries()
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

//Utilize the BreweryDB API to access breweries by city.
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
        //Iterate through the returned array and display 3 breweries for user.
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

//Add event listener to go button to run requestEvents()
goBtn.on("click", requestEvents);

//Utilize the Ticketmaster API to access events by city.
function requestEvents() {
  var cityId = $("#typeDestination").val();
  var dateStart = $("#startDate").val();
  var dateEnd = $("#endDate").val();

  var ticketURL = `https://app.ticketmaster.com/discovery/v2/events.json?size=200&sort=date,asc&apikey=AGWa5vWEgQZJJbVa9ZHcAxkl7H76w1f4&&city=${cityId}`;

  fetch(ticketURL)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      //Ticketmaster API was not returning events within date parameters as expected. Use Javascript filter() to obtain necessary data.
      //Filter through returned array of events to target events within specified date range.
      var startResults = data._embedded.events.filter((event) => {
        return (
          event.dates.start.localDate >= dateStart &&
          event.dates.start.localDate <= dateEnd
        );
      });
      console.log(startResults);

      //Display message in case of no events on specified dates.
      if (startResults.length === 0) {
        $("#event0").text("Sorry, no events found for those dates.");
        $("#event1").text("Sorry, no events found for those dates.");
        $("#event2").text("Sorry, no events found for those dates.");
      } else {
        //Iterate through filtered array and display 3 events for user.
        for (i = 0; i < 3; i++) {
          var mainEvent0 = startResults[i].name;

          var maineventdate0 = startResults[i].dates.start.localDate;

          var venue = startResults[i]._embedded.venues[0].name;

          var purchaseURL = startResults[i].url;

          $("#event" + i).html(mainEvent0);
          $("#date" + i).html(maineventdate0);
          $("#venue" + i).html(venue);

          //Replace url on button with "get tickets" string
          document.querySelector("#purchase-tickets" + i).value = purchaseURL;
          document.querySelector(
            "#purchase-tickets" + i
          ).innerHTML = `Get Tickets`;
          var goBtn = $("#purchase-tickets" + i);
          goBtn.on("click", openLink);
        }
      }
    });
}

//Open event link in new tab.
function openLink(value) {
  console.log(value.target.value);
  window.open(value.target.value);
}
