function throwHiBriteAlert()
{
	alert("Sorry! That feature has not yet been implemented. Check back later for new updates.");
}

function openInfoPage()
{
	chrome.tabs.create({"url":"http://www.google.com","active":true});
}


function removeLeadingGarbageFromURL(URL)
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
			return URL.substring(URL.indexOf("http://")+7);
		}
		
	}
	
	else	
	{	
		alert("This URL may not represent a page hosted on the internet. Please contact us at splatterapplabs@gmail.com \n if you believe this to be in error");		
		return "i";
	}
	return(URL);
	
}

function removeSubDirectoriesFromURL(URL)
{
	var wwwIndex = URL.indexOf("www.");
	var httpIndex = URL.indexOf("http://");
	var httpsIndex = URL.indexOf("https://");
	
	if(wwwIndex >= 0)
		var slashIndex = URL.indexOf("/",wwwIndex);
	else if(httpIndex >=0)
		var slashIndex = URL.indexOf("/", httpIndex + 7);
	else if(httpsIndex >=0 )
		var slashIndex = URL.indexOf("/", httpsIndex + 8);
	else
	{
		alert("This URL may not represent a page hosted on the internet. Please contact us at splatterapplabs@gmail.com \n if you believe this to be in error");
		return "i";
	}
	
	var truncatedURL = URL.substring(0, slashIndex);
	return truncatedURL;
}

function convertFullURLToBaseSite(URL)
{
	var baseURL = removeSubDirectoriesFromURL(URL);
	
	if(baseURL == "i")
		return "i";
	
	baseURL = removeLeadingGarbageFromURL(baseURL);
	return baseURL;
}




var title = "Hi-Brite Actions";
var contexts = ["page","selection","link","image","video","audio"];

//Parent Items
var currentPageParent = chrome.contextMenus.create({"title": "Current Page Info", "contexts":["page"]});
var selectionParent = chrome.contextMenus.create({"title": "Google this","contexts":["selection"]});
var imageParent = chrome.contextMenus.create({"title": "Reverse Image Search","contexts":["image"]});
var linkParent = chrome.contextMenus.create({"title": "Link Info","contexts":["link"]});


//Context items for current page
var currentPageSiteTrafficeport = chrome.contextMenus.create({"title": "View Current Page Traffic Report","parentId": currentPageParent, "contexts":["page"],"onclick":checkCompeteCurrent});
var currentPageScamAdvisorReport = chrome.contextMenus.create({"title": "Is this site legit?","parentId":currentPageParent, "contexts":["page"],"onclick":checkScamAdvisorCurrent});
var currentPageSemRushReport = chrome.contextMenus.create({"title": "Advanced Page Info","parentId":currentPageParent, "contexts":["page"],"onclick":checkSemRushCurrent});
var currentPageDownForEveryOneReport = chrome.contextMenus.create({"title": "Is This Page Down?","parentId":currentPageParent, "contexts":["page"],"onclick":checkDownForEveryoneCurrent});

//Context Items for Images
var reverseImageSearch = chrome.contextMenus.create({"title": "Reverse Image Search on TinEye", "parentId":imageParent, "contexts": ["image"], "onclick":searchTinEye});
	
	
//Context items for links
var siteTrafficReport = chrome.contextMenus.create({"title": "View Site Traffic", "parentId": linkParent, "contexts":["link"], "onclick": checkCompeteLink});
var scamAdvisorReport = chrome.contextMenus.create({"title":"Is this link safe?","parentId":linkParent,"contexts":["link"], "onclick": checkScamAdvisorLink});
var downForEveryoneReport = chrome.contextMenus.create({"title":"Is This Site Down?", "parentId":linkParent,"contexts":["link"],"onclick":checkDownForEveryOneLink});
var semRushReport = chrome.contextMenus.create({"title": "Advanced Info", "parentId":linkParent,"contexts":["link"],"onclick":checkSemRushLink});

