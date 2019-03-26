function createGame(){
    let content = document.getElementById("caracterOverview"),
        h1 = document.querySelector("h1"),
        tiles = 30,
        tileNumber = 0;
    h1.innerHTML = "Game on!"
    content.innerHTML ="";
    for(i = 0; 5 > i; i++){
        for(j = 0; 6 > j; j++){
            tileNumber++;
            content.innerHTML += "<div id='tile-" + tileNumber + "' class='tiles'></div>"
        }
    }
}