$(document).ready(function() {

var $queryBox;
var $query;
var id;
var img_url;
var artist_name;
var album_name;
var short_album_name;
var album_id;
var album_url;
var album_img;
var favs = [];
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
	//document.getElementsByClassName('left')[0].style.display = "block";
	//$('div.left').show();

	$.getJSON(baseUrl+"/v1/search?q="+$query+"&type=artist,album,track", function(json) {

		//$('h4#resultHeader').html("Results For " + $query);

		for(var i = 0; i < json.artists.items.length; i++) {
			id = json.artists.items[i].id;
			img_url = json.artists.items[0].images[0].url;
			artist_name = json.artists.items[i].name;

			for(var x = 0; x < json.albums.items.length; x++) {
				//album_url = json.albums.items[i].images[x].url;
				album_name = json.albums.items[x].name;
				album_id = json.albums.items[x].id;
				album_img = json.albums.items[x].images[0].url;
				//$('#results').append('<div class="col-md-4"><a href="https://play.spotify.com/album/'+album_id+'"><img class="thumbnail center-block img-responsive" src="'+album_img+'"></a><p>album title: '+album_name+'</p><p>artist name: '+artist_name+'</p></div>');
				$('#results').append('<div class="col-md-4"><div class="panel panel-default"><div class="panel-heading"><p class="panel-title pull-left">'+album_name+'</p><a href="https://play.spotify.com/album/'+album_id+'"><p class="text-right tracklist">Open in Spotify</p></a></div><div class="panel-body"><a href="https://play.spotify.com/album/'+album_id+'"><img class="thumbnail center-block img-responsive" src="'+album_img+'"></a></div><div class="panel-footer"><p class="pull-left">'+artist_name+'</p><a class="favTrigger" href=""><p class="text-right">Add to Favorites (coming soon)</p></a></div></div></div>');
				$('img.artistImage').attr('src', img_url);
				$('a.albumLink').attr('href', 'https://open.spotify.com/artist/'+id+'');
			}

				console.log(json);
		}

	});
	
}

console.log(id);
//display the search results on the page
// allow users to add results to favorites
// allow users to add song url's to a playlist

document.getElementById('submitSearch').addEventListener('click', getResults);
//$('#submitSearch').on('click', getResults); 

});

