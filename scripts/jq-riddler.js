$(document).ready(function() {

	window.onload = function() {
		makeAjaxRequest("riddles.php", storeRiddles);
		$('#answer-area').html('');
		$('#answer').on('click', showAnswer);
		$('#next').on('click', getNextRiddle);
		$('#start').on('click', start);
	};

	function makeAjaxRequest(url, methodName) {
		
	}
	
});
