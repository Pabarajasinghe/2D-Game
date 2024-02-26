// run start
var runStart = 0;

//audios

//run audio
var runSound = new Audio("run.mp3");
runSound.loop = true;

//jump audio
var jumpSound = new Audio("jump.mp3");

//dead audio
var deadSound = new Audio("dead.mp3");

//key check function

function keyCheck(event){

   //enter key
   if (event.which == 13 ) {
       if (runWorkerId == 0){
           blockWorkerId=setInterval(createBlock,1000);
           moveBlockWorkerId= setInterval(moveBlock,100);

           runWorkerId = setInterval(run,100);
           runSound.play();
           runStart = 1 ;

           backgroundWorkerId = setInterval(moveBackground,100);
           scoreWorkerId = setInterval(updateScore,50);
       }
   }

   //space key
   if (event.which == 32){
       
        if (runStart == 1){

            if(jumpWorkerId == 0){
                clearInterval(runWorkerId);
                runSound.pause();

                runWorkerId = -1;
                jumpWorkerId = setInterval(jump,100);
                jumpSound.play();
           }
        }
     } 
}

// player
var player = document.getElementById("player");

// run function
var runWorkerId = 0;
var runImageNumber = 1;

function run(){
   runImageNumber++;

   if (runImageNumber == 9) {
       runImageNumber = 1;
   }

  player.src = "Run (" + runImageNumber + ").png";
}

//jump function
var jumpWorkerId = 0;
var jumpImageNumber =1;
var playerMarginTop = 500;

 function jump() {
    jumpImageNumber++;

    //fly
    if(jumpImageNumber <=7) {// jump img 2-7
       playerMarginTop = playerMarginTop - 30;
       player.style.marginTop = playerMarginTop +"px";
    }

    //land
    if(jumpImageNumber >=8) {// jump img 8-1
       playerMarginTop=playerMarginTop + 30;
       player.style.marginTop = playerMarginTop + "px";
    }
      
    if(jumpImageNumber == 13) {
       jumpImageNumber = 1;
       clearInterval(jumpWorkerId);
       runWorkerId = setInterval(run,100);
       runSound.play();
       jumpWorkerId= 0;
     }
       player.src = "Jump (" + jumpImageNumber + ").png";  
   
 }

 //background
 var background = document.getElementById("background");

 //movebackground function
 var backgroundX = 0;
 var backgroundWorkerId = 0;

 function moveBackground(){
    backgroundX = backgroundX - 20;
    background.style.backgroundPositionX = backgroundX + "px";
 }

 //score
 var score = document.getElementById("score");

 //update score function
 var newScore = 0;
 var scoreWorkerId = 0;

 function updateScore(){
    newScore++;
    score.innerHTML = newScore;
 }

 
        if (newMarginLeft > 62){//createblock function
 var blockMarginLeft = 700;
 var blockWorkerId = 0;
 var blockId = 1;

 function createBlock(){
       var block = document.createElement("div");
       block.className = "block";
       block.id = "block" + blockId;

       blockId++;
          
    var gap = Math.random() * (1000-400) +400;
    blockMarginLeft = blockMarginLeft + gap;

          block.style.marginLeft = blockMarginLeft + "px";

       background.appendChild(block);
 }

 //moveblock function

var moveBlockWorkerId = 0;

 function moveBlock() {

     for(var i = 1; i <=blockId; i++){

    var currentBlock = document.getElementById("block" + i );
    var currentMarginLeft = currentBlock.style.marginLeft;
    var newMarginLeft = parseInt(currentMarginLeft) - 20;
    currentBlock.style.marginLeft = newMarginLeft + "px";

     // 152 - 62 
     if(newMarginLeft < 152) {
            if (playerMarginTop > 410) {

                clearInterval(runWorkerId);
                runSound.pause();
                clearInterval(jumpWorkerId);
                jumpWorkerId = -1;
                clearInterval(backgroundWorkerId);
                clearInterval(scoreWorkerId);
                clearInterval(blockWorkerId);
                clearInterval(moveBlockWorkerId);
                deadImageNumber = setInterval(dead,100);
                deadSound.play();
            }
        }
     }   
   }
 }

 //dead function
var deadWorkerId = 0; 
var deadImageNumber = 1;


  function dead(){
   deadImageNumber++;

   if (deadImageNumber= 10 ){
      clearInterval(deadWorkerId);
      player.style.marginTop = "500px";
      document.getElementById("endScreen").style.visibility = "visible";
      document.getElementById("endScore").innerHTML = "Your Score -" + newScore;
   }

   player.src = "Dead (" + deadImageNumber + ").png";
  }


  function reload(){
     location.reload();
  }
