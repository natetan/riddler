$(document).ready(function() {

	var riddles = new Array();
	var currentRiddle;

	window.onload = function() {
		makeAjaxRequest('riddles.php');
		$('#answer-area').html('');
		$('#answer').on('click', showAnswer);
		$('#next').on('click', getNextRiddle);
		$('#start').on('click', start);
	};

	function makeAjaxRequest(url) {
		$.ajax({
			url: url,
			type: 'GET',
			context: document.body,
			dataType: 'json',
			success: function() {
				var data = $.parseJSON(this.responseText);
				for (var i = 0; i < data.length; i++) {
					riddles[i] = new riddle(data[i].riddle, data[i].answer, data[i].number );
				}
			}
		});
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
		$('.riddle-number').html('Riddle #' + currentRiddle.number);
		$('#riddle').html('currentRiddle.riddle');
		$('.answer-area').addClass('hide');
	}

	function showAnswer() {
		var answer = $('.answer-area');
		answer.html(currentRiddle.answer);
		answer.removeClass('hide');
	}
	
});
