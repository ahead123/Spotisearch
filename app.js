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
var loginUrl;
var access_token;
var baseUrl = "https://api.spotify.com";
var client_id = "28c0d2a90c924223a48b18dc0801c512";
var redirect_uri = "http://ahead123.github.io/Spotisearch/#";

var userLogin = function() {

	var scope = 'user-read-private user-read-email playlist-read-private playlist-read-collaborative';
    var state = '123';

	loginUrl = 'https://accounts.spotify.com/authorize';
	loginUrl += '?response_type=token';
	loginUrl += '&client_id=' + encodeURIComponent(client_id);
	loginUrl += '&scope=' + encodeURIComponent(scope);
	loginUrl += '&redirect_uri=' + encodeURIComponent(redirect_uri);
	loginUrl += '&show_dialog=true';
	loginUrl += '&state=' + encodeURIComponent(state);

	window.location = loginUrl;
}

// checks to see if access_token is in url
if(window.location.href.indexOf('access_token') !== -1){
	// splits url into an array
	var hrefArray = window.location.href.split('=');
	// converts the access token to a string
	var hrefString = hrefArray[1].toString();
	// gets rid of everything after the access_token
	hrefString = hrefString.substring(0, hrefString.length - 11);
	access_token = hrefString;
	if(access_token){
		$.ajax({
			url: 'https://api.spotify.com/v1/me',
            headers: {
              'Authorization': 'Bearer ' + access_token
            },
            success: function(data){
            	// console.log(data);
            	// console.log(data.display_name);        
            	$('#login').html(" "+"Logged in as "+data.display_name).css({
            		'backgroundColor' :'#84bd00',
            		'padding' : '10px 20px',
            		'color' : '#ecf0f1',
            		'border-radius' : '20px',
            		'margin-top' : '5px'
            	});
            	// console.log(data.images[0].url);
            	$('#userPic').attr({
            		src: data.images[0].url
            	});
            	$('#userPic').show();
            	$('#userProfile').attr({
            		href: data.external_urls.spotify
            	});
            }
		});
	}
}


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

$('#login').click(userLogin);


}); // ends document.ready()



