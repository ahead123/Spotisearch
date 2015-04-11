$(document).ready(function() {

var $queryBox;
var $query;
var id;
var img_url;
var baseUrl = "https://api.spotify.com";

// allow users to search for songs, artist, categories on spotify
// connect to spotify api
var getResults = function() {

	document.getElementById('results').innerHTML = "";
	//$('#results').html("");

	$queryBox = document.getElementById('queryBox');
	//$queryBox = $('#queryBox');

	$query = $queryBox.value;
	//$query = $queryBox.val();

	document.getElementsByClassName('intro')[0].style.display = "none";
	//$('div.intro').hide();
	document.getElementsByClassName('main')[0].style.display = "block";
	//$('div.main').show();
	document.getElementsByClassName('left')[0].style.display = "block";
	//$('div.left').show();

	$.getJSON(baseUrl+"/v1/search?q="+$query+"&type=artist", function(json) {
		$('h2#resultHeader').html("Results For " + $query.toUpperCase());
		for(var i = 0; i < json.artists.items.length; i++) {
			id = json.artists.items[i].id;
			img_url = json.artists.items[i].images[0].url;
			console.log(json);
			console.log(id);
			console.log(img_url);
			$('#results').append('<div class="col-md-4"><a href="https://open.spotify.com/artist/'+id+'"><img class="thumbnail center-block img-responsive" src="'+img_url+'"></a></div>');
		}			
	});
}


//display the search results on the page
// allow users to add results to favorites
// allow users to add song url's to a playlist

document.getElementById('submitSearch').addEventListener('click', getResults);
//$('#submitSearch').on('click', getResults); 

});

