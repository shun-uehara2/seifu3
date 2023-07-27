var num1, num2, correctAnswer;
var correctCount = localStorage.getItem('correct') || 0; // Retrieve correct count from local storage.
var incorrectCount = localStorage.getItem('incorrect') || 0; // Retrieve incorrect count from local storage.

function generateQuestion() {
  num1 = Math.floor(Math.random() * 21) - 10; // Generate a random number between -10 and 10.
  num2 = Math.floor(Math.random() * 21) - 10; // Generate a random number between -10 and 10.
  correctAnswer = num1 + num2;
  document.getElementById('question').innerText = "次の計算をしてください：" + num1 + " + " + num2 + " = ?";
}

function checkSign() {
  var userSign = document.querySelector('input[name="sign"]:checked').value;
  var signResultDiv = document.getElementById('sign_result');
  if ((userSign === "positive" && correctAnswer >= 0) || (userSign === "negative" && correctAnswer < 0)) {
    signResultDiv.innerText = "符号は正しいです。";
    signResultDiv.style.color = "green";
    signResultDiv.style.display = "block";
    document.getElementById('numberpad').style.display = "block";
    document.getElementById('answer').style.display = "block";
    document.querySelector('button[onclick="checkAnswer()"]').style.display = "block";
  } else {
    signResultDiv.innerText = "符号が違います。";
    signResultDiv.style.color = "red";
    signResultDiv.style.display = "block";
    document.getElementById('numberpad').style.display = "none";
    document.getElementById('answer').style.display = "none";
    document.querySelector('button[onclick="checkAnswer()"]').style.display = "none";
  }
}

function appendNumber(num) {
  var answerInput = document.getElementById('answer');
  answerInput.value = parseInt(answerInput.value + "" + num);
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
    correctCount++; // Increment correct count.
  } else {
    resultDiv.innerText = "残念、不正解です。正しい答えは" + correctAnswer + "でした。";
    resultDiv.style.color = "red";
    incorrectCount++; // Increment incorrect count.
  }
  resultDiv.style.display = "block";
  generateQuestion(); // Generate a new question after the answer is submitted.
  document.getElementById('answer').value = ""; // Clear the answer input.
  document.querySelector('input[name="sign"]:checked').checked = false; // Clear the sign input.
  document.getElementById('sign_result').style.display = "none"; // Hide the sign result.
  document.getElementById('numberpad').style.display = "none"; // Hide the numberpad.
  document.getElementById('answer').style.display = "none"; // Hide the answer input.
  document.querySelector('button[onclick="checkAnswer()"]').style.display = "none"; // Hide the answer button.
  updateScore(); // Update the score.
}

function updateScore() {
  // Update the score display.
  var correctRate = ((correctCount / (correctCount + incorrectCount)) * 100).toFixed(2);
  document.getElementById('score').innerText = "正解数：" + correctCount + "、不正解数：" + incorrectCount + "、正解率：" + correctRate + "%";

  // Save the correct and incorrect counts to local storage.
  localStorage.setItem('correct', correctCount);
  localStorage.setItem('incorrect', incorrectCount);
}

generateQuestion(); // Generate a question when the page loads.
updateScore(); // Update the score when the page loads.
