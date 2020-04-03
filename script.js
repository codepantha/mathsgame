var playing = false;
var score;
var action;
var timeremaining;
var questionCount;
var question;
var correctAnswer;

//if we click on the start/reset
document.getElementById("startreset").onclick = function() {
	//if we are already playing
	if (playing) {
		location.reload();//reload page
	}
	else {
		playing = true;
		score = 0;//set score to zero
		timeremaining = 60;
		displayScore(score);
		//show countdown box
		show("timeremaining");
		//hide gameOver box
		hide("gameOver");
		document.getElementById("startreset").innerHTML = "Reset";
		
		//start countdown
		startCountdown();

		//generate a new Q&A
		generateQA();
	}
}

//clicking on an answer box

for (var i = 1; i <= 4; i++) {
	document.getElementById("box" + i).onclick = function() {
		//check if we're playing
		if (playing) {
			//check correct answer
			if (this.innerHTML == correctAnswer) {
				//increment score
				score++;
				displayScore(score);
				//hide wrong and show correct box for 1 sec
				hide("wrong");
				show("correct");
				setTimeout(function() {
					hide("correct")
				}, 1000);
				generateQA();
			}
			else {
				//wrong answer
				hide("correct");
				show("wrong");
				setTimeout(function() {
					hide("wrong")
				}, 1000);
				score -=2;//lose 2 marks when you pick a wrong answer
				displayScore(score);
			}

		}
	}
}

//functions

//start counter		
function startCountdown() {
	action = setInterval(function() {
		
		timeremaining -= 1;

		if (timeremaining == 0) {
			stopCountdown();
			show("gameOver");
			document.getElementById("gameOver").innerHTML = "<p>Game Over!</p><p>Your Score is " + score + "</p>";
			hide("timeremaining");
			hide("correct");
			hide("wrong");
			document.getElementById("startreset").innerHTML = "Start Game";
			//set mode to not playing
			playing = false;
		}

		updateTime();
	}, 1000);//1000 milliseconds equals 1 second
}

//stop countdown
function stopCountdown() {
	clearInterval(action);
}

function updateTime() {
	document.getElementById("timeremainingvalue").innerHTML = timeremaining;
	if (timeremaining < 30) {
		document.getElementById("timeremaining").style.backgroundColor = "rgb(163, 62, 15)";
		if (timeremaining < 10) {
		document.getElementById("timeremaining").style.backgroundColor = "#970909";
		}
	}
	
}

//hide an element
function hide(id) {
	document.getElementById(id).style.display = "none";
}

//show an element
function show(id) {
	document.getElementById(id).style.display = "block";
}

//show score on application
function displayScore(score) {
	document.getElementById("scorevalue").innerHTML = score;
}

//generate Q&A
function generateQA() {
	var x = 1 + Math.round(9 * Math.random());
	var y = 1 + Math.round(9 * Math.random());
	correctAnswer = x*y;

	//display the questions
	document.getElementById("question").innerHTML = x + " x " + y;

	var correctPosition = 1 + Math.round(3 * Math.random());

	//fill one box with the correct answer
	document.getElementById("box"+correctPosition).innerHTML = correctAnswer;

	//fill other boxes with wrong answers
	//and also ensuring we don't have wrong answers appearing twice. Same goes for correct answers
	var answers = [correctAnswer];

	for (var i = 1; i <= 4; i++) {
		if (i != correctPosition) {
			var wrongAnswer;
			do {
				wrongAnswer = (1 + Math.round(9 * Math.random())) * (1 + Math.round(9 * Math.random()));
			}
			while (answers.indexOf(wrongAnswer) > -1)
			document.getElementById("box" + i).innerHTML = wrongAnswer;
			answers.push(wrongAnswer);
		}
	}
}