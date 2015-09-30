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
		alert("This URL may be invalid please contact us at splatterapplabs@gmail.com if you believe this to be in error");
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
		alert("This url may be invalid. Please contact us at splatterapps@gmail.com if you belive this to be in error");
		return null;
	}
	
	var truncatedURL = URL.substring(0, slashIndex);
	return truncatedURL;
}

function convertFullURLToBaseSite(URL)
{
	var baseURL = removeSubDirectoriesFromURL(URL);
	
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

function checkScamAdvisorCurrent()	
{
	var baseSiteURL = "http://www.scamadviser.com/check-website/";
	chrome.tabs.query({'active': true}, function(tabs) {
	var currentURL=tabs[0].url;
	
	var siteToCheck = removeLeadingGarbageFromURL(currentURL);
	var finalString = baseSiteURL.concat(siteToCheck);
	chrome.tabs.create({"url":finalString,"active":true});
});
	
}

function checkCompeteCurrent()
{
	
	var baseSiteURL = "https://siteanalytics.compete.com/";
	
	chrome.tabs.query({'active': true}, function(tabs) {
	var currentURL = tabs[0].url;
	
	var siteToCheck = removeLeadingGarbageFromURL(currentURL);
	var finalString = baseSiteURL.concat(siteToCheck);
	chrome.tabs.create({"url":finalString,"active":true});
});
}

function checkDownForEveryoneCurrent()
{
	
	var baseSiteURL = "http://downforeveryoneorjustme.com/";
	
	chrome.tabs.query({'active': true}, function(tabs) {
	var currentURL = tabs[0].url;
	
	var siteToCheck = removeLeadingGarbageFromURL(currentURL);
	var finalString = baseSiteURL.concat(siteToCheck);
	chrome.tabs.create({"url":finalString,"active":true});
});
}

function checkSemRushCurrent()
{
	var baseSiteURL = "http://www.semrush.com/info/";
	
	chrome.tabs.query({'active': true}, function(tabs) {
	var currentURL = tabs[0].url;
	
	var siteToCheck = removeLeadingGarbageFromURL(currentURL);
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

