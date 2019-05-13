const baseUrl = 'https://newsapi.org/v2/everything?';
const api_key = "&apiKey=2deaf08e8ef1403ab688b26c6a3e39ac";
var score = 0;


const form = document.getElementById("searchForm");
let url;
let userInput = document.getElementById("userEntry");
const colorArray = [
	'#7399BF',
	'#4D6680',
	'#99CCFF',
	'#263340',
	'#8AB8E6',
	'#142840',
	'#4990E6',
	'#3E79C2'

]

document.getElementById("startButton").onclick = function(){

	document.getElementById("start").style.display = "none";
	document.getElementById("scoreArea").style.display = "block";
	document.getElementById("userEntry").focus();
};

	

searchForm.onsubmit = function(e) {
	e.preventDefault();

	
	// set API call, setting the user input to the keyword
	let url = baseUrl + "q=" + userInput.value + api_key;


	// clear the form after user submits
	form.reset();

	//getting the json data
	fetch(url)
	.then((resp) => resp.json())
	.then(json => {

		console.log(json);
		let topHeadlines = "";

	// cycling through the top 10 stories with the given keyword and adding them to a string to be used in the ticker
		for (var i = 0; i <= 9; i++) {
			topHeadlines += json.articles[i].title + "...";

		}

	// specifying what part of the json object we want... in this case the title 
		let article = json.articles[0].title;
		
	//creating a div to hold the headlines

		var div = document.createElement('div');


		

	// adding the headlines to the div
		div.textContent = topHeadlines;

	//checking if trump is mentioned, and updating score accordingly.

		var trumpMentioned = div.textContent.includes("Trump");
		if (trumpMentioned === true) {

			div.style.backgroundColor = "red";
			youLose();

		} else {
			
			div.style.backgroundColor = colorArray[Math.floor(Math.random() * colorArray.length)]
			score++;
			updateScore();
		}

		console.log(score);
	//giving the div a ticker class for styling

		div.setAttribute('class', 'ticker');

	// adding the div to the page, within tickerwrap
		document.getElementById("tickerwrap").appendChild(div);


	})

}

function updateScore(){

	document.getElementById("scoreCount").innerHTML = "Score:" + score;




}


function youLose(){

    document.getElementById("scoreCount").innerHTML = "you lose. final score:" + score + ". type to start a new round.";
    score = 0;
}

