fetch("https://anapioficeandfire.com/api/characters")
.then(function(data){
    return data.json();
})
.then(function(myJson){
    console.log(myJson);
    displaySelectableCharacters(myJson, "Select your hero!", "hero");
})

var heroCharacter,
    enemyCharacter,
    characterside;

function displaySelectableCharacters(data, header, characterSide){
    let characterNumber = 0,
        content = document.getElementById("caracterOverview"),
        h1 = document.querySelector("h1");
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
        console.log(pictureFileJoin);
        pictureFileJoin = "placeholder";
        content.innerHTML += `
<div onclick="findSelectedCharacter(`+characterNumber+`)" id="character-` + characterNumber + `" class='col-lg-4 col-6'><div class='caracterPreview'>
<img style="width:100%;" src="Media/Pic/`+pictureFileJoin+`.jpg">
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
        console.log(myJson);
        displaySelectedCharacter(myJson);
    })
}

function displaySelectedCharacter(data){
    var character = document.getElementById("characterContent");
    let name = data.aliases,
        pictureFileSplit = name[0].split(" "),
        pictureFileJoin = pictureFileSplit.join("_");
    pictureFileJoin = "placeholder";
    character.style.display = "block";
    character.innerHTML = `<div onclick="removeOverlay()" class="overlay--dark"></div><div class="overlay__content"><h2>` + name + `</h2>
<img style="width:100%;" src="Media/Pic/`+pictureFileJoin+`.jpg">
<button onclick="displayEnemyCharacter()">Next>></button>`
    +`</div>`;
        if(characterside === "hero"){
            heroCharacter = data;
        } else if (characterside === "enemy"){
            enemyCharacter = data;
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