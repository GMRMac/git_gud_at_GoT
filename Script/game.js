var heroTile = 1,
    enemyTile = 1,
    characterRound = "hero";

function createGame(){
    let contentContainer = document.getElementById("caracterOverview"),
        h1 = document.querySelector("h1"),
        tiles = 30,
        tileNumber = 0;
    contentContainer.innerHTML ="";
    contentContainer.innerHTML += "<div class='col-sm-7 row' id='game__game'></div>";
    contentContainer.innerHTML += "<div class='col-sm-5' id='game__log--container'><div class='col-12' id='game__button--container'><button id='game__button--roll' onclick='rollFunction()'>Roll me!</button></div><div class='col-12' id='game__log'></div>";
        let contentGame = document.getElementById("game__game"),
            contentLog = document.getElementById("game__log--container");
    h1.innerHTML = "The race is on!"
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
                let gameLog = document.getElementById("game__log");
                gameLog.innerHTML = "The game is on!<br>";
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

function rollFunction(){
    let gameLog = document.getElementById("game__log"),
        randomNumber = Math.ceil(Math.random()*6);
    if (characterRound === "hero"){
        let hero = document.getElementById("heroImage").remove();
        gameLog.innerHTML += "Hero rolled a " + randomNumber + "<br>";
        gameLog.innerHTML += "Hero moves from tile " + heroTile + " to tile " + (heroTile+randomNumber) + "<br>";
        heroTile = (heroTile+randomNumber);
        moveCharacter("hero");
        if (randomNumber == 6){
            return
        } else {
            return characterRound = "enemy";
        }
    }
    if (characterRound == "enemy"){
        let enemy = document.getElementById("enemyImage").remove();
        gameLog.innerHTML += "Enemy rolled a " + randomNumber + "<br>";
        gameLog.innerHTML += "Enemy moves from tile " + enemyTile + " to tile " + (enemyTile+randomNumber); + "<br>"
        enemyTile = (enemyTile+randomNumber);
        moveCharacter("enemy");
        if (randomNumber == 6){
            return
        } else {
            return characterRound = "hero";
        }
    }
}