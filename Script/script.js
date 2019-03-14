fetch("https://anapioficeandfire.com/api/characters")
.then(function(data){
    return data.json();
})
.then(function(myJson){
    console.log(myJson);
    displaySelectableCharacters(myJson);
})

function displaySelectableCharacters(data){
    let characterNumber = 0;
    let content = document.getElementById("caracterOverview");
    for(var characters of data){
        let name = characters.aliases;
        let pictureFileSplit = name[0].split(" ");
        let pictureFileJoin = pictureFileSplit.join("_");
        console.log(pictureFileJoin);
        pictureFileJoin = "placeholder";
        content.innerHTML += `
<div onclick="findSelectedCharacter(`+characterNumber+`)" class='col-md-6 col-lg-4'><div class='caracterPreview'>
<img style="width:100%;" src="Media/Pic/`+pictureFileJoin+`.jpg">
<h2>`+name+`</h2></div></div>`;
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
    let name = data.aliases;
    let pictureFileSplit = name[0].split(" ");
    let pictureFileJoin = pictureFileSplit.join("_");
    character.innerHTML = name;
}

console.log("hello world");


function compareValues(data, wanterResult){
    for(var bits of data){
        if(bits == wanterResult){
            return bits
        }
    }
}