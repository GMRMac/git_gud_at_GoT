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
    characterside,
    monsterOne,
    monsterTwo,
    monsterThree,
    monsterFour,
    monsterFive;

fetchData();

//This function displays the characters
function displaySelectableCharacters(data, header, characterSide){
    let characterNumber = 0,
        content = document.getElementById("caracterOverview"),
        h1 = document.querySelector("h1");
    content.innerHTML = "";
    if (h1.innerHTML == "Select your enemy!"){
        document.innerHTML ="";
        return createGame(); // If enemy(and hero) is selected, the game will start
    }
    characterside = characterSide; 
    h1.innerHTML = header;

    
    for (var characters of data){
        let name = characters.aliases,
            pictureFileSplit = name[0].split(" "),
            pictureFileJoin = pictureFileSplit.join("_");
        
        if (characters.allegiances[0] == "https://anapioficeandfire.com/api/houses/23"){
            console.log(characters.allegiances);
            var imageName = "House_Blackfyre.svg",
                imageAlt = " alt='House Blackfyre'";
        } else if (characters.allegiances[0] === "https://anapioficeandfire.com/api/houses/15"){
            console.log(characters.allegiances);
            var imageName = "House_Baratheon.svg",
                imageAlt = " alt='House Baratheon'";
        } else if (characters.allegiances[0] === "https://anapioficeandfire.com/api/houses/362"){
            console.log(characters.allegiances);
            var imageName = "House_Stark.svg",
                imageAlt = " alt='House Stark'";
        } else {
            var imageName = "neutral.svg",
                imageAlt = " alt='Nautral icon'";
        }
//        console.log(pictureFileJoin);
        pictureFileJoin = "placeholder";
        content.innerHTML += `
<div onclick="findSelectedCharacter(` + characterNumber + `, '` + imageName + `')" id="character-` + characterNumber + `" class='col-lg-4 col-6'><div class='characterPreview'>
<img class="characterPreview__image" src="Media/Graph/` + imageName + `"` + imageAlt + `">
<h2>`+name+`</h2>
<button><img class="button--arrows" src="Media/Graph/TwoArrowsLeft.svg">View more<img class="button--arrows" src="Media/Graph/TwoArrowsRight.svg"></button>
</div></div>`;
        characterNumber++;
    }
}

//This function gets the information about one specific character
function findSelectedCharacter(number, imageName){
    fetch("https://anapioficeandfire.com/api/characters/"+(number+1))
    .then(function(data){
        return data.json()
    })
    .then(function(myJson){
        displaySelectedCharacter(myJson, number, imageName);
    })
}

function displaySelectedCharacter(data, number, image){
    let character = document.getElementById("characterContent"),
        darkOverlay = `<div onclick="removeOverlay()" class="overlay--dark"><img class="overlay__close" src="Media/Graph/whiteX.svg"></div>         <div class="overlay__content">
                <img class="selectedPicture" src="Media/Graph/`,
        buttonPartOne = `<button onclick="displayEnemyCharacter()"><img class="button--arrows" src="Media/Graph/TwoArrowsLeft.svg">`,
        buttonPartTwo = `<img class="button--arrows" src="Media/Graph/TwoArrowsRight.svg"></button>`;
    pictureFileJoin = "placeholder";
    if (data.name){
        var selectedName = `<h2>Name:</h2><h4>` + data.name + `</h4>`;
    } else {
        var selectedName = ``;
    }
    if (data.aliases){
        var selectedAliases = `<h2>Aliases:</h2><h4>` + data.aliases + `</h4>`;
    } else {
        var selectedAliases = ``;
    }
    if (data.gender){
        var selectedGender = `<h2>Gender:</h2><h4>` + data.gender + `</h4>`;
    } else {
        var selectedGender = ``;
    }
    if (data.culture){
        var selectedCulture = `<h2>Culture:</h2><h4>` + data.culture + `</h4>`;
    } else {
        var selectedCulture = ``;
    }
    if (data.allegiances != ""){
    console.log(data.allegiances);
        if (data.allegiances == "https://www.anapioficeandfire.com/api/houses/362" || data.allegiances == "https://anapioficeandfire.com/api/houses/362"){
            var selectdAllegiances = `<h2>House:</h2><h4>House Stark of Winterfell</h4>`
        } else if (data.allegiances == "https://www.anapioficeandfire.com/api/houses/15" || data.allegiances == "https://anapioficeandfire.com/api/houses/15"){
            var selectdAllegiances = `<h2>House:</h2><h4>House Baratheon of Dragonstone</h4>`
        } else if (data.allegiances == "https://www.anapioficeandfire.com/api/houses/23" || data.allegiances == "https://anapioficeandfire.com/api/houses/23"){
            var selectdAllegiances = `<h2>House:</h2><h4>House Blackfyre of King's Landing</h4>`
        } 
    } else {
        var selectdAllegiances = `<h2>House:</h2><h4>Neutrall / banished</h4>`
    }
    character.style.display = "block";
    console.log(data);

    +`</div>`;
        if(characterside === "hero"){
            heroCharacter = data;
            heroImageNumber = image;    
            character.innerHTML = darkOverlay + image + `">
                ` + selectedName + selectedAliases + selectedGender + selectedCulture + selectdAllegiances + buttonPartOne + "Select enemy!" + buttonPartTwo
        } else if (characterside === "enemy"){
            enemyCharacter = data;
            enemyImageNumber = image;      
            character.innerHTML = darkOverlay + image + `"> ` + selectedName + selectedAliases + selectedGender + selectedCulture + selectdAllegiances + buttonPartOne + "Start the game!" + buttonPartTwo
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
        bubble.innerHTML += `<img class="characterInformation--img" id="heroPickedCharacterImage" src="Media/Graph/thumbnail_` + heroImageNumber + `">`;
    } else if (char === "enemy"){
        let bubble = document.getElementById("enemyPickedCharacter");
        bubble.innerHTML += `<img class="characterInformation--img" id="enemyPickedCharacterImage" src="Media/Graph/thumbnail_` + enemyImageNumber + `">`;
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
    contentContainer.innerHTML += "<div class='col-sm-5' id='game__log--container'><div class='col-12' id='game__button--container'><button id='game__button--roll' onclick='rollFunction()'><h3><img src='Media/Graph/dice.svg' class='button--dice'>Roll me!<img src='Media/Graph/dice.svg' class='button--dice'></h3></button></div><div class='col-12' id='game__log'></div>";
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
                setObstacles()
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
        findHeroTile.innerHTML += "<img id='heroImage' src='Media/Graph/thumbnail_" + heroImageNumber + "'>";
        if(number != 6){
            heroBubble.classList.remove("characterInformation--img__active")
            enemyBubble.classList.add("characterInformation--img__active")
        }
    } else if (character === "enemy"){
        findEnemyTile.innerHTML += "<img id='enemyImage' src='Media/Graph/thumbnail_" + enemyImageNumber + "'>";
        if(number != 6){
            enemyBubble.classList.remove("characterInformation--img__active")
            heroBubble.classList.add("characterInformation--img__active")
        }
    }
}

