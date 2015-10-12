/* Requests the video URL from launch.js, finds the search bar, and enters the url */
chrome.runtime.sendMessage({greeting:"Request youtube URL"}, function(response) 
{
	var searchString = response.URL;
	
	//Insert and submit video URL
	var youTubeToMP3SearchBar = document.getElementById("youtube-url");
	//var youtubeToMP3Form = document.getElementById("submit-form");
	youTubeToMP3SearchBar.value = searchString;
	//youTubeToMP3Form.submit();
	//youtubeToMP3Form.submit();
});