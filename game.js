
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var level = 0;
var userClickedPattern = [];

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 3 + 1);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    $("h1").text("Level " + level);
    level += 1;
    setTimeout(function () {
        playSound(randomChosenColour);
        animatePress(randomChosenColour);

    }, 1000);


}




$(".btn").click(function () {
    var userChosenColour;
    userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    if (userClickedPattern.length < gamePattern.length) {
        if (userChosenColour !== gamePattern[userClickedPattern.length - 1]) {
            playSound("wrong");
            $("body").addClass("game-over");
            $("h1").text("Game Over. Press Any key to Restart!");
            setTimeout(function () {
                $("body").removeClass("game-over");
            }, 200);
            flag = 0;
            gamePattern = [];
            userClickedPattern = [];
            level = 0;
        }
    }
    else {     //if equal
        if (userChosenColour === gamePattern[userClickedPattern.length - 1]) {
            userClickedPattern = [];
            setTimeout(nextSequence, 1000);
        }
        else {
            playSound("wrong");
            $("body").addClass("game-over");
            $("h1").text("Game Over. Press Any key to Restart!");
            setTimeout(function () {
                $("body").removeClass("game-over");
            }, 200);
            flag = 0;
            gamePattern = [];
            userClickedPattern = [];
            level = 0;
        }

    }
})

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100)

}
var flag = 0;
$(document).keypress(function (event) {


    if (flag === 0) {
        flag = 1;

        nextSequence();
    }
})