function checkSemRushLink(info, tab)
{
	var baseSiteURL = "http://www.semrush.com/info/";
	var siteToCheck = convertFullURLToBaseSite(info.linkUrl);
	var searchString = baseSiteURL.concat(siteToCheck);
	chrome.tabs.create({"url":searchString, "active": true});
}

//Opens a Compete.com link with traffic info on the selected link
function checkCompeteLink(info, tab)
{
	var baseSiteURL = "https://siteanalytics.compete.com/";
	var siteToCheck = convertFullURLToBaseSite(info.linkUrl);
	var searchString = baseSiteURL.concat(siteToCheck);
	chrome.tabs.create({"url":searchString, "active": true});
}

//Opens a ScamAdvisor Link with safety info on the current page
function checkScamAdvisorLink(info, tab)
{
	var baseSiteURL = "http://www.scamadviser.com/check-website/";
	var siteToCheck = convertFullURLToBaseSite(info.linkUrl);
	var searchString = baseSiteURL.concat(siteToCheck);
	
	chrome.tabs.create({"url":searchString, "active": true});
}

//Opens a DownForEveryoneLink to check if the site represented by the selected link is down.
function checkDownForEveryOneLink(info, tab)
{
	var baseSiteURL = "http://downforeveryoneorjustme.com/";
	var siteToCheck = convertFullURLToBaseSite(info.linkUrl);
	var searchString = baseSiteURL.concat(siteToCheck);
	
	chrome.tabs.create({"url": searchString, "active": true});
}
//Opens a scam advisor link with info on the current page
function checkScamAdvisorCurrent()	
{
	var baseSiteURL = "http://www.scamadviser.com/check-website/";
	chrome.tabs.query({'active': true}, function(tabs) {
	var currentURL=tabs[0].url;
	
	var siteToCheck = convertFullURLToBaseSite(currentURL);
	if(siteToCheck == "i")
		return;
	var finalString = baseSiteURL.concat(siteToCheck);
	chrome.tabs.create({"url":finalString,"active":true});
});
	
}

//Opens a compete link with traffic info on the current page
function checkCompeteCurrent()
{
	
	var baseSiteURL = "https://siteanalytics.compete.com/";
	
	chrome.tabs.query({'active': true}, function(tabs) {
	var currentURL = tabs[0].url;
	
	var siteToCheck = convertFullURLToBaseSite(currentURL);
	
	//Return without creating a tab if convertFullURLToBaseSite indicates that the URL is invalid
	if(siteToCheck == "i")
		return;
	
	var finalString = baseSiteURL.concat(siteToCheck);
	chrome.tabs.create({"url":finalString,"active":true});
});
}

//Opens a down for Everyone link to see if the current page is down
function checkDownForEveryoneCurrent()
{
	var baseSiteURL = "http://downforeveryoneorjustme.com/";
	
	chrome.tabs.query({'active': true}, function(tabs) {
	var currentURL = tabs[0].url;
	
	var siteToCheck = convertFullURLToBaseSite(currentURL);
	
	//Return without creating a tab if convertFullURLToBaseSite indicates that the URL is invalid
	if(siteToCheck == "i")
		return;
	
	var finalString = baseSiteURL.concat(siteToCheck);
	chrome.tabs.create({"url":finalString,"active":true});
});
}

//Opens a SemRush link with advanced info on the current page
function checkSemRushCurrent()
{
	var baseSiteURL = "http://www.semrush.com/info/";
	
	chrome.tabs.query({'active': true}, function(tabs) {
	var currentURL = tabs[0].url;
	
	var siteToCheck = convertFullURLToBaseSite(currentURL);
	
	//Return without creating a tab if convertFullURLToBaseSite indicates that the URL is invalid
	if(siteToCheck == "i")
		return;
	
	var finalString = baseSiteURL.concat(siteToCheck);
	chrome.tabs.create({"url":finalString,"active":true});
});
}

function searchTinEye(info, tab)
{
	alert("A");
	var linkToSend = info.srcUrl;
	alert(linkToSend);
	chrome.tabs.create({"url":"https://www.tineye.com/","active":true}, function(tabs){
	chrome.tabs.executeScript({"file":"TinyEyeSearch.js"});
	});
}

