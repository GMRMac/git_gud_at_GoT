function fade(element) {
    var op = 1;  // initial opacity
    setTimeout(function(){
        var timer = setInterval(function () {
            if (op <= 0.02){
                clearInterval(timer);
                element.style.display = 'none';
            }
            element.style.opacity = op;
            element.style.filter = 'alpha(opacity=' + op * 100 + ")";
            op -= op * 0.02;
        }, 5);
    },500)
}

function welcomeMessage(){
    var burdy = document.getElementsByTagName("body");
    var content = document.getElementsByClassName("content");
    console.log(burdy);
    var div = "<div class='loadingScreen'>Loading...</div>";
    
    burdy[0].innerHTML += div;
    

}

welcomeMessage()

fetch("https://anapioficeandfire.com/api/characters")
.then(function(){
    let element = document.getElementsByClassName("loadingScreen")[0];
    fade(element)
})
