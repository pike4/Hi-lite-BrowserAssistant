function throwHiBriteAlert()
{
	alert("ERROR: HiBrite has crashed. Reason: is piece of shit");
}

function openInfoPage()
{
	chrome.tabs.create({"url":"http://www.google.com","active":true});
}


function convertURLToSearchableString(URL)
{	
	
	var httpIndex = URL.indexOf("http");
	
	
	if(httpIndex >=0)
	{	
		var wwwIndex = URL.indexOf("www.");
		var httpsIndex = URL.indexOf("https://");
		if(wwwIndex>=0)
		{
			return URL.substring(URL.indexOf("www.")+4);
		}
		
		else if(httpsIndex >=0)
		{
			return URL.substring(URL.indexOf("https://")+8);
		}
		
		else
		{
			return URL.substring(URL.indexOf("https://")+7);
		}
		
	}
	
	else	
	{	
	alert("This URL is likely invalid");
	}
	return(URL);
	
}

function checkScamAdvisorCurrent()
{
	var searchString = "http://www.scamadviser.com/check-website/";
	
	chrome.tabs.query({'active': true}, function(tabs) {
	var currentURL=tabs[0].url;
	var siteToCheck = convertURLToSearchableString(currentURL);
	var finalString = searchString.concat(siteToCheck);
	chrome.tabs.create({"url":finalString,"active":true});
});
	
}

function checkScamAdvisorLink(info, tab)
{
	alert(info.mediaType);
	var searchString = "http://www.scamadviser.com/check-website/";
	alert(info.linkURL);
	var siteToCheck = convertURLToSearchableString(info.linkURL);
	var finalString = searchString.concat(siteToCheck);
	
	
	
}

function searchTinEye(info, tab)
{
	alert(info.srcURL);
	chrome.tabs.create({"url":"https://www.tineye.com/","active":true}, function(tabs){
	chrome.tabs.executeScript({"file":"TinyEyeSearch.js"});
	});
}

var title = "Hi-Brite Actions";
var contexts = ["page","selection","link","image","video","audio"];
var currentPageParent = chrome.contextMenus.create({"title": "Current Page", "contexts":[contexts[0]]});
var selectionParent = chrome.contextMenus.create({"title": "Google this","contexts":[contexts[1]], "onclick": throwHiBriteAlert});

var imageParent = chrome.contextMenus.create({"title": "Reverse Image Search","contexts":[contexts[3]], "onclick": searchTinEye});
var linkParent = chrome.contextMenus.create({"title": "Linked page info","contexts":[contexts[2]], "onclick": throwHiBriteAlert});
var currentPageChild1 = chrome.contextMenus.create({"title": "Current Page Info","parentId":currentPageParent, "contexts":[contexts[0]],"onclick":openInfoPage});
var currentPageChildScamAdvisor = chrome.contextMenus.create({"title": "Is this site legit?","parentId":currentPageParent, "contexts":[contexts[0]],"onclick":checkScamAdvisorCurrent});

var linkSafetyChild = chrome.contextMenus.create({"title":"Is this link safe?","parentId":linkParent,"contexts":[contexts[2]]});

chrome.contextMenus.onClicked.addListener(function(info, tab){
	

checkScamAdvisorLink(info, tab);
});
alert("stilll");