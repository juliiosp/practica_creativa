// Attach a submit handler to the form
$( "#flight_delay_classification" ).submit(function( event ) {

  // Stop form from submitting normally
  event.preventDefault();

  // Get some values from elements on the page:
  var $form = $( this ),
    term = $form.find( "input[name='s']" ).val(),
    url = $form.attr( "action" );

  // Send the data using post
  var posting = $.post(
    url,
    $( "#flight_delay_classification" ).serialize()
  );

  // Submit the form and parse the response
  posting.done(function( data ) {
    var response = JSON.parse(data);

    // If the response is ok, print a message to wait for results
    if(response.status == "OK") {
      $( "#result" ).empty().append( "Processing..." );
      currentID = response.id;

      if(socket.connected) {
        socket.emit("join", { uuid: response.id });
      } else {
        socket.connect();
      }
    }
  });
});

let socket = io();
let currentID = null;

socket.on("connect", function () {
  console.log("Socket connected", socket.id);
  if (currentID) socket.emit("join", { uuid: currentID });
});

socket.on("prediction_result", function (prediction) {
  if (prediction.UUID && currentID && prediction.UUID !== currentID) return;
  renderPage(prediction);
});

socket.on("disconnect", function () {
  console.log("Socket disconnected");
});

// Render the response on the page for splits:
// [-float("inf"), -15.0, 0, 30.0, float("inf")]
function renderPage(response) {

  console.log(response);

  var displayMessage;

if(response.Prediction == 0 || response.Prediction == '0') {
    displayMessage = "Early (15+ Minutes Early)";
  }
  else if(response.Prediction == 1 || response.Prediction == '1') {
    displayMessage = "Slightly Early (0-15 Minute Early)";
  }
  else if(response.Prediction == 2 || response.Prediction == '2') {
    displayMessage = "Slightly Late (0-30 Minute Delay)";
  }
  else if(response.Prediction == 3 || response.Prediction == '3') {
    displayMessage = "Very Late (30+ Minutes Late)";
  }
  
  console.log(displayMessage)

  $( "#result" ).empty().append( displayMessage );
}