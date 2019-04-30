function fetchData(){
    fetch("https://anapioficeandfire.com/api/characters")
    .then(function(data){
        return data.json();
    })
    .then(function(myJson){
        console.log(myJson);
        var charInfo = document.getElementsByClassName("characterInformation")[0];
        charInfo.innerHTML = `
            <div class="col-12"><h3>Selected characters:</h3></div>
            <div class="col-6"><p id="heroPickedCharacter">Hero:</p></div>
            <div class="col-6"><p id="enemyPickedCharacter">Enemy:</p></div>
        `
        displaySelectableCharacters(myJson, "Select your hero!", "hero");
    })
}

var heroCharacter,
    heroImageNumber,
    enemyCharacter,
    EnemyImageNumber,
    characterside;

fetchData();

//This function displays the characters
function displaySelectableCharacters(data, header, characterSide){
    let characterNumber = 0,
        content = document.getElementById("caracterOverview");
        h1 = document.querySelector("h1");
    content.innerHTML = "";
    if(h1.innerHTML == "Select your enemy!"){
        document.innerHTML ="";
        return createGame(); // If enemy(and hero) is selected, the game will start
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
<div onclick="findSelectedCharacter(`+characterNumber+`)" id="character-` + characterNumber + `" class='col-lg-3 col-4'><div class='characterPreview'>
<img style="width:100%;" src="Media/Graph/`+(characterNumber+1)+`.png">
<h2>`+name+`</h2>
<button class="characterPreview__button">View more</button>
</div></div>`;
        characterNumber++;
    }
}

//This function gets the information about one specific character
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
        if(characterside === "hero"){
            setSelectedCharacterBubble("hero");
        } else if (characterside === "enemy"){
            setSelectedCharacterBubble("enemy");         
        }
        displaySelectableCharacters(myJson, "Select your enemy!", "enemy");
    })
}

function setSelectedCharacterBubble(char){
    if (char === "hero"){
        let bubble = document.getElementById("heroPickedCharacter");
        bubble.innerHTML += `<img class="characterInformation--img" id="heroPickedCharacterImage" src="Media/Graph/` + (heroImageNumber+1) + `.png">`;
    } else if (char === "enemy"){
        let bubble = document.getElementById("enemyPickedCharacter");
        bubble.innerHTML += `<img class="characterInformation--img" id="enemyPickedCharacterImage" src="Media/Graph/` + (enemyImageNumber+1) + `.png">`;
    }
}

// This function removes the pop-up box that appears if u select a character when you click on the dark field.
function removeOverlay(){
    var overlay = document.getElementById("characterContent");
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
        tileNumber = 0,
        heroBubble = document.getElementById("heroPickedCharacterImage"),
        enemyBubble = document.getElementById("enemyPickedCharacterImage");
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
                moveCharacter("enemy",0);
                moveCharacter("hero",0);
                let gameLog = document.getElementById("game__log");
                gameLog.innerHTML = "The game is on!<br>";
                enemyBubble.classList.remove("characterInformation--img__active");
                heroBubble.classList.add("characterInformation--img__active");
            }
        }
    }
}

function moveCharacter(character, number){
    if(heroTile > 30){
        return winnerScreen("hero");
    } else if (enemyTile > 30) {
        return winnerScreen("enemy");
    }
    let findHeroTile = document.getElementById("tile-"+heroTile),
        findEnemyTile = document.getElementById("tile-"+enemyTile),
        heroBubble = document.getElementById("heroPickedCharacterImage"),
        enemyBubble = document.getElementById("enemyPickedCharacterImage");
    console.log(enemyTile,heroTile);
    if (character === "hero"){
        findHeroTile.innerHTML += "<img id='heroImage' src='Media/Graph/" + (heroImageNumber+1) + ".png'>";
        if(number != 6){
            heroBubble.classList.remove("characterInformation--img__active")
            enemyBubble.classList.add("characterInformation--img__active")
        }
    } else if (character === "enemy"){
        findEnemyTile.innerHTML += "<img id='enemyImage' src='Media/Graph/" + (enemyImageNumber+1) + ".png'>";
        if(number != 6){
            enemyBubble.classList.remove("characterInformation--img__active")
            heroBubble.classList.add("characterInformation--img__active")
        }
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
        moveCharacter("hero", randomNumber);
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
        moveCharacter("enemy", randomNumber);
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