

(function() {
var elements = document.body.getElementsByClassName('gs_ri');
	console.log('count:' + elements.length);
	for (var i = 0; i < elements.length; i++) {
		let button = document.createElement('button');
		//var elements = document.body.getElementsByClassName('gs_or_cit gs_nph');
	    button.addEventListener('click', buttonHandler(elements[i]));
	    var whereAdd = elements[i].getElementsByClassName('gs_fl')[0] 
	    whereAdd.appendChild(button);
}})();

function buttonHandler(elem) {
    return function() {
        //console.log(elem);
        var citeLink = elem.getElementsByClassName('gs_or_cit gs_nph')[0] 
        citeLink.click();
        setTimeout(function(){
	        var elementExists = document.getElementById("gs_citi");
	        if (!!elementExists) {
	         	console.log("found"+ elementExists);
	         	elementExists.children[1].click(); // 1 because for EndNote
	         	setTimeout(function(){
	         		document.getElementById("gs_cit-x").click();
	         	},500);
	        }
    	},1000);
    	var articleLink = elem.getElementsByTagName('a')[0].href
    	console.log(articleLink);
    	httpGetAsync(articleLink);
    	console.log("fin");
    };
}


function httpGetAsync(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
    	console.log("readyState="+xmlHttp.readyState);
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
			var parser = new DOMParser();
			var doc = parser.parseFromString(xmlHttp.responseText, "text/html");
			console.log(doc);
			var metas = doc.getElementsByTagName('meta'); 
			console.log(metas.length);
		    for (var i=0; i<metas.length; i++) { 
		        if (metas[i].getAttribute("name") == "citation_doi") { 
		      	   console.log("DOI=" + metas[i].getAttribute("content") );
		        } 
		    } 
		}
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

/*
https://sci-hub.tw/https://www.sciencedirect.com/science/article/pii/S0047248484710116

var sciHubPlugin = '0.0.9';

chrome.browserAction.onClicked.addListener(function(tab) {
	var url = 'https://sci-hub.tw/';
	if (tab.url.indexOf('sci-hub.') < 0
		&& tab.url.indexOf('scholar.google') < 0
		&& tab.url.indexOf('.') > 0)
			url = url + tab.url;
	chrome.tabs.create({'url': url}, function(tab) {
			var listener =
			chrome.webRequest.onBeforeSendHeaders.addListener(
			function(details) {
				details.requestHeaders.push({ name: "sci-hub-plugin", value: sciHubPlugin});
				chrome.webRequest.onBeforeSendHeaders.removeListener(listener);
				return {requestHeaders: details.requestHeaders};
			},
			{urls: [url], tabId: tab.id},
			["blocking", "requestHeaders"]);
		});	
});*/