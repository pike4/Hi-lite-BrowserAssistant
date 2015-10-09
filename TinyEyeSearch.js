alert("TinEyeSearch.js");
alert(passingString);
var searchString = passingString;
var tinyEyeSearchForm = document.getElementById("url_form");
var TinEyeTextBox = document.getElementById("url_box");
TinEyeTextBox.value = searchString;
tinyEyeSearchForm.submit();
