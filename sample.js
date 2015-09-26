function genericOnClick(info, tab) {
  console.log("item " + info.menuItemId + " was clicked");
  console.log("info: " + JSON.stringify(info));
  console.log("tab: " + JSON.stringify(tab));
}

function throwHiBriteAlert()
{
	alert("ERROR: HiBrite has crashed. Reason: is piece of shit");
}


var contexts = ["page","selection","link","editable","image","video","audio"];
var title = "AAAIDS";
var id = chrome.contextMenus.create({"title": title, "contexts":contexts,"onclick": throwHiBriteAlert});

