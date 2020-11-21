class Player {
  constructor(){
    this.index = null;
    this.distance = 0;
    this.name = null;
    this.rank = 0;
  }

  getCount(){
    var playerCountRef = database.ref('playerCount');
    playerCountRef.on("value",(data)=>{
      playerCount = data.val();
    })
  }

  updateCount(count){
    database.ref('/').update({
      playerCount: count
    });
  }

  update(){
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({
      name:this.name,
      distance:this.distance,
      rank:this.rank
    });
  }
  getFinishedPlayers()
  {
 var finishedPlayerRef =  database.ref('finishedPlayersCount');
 finishedPlayerRef.on('value',(data) =>{

  finishedPlayerCount = data.val();
 })
  }
  static updateFinishedPlayers()
  {
    this.rank += 1;
    database.ref('/').update({
      finishedPlayersCount:finishedPlayerCount+1,
      
    })
  }

  

  static getPlayerInfo(){
    var playerInfoRef = database.ref('players');
    playerInfoRef.on("value",(data)=>{
      allPlayers = data.val();
    })
  }
}
