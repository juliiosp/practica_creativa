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

    // If the response is ok, print a message to wait and start polling
    if(response.status == "OK") {
      $( "#result" ).empty().append( "Processing..." );

      // Abro websocket
      openSocket(response.id);
    }
  });
});

var socket = null;
// Poll the prediction URL
function openSocket(id) {

  console.log("Creating WebSocket connection...");

  if (socket) {
    console.log("Closing previous socket");
    socket.disconnect();
    socket = null;
  }

  socket = io();

  socket.on("connect", function() {
    console.log("Socket connected", socket.id);
    socket.emit("join", {uuid: id});
  });

  socket.on("prediction_result", function(prediction) {
    if (prediction.UUID && prediction.UUID !== id) return;
    renderPage(prediction);
    socket.disconnect();
    socket = null;
  });

  socket.on("disconnect", function() {
    console.log("Closing WebSocket");
  });
}

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