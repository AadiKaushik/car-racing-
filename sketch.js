var canvas, backgroundImage;
var  pastFinished = false;
var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;
var finishedRank,finishedPlayerCount = 0;
var cars, car1, car2, car3, car4;

function preload()
      {
      car1_img = loadImage("images/car1.png");
      car2_img = loadImage("images/car2.png");
      car3_img = loadImage("images/car3.png");
      car4_img = loadImage("images/car4.png");
      track_img = loadImage("images/track.jpg");
      ground_img = loadImage("images/ground.png");
      
goldImage = loadImage("images/gold.png");
silverImage = loadImage("images/silver.png");
bronzeImage = loadImage("images/bronze.png");

      }

function setup(){
      canvas = createCanvas(displayWidth - 20, displayHeight-30);
      database = firebase.database();
      game = new Game();
      game.getState();
      game.start();
    }


function draw(){
        if(playerCount === 4){
          game.update(1);
        }

        if(gameState === 1){
          clear();
          game.play();
        }

        if(finishedPlayerCount === 4)
        {
          game.update(2)
  
        }

        if(gameState === 2 && finishedPlayerCount===4)
        {
        game.displayWinner()
        }
      }
