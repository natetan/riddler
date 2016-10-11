(function() {
	'use strict';

	var riddles = new Array();
	var currentRiddle;

	window.onload = function() {
		makeAjaxRequest("riddles.php", storeRiddles);
		document.querySelector('#answer-area').innerHTML = "";
		document.querySelector('#answer').onclick = showAnswer;
		document.querySelector('#next').onclick = getNextRiddle;
		document.querySelector('#start').onclick = start;
	};

	function makeAjaxRequest(url, methodName) {
		var request = new XMLHttpRequest();
		request.onload = methodName;
		request.open("GET", url, true);
		request.send();
	}

	function start() {
		document.querySelector('#start').classList.add('hide');
		document.querySelector('#answer').classList.remove('hide');
		document.querySelector('#next').classList.remove('hide');
		document.querySelector('#riddle').innerHTML = getNextRiddle();
	}

	function storeRiddles() {
		var data = JSON.parse(this.responseText);
		for (var i = 0; i < data.length; i++) {
			riddles[i] = new riddle(data[i].riddle, data[i].answer, data[i].number );
		}
	}

	function riddle(riddle, answer, number) {
		this.riddle = riddle;
		this.answer = answer;
		this.number = number;
	}

	function getRandomRiddle() {
		var index = Math.floor(Math.random() * (riddles.length));
		return riddles[index];
	}

	function getNextRiddle() {
		currentRiddle = getRandomRiddle();
		document.querySelector('.riddle-number').innerHTML = "Riddle #" + currentRiddle.number;
		document.querySelector('#riddle').innerHTML = currentRiddle.riddle;
		document.querySelector('.answer-area').classList.add('hide');
	}

	function showAnswer() {
		var answer = document.querySelector('.answer-area');
		answer.innerHTML = currentRiddle.answer;
		answer.classList.remove('hide');
	}

}) ();
