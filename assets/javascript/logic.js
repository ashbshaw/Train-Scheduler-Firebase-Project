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

// Create other variables to reference in the database
var trainName = "";
var destination = "";
var firstTrain = "";
var minutes = 0;

// CONNECTIONS ------------------------------------------------------------------------------------------
// connectionsRef references a specific location in our database.
// All of our connections will be stored in this directory.
var connectionsRef = database.ref("/connections");

// '.info/connected' is a special location provided by Firebase that is updated every time
// the client's connection state changes.
// '.info/connected' is a boolean value, true if the client is connected and false if they are not.
var connectedRef = database.ref(".info/connected");

// When the client's connection state changes...
connectedRef.on("value", function (snap) {

    // If they are connected..
    if (snap.val()) {

        // Add user to the connections list.
        var con = connectionsRef.push(true);

        // Remove user from the connection list when they disconnect.
        con.onDisconnect().remove();
    }
});

// When first loaded or when the connections list changes...
connectionsRef.on("value", function (snapshot) {

    // Display the viewer count in the html.
    // The number of online users is the number of children in the connections list.
    $("#watchers").text(snapshot.numChildren());
});
// END CONNECTIONS------------------------------------------------------------------------------------

// On click function for submit button
$("#add-train").on("click", function (event) {

    event.preventDefault();

    // STORING AND RETRIEVING INFO FROM MOST RECENT USER 
    // Get the "values" from the form fields and store them in the variables
    trainName = $("#train-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstTrain = parseInt($("#first-train-time-input").val().trim());
    minutes = parseInt($("#minutes-input").val().trim());

    // PUSH THE INFO INTO THE CURRENT TRAIN SCHEDULE
    // Create a new variable that will hold a "<p>" tag.
    var trainSchedule = $("<tr>");

    // Then give it to an ID - THIS ISN'T RIGHT
    trainSchedule.attr("add-train", trainName, destination, firstTrain, minutes);
    trainSchedule.text(trainName, destination, firstTrain, minutes);
    $(".card-body").append(trainSchedule);
  
    // Sets the information into the Firebase database (reminder: must be inside click handler)
    database.ref().set({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        minutes: minutes,
    });

});

// Need to push the information entered into the form into the database



// How to call information stored in the database, AKA Firebase watcher & initial loader (must be in global scope)
// “On” when a value in the database changes, call the function:
// “Snapshot” is the view of what the database looks like when the function is called
// Console.log says give me the info inside the database
// Click count says go in the database, find something called click count, load it

database.ref().on("value", function (snapshot) {
    var value = snapshot.val();
    console.log(value)


    // Taken from example - need to see how it works with this one
    // clickCounter = snapshot.val().clickCount;

    // error handler
    function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    };

});



