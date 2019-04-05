function fetchData(){
    fetch("https://anapioficeandfire.com/api/characters")
    .then(function(data){
        return data.json();
    })
    .then(function(myJson){
        console.log(myJson);
        displaySelectableCharacters(myJson, "Select your hero!", "hero");
    })
}
fetchData();

var heroCharacter,
    heroImageNumber,
    enemyCharacter,
    EnemyImageNumber,
    characterside;

function displaySelectableCharacters(data, header, characterSide){
    let characterNumber = 0,
        content = document.getElementById("caracterOverview"),
        h1 = document.querySelector("h1");
    content.innerHTML = "";
    if(h1.innerHTML == "Select your enemy!"){
        document.innerHTML ="";
        return createGame();
    }
    characterside = characterSide;
    h1.innerHTML = header;
    for(var characters of data){
        let name = characters.aliases;
        let pictureFileSplit = name[0].split(" ");
        let pictureFileJoin = pictureFileSplit.join("_");
//        console.log(pictureFileJoin);
        pictureFileJoin = "placeholder";
        content.innerHTML += `
<div onclick="findSelectedCharacter(`+characterNumber+`)" id="character-` + characterNumber + `" class='col-lg-3 col-4'><div class='caracterPreview'>
<img style="width:100%;" src="Media/Graph/`+(characterNumber+1)+`.png">
<h2>`+name+`</h2>
</div></div>`;
        characterNumber++;
    }
}

function findSelectedCharacter(number){
    fetch("https://anapioficeandfire.com/api/characters/"+(number+1))
    .then(function(data){
        return data.json()
    })
    .then(function(myJson){
        displaySelectedCharacter(myJson, number);
    })
}

function displaySelectedCharacter(data, number){
    var character = document.getElementById("characterContent");
    pictureFileJoin = "placeholder";
    character.style.display = "block";
    character.innerHTML = `<div onclick="removeOverlay()" class="overlay--dark"></div><div class="overlay__content"><h2>` + name + `</h2>
<img style="width:50%; display:block;" src="Media/Graph/`+(number+1)+`.png">
<button onclick="displayEnemyCharacter()">Next>></button>`
    +`</div>`;
        if(characterside === "hero"){
            heroCharacter = data;
            heroImageNumber = number;
            console.log(heroCharacter)
        } else if (characterside === "enemy"){
            enemyCharacter = data;
            enemyImageNumber = number;
        }
}

function displayEnemyCharacter(){
    removeOverlay();
    fetch("https://anapioficeandfire.com/api/characters")
    .then(function(data){
        return data.json();
    })
    .then(function(myJson){
        console.log(myJson);
        displaySelectableCharacters(myJson, "Select your enemy!", "enemy");
    })
}

console.log("hello world");


function removeOverlay(){
    var overlay = document.getElementById("characterContent");
    console.log("help");
    overlay.innerHTML="";
}

function compareValues(data, wanterResult){
    for(var bits of data){
        if(bits == wanterResult){
            return bits
        }
    }
}

var heroTile = 1,
    enemyTile = 1,
    characterRound = "hero";

function createGame(){
    let contentContainer = document.getElementById("caracterOverview"),
        h1 = document.querySelector("h1"),
        tiles = 30,
        tileNumber = 0;
    heroTile = 1;
    enemyTile = 1;
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
    if(heroTile > 30){
        return winnerScreen("hero");
    } else if (enemyTile > 30) {
        return winnerScreen("enemy");
    }
    let findHeroTile = document.getElementById("tile-"+heroTile),
        findEnemyTile = document.getElementById("tile-"+enemyTile);
    console.log(enemyTile,heroTile);
    if (character === "hero"){
        findHeroTile.innerHTML += "<img id='heroImage' src='Media/Graph/" + (heroImageNumber+1) + ".png'>";
    } else if (character === "enemy"){
        findEnemyTile.innerHTML += "<img id='enemyImage' src='Media/Graph/" + (enemyImageNumber+1) + ".png'>";
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

function winnerScreen(character){
    let contentContainer = document.getElementById("caracterOverview"),
        h1 = document.querySelector("h1");
    contentContainer.innerHTML="";
    if(character == "hero"){
        h1.innerHTML = "Victory!";
        contentContainer.innerHTML = `
<h2>Congratulation on your very win, you managed to reach the goal before your enemy!</h2>
<p>Want to try beat the enemy again? Click button below!</p>
<button class="victoryPageButton" onclick="fetchData()">Restart the game</button>

`
    } else if (character == "enemy"){
        h1.innerHTML = "Defeat.";
        contentContainer.innerHTML = `
<h2>You did not manage to reach the goal before the enemy and there for you lost, better luck next time!</h2>
<p>Want to get that bitter sweet revenge? Click the button below!</p>
<button class="victoryPageButton" onclick="fetchData()">Restart the game</button>

`
    }
}