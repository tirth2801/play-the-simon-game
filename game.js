//Empty array
gamePattern = [];

//New empty array
var userClickedPattern = [];

// Storing values of the color
var buttonColors = ["red", "blue", "green", "yellow"];

//Keeping track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;

//New variable called level and start at level 0.
var level = 0;

//jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keydown(function() {
  if (!started) {

    //The h1 title starts out saying "Press A Key to Start", when the game has started, changing this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//Handler Function
$(".btn").click(function(){
  //Storing the id of the button that got clicked.
  var userChosenColour = $(this).attr("id");

  //Add the contents of userChosenColour to the end of userClickedPattern
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  //checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length-1);
});

function nextSequence() {

  // Once nextSequence() is triggered, reset the userClickedPattern to an empty
  // array ready for the next level.
  userClickedPattern = [];

  //Increasing level counter every time this function is called
  level++;

  //Inside nextSequence(), update the h1 with this change in the value of level.
  $("#level-title").text("Level " + level);

  // Generating a random number 0-3
  var randomNumber = Math.floor(Math.random() * 4);

  // Choosing one color
  var randomChosenColour = buttonColors[randomNumber];

  // Adding chosen color to gamePattern array
  gamePattern.push(randomChosenColour);

  //Animation on the buttonColors
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

//New Play sound Function
function playSound(name){
  // Playing the audio
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//Creating function for Animation
function animatePress(currentColor) {

  // jQuery to add the pressed class to the button that gets clicked inside animatePress().
  $("#" + currentColor).addClass("pressed");

  //Javascript to remove the pressed class after a 100 milliseconds.
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);

}

function checkAnswer(currentLevel){
  //An if statement inside checkAnswer() to check if the most recent user answer
  //is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //If the user got the most recent answer right in step 3, then check that
      //they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //Calling nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      console.log("wrong");

      console.log("wrong");

      //play this sound if the user got one of the answers wrong.
      playSound("wrong");

      //apply this class to the body of the website when the user gets one of
      //the answers wrong and then remove it after 200 milliseconds.
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      //Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
      $("#level-title").text("Game Over, Press Any Key to Restart");

      //Starting over once the user gets it wrong
      startOver();

    }
}

function startOver() {
  //Inside this function, you'll need to reset the values of level, gamePattern and started variables.
  level = 0;
  gamePattern = [];
  started = false;
}
