var currTime = 0;
var befTime = 0;

function init(userName){
	currTime = Math.floor(Date.now() / 1000);
	befTime = currTime - 43200; //last 12 hours
	done = getRecentList(userName, currTime, befTime);	
}

function getRecentList(user, to, from){
	$.getJSON("https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=" + user + "&api_key=yourapikey&limit=200&to=" + to + "&from=" + from + "&format=json&callback=?", function(data) {	
		var lastAlbumArt = $($(data.recenttracks.track).get(0).image).get(0)['#text'];
		var lastArtist = $(data.recenttracks.track).get(0).artist['#text'];
		var lastName = $(data.recenttracks.track).get(0).name;  	 
		var prevArtist = $(data.recenttracks.track).get(1).artist['#text'];
		var prevName = $(data.recenttracks.track).get(1).name;   	
		var recentAmt = Object.keys(data.recenttracks.track).length;
			
		$.getJSON("https://ws.audioscrobbler.com/2.0/?method=track.getInfo&user=" + user + "&api_key=yourapikey&artist=" + lastArtist + "&track=" + lastName + "&format=json&callback=?", function(data) {
			console.log(lastArtist+ " " + lastName+ " " + data.track.userloved);
			if(data.track.userloved == "1"){
				document.getElementById("mostRecent").innerHTML = "<b><font color='#990303'>&#10084;</font>   " + lastName + "</b>" + "  by " + "<b>" + lastArtist + "</b>";
			}else{
				document.getElementById("mostRecent").innerHTML = "<b>" + lastName + "</b>" + "  by " + "<b>" + lastArtist + "</b>";
			}
			$.getJSON("https://ws.audioscrobbler.com/2.0/?method=track.getInfo&user=" + user + "&api_key=yourapikey&artist=" + prevArtist + "&track=" + prevName + "&format=json&callback=?", function(data) {
				console.log(prevArtist+ " " + prevName+ " " + data.track.userloved);
				if(data.track.userloved == "1"){
					document.getElementById("previous").innerHTML = "<b><font color='#9B0505'>&#10084;</font>   " + prevName + "</b>" + "  by " + "<b>" + prevArtist + "</b>";
				}else{
					document.getElementById("previous").innerHTML = "<b>" + prevName + "</b>" + "  by " + "<b>" + prevArtist + "</b>";
				}
				document.getElementById("lastTwelve").innerHTML = "<b>" + recentAmt + "</b> in the last 12 hours";
				document.getElementById("albumArt").src = lastAlbumArt;
			});	
		});			
	});				
}
