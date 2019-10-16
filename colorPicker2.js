var gameOver = false;
var score = 0;
var colors = [];
var level = 6;
var maxBoxes = 6;

var boxes = document.querySelectorAll(".boxes");
var title = document.getElementById("gameTitle");

var header = document.querySelector("header");
var gameMessage = document.querySelector(".gameMessage");

var newGame = document.querySelector(".newGame");
var mode = document.querySelectorAll(".difficulty");

init();

function init() {
	newGame.addEventListener("click", function() {
		resetGame();
	});

	for (var i = 0; i < mode.length; i++) {
		mode[i].addEventListener("click", function() {
			mode[0].classList.remove("selected");
			mode[1].classList.remove("selected");
			this.classList.add("selected");
			level = this.textContent === "Easy" ? maxBoxes / 2 : maxBoxes;
			setDifficulty();
		});
	}

	for (var i = 0; i < boxes.length; i++) {
		boxes[i].addEventListener("click", function() {
			if (!gameOver) {
				gameOver = checkAnswer(this.style.backgroundColor);
			}
		});
	}

	resetGame();
}

function resetGame() {
	gameOver = false;
	gameMessage.textContent = "";
	newGame.textContent = "New Game";
	generateColors(level);
	setColors();
}

function setDifficulty() {
	for (var i = 0; i < maxBoxes; i++) {
		boxes[i].style.display = "block";
	}

	for (var i = level; i < maxBoxes; i++) {
		boxes[i].style.display = "none";
	}

	resetGame();
}

function generateColors() {
	colors = [];
	for (var i = 0; i < level; i++) {
		colors[i] =
			"rgb(" +
			Math.floor(Math.random() * 256) +
			", " +
			Math.floor(Math.random() * 256) +
			", " +
			Math.floor(Math.random() * 256) +
			")";
	}
	title.textContent = colors[Math.floor(Math.random() * colors.length)];
	header.style.backgroundColor = "rgb(60, 132, 203)";
	return colors;
}

function setColors() {
	for (var i = 0; i < level; i++) {
		boxes[i].style.background = colors[i];
		// boxes[i].textContent = colors[i];
	}
}

function checkAnswer(selectedColor) {
	var answer = selectedColor === title.textContent.toLowerCase() ? true : false;
	//if correct; change color for header & all boxes; winning message; update score; disable clicks; change new game text
	if (answer) {
		header.style.backgroundColor = title.textContent;
		gameMessage.textContent = "You won!";
		colors.map((color) => header.style.backgroundColor);
		setColors();
		score += 3;
		newGame.textContent = "Play Again?";
	}
	else {
		// if incorrect; display try again; hide box
		gameMessage.textContent = "Try Again!";
		colors[colors.indexOf(selectedColor)] = "transparent";
		score--;
		setColors();
	}
	document.querySelector(".score").textContent = score;
	return answer;
}
