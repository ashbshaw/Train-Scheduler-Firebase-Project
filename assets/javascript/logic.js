// Initialize Firebase
var config = {
    apiKey: "AIzaSyCyLSSZRdflHVU7Vp5AThFINNeXX4SGMb4",
    authDomain: "ashleys-train-scheduler.firebaseapp.com",
    databaseURL: "https://ashleys-train-scheduler.firebaseio.com",
    projectId: "ashleys-train-scheduler",
    storageBucket: "ashleys-train-scheduler.appspot.com",
    messagingSenderId: "579029626638"
  };

firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

// On click function for submit button to add train info
$("#submit").on("click", function (event) {

    event.preventDefault();

    // STORING AND RETRIEVING INFO FROM MOST RECENT USER 
    // Grab the "values" from the form fields and store them in variables
    var trainName = $("#train-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrain = parseInt($("#first-input").val().trim());
    var minutes = parseInt($("#minutes-input").val().trim());

    // Create a variable to consolidate the input data
    var newTrain = {
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        minutes: minutes,
    }
    
    // Push the input data into the Firebase database (reminder: must be inside click handler)
    database.ref().push(newTrain);

    // Check information in console
    console.log(newTrain.trainName);
    console.log(newTrain.destination);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrain);
    console.log(newTrain.minutes);

    // Clear input area
    $("#train-input").val("");
    $("#destination-input").val("");
    $("#first-input").val("");
    $("#minutes-input").val("");

});

// Push input data into the current train schedule, including adding a row each time
database.ref().on("child_added", function (childSnapshot) {

    // Store everything into a variable.
    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().firstTrain;
    var minutes = childSnapshot.val().minutes;

    // Calculate the time until the newly input train arrives
    //var timeCalc = moment().diff(moment(firstTrain, "X"), "minutes");
    //console.log(minutes);

    // Create the new row and append new data into the train schedule
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(firstTrain),
        $("<td>").text(minutes),
    );

    // Append the new row to the table
    $("#train-table > tbody").append(newRow);

})


