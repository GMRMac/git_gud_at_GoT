fetch("https://anapioficeandfire.com/api/characters")
.then(function(data){
    return data.json();
})
.then(function(myJson){
    console.log(myJson);
    
})

console.log("hello world");

