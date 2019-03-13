fetch("https://anapioficeandfire.com/api/characters")
.then(function(data){
    return data.json();
})
.then(function(myJson){
    console.log(myJson);
    displaySelectableCharacters(myJson);
})

function displaySelectableCharacters(data){
    let content = document.getElementById("caracterOverview");
    for(var characters of data){
        content.innerHTML += "<div class='col-md-6 col-lg-4'><div class='caracterPreview'>"+"</div></div>";
    }
}

console.log("hello world");


function compareValues(data, wanterResult){
    for(var bits of data){
        if(bits == wanterResult){
            return bits
        }
    }
}