var heroTile = 1,
    enemyTile = 1;

function createGame(){
    let contentContainer = document.getElementById("caracterOverview"),
        h1 = document.querySelector("h1"),
        tiles = 30,
        tileNumber = 0;
    contentContainer.innerHTML ="";
    contentContainer.innerHTML += "<div class='col-sm-9 row' id='game__game'></div>";
    contentContainer.innerHTML += "<div class='col-sm-3' id='game__log'></div>";
        let contentGame = document.getElementById("game__game"),
            contentLog = document.getElementById("game__log");
    h1.innerHTML = "Roll!"
    for(i = 0; 6 > i; i++){
        var tileNumber2 = 4;
        for(j = 1; 6 > j; j++){
            tileNumber++;
            if(i%2){
                contentGame.innerHTML += "<div class='col-2-10 game__tile col-2-tile' id='tile-" + (tileNumber+tileNumber2) + "' class='tiles'>"/* + (tileNumber+tileNumber2)*/ + "</div>";
                tileNumber2 = tileNumber2 - 2;
            }  else {
                contentGame.innerHTML += "<div class='col-2-10 game__tile col-2-tile' id='tile-" + tileNumber + "' class='tiles'>"/* + tileNumber*/ + "</div>";
            }
            if(j === 5 && i === 5){
                moveCharacter("enemy");
                moveCharacter("hero");
            }
        }
    }
}

function moveCharacter(character){
    let findHeroTile = document.getElementById("tile-"+heroTile),
        findEnemyTile = document.getElementById("tile-"+enemyTile);
    console.log(enemyTile,heroTile);
    if (character === "hero"){
        findHeroTile.innerHTML += "<img id='heroImage' src='Media/Pic/placeholder.jpg'>";
    } else if (character === "enemy"){
        findEnemyTile.innerHTML += "<img id='enemyImage' src='Media/Pic/placeholder.jpg'>";
    }
}