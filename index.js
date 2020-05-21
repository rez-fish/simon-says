let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;

$(document).keypress(function () {
  if (level === 0) {
    nextSequence();
    $("h1").text(`Level ${level}`);
  }
});

$(".btn").click(function (e) {
  if (level !== 0) {
    let yourColor = e.target.id;

    userClickedPattern.push(yourColor);
    playSound(yourColor);
    animatePress(yourColor);
    checkAnswer(userClickedPattern.length - 1);

    console.log(gamePattern);
    console.log(userClickedPattern);
  }
});

function nextSequence() {
  userClickedPattern = [];

  level++;
  $("h1").text(`Level ${level}`);
  let randomNum = Math.floor(Math.random() * 4);
  let randomColor = buttonColors[randomNum];
  gamePattern.push(randomColor);

  $(`#${randomColor}`).fadeOut(100).fadeIn(100);
  playSound(randomColor);
}

function playSound(name) {
  let sound = new Audio(`sounds/${name}.mp3`);
  sound.play();
}

function animatePress(currentColor) {
  $(`#${currentColor}`).addClass("pressed");
  setTimeout(function () {
    $(`#${currentColor}`).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    $("body").addClass("wrong");
    setTimeout(function () {
      $("body").removeClass("wrong");
    }, 1000);
    $("h1").html("GAME OVER<br>Press Button To Try Again</br> ");
  }
}
