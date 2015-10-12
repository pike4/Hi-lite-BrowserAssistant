chrome.runtime.sendMessage({greeting:"Request image URL"}, function(response) 
{
	var tinEyeSubmitString = response.URL;
	
	//Insert and submit image URL
	var tinEyeSearchForm = document.getElementById("url_form");
	var TinEyeTextBox = document.getElementById("url_box");
	TinEyeTextBox.value = tinEyeSubmitString;
	tinEyeSearchForm.submit();
});


