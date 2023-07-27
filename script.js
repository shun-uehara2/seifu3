var number1 = Math.floor(Math.random() * 100) - 50;
var number2 = Math.floor(Math.random() * 100) - 50;
var correctAnswer = number1 + number2;
var correctCount = localStorage.getItem('correct') || 0;
var incorrectCount = localStorage.getItem('incorrect') || 0;

function generateQuestion() {
  number1 = Math.floor(Math.random() * 100) - 50;
  number2 = Math.floor(Math.random() * 100) - 50;
  correctAnswer = number1 + number2;
  document.getElementById('question').innerText = "計算: " + number1 + " + " + number2;
}

function checkSign() {
  var userSign = document.querySelector('input[name="sign"]:checked').value;
  var signResultDiv = document.getElementById('sign_result');
  if ((correctAnswer >= 0 && userSign == "positive") || (correctAnswer < 0 && userSign == "negative")) {
    signResultDiv.innerText = "正解です！";
    signResultDiv.style.color = "green";
  } else {
    signResultDiv.innerText = "残念、不正解です。";
    signResultDiv.style.color = "red";
  }
  signResultDiv.style.display = "block";
}

function appendNumber(number) {
  document.getElementById('answer').value += number;
}

function clearNumber() {
  document.getElementById('answer').value = "";
}

function checkAnswer() {
  var userAnswer = Math.abs(document.getElementById('answer').value);
  var resultDiv = document.getElementById('result');
  if (userAnswer == Math.abs(correctAnswer)) {
    resultDiv.innerText = "正解です！";
    resultDiv.style.color = "green";
    correctCount++;
  } else {
    resultDiv.innerText = "残念、不正解です。正しい答えは " + correctAnswer + " でした。";
    resultDiv.style.color = "red";
    incorrectCount++;
  }
  resultDiv.style.display = "block";
  generateQuestion();
  document.getElementById('answer').value = "";
  document.querySelector('input[name="sign"]:checked').checked = false;
  updateScore();
}

function updateScore() {
  var correctRate = ((correctCount / (correctCount + incorrectCount)) * 100).toFixed(2);
  document.getElementById('score').innerText = "正解数：" + correctCount + "、不正解数：" + incorrectCount + "、正解率：" + correctRate + "%";
  localStorage.setItem('correct', correctCount);
  localStorage.setItem('incorrect', incorrectCount);
}

generateQuestion();
updateScore();