function setObstacles(){
    let fieldOne = (Math.ceil(Math.random()*4)+4),
        fieldTwo = (Math.ceil(Math.random()*4)+9),
        fieldThree = (Math.ceil(Math.random()*4)+14),
        fieldFour = (Math.ceil(Math.random()*4)+19),
        fieldFive = (Math.ceil(Math.random()*4)+25);
    monsterOne = fieldOne;
    monsterTwo = fieldTwo;
    monsterThree = fieldThree;
    monsterFour = fieldFour;
    monsterFive = fieldFive;
    
    placeObstacle(monsterOne);
    placeObstacle(monsterTwo);
    placeObstacle(monsterThree);
    placeObstacle(monsterFour);
    placeObstacle(monsterFive);
}

function placeObstacle(obstaclePlace){
    var tile = document.getElementById("tile-"+obstaclePlace);
    tile.innerHTML = "<img class='monsterImage' src='Media/Graph/enemy.svg'>";
}

function rollFunction(){
    let gameLog = document.getElementById("game__log"),
        randomNumber = Math.ceil(Math.random()*6),
        randomRetreatNumber = (Math.ceil(Math.random()*2)+2),
        initialHeroTile = heroTile,
        initialEnemyTile = enemyTile;
    if (characterRound === "hero"){
        let hero = document.getElementById("heroImage").remove();
        heroTile = (heroTile+randomNumber);
        gameLog.innerHTML += "Hero rolled a " + randomNumber + "<br>";
        if (heroTile == monsterOne || heroTile == monsterTwo || heroTile == monsterThree || heroTile == monsterFour || heroTile == monsterFive){
            gameLog.innerHTML += "Oh no! The hero encountered a monster and had to flee. The hero steps back " + randomRetreatNumber + " tiles.<br>"
            heroTile = heroTile - randomRetreatNumber;
        }
        gameLog.innerHTML += "Hero moves from tile " + initialHeroTile + " to tile " + heroTile + "<br>";
        moveCharacter("hero", randomNumber);
        if (randomNumber == 6){
            return
        } else {
            return characterRound = "enemy";
        }
    }
    if (characterRound == "enemy"){
        let enemy = document.getElementById("enemyImage").remove();
        enemyTile = (enemyTile+randomNumber);
        gameLog.innerHTML += "Enemy rolled a " + randomNumber + "<br>";
        if (enemyTile == monsterOne || enemyTile == monsterTwo || enemyTile == monsterThree || enemyTile == monsterFour || enemyTile == monsterFive){
            gameLog.innerHTML += "Yes! The enemy encountered a monster and had to flee. The enemy steps back " + randomRetreatNumber + " tiles.<br>"
            enemyTile = enemyTile - randomRetreatNumber;
        }
        gameLog.innerHTML += "Enemy moves from tile " + initialEnemyTile + " to tile " + enemyTile + "<br>";
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
        h1 = document.querySelector("h1"),
        buttonText = `<button class="button__victoryPage" onclick="fetchData()"><img class="button--arrows" src="Media/Graph/TwoArrowsLeft.svg">Restart the game<img class="button--arrows" src="Media/Graph/TwoArrowsRight.svg"></button>` 
    contentContainer.innerHTML="";
    if(character == "hero"){
        h1.innerHTML = "Victory!";
        contentContainer.innerHTML = `
<h2>Congratulation on your very win, you managed to reach the goal before your enemy!</h2>
<p class="endSchreen__p">Want to try beat the enemy again? Click button below!</p>` + buttonText
    } else if (character == "enemy"){
        h1.innerHTML = "Defeat.";
        contentContainer.innerHTML = `
<h2>You did not manage to reach the goal before the enemy and therefore you lost, better luck next time!</h2>
<p class="endSchreen__p">Want to get that bitter sweet revenge? Click the button below!</p>` + buttonText
    }
}