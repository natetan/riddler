(function() {
	'use strict';

	var riddles = new Array();
	var currentRiddle;

	window.onload = function() {
		makeAjaxRequest("riddles.php", storeRiddles);
		document.querySelector('#riddle').innerHTML = getRandomRiddle();
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

}) ();
