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
		var text = getRandomRiddle().riddle;
		console.log(text);
		document.querySelector('#riddle').innerHTML = text;
		console.log(riddles.length);
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
		console.log('get rand');
		console.log(riddles.length);
		var random = Math.floor(Math.random() * (riddles.length));
		console.log(random);
		console.log(riddles[random]);
		return riddles[random];
	}

	function getNextRiddle() {
		console.log(riddles.length);
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
