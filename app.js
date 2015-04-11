$(document).ready(function() {

var $queryBox;
var $query;
var id;
var baseUrl = "https://api.spotify.com";

// allow users to search for songs, artist, categories on spotify
// connect to spotify api
var getResults = function() {
	$queryBox = $('#queryBox');
	$query = $queryBox.val();

	$.getJSON(baseUrl+"/v1/search?q="+$query+"&type=artist", function(json) {
		for(var i = 0; i < json.artists.items.length; i++) {
			id = json.artists.items[i].id;
			console.log(id);
			$('#results').append('<div class="col-md-4"><img class="thumbnail center-block" src=""></div>');
		}
		console.log(json);
	});
}


//display the search results on the page
// allow users to add results to favorites
// allow users to add song url's to a playlist
$('#submitSearch').on('click', getResults); 

});

