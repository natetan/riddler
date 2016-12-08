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
		getNextRiddle();
	}

	function storeRiddles() {
		if (this.statusCode == 200) {
			var data = JSON.parse(this.responseText);
			for (var i = 0; i < data.length; i++) {
				riddles[i] = new riddle(data[i].riddle, data[i].answer, data[i].number );
			}
		} else {
			console.log('Could not reach server: status code ' + this.statusCode);
		}
	}

	function riddle(riddle, answer, number) {
		this.riddle = riddle;
		this.answer = answer;
		this.number = number;
	}

	function getRandomRiddle() {
		var random = Math.floor(Math.random() * (riddles.length));
		return riddles[random];
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
