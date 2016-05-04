var currTime = 0;
var befTime = 0;

function init(userName){
	currTime = Math.floor(Date.now() / 1000);
	befTime = currTime - 43200; //last 12 hours
	done = getRecentList(userName, currTime, befTime);	
}

/*
 * 18 per string
 fuckin experimental
 */
function trimString(inStringOne, inStringTwo) {
	var einStringOne = inStringOne;
	var einStringTwo = inStringTwo;

	var editDepth = false;
	if(inStringOne.length + inStringTwo.length < 36){
		return inStringOne + "</b>" + "  by " + "<b>" + inStringTwo;
	}else{
		while(einStringOne.length + inStringTwo.length > 36) {
			if(einStringOne.length > 6) {
				einStringOne = einStringOne.slice(0, -1);
			}else{
				einStringTwo = einStringTwo.slice(0, -1);
			}
			
			//einStringTwo = einStringTwo.slice(0, -1);
		}
		if(!editDepth)
			return einStringOne + "&hellip;</b>" + "  by " + "<b>" + inStringTwo;
		else
			return einStringOne + "&hellip;</b>" + "  by " + "<b>" + inStringTwo + "&hellip;";
	}
}

function getRecentList(user, to, from){
	$.getJSON("https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=" + user + "&api_key=yourapikey&limit=200&to=" + to + "&from=" + from + "&format=json&callback=?", function(data) {	
		var lastAlbumArt = $($(data.recenttracks.track).get(0).image).get(0)['#text'];
		var lastArtist = $(data.recenttracks.track).get(0).artist['#text'];
		var lastName = $(data.recenttracks.track).get(0).name;  	 
		var prevArtist = $(data.recenttracks.track).get(1).artist['#text'];
		var prevName = $(data.recenttracks.track).get(1).name;   	
		var recentAmt = Object.keys(data.recenttracks.track).length;
			
		if (lastArtist && lastName) {
			$.getJSON("https://ws.audioscrobbler.com/2.0/?method=track.getInfo&user=" + user + "&api_key=yourapikey&artist=" + lastArtist + "&track=" + lastName + "&format=json&callback=?", function(data) {
			console.log(lastArtist+ " " + lastName+ " " + data.track.userloved);
			if(data.track.userloved == "1"){
				document.getElementById("mostRecent").innerHTML = "<b><font color='#990303'>&#10084;</font>   " + trimString(lastName, lastArtist) + "</b>";
			}else{
				document.getElementById("mostRecent").innerHTML = "<b>" + trimString(lastName, lastArtist) + "</b>";
			}
			$.getJSON("https://ws.audioscrobbler.com/2.0/?method=track.getInfo&user=" + user + "&api_key=yourapikey&artist=" + prevArtist + "&track=" + prevName + "&format=json&callback=?", function(data) {
				console.log(prevArtist+ " " + prevName+ " " + data.track.userloved);
				if(data.track.userloved == "1"){
					document.getElementById("previous").innerHTML = "<b><font color='#9B0505'>&#10084;</font>   " + trimString(prevName, prevArtist) + "</b>";
				}else{
					document.getElementById("previous").innerHTML = "<b>" + trimString(prevName, prevArtist) + "</b>";
				}
				document.getElementById("lastTwelve").innerHTML = "<b>" + recentAmt + "</b> in the last 12 hours";
				document.getElementById("albumArt").src = lastAlbumArt;
			});	
		});			
		}
	});				
}
