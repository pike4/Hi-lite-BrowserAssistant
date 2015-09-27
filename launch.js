function throwHiBriteAlert()
{
	alert("Sorry! That feature has not yet been implemented. Check back later for new updates.");
}

function openInfoPage()
{
	chrome.tabs.create({"url":"http://www.google.com","active":true});
}


function convertURLToSearchableString(URL)
{	
	
	var httpIndex = URL.indexOf("http");
	
	
	if(httpIndex >= 0)
	{	
		var wwwIndex = URL.indexOf("www.");
		var httpsIndex = URL.indexOf("https://");
		if(wwwIndex>= 0)
		{
			return URL.substring(URL.indexOf("www.")+4);
		}
		
		else if(httpsIndex >= 0)
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



function searchTinEye(info, tab)
{
	alert(info.menuItemId);
	chrome.tabs.create({"url":"https://www.tineye.com/","active":true}, function(tabs){
	chrome.tabs.executeScript({"file":"TinyEyeSearch.js"});
	});
}

var title = "Hi-Brite Actions";
var contexts = ["page","selection","link","image","video","audio"];
var currentPageParent = chrome.contextMenus.create({"title": "Current Page", "contexts":[contexts[0]]});
var selectionParent = chrome.contextMenus.create({"title": "Google this","contexts":[contexts[1]]});

var imageParent = chrome.contextMenus.create({"title": "Reverse Image Search","contexts":[contexts[3]], "onclick": searchTinEye});
var linkParent = chrome.contextMenus.create({"title": "Linked page info","contexts":[contexts[2]], "onclick": throwHiBriteAlert});
var currentPageChild1 = chrome.contextMenus.create({"title": "Current Page Info","parentId":currentPageParent, "contexts":[contexts[0]],"onclick":throwHiBriteAlert});
var currentPageChildScamAdvisor = chrome.contextMenus.create({"title": "Is this site legit?","parentId":currentPageParent, "contexts":[contexts[0]],"onclick":checkScamAdvisorCurrent});

var linkSafetyChild = chrome.contextMenus.create({"title":"Is this link safe?","parentId":linkParent,"contexts":[contexts[2]]}, function(info, tab)
	{
		chrome.contextMenus.onClicked.addListener(function(info, tab){
		checkScamAdvisorLink(info, tab);
		})					
	}
);

function checkScamAdvisorLink(info, tab)
{
	alert(info.menuItemId);
	alert("B");
	alert(info.linkUrl);
	var searchString = "http://www.scamadviser.com/check-website/";
	
	var siteToCheck = convertURLToSearchableString(info.linkUrl);
	var finalString = searchString.concat(siteToCheck);
	
	alert(finalString);
	
}
