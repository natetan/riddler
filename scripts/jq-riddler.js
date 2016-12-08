$(document).ready(function() {

	var riddles = new Array();
	var currentRiddle;

	makeAjaxRequest('riddles.php');
	$('#answer-area').html('');
	$('#answer').on('click', showAnswer);
	$('#next').on('click', getNextRiddle);
	$('#start').on('click', start);

	function makeAjaxRequest(url) {
		$.ajax({
			url: url,
			type: 'GET',
			context: document.body,
			dataType: 'json',
			success: function(response) {
				for (var i in response) {
					riddles[i] = new riddle(response[i].riddle, response[i].answer, response[i].number );
				}
			},
			statusCode: {
				400: function() {
					console.log('400 status code. User error.');
				},
				404: function() {
					console.log('404 status code. Page not found.');
				},
				500: function() {
					console.log('500 status code. Server error.');
				}
			}
		});
	}

	function start() {
		$('#start').addClass('hide');
		$('#answer').removeClass('hide');
		$('#next').removeClass('hide');
		getNextRiddle();
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
		$('#riddle').html(currentRiddle.riddle);
		$('.answer-area').addClass('hide');
	}

	function showAnswer() {
		var answer = $('.answer-area');
		answer.html(currentRiddle.answer);
		answer.removeClass('hide');
	}
	
});
