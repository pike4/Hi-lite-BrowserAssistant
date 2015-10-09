//Placeholder method for context items.
function throwHiBriteAlert()
{
	alert("Sorry! That feature has not yet been implemented. Check back later for new updates.");
}

/* Simple test function. Opens a new google.com tab. Will be removed in a later update. */
function openNewTabGoogle()
{
	chrome.tabs.create({"url":"http://www.google.com","active":true});
}

/* Parses the given URL and removes anything in front of the site name (http://, www.) so that it can be passed to searched by the web service. */
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
		return "i";
	}
	return(URL);
	
}

//Alerts the user that the URL is invalid and returns i so that the parent function can be exited
function checkIfValidURL(URL)
{
	if(URL == "i")
	{
		alert("This URL may not represent a page hosted on the internet. Please contact us at splatterapplabs@gmail.com \n if you believe this to be in error. This action will not work for pages such as your history or extensions pages.");
		return "i";
	}
}

/* Parses the given URL and removes any lower level pages so that only the main site is returned */
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
		return "i";
	}
	
	var truncatedURL = URL.substring(0, slashIndex);
	return truncatedURL;
}

/* Combines the leading garbege and subdirectory functions to allow the specified web service to perorm a search. */
function convertFullURLToBaseSite(URL)
{
	var baseURL = removeSubDirectoriesFromURL(URL);
	
	if(baseURL == "i")
		return "i";
	
	baseURL = removeLeadingGarbageFromURL(baseURL);
	return baseURL;
}


var passingString = "";

var title = "Hi-Brite Actions";
var contexts = ["page","selection","link","image","video","audio"];

var clipConverterCurrent = 'a';

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
var scamAdvisorReport = chrome.contextMenus.create({"title":"Is this link safe?","parentId":linkParent,"contexts":["link"], "onclick": checkScamAdvisorLink});
var downForEveryoneReport = chrome.contextMenus.create({"title":"Is This Site Down?", "parentId":linkParent,"contexts":["link"],"onclick":checkDownForEveryOneLink});
var siteTrafficReport = chrome.contextMenus.create({"title": "View Site Traffic", "parentId": linkParent, "contexts":["link"], "onclick": checkCompeteLink});
var semRushReport = chrome.contextMenus.create({"title": "Advanced Info", "parentId":linkParent,"contexts":["link"],"onclick":checkSemRushLink});

//TODO: Context Items for videos
//TODO: Clipconverter link

/*Creates a video download context item if the current page is youtube*/
chrome.tabs.query({'active': true}, function(tabs)
{
	var currentURL = tabs[0].url;

	if(convertFullURLToBaseSite(currentURL) == "youtube.com" && currentURL.indexOf("watch") > -1 )
	{
		clipConverterCurrent = chrome.contextMenus.create({"title":"Download this video", "contexts":["page"],"onclick":downloadYoutubeVideoCurrent});
	}
});

//TODO: Convert current youtube video to MP3

chrome.tabs.onActivated.addListener(addOrRemoveRelevantItems);
chrome.tabs.onUpdated.addListener(addOrRemoveRelevantItems);

//TODO: Context Items for selections
//Search for the selected text
//Add contact
//

/* Opens a SemRush link with advanced info on the selected link */
function checkSemRushLink(info, tab)
{
	var baseSiteURL = "http://www.semrush.com/info/";
	var siteToCheck = convertFullURLToBaseSite(info.linkUrl);
	var searchString = baseSiteURL.concat(siteToCheck);
	chrome.tabs.create({"url":searchString, "active": true});
}

/*Opens a Compete.com link with traffic info on the selected link */
function checkCompeteLink(info, tab)
{
	var baseSiteURL = "https://siteanalytics.compete.com/";
	var siteToCheck = convertFullURLToBaseSite(info.linkUrl);
	var searchString = baseSiteURL.concat(siteToCheck);
	chrome.tabs.create({"url":searchString, "active": true});
}

/*Opens a ScamAdvisor Link with safety info on the current page */
function checkScamAdvisorLink(info, tab)
{
	var baseSiteURL = "http://www.scamadviser.com/check-website/";
	var siteToCheck = convertFullURLToBaseSite(info.linkUrl);
	var searchString = baseSiteURL.concat(siteToCheck);
	
	chrome.tabs.create({"url":searchString, "active": true});
}

/*Opens a DownForEveryoneLink to check if the site represented by the selected link is down */
function checkDownForEveryOneLink(info, tab)
{
	var baseSiteURL = "http://downforeveryoneorjustme.com/";
	var siteToCheck = convertFullURLToBaseSite(info.linkUrl);
	var searchString = baseSiteURL.concat(siteToCheck);
	
	chrome.tabs.create({"url": searchString, "active": true});
}

