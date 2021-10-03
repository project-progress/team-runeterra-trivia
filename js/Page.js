//ON FIRST PAGE
//here we can use constructor to use user input and make opjects based on them
let player1 = {
    "name": "Arthur",
    "xp": 0
}
let player2 = {
    "name": "Martiros",
    "xp": 0
}
let player3 = {
    "name": "Petros",
    "xp": 0
}
let player4 = {
    "name": "Poghos",
    "xp": 0
}
//then save them on local storage
localStorage.setItem("player1", JSON.stringify(player1));
localStorage.setItem("player2", JSON.stringify(player2));
localStorage.setItem("player3", JSON.stringify(player3));
localStorage.setItem("player4", JSON.stringify(player4));

//ON SECOND PAGE
//then on second  and third page use that info to display it
const name1 = document.getElementById("name1");
const name2 = document.getElementById("name2");
const name3 = document.getElementById("name3");
const name4 = document.getElementById("name4");

name1.innerHTML = JSON.parse(localStorage.getItem("player1")).name
name2.innerHTML = JSON.parse(localStorage.getItem("player2")).name
name3.innerHTML = JSON.parse(localStorage.getItem("player3")).name
name4.innerHTML = JSON.parse(localStorage.getItem("player4")).name

let xp1 = document.getElementById("xp1");
let xp2 = document.getElementById("xp2");
let xp3 = document.getElementById("xp3");
let xp4 = document.getElementById("xp4");
xp1.innerHTML = JSON.parse(localStorage.getItem("player1")).xp
xp2.innerHTML = JSON.parse(localStorage.getItem("player2")).xp
xp3.innerHTML = JSON.parse(localStorage.getItem("player3")).xp
xp4.innerHTML = JSON.parse(localStorage.getItem("player4")).xp

//in local storage we can set the link of selected categories
localStorage.setItem("CategoryURL", "https://opentdb.com/api.php?amount=40&category=9&difficulty=medium&type=multiple")

//THIRD PAGE
const categoryURL = localStorage.getItem("CategoryURL")

const getQuestions = async function (url){
    const result = await fetch(url);
    return await result.json();
}
async function question(url){
    const res = await getQuestions(url)

    const categoryInside = document.getElementById("categoryInside")
    categoryInside.innerHTML = res.results[0].category

    const arrOfQuestions = res.results;
    const arr1 = arrOfQuestions.slice(0, 9); 
    const arr2 = arrOfQuestions.slice(9, 19); 
    const arr3 = arrOfQuestions.slice(19, 29); 
    const arr4 = arrOfQuestions.slice(29, 39); 
    const arrayOfQuestions = [arr1, arr2, arr3, arr4]
    const arrayOfPlayers = [player1, player2, player3, player4]
    
    for (let i = 0; i < 4; i++){
        let currentPlayer = arrayOfPlayers[i];
        let playerInHeader = document.getElementById("playerInHeader")
        playerInHeader.innerHTML = currentPlayer.name;
        
        for(let j = 0; j < arrayOfQuestions[i].length; j++){
            let currentQuestion = arrayOfQuestions[i][j];
            nextQuestion(currentPlayer, currentQuestion);
            continue;
        }
    } 
}
question(categoryURL)


function incorrectAnswerHolder(holder){
    let arr = [];
    for(let i = 0; i <4; i++){
        if(i !== holder){
            arr.push(i)
        };
    }
    return arr;
}

function nextQuestion(currentPlayer, question){
    let questionInside = document.getElementById("questionInside")
    questionInside.innerHTML = question.question

    let holder = Math.floor(Math.random() * 4);
    let correctAnswer = document.getElementById(`answerHolder${holder}`)
    correctAnswer.innerHTML = question.correct_answer

    let incorrectAnswer1 = document.getElementById(`answerHolder${incorrectAnswerHolder(holder)[0]}`)
    let incorrectAnswer2 = document.getElementById(`answerHolder${incorrectAnswerHolder(holder)[1]}`)
    let incorrectAnswer3 = document.getElementById(`answerHolder${incorrectAnswerHolder(holder)[2]}`)
    incorrectAnswer1.innerHTML = question.incorrect_answers[0];
    incorrectAnswer2.innerHTML = question.incorrect_answers[1];
    incorrectAnswer3.innerHTML = question.incorrect_answers[2];
    let id = setTimeout(function(){}, 10*1000)
    correctAnswer.addEventListener("click", function(){clearTimeout(id)})  
}

function correctAnswerFunction(currentPlayer){
    currentPlayer.xp += 100;
}


