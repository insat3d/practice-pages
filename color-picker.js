// Generate 3 or 6 random colors
function giveColors(num) {
	var colorPallete = [];
	for (var i = 0; i < num; i++) {
		var rValue = Math.floor(Math.random() * 255);
		var gValue = Math.floor(Math.random() * 255);
		var bValue = Math.floor(Math.random() * 255);
		colorPallete.push("rgb(" + rValue + "," + gValue + "," + bValue + ")");
	}
	return colorPallete;
}

// Initialize the color boxes
function resetColor(colorboxes) {
	var colorPalette = giveColors(colorboxes.length);
	for (var i = 0; i < colorboxes.length; i++) {
		colorboxes[i].style.background = colorPalette[i];
		// colorboxes[i].textContent = String(colorPalette[i]);
	}
}

// Identify the puzzle box
function setPuzzle(colorboxes) {
	resetColor(colorboxes);
	var answer = Math.floor(Math.random() * colorboxes.length);
	document.querySelector("#puzzle").textContent = colorboxes[answer].style.background;
	document.querySelector("header").style.background = "rgb(60, 132, 203)"; //reset header background to default
	document.querySelector(".failResult").classList.add("hideMe");
	document.querySelector(".winResult").classList.add("hideMe");
	return answer;
}

// set wrong answer events
function wrongAnswer(boxId) {
	document.querySelector(".failResult").classList.remove("hideMe");
	document.querySelector(".winResult").classList.add("hideMe");
	document.getElementById(boxId).style.background = "transparent";
	return false;
}

// set correct answer events
function correctAnswer(correctColor) {
	document.querySelector(".failResult").classList.add("hideMe");
	document.querySelector(".winResult").classList.remove("hideMe");
	document.querySelector("header").style.background = correctColor;
	return true;
}

// check winning click
function checkWin(id, answer) {
	var selected = id.charAt(id.length - 1);
	var clicked = document.getElementById(id);
	console.log(Number(selected), Number(answer), clicked.style.background);
	return Number(selected) === Number(answer) ? correctAnswer(clicked.style.background) : wrongAnswer(id);
}

function initializeGame(gameHard) {
	var colorboxes = [];
	if (gameHard) {
		document.querySelector(".hardRow").classList.remove("hideMe");
		colorboxes = document.querySelectorAll(".colorBoxes");
	}
	else {
		document.querySelector(".hardRow").classList.add("hideMe");
		colorboxes = document.querySelectorAll(".easyBoxes");
	}

	return colorboxes;
}

function pageLoad() {
	var gameHard = true; //for setting the difficulty level
	var gameOver = false; //for disabling further clicks till the game is reset
	var colorboxes = initializeGame(gameHard);
	var answer = setPuzzle(colorboxes);

	//add event listeners on nav bar
	document.querySelector("#newColors").addEventListener("click", function() {
		colorboxes = initializeGame(gameHard);
		answer = setPuzzle(colorboxes);
		gameOver = false;
	});

	var easy = document.querySelector("#easy");
	easy.addEventListener("click", function() {
		this.classList.add("active");
		hard.classList.remove("active");
		gameHard = false;
		colorboxes = initializeGame(gameHard);
		answer = setPuzzle(colorboxes);
		gameOver = false;
	});

	var hard = document.querySelector("#hard");
	hard.addEventListener("click", function() {
		this.classList.add("active");
		easy.classList.remove("active");
		gameHard = true;
		colorboxes = initializeGame(gameHard);
		answer = setPuzzle(colorboxes);
		gameOver = false;
	});

	//add event listeners on color boxes
	for (var i = 0; i < colorboxes.length; i++) {
		colorboxes[i].addEventListener("click", function() {
			if (!gameOver) {
				gameOver = checkWin(this.id, answer);
			}
		});
	}
}

pageLoad();
