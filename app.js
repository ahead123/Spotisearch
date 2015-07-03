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
var cache = {};
var baseUrl = "https://api.spotify.com";



// allow users to search for songs, artist, categories on spotify
var getResults = function() {

	var render = function(json) {

		document.getElementById('results').innerHTML = "";
		//$('#results').html("");

		for(var i = 0; i < json.artists.items.length; i++) {
			id = json.artists.items[i].id;
			img_url = json.artists.items[0].images[0].url;
			artist_name = json.artists.items[i].name;

			for(var x = 0; x < json.albums.items.length; x++) {

				//album_url = json.albums.items[i].images[x].url;
				album_name = json.albums.items[x].name;
				album_id = json.albums.items[x].id;
				album_img = json.albums.items[x].images[0].url;

				//display the search results on the page
				//$('#results').append('<div class="col-md-4"><a href="https://play.spotify.com/album/'+album_id+'"><img class="thumbnail center-block img-responsive" src="'+album_img+'"></a><p>album title: '+album_name+'</p><p>artist name: '+artist_name+'</p></div>');
				$('#results').append('<div class="col-md-4"><div class="panel panel-default"><div class="panel-heading"><p class="panel-title pull-left">'+album_name+'</p><a href="https://play.spotify.com/album/'+album_id+'"><p class="text-right tracklist">Open in Spotify</p></a></div><div class="panel-body"><a href="https://play.spotify.com/album/'+album_id+'"><img class="thumbnail center-block img-responsive" src="'+album_img+'"></a></div><div class="panel-footer"><p class="pull-left">'+artist_name+'</p><a class="favTrigger" href="#" onclick="pushFav()"><p class="text-right">Add to Favorites (coming soon)</p></a></div></div></div>');
				$('a.albumLink').attr('href', 'https://open.spotify.com/artist/'+id+'');

			} // ends album loop

		} // ends artists loop

		$('img.artistImage').attr('src', img_url);
		document.getElementsByClassName('intro')[0].style.display = "none";
	//$('div.intro').hide();

	document.getElementsByClassName('main')[0].style.display = "block";
	//$('div.main').show();

		$queryBox.value = "";
	}

	

	$queryBox = document.getElementById('queryBox');
	//$queryBox = $('#queryBox');

	$query = $queryBox.value;
	//$query = $queryBox.val();

	
	// this is commented out because I'll plan on using it later to hide and show a side panel for playlists
	//document.getElementsByClassName('left')[0].style.display = "block";
	//$('div.left').show();

  // checks to see if search term is in cache. if so - stops api call and pulls data from cache object.
	if($query in cache) {
	  console.log('hit cache', $query, cache[$query]);
	  render(cache[$query]);
	  return false;
	} 

	// connect to spotify api and get data in JSON format
	$.getJSON(baseUrl+"/v1/search?q="+$query+"&type=artist,album,track", function(json) {
		cache[$query] = json;
		render(json);
	}); // ends JSON call	

} // ends getResults funciton

//document.getElementById('submitSearch').addEventListener('click', getResults);
$('#submitSearch').click(getResults); 

// also fires getResults function on the enter keypress event
$('input#queryBox').on('keypress', function (e) {
    if (e.which == 13) {
      getResults();
    }
 });

}); // ends document.ready()



