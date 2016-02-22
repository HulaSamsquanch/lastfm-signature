var currTime = 0;
var befTime = 0;

function init(userName){
	currTime = Math.floor(Date.now() / 1000);
	befTime = currTime - 43200; //last 12 hours
	
	getRecentList(userName, currTime, befTime);
}


function getRecentList(user, to, from){
	$.getJSON("https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=" + user + "&api_key=yourapikeyhere&limit=200&to=" + to + "&from=" + from + "&format=json&callback=?", function(data) {
		var lastAlbumArt = $($(data.recenttracks.track).get(0).image).get(0)['#text'];
		var lastArtist = $(data.recenttracks.track).get(0).artist['#text'];
		var lastName = $(data.recenttracks.track).get(0).name;  	 
		var prevArtist = $(data.recenttracks.track).get(1).artist['#text'];
		var prevName = $(data.recenttracks.track).get(1).name;   			
		
		document.getElementById("lastTwelve").innerHTML = "<b>" + Object.keys(data.recenttracks.track).length + "</b> in the last 12 hours";
		document.getElementById("albumArt").src = lastAlbumArt;
		document.getElementById("songInfo").innerHTML = "<div id='specBg'><b>" + lastName + "</b>" + "  by " + "<b>" + lastArtist + "</b>" + "<div id='prevSong'>" + "<b>" + prevName + "</b>" + "  by " + "<b>" + prevArtist + "</b>" + "</div></div>";    
	});
}
