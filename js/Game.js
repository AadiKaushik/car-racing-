class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }



  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage(car1_img);
    car2 = createSprite(300,200);
    car2.addImage(car2_img);
    car3 = createSprite(500,200);
    car3.addImage(car3_img);
    car4 = createSprite(700,200);
    car4.addImage(car4_img);
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    player.getFinishedPlayers();
    
    if(allPlayers !== undefined){
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175;
      var y;

      background(198,135,103)
      
      image(track_img,0,-displayHeight*4,displayWidth,displayHeight*5);

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          stroke (10)
          fill("red")
          ellipse(x,y,80,80);

          textSize(16);
          textAlign(CENTER);
        text(allPlayers[plr].name,x,y-90,);
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }



    }

    if(keyIsDown(UP_ARROW) && player.index !== null && pastFinished === false){
      player.distance +=10
      player.update();
    }

if(player.distance>3860 && pastFinished === false)
{
Player.updateFinishedPlayers();


player.rank = finishedPlayerCount ;
player.update();
 pastFinished = true;
 // gameState =2;


}



    drawSprites();
  }

displayWinner()
  {
    imageMode(CENTER);
    camera.position.x = displayWidth/2 ; 
    camera.position.y = 0; 

    Player.getPlayerInfo();
  

    image(goldImage,displayWidth/2,-100,250,300);
    image(silverImage,displayWidth-250,-100+displayHeight/10,225,270);
    image(bronzeImage,displayWidth/2-350,-100+displayHeight/9,200,240);

    textAlign(CENTER);
    textSize(50);
    for(var plr in  allPlayers )
    {
if(allPlayers [plr].rank === 1)
{
  fill("yellow")
  text("1st : " + allPlayers[plr].name,displayWidth/2,85)
}
else if(allPlayers[plr].rank === 2)
{
  fill("silver")
  text( "2nd : "+ allPlayers[plr].name,displayWidth/2+350,displayHeight/9+73)
}
else if(allPlayers[plr].rank === 3)
{
  fill("brown")
  text( "3rd : "+ allPlayers[plr].name,displayWidth/2-350,displayHeight/10+76)
}
else {
  textSize(30);
  text("Hounrable mention : " + allPlayers[plr].name,displayWidth/2,255)
}
    }

  }
}
