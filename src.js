function init(){
var userName = "user goes here";
getLastListened(userName);
}
function getLastListened(user){
 $.getJSON("https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=" + user + "&api_key=83a068985f1c01197759735f6cfaca92&limit=3&format=json&callback=?", function(data) {
 var lastAlbumArt = $($(data.recenttracks.track).get(0).image).get(0)['#text'];
 var lastArtist = $(data.recenttracks.track).get(0).artist['#text'];
 var lastName = $(data.recenttracks.track).get(0).name;  	 
 var prevArtist = $(data.recenttracks.track).get(1).artist['#text'];
 var prevName = $(data.recenttracks.track).get(1).name;   	
    //alert(lastAlbumArt);
    document.getElementById("albumArt").src = lastAlbumArt;
    document.getElementById("songInfo").innerHTML = "<b>" + lastName + "</b>" + "  by " + "<b>" + lastArtist + "</b>" + "<div id='prevSong'>" + "<b>" + prevName + "</b>" + "  by " + "<b>" + prevArtist + "</b>" + "</div>";    
});
}
