document;
var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userclickedPattern=[];
var level=0;
var started=false;
$(document).keypress(function() {
    if (!started) {
      nextSequence();
    }
  });
function nextSequence(){
    userclickedPattern=[];
    $("#level-title").text("Level " + level);
    level++;
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColours=buttonColours[randomNumber];
    gamePattern.push(randomChosenColours);
    var value2="#"+randomChosenColours;
    $(value2).fadeOut(100).fadeIn(100);
    playsound(randomChosenColours)
    animatePress(randomChosenColours);}
        $(".btn").on("click",function(){
            var userChosenColours=$(this).attr("id");
            userclickedPattern.push(userChosenColours);
        playsound(userChosenColours);
        animatePress(userChosenColours);
        checkAnswer(userclickedPattern.length-1);
    });
function playsound(name){
    switch(name){
        case "red":
            var audio=new Audio("sounds/red.mp3");
            audio.play();
            break;
        case "blue":
            var audio=new Audio("sounds/blue.mp3");
            audio.play();
            break;
        case "green":
            var audio=new Audio("sounds/green.mp3");
            audio.play();
            break;
        case "yellow":
            var audio=new Audio("sounds/yellow.mp3");
            audio.play();
            break;
        default:
            var audio=new Audio("sounds/wrong.mp3");
            audio.play();
    }
}
function animatePress(currentcolour){
    document.getElementById(currentcolour).classList.add("pressed");
    setTimeout(function(){
        document.getElementById(currentcolour).classList.remove("pressed");},100);
    }
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userclickedPattern[currentLevel]){
            if(userclickedPattern.length===gamePattern.length){
        setTimeout(function(){nextSequence();},1000);
            }
        }else{
            $("body").addClass("game-over");
            playsound("wrong");
            setTimeout(function(){
                $("body").removeClass("game-over");
            },200);
            startOver();
        }
    }
function startOver(){
    $("#level-title").text("Game Over,Press Any Key to Restart");
    level=0;
    gamePattern=[];
    started=false;
}