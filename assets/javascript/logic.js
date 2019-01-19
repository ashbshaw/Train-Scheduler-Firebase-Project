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
    var firstTrain = moment($("#first-input").val().trim(), "HH:mm").format("X");
    var minutes = parseInt($("#minutes-input").val().trim());

    // Create a variable to consolidate the input data
    var newTrain = {
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        minutes: minutes,
    }

    // Uploads employee data to the database
    database.ref().push(newTrain);

    console.log(newTrain.trainName);
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
    var minTo = childSnapshot.val().minTo;

    // Convert first train time input into the proper format
    var firstTrainConverted = moment(firstTrain, "HH:mm");

    // Difference between the times
    var difference = moment().diff(moment(firstTrainConverted), "minutes");
    console.log("time difference: " + difference);

    // Time apart (remainder)
    var remainder = difference % minutes;

    // Minutes until next arrival
    var minTo = minutes - remainder;

    // Next arrival time
    var nextArrival = moment().add(minTo, "minutes").format("HH:mm");

    // THANKS, GOOGLE. I LOVE YOU.

    // Create the new row and append new data into the train schedule
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(minutes),
        $("<td>").text(nextArrival),
        $("<td>").text(minTo),

    );

    console.log(newRow);
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);

})