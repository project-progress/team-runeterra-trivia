//selecting all required elements
let quizData = {};
const start_btn = document.querySelector(".start_btn button");
const players_box = document.querySelector(".players_box");
const options_box = document.querySelector(".options_box");
const exit_btn_1 = players_box.querySelector(".buttons .quit_1");
const exit_btn_2 = options_box.querySelector(".buttons .quit_2");
const restart_btn = players_box.querySelector(".buttons .restart");
const continue_btn_1 = players_box.querySelector(".buttons .continue-1");
const continue_btn_2 = options_box.querySelector(".buttons .continue-2");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
const player_information_box = document.querySelector(
  ".player_information_box"
);

// if startQuiz button clicked
start_btn.onclick = () => {
  players_box.classList.add("activeInfo"); //show info box
  player_information_box.classList.add("activePlayerInformation");
};
// if exitQuiz button clicked
exit_btn_1.onclick = () => {
  players_box.classList.remove("activeInfo"); //hide info box
  player_information_box.classList.remove("activePlayerInformation"); //hide info box
};

exit_btn_2.onclick = () => {
  options_box.classList.remove("activeOption"); //hide info box
  player_information_box.classList.remove("activePlayerInformation");
  //hide info box
};

// if continueQuiz button clicked
continue_btn_1.onclick = () => {
  quizData["Player_1"] = {
    name: document.getElementById("name1").value || "Player_1",
    xp: 0,
    questions: [],
  };
  quizData["Player_2"] = {
    name: document.getElementById("name2").value || "Player_2",
    xp: 0,
    questions: [],
  };
  quizData["Player_3"] = {
    name: document.getElementById("name3").value || "Player_3",
    xp: 0,
    questions: [],
  };
  quizData["Player_4"] = {
    name: document.getElementById("name4").value || "Player_4",
    xp: 0,
    questions: [],
  };
  players_box.classList.remove("activeInfo"); //hide info box
  options_box.classList.add("activeOption"); //show option box
};

function shuffleAnswers(rightAnswer, incorrectAnswers) {
  const array = new Array(4).fill(undefined);
  let holder = Math.floor(Math.random() * 4);
  array[holder] = rightAnswer;
  for (let i = 0, j = 0; i < 4; i++) {
    if (i !== holder) {
      array[i] = incorrectAnswers[j];
      j++;
    }
  }
  return array;
}

function generateQuestionsData(data) {
  let result = [];
  for (let i = 0; i < data.length; i++) {
    const question = {
      numb: i + 1,
      question: data[i].question,
      answer: data[i].correct_answer,
      options: shuffleAnswers(
        data[i].correct_answer,
        data[i].incorrect_answers
      ),
    };
    result.push(question);
  }
  return result;
}

// if continueQuiz button clicked
continue_btn_2.onclick = () => {
  const number_of_questions =
    document.getElementById("number_of_questions").value * 4 || 40;
  const category_options =
    document.getElementById("category_options").value || 9;
  const dificulty_options =
    document.getElementById("dificulty_options").value || "easy";
  fetch(
    `https://opentdb.com/api.php?amount=${number_of_questions}&category=${category_options}&difficulty=${dificulty_options}&type=multiple`
  )
    .then((response) => response.json())
    .then((data) => {
      for (let i = 1; i <= 4; i++) {
        quizData[`Player_${i}`].questions = generateQuestionsData(
          data.results.slice(
            (i - 1) * (number_of_questions / 4),
            (number_of_questions / 4) * i
          )
        );
      }
    })
    .then(() => {
      options_box.classList.remove("activeOption"); //hide option box
      quiz_box.classList.add("activeQuiz"); //show quiz box
      showQuetions(0); //calling showQestions function
      queCounter(1); //passing 1 parameter to queCounter
      startTimer(15); //calling startTimer function
    })
    .catch((e) => console.log(e));
};

let timeValue = 15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

restart_quiz.onclick = () => {
  quiz_box.classList.add("activeQuiz");
  result_box.classList.remove("activeResult");
  timeValue = 15;
  que_count = 0;
  que_numb = 1;
  userScore = 0;
  widthValue = 0;
  showQuetions(que_count);
  queCounter(que_numb);
  clearInterval(counter);
  clearInterval(counterLine);
  startTimer(timeValue);
  timeText.textContent = "Time Left";
  next_btn.classList.remove("show");
};

quit_quiz.onclick = () => {
  window.location.reload();
};
const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

next_btn.onclick = () => {
  if (que_count < quizData["Player_1"].questions.length - 1) {
    que_count++;
    que_numb++;
    showQuetions(que_count);
    queCounter(que_numb);
    clearInterval(counter);
    clearInterval(counterLine);
    startTimer(timeValue);
    timeText.textContent = "Time Left";
    next_btn.classList.remove("show");
  } else {
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    showResult(); //calling showResult function
  }
};
// getting questions and options from array
function showQuetions(index) {
  const que_text = document.querySelector(".que_text");
  //creating a new span and div tag for question and option and passing the value using array index
  let que_tag =
    "<span>" +
    quizData["Player_1"].questions[index].numb +
    ". " +
    quizData["Player_1"].questions[index].question +
    "</span>";
  let option_tag =
    '<div class="option"><span>' +
    quizData["Player_1"].questions[index].options[0] +
    "</span></div>" +
    '<div class="option"><span>' +
    quizData["Player_1"].questions[index].options[1] +
    "</span></div>" +
    '<div class="option"><span>' +
    quizData["Player_1"].questions[index].options[2] +
    "</span></div>" +
    '<div class="option"><span>' +
    quizData["Player_1"].questions[index].options[3] +
    "</span></div>";
  que_text.innerHTML = que_tag;
  option_list.innerHTML = option_tag;

  const option = option_list.querySelectorAll(".option");

  for (i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}

function optionSelected(answer) {
  clearInterval(counter); //clear counter
  clearInterval(counterLine); //clear counterLine
  let userAns = answer.textContent; //getting user selected option
  let correcAns = quizData["Player_1"].questions[que_count].answer;
  const allOptions = option_list.children.length;

  if (userAns == correcAns) {
    //if user selected option is equal to array's correct answer
    userScore += 1; //upgrading score value with 1
    answer.classList.add("correct");
  } else {
    answer.classList.add("incorrect"); //adding red color to correct selected option
    for (i = 0; i < allOptions; i++) {
      if (option_list.children[i].textContent == correcAns) {
        //if there is an option which is matched to an array answer
        option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
      }
    }
  }
  for (i = 0; i < allOptions; i++) {
    option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
  }
  next_btn.classList.add("show"); //show the next button if user selected any option
}
function showResult() {
  players_box.classList.remove("activeInfo"); //hide info box
  quiz_box.classList.remove("activeQuiz"); //hide quiz box
  result_box.classList.add("activeResult"); //show result box
  const scoreText = result_box.querySelector(".score_text");
  if (userScore > 3) {
    let scoreTag =
      "<span>and congrats! , You got <p>" +
      userScore +
      "</p> out of <p>" +
      quizData["Player_1"].questions.length +
      "</p></span>";
    scoreText.innerHTML = scoreTag;
  } else if (userScore > 1) {
    let scoreTag =
      "<span>and nice , You got <p>" +
      userScore +
      "</p> out of <p>" +
      quizData["Player_1"].questions.length +
      "</p></span>";
    scoreText.innerHTML = scoreTag;
  } else {
    let scoreTag =
      "<span>and sorry , You got only <p>" +
      userScore +
      "</p> out of <p>" +
      quizData["Player_1"].questions.length +
      "</p></span>";
    scoreText.innerHTML = scoreTag;
  }
}
function startTimer(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    timeCount.textContent = time;
    time--;
    if (time < 9) {
      let addZero = timeCount.textContent;
      timeCount.textContent = "0" + addZero;
    }
    if (time < 0) {
      clearInterval(counter);
      timeText.textContent = "Time Off";
      const allOptions = option_list.children.length;
      let correcAns = quizData["Player_1"].questions[que_count].answer;
      for (i = 0; i < allOptions; i++) {
        if (option_list.children[i].textContent == correcAns) {
          option_list.children[i].setAttribute("class", "option correct");
          console.log("Time Off: Auto selected correct answer.");
        }
      }
      for (i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
      }
      next_btn.classList.add("show");
    }
  }
}
function queCounter(index) {
  let totalQueCounTag =
    "<span><p>" +
    index +
    "</p> of <p>" +
    quizData["Player_1"].questions.length +
    "</p> Questions</span>";
  bottom_ques_counter.innerHTML = totalQueCounTag;
}
