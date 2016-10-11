(function() {
	'use strict';

	var riddles = new Array();
	var currentRiddle;

	window.onload = function() {
		makeAjaxRequest("riddles.php", storeRiddles);
		document.querySelector('#riddle').innerHTML = getNextRiddle();
		document.querySelector('#answer-area').innerHTML = "";
		document.querySelector('#answer').onclick = showAnswer;
		document.querySelector('#next').onclick = getNextRiddle;
	};

	function makeAjaxRequest(url, methodName) {
		var request = new XMLHttpRequest();
		request.onload = methodName;
		request.open("GET", url, true);
		request.send();
	}

	function storeRiddles() {
		var data = JSON.parse(this.responseText);
		for (var i = 0; i < data.length; i++) {
			riddles[i] = new riddle(riddles[i].riddle, riddles[i].answer, riddles[i].number );
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
		document.querySelector('selector');
		document.querySelector('#answer-area').classList.add('hide');
	}

	function showAnswer() {
		var answer = document.querySelector('.answer-area');
		answer.innerHTML = "test";
		answer.classList.remove('hide');
	}

}) ();
