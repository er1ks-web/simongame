//Random color array
var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;  // To track if the game has started
var level = 0;// Initialize level

var highscore = 0;// Initialize highscore

var previousScore = 0;

// Start the game when the start button is clicked
$("#start-btn").click(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
    $("#start-btn").hide(); // Hide the start button after the game starts
  }
});



$(".btn").click(function() {
//document.querySelectorAll(".btn")[i].addEventListener("click", function() {
// JS version of this jQuery

      //Store the ID of the clicked button
      var userChosenColor = $(this).attr("id");
      //Add the users clicked button to the userClickedPattern array
      userClickedPattern.push(userChosenColor);
      console.log(userClickedPattern);

      // Add the "pressed" class to the button that was clicked
      this.classList.add("pressed");
      //Remove the "pressed" class after 100ms
      setTimeout(function() {
        this.classList.remove("pressed");
      }.bind(this), 1000);


      // Call the animatePress function to animate the button
      animatePress(userChosenColor);
      // Call the function to play the sound of the button
      playSound(userChosenColor);

      // Check the user's answer
      checkAnswer(userClickedPattern.length - 1);

   });

   // Open the rules modal when "Rules" button is clicked
   $("#rules-btn").click(function() {
     $("#rules-modal").show();
   });

   // Close the modal when "X" is clicked
   $("#close-modal").click(function() {
     $("#rules-modal").hide();
   });

   // Close the modal when anywhere outside of the modal is clicked
   $(window).click(function(event) {
     if ($(event.target).is("#rules-modal")) {
       $("#rules-modal").hide();
     }
   });

// Call this function to check the user's answer
function checkAnswer(currentLevel) {
  // Check if the most recent user answer matches the game pattern
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");

    // Check if the user has finished the sequence for the current level
    if (userClickedPattern.length === gamePattern.length) {
      // Move to the next sequence after a 1-second delay
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong"); // Play the sound if user gets it wrong

    $("body").addClass("game-over"); // Changes the bgr color when user is wrong by applying class 'game-over'


    setTimeout(function () { //removes the "game-over" class after 200ms
      $("body").removeClass("game-over");
    }, 400);

    $("#level-title").text("Game Over, Press Any Key To Restart"); //  // Change the h1 title to say "Game Over, Press Any Key to Restart"


    //Check if the current level is higher than the Highscore
    if (level > highscore) {
      highscore = level; // Update the Highscore
      previousScore = level;
      $("#highscore").text("Highscore: " + highscore); //Display the new highscore
      $("#previous-score"). text("Previous score: " + previousScore);
    }
    else {
      previousScore = level;
      $("#previous-score"). text("Previous score: " + previousScore);
    }

    startOver(); // Call startOver function to restart the game
  }
}


function nextSequence(){

  userClickedPattern = [];// Reseting the userClickedPattern everytime this function is triggered

  level++; // Increases the level by 1 each time
  $("#level-title").text("Level " + level); // Updates the text for each level

  var randomNumber = Math.floor(Math.random() * buttonColors.length);  // Random number generator
  var randomChosenColor = buttonColors[randomNumber];  //Random color picker

  gamePattern.push(randomChosenColor);  //Add the randomChosenColor to the gamePattern array

  // Correct spelling for randomChosenColor
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);

}


// Sound switch function for each sound and color
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor){
//  Adding the .pressed class to the button of the given color
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  // Reset the game variables
  level = 0;
  gamePattern = [];
  started = false;

  // Show the button again with "Try Again" text
  $("#start-btn").text("Try Again").show();
}
