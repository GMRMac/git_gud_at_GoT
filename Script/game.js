function createGame(){
    let contentContainer = document.getElementById("caracterOverview"),
        h1 = document.querySelector("h1"),
        tiles = 30,
        tileNumber = 0;
    contentContainer.innerHTML += "<div class='col-3' id='game__log'></div>";
    contentContainer.innerHTML += "<div class='col-9' id='game__game'></div>";
        let contentGame = document.getElementById("game__game"),
            contentLog = document.getElementById("game__log");
    console.log(content2);
    h1.innerHTML = "Game on!"
    content.innerHTML ="";
    for(i = 1; 6 > i; i++){
        tileNumber2 = 4;
        for(j = 0; 6 > j; j++){
            tileNumber++;
            if(i%2){
                contentGame.innerHTML += "<div class='col-2 game__tile' id='tile-" + (tileNumber+tileNumber2) + "' class='tiles'></div>"
                tileNumber2 = tileNumber2 - 2;
            } else {
                contentGame.innerHTML += "<div class='col-2 game__tile' id='tile-" + tileNumber + "' class='tiles'></div>"
            }
        }
    }
}