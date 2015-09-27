alert("TinEyeSearch.js");
alert(linkToSend);
var searchString = linkToSend;
var tinyEyeSearchForm = document.getElementById("url_form");
var TinEyeTextBox = document.getElementById("url_box");
TinEyeTextBox.value = searchString;
tinyEyeSearchForm.submit();
