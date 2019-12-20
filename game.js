var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];

var audio;
var level = 0;
var gameStart = false;

var player = prompt("Give me your player's name: ");

// editing player's name
$("#player").text(player).css("color",getRandomColor());

// detecting which button has been clicked
    $(".btn").click(function(){
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        animatePress(userChosenColour);
        playSound(userChosenColour);

        checkAnswer(userClickedPattern.length - 1); 
     });
     

    // detecting keyboard press
    $(document).keydown(function(){
        setTimeout(function(){
            if(gameStart == false){
                nextSequence();
                gameStart = true; //becoming gameStart to true, with that button press will not work again
            }
        },300);
    });
    
// buttons turning on randomly
function nextSequence(){
   
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);

    var randomChosenColour = buttonColours[randomNumber]; 
    gamePattern.push(randomChosenColour);
    
    $("#"+randomChosenColour).fadeTo(100,0.3,function(){ //aqui es el "fadeOut"
        $(this).fadeTo(100,1.0); //aqui el fadeIn
        
    });
    
    playSound(randomChosenColour);  
}

// checking the answer correctly or not
function checkAnswer(currentLevel){
    // verifica si cada click que puso el jugador es el mismo color a cada posicion correspondiende del patron del juego
    if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){ 
        // console.log("Juego 1 "+gamePattern);
        // console.log("Jugador 1 "+userClickedPattern);
            // se verifica que tambien sea las mismas veces que el jugador clickeo la respuesta con la del juego
            if(gamePattern.length == userClickedPattern.length){
                // console.log("Juego 2 "+gamePattern);
                // console.log("Jugador 2 "+userClickedPattern);
                setTimeout(function(){
                    nextSequence();
                    userClickedPattern = [];
                },1000);
            }
    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over "+player+", Press Any Key to Restart");
        startOver();
    }
}


// animation for buttons
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed"); //añadiendo una clase para efecto

    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed"); //se quita dicha clase despues de 100 ms
    },100);
}
// sound for every button 
function playSound(name){
    audio =  new Audio("sounds/"+name+".mp3");
    audio.play();
}

// se inicia el juego de nuevo, con todo reseteado
function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    gameStart = false;
}
// random color for player's name
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }