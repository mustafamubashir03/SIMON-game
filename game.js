let userClickedPattern = []
let gamePattern = [];
let buttonColors = ["red", "blue", "green", "yellow"];
var keyPress = 0;
var level = 0;
function playSound(color) {
  var music = new Audio("./sounds/" + color + ".mp3");
  music.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
    }, 100);
  
}

function startOver() {
  level = 0;
  keyPress = 0;
  gamePattern = []
}
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    console.log(gamePattern[currentLevel])
    console.log(userClickedPattern[currentLevel])
    console.log("Success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
     },1000 );       
    }

  }
  else { 
    var wrong = new Audio("./sounds/wrong.mp3");
    wrong.play()
    $("body").addClass("game-over")
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 2000);    
    document.querySelector("#level-title").textContent = "Game Over.Press any key to Start";
    startOver();
  }  
}

function nextSequence() {
  level++;
  userClickedPattern = [];
  document.querySelector("#level-title").textContent = ("Level: " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  var selectedColor = $("#" + randomChosenColor); 
  playSound(randomChosenColor);
  selectedColor.fadeIn(100).fadeOut(100).fadeIn(100)
}


document.addEventListener("keydown", function () {
  if (keyPress === 0) {
    document.querySelector("#level-title").textContent = ("Level: " + level);
    nextSequence();
    keyPress++;
  }
})

$(".btn").click(function () {
  var userChosenButton = this.id;
  userClickedPattern.push(userChosenButton);
  playSound(userChosenButton);
  animatePress(userChosenButton);
  checkAnswer(userClickedPattern.length - 1);
  }
);