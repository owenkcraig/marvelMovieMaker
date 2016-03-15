var movieWidget = {};

var characterWidget = {};
characterWidget.apiKey = '11104ce18a708a26fc7f991578d34eb0';
characterWidget.apiURL = 'http://gateway.marvel.com/v1/public/characters';

var actorWidget = {};
actorWidget.apiKey = '72f080713d11bce7fa46298c50aafc93';
actorWidget.apiURL = 'http://api.themoviedb.org/3/person/popular/';
actorWidget.actorArray = [];

//Get a randomly generated character

characterWidget.getInfo = function() {
	//show loading screen. Add class show to a loading div
	$("#characterLoadingScreen").addClass("loading");
	var randomCharacterPageDecimal = Math.random() * 1485-50;
	var randomCharacterPageRounded = Math.floor(randomCharacterPageDecimal);
	$.ajax({
		url: characterWidget.apiURL,
		method: 'GET',
		dataType: 'json',
		data: {
			apikey: characterWidget.apiKey,
			offset: randomCharacterPageRounded,
		}
	}).then(function(response) {
		//remove loading screen. Remove class show to a loading div
		$("#characterLoadingScreen").removeClass("loading");
		var data = response.data.results;
		var filteredChars = data.filter(function(elem) {
			return elem.thumbnail.path != "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available";
		});
		var randomCharacterDecimal = Math.random() * filteredChars.length;
		var randomCharacterRounded = Math.floor(randomCharacterDecimal);
		var randomCharacterFinal = filteredChars[randomCharacterRounded].name;
		var randomCharacterImagePath = filteredChars[randomCharacterRounded].thumbnail.path;
		var randomCharacterImageExtension = filteredChars[randomCharacterRounded].thumbnail.extension;
		var randomCharacterImageFinal = randomCharacterImagePath + '.' + randomCharacterImageExtension;
		//Display character data on the page.
		$('#character').text(randomCharacterFinal);
		$('#characterImage').attr('src', randomCharacterImageFinal);
	});
};

//Get a randomly generated actor
actorWidget.getInfo = function() {
	$("#actorLoadingScreen").addClass("loading");
	var randomActorPageDecimal = Math.random() * 100 +1;
	var randomActorPageRounded = Math.floor(randomActorPageDecimal);
	$.ajax({
		url: actorWidget.apiURL,
		method: 'GET',
		dataType: 'jsonp',
		data: {
			api_key: actorWidget.apiKey,
			page: randomActorPageRounded,
		}
	}).then(function(response) {
		$("#actorLoadingScreen").removeClass("loading");
		actorWidget.actorArray = [];
		for (i = 0; i < response.results.length; i++) {
			actorWidget.actorArray.push(response.results[i].name);
		}
		var randomActorDecimal = Math.random() * actorWidget.actorArray.length;
		var randomActorRounded = Math.floor(randomActorDecimal);
		var randomActorFinal = response.results[randomActorRounded].name;
		var randomActorImagePath = response.results[randomActorRounded].profile_path;
		var randomActorImageFinal = 'https://image.tmdb.org/t/p/w185' + randomActorImagePath;
		//Display actor data on the page.
		$('#actor').text(randomActorFinal);
		$('#actorImage').attr('src', randomActorImageFinal);
	})
};

//Run, functions, run!

movieWidget.init = function() {
	$('#characterButton').on('click', function(e) {
		e.preventDefault();
		$('#starring').text("starring");
		$('#characterButton').text("Pick another");
		characterWidget.getInfo();
	}); 
	$('#actorButton').on('click', function(e) {
		e.preventDefault();
		$('#starring').text("starring");
		$('#actorButton').text("Pick another");
		actorWidget.getInfo();
	}); 
	$('#button').on('click', function(e) {
		$('#starring').text("Awesome! You just made $200 million!");
		$('#characterButton').text("Pick a character");
		$('#actorButton').text("Pick an actor");
	});
};

$(document).ready(function() {
	movieWidget.init();
});

//Make it Rain
$('#button').makeItRain();

//Konami code
var kkeys = [], konami = "38,38,40,40,37,39,37,39,66,65";

$(document).keydown(function(e) {

  kkeys.push( e.keyCode );

  if ( kkeys.toString().indexOf( konami ) >= 0 ) {

    $(document).unbind('keydown',arguments.callee);
    
    // do something awesome
    $('#starring').text("Paul Newman mode unlocked!");
    $('#actor').text("Paul Newman");
    $('#actorImage').attr('src', 'images/newman.jpg');
  }

});

//Toggle

	  $(".addressButton").click(function(){
        $(".footerAddress").slideToggle();
   		});
	  $(".blogPostsButton").click(function(){
        $(".footerBlog").slideToggle();
   		});
	  $(".tagButton").click(function(){
        $(".footerTags").slideToggle();
   		});



// Filter this out, too http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif