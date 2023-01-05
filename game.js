var gamePattern = [];
var buttonColor = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
function playSound(name){
  var audio = new Audio("sounds/" + name+ ".mp3");

  audio.play();
}

var started = false;
var level = 0;
$(document).keydown(function(evt){

    if(evt.key === "a" || evt.key ==="A"){
      $("h1").text("Level " + level);
      nextSequence()
      started = true;
    }

});

function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      playSound(userClickedPattern[currentLevel]);
      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }


    } else {
      $("body").css("background-color", "red");
      setTimeout(function () {$("body").css("background-color", "#011F3F")}, 200);
      playSound("wrong");
      console.log("wrong");
      $("h1").text("Game Over! Your Score: " + level + " Press A key start again");
      level = 0;
      gamePattern = [];
      userClickedPattern = [];
      started = false;

    }

}
$(".btn").click(function(){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1)



});


function nextSequence(){
    level += 1;
    var randomNumber = Math.floor(Math.random()*4);


    var randomChosenColor = buttonColor[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    //playSound(randomChosenColor);
    $("h1").text("Level " + level);

}

function animatePress(color){
  $("." + color).addClass("pressed")
  setTimeout(function(){
    $("." + color).removeClass("pressed");
  }, 100);
}