/*Opens a scam advisor link with info on the current page */
function checkScamAdvisorCurrent()	
{
	var baseSiteURL = "http://www.scamadviser.com/check-website/";
	chrome.tabs.query({'active': true}, function(tabs) {
	var currentURL=tabs[0].url;
	
	var siteToCheck = convertFullURLToBaseSite(currentURL);
	//Return without creating a tab if convertFullURLToBaseSite indicates that the URL is invalid
	if(checkIfValidURL(siteToCheck) == "i")
	{
		return;
	}
	var finalString = baseSiteURL.concat(siteToCheck);
	chrome.tabs.create({"url":finalString,"active":true});
});
	
}

/*Opens a compete link with traffic info on the current page */
function checkCompeteCurrent()
{
	
	var baseSiteURL = "https://siteanalytics.compete.com/";
	
	chrome.tabs.query({'active': true}, function(tabs) {
	var currentURL = tabs[0].url;
	
	var siteToCheck = convertFullURLToBaseSite(currentURL);
	
	//Return without creating a tab if convertFullURLToBaseSite indicates that the URL is invalid
	if(checkIfValidURL(siteToCheck) == "i")
	{
		return;
	}
	
	var finalString = baseSiteURL.concat(siteToCheck);
	chrome.tabs.create({"url":finalString,"active":true});
});
}

/*Opens a down for Everyone link to see if the current page is down */
function checkDownForEveryoneCurrent()
{
	var baseSiteURL = "http://downforeveryoneorjustme.com/";
	
	chrome.tabs.query({'active': true}, function(tabs) {
	var currentURL = tabs[0].url;
	
	var siteToCheck = convertFullURLToBaseSite(currentURL);
	
	
	//Return without creating a tab if convertFullURLToBaseSite indicates that the URL is invalid
	if(checkIfValidURL(siteToCheck) == "i")
	{
		return;
	}
	
	
	
	
	var finalString = baseSiteURL.concat(siteToCheck);
	chrome.tabs.create({"url":finalString,"active":true});
});
}

/*Opens a SemRush link with advanced info on the current page */
function checkSemRushCurrent()
{
	var baseSiteURL = "http://www.semrush.com/info/";
	
	chrome.tabs.query({'active': true}, function(tabs) {
	var currentURL = tabs[0].url;
	
	var siteToCheck = convertFullURLToBaseSite(currentURL);
	
	//Return without creating a tab if convertFullURLToBaseSite indicates that the URL is invalid
	if(checkIfValidURL(siteToCheck) == "i")
	{
		return;
	}
	
	var finalString = baseSiteURL.concat(siteToCheck);
	chrome.tabs.create({"url":finalString,"active":true});
});
}

/* Performs a reverse image search on TinEye for the selected image. Work in progress */
function searchTinEye(info, tab)
{
	alert("A");
	passingString = info.srcUrl;
	alert(passingString);
	chrome.tabs.create({"url":"https://www.tineye.com/","active":true}, function(tabs){
	chrome.tabs.executeScript({"file":"TinyEyeSearch.js"});
	});
}

/*Checks if the current page is youtube and updates the relevant context item accordingly */
function addOrRemoveRelevantItems()
{		
		chrome.tabs.query({'active': true}, function(tabs)
		{
			var currentURL = tabs[0].url;
			
			if(convertFullURLToBaseSite(currentURL).indexOf("youtube") > -1 && currentURL.indexOf("watch") > -1 && clipConverterCurrent == 'a')
			{
				clipConverterCurrent = chrome.contextMenus.create({"title":"Download this video", "contexts":["page"],"onclick":downloadYoutubeVideoCurrent});
			}
			
			else if(!(convertFullURLToBaseSite(currentURL).indexOf("youtube.com") > -1) || !(currentURL.indexOf("watch") > -1))
			{
				chrome.contextMenus.remove(clipConverterCurrent);
				clipConverterCurrent = 'a';
			}
				
			
		});
		
		

}
 
/*Downloads the youtube video on the current page TODO: savefrom.net */
function downloadYoutubeVideoCurrent()
{
	var baseSiteURL = "http://www.ss"
	
	chrome.tabs.query({'active': true}, function(tabs) {
	var currentURL = tabs[0].url;
	
	var finalString = baseSiteURL + removeLeadingGarbageFromURL(currentURL);
	alert(finalString);
	//Return without creating a tab if convertFullURLToBaseSite indicates that the URL is invalid
	
	alert("still running");
	
	chrome.tabs.create({"url":finalString,"active":true});
});
}

function convertYoutubeVideoToMP3Current()
{
	
	
}
