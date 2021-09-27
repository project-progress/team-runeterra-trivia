let players = [];

class Player{
    constructor(name, xp){
        this.name = name;
        this.xp = xp;
    }
}

function newPlayer(name){
    players.push(new Player(name, 0));
}


async function func (url) {
    return await fetch(`${url}`).then(function(result){
        return result.json();
    }).then(function(result){
        const question = document.querySelector("#questionInside");
        const category = document.querySelector("#categoryInside");
        question.innerHTML = result.results[0].question; 
        category.innerHTML = result.results[0].category;
        
        newPlayer("Arthur");
        const player1 = document.querySelector("#name1");
        let xp1 = document.querySelector("#xp1");
        player1.innerHTML = players[0].name;
        xp1.innerHTML = players[0].xp;

        return result.results[0].correct_answer;
    }).then(function(result){
        document.getElementById("submit").addEventListener("click", function (){
        const answer = document.querySelector("#answer").value;
        if (answer.toLowerCase().split(' ').join('') === result.toLowerCase().split(' ').join('')){
            alert("true")
            players[0].xp += 100;
            xp1.innerHTML = players[0].xp;
        }else{
            alert("false")
        }
        });
    })  
}

const q = func("https://opentdb.com/api.php?amount=1&category=25&difficulty=easy&type=multiple");



// fetch("https://opentdb.com/api.php?amount=1&category=25&difficulty=easy&type=multiple").then(function(result){
//     return result.json();
// }).then(function(result){
//    const question = document.querySelector("#questionInside");
//    const category = document.querySelector("#categoryInside");
//    question.innerHTML = result.results[0].question; 
//    category.innerHTML = result.results[0].category; 
//    answer = result.results[0].correct_answer;
// })



