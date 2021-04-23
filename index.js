let randomNumber = Math.floor(Math.random() * 10 + 1);
let inputNumber = document.getElementById("input");
let turn = 3;

function spin() {
  let a = Number(inputNumber.value);
  if (Number(inputNumber.value)) {
    if (a == randomNumber) {
      alert("congratulations, you guess correct");
    } else {
      turn--;
      if (a != randomNumber) {
        alert("You made a mistake and invite you to guess again" + "( You have " + turn + " turn left )");
      }
    }
  } else {
    alert("Sorry you are out of turn");
  }
  if (turn == 0) {
    alert("Sorry you lost");
  }
}
