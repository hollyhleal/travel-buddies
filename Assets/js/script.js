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
var storedTraveler = [];
var storedTravInfo = {};

goBtn.on("click", requestBreweries);

function modalInput() {
  var travName = $("#typeName").val();
  var travEmail = $("#typeEmail").val();
  var travDestination = $("#typeDestination").val();
  var travDateStart = $("#startDate").val();
  var travDateEnd = $("#endDate").val();
  console.log(travName, travEmail, travDestination, travDateStart, travDateEnd);
}

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
//ticketAPI from ticketmaster
var ticketApiKey = "AGWa5vWEgQZJJbVa9ZHcAxkl7H76w1f4";

//event listener for the Lets go button 
goBtn.on("click", requestEvents);

//this function will fetch the parameters necessary for the opage to display
function requestEvents() {
  var cityId = $("#typeDestination").val();
  var dateStart = $("#startDate").val();
  var dateEnd = $("#endDate").val();
  var ticketURL =

    `https://app.ticketmaster.com/discovery/v2/events.json?apikey=AGWa5vWEgQZJJbVa9ZHcAxkl7H76w1f4&city=${cityId}&dateStart${dateStart}&dateEnd${dateEnd}`


  // for dev view
  console.log(dateStart);
  console.log(dateEnd);
  console.log(ticketURL);

  //this will fetch the ticketURL with the objects within 
  fetch(ticketURL)
    .then(function (response) {
      // console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      //this loop will target and declare each variable 
      for (i = 0; i < 3; i++) {
        var mainEvent0 = data._embedded.events[i].name;
        // console.log(mainEvent0);
        var maineventdate0 = data._embedded.events[1].dates.start.localDate;
        // console.log(maineventdate0);
        var venue = data._embedded.events[i]._embedded.venues[0].name;
        // console.log(venue);
        var purchaseURL = data._embedded.events[i].url;
        // console.log(purchaseURL)
        // var eventImg = data._embedded.events[i].images[0].url;
        // console.log(eventImg)

        //this will targert the variables and will display to html IDs
        $("#event" + i).html(mainEvent0);
        $("#date" + i).html(maineventdate0);
        $("#venue" + i).html(venue);

        //this will replace the url text and replace with a new string 
        document.querySelector("#purchase-tickets" + i).value = purchaseURL
        document.querySelector("#purchase-tickets" + i).innerHTML = `Click Here for more info`
        var goBtn = $("#purchase-tickets" + i);
        goBtn.on("click", openLink);


      }

    });

}
// this function is to open the link and use a separate tab 
function openLink(value) {
  console.log(value.target.value)
  window.open(value.target.value)
}