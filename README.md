# Riddler
## This website gives the users random riddles from the internet

### Features
- Option to show answer if stuck
- Next riddle gets random riddle

### Website is deployed on [UW Student servers](https://students.washington.edu/swifties/riddler/)

### Known bugs/issues 
- Webpage ends early, as if wrapping content, leaving an absurd amount of whitespace

### Notes
- CSS is taken from Github pages page generator
   - That could be causing the issue, but no solution yet.
- Riddles taken off internet, and pasted into a text file
- PHP parses the riddles, and outputs the data in JSON format
- ```.editorconfig``` is used to make code viewing on Github of tab size 4
- Vanilla JavasScript option along with jQuery option

### Ajax calls

```JavaScript

// Vanilla JavaScript

makeAjaxRequest("riddles.php", storeRiddles);

function makeAjaxRequest(url, methodName) {
	var request = new XMLHttpRequest();
	request.onload = methodName;
	request.open("GET", url, true);
	request.send();
}

function storeRiddles() {
	var data = JSON.parse(this.responseText);
	for (var i = 0; i < data.length; i++) {
		riddles[i] = new riddle(data[i].riddle, data[i].answer, data[i].number );
	}
}

// jQuery

request('riddles.php', storeRiddles);

function request(url, callback) {
		$.ajax({
			url: url,
			type: 'GET',
			context: document.body,
			dataType: 'json',
			success: callback,
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

	function storeRiddles(response) {
		for (var i in response) {
			riddles[i] = new riddle(response[i].riddle, response[i].answer, response[i].number);
		}
	}
```
