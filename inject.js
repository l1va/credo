
(function() {
	var articles = document.body.getElementsByClassName('gs_ri');
	console.log(articles.length);
	for (var i = 0; i < articles.length; i++) {
		let button = document.createElement('a');
		button.className = "credo_button";
		button.innerHTML = "EndNote and SciHub";
	    button.addEventListener('click', onClick(articles[i]));
	    var whereAdd = articles[i].getElementsByClassName('gs_fl')[0] 
	    whereAdd.appendChild(button);
}})();

function onClick(article) {
    return function() {
    	downloadSciHub(article);
    	downloadEndNote(article);
    };
}

function downloadEndNote(article) {
 	var citeLink = article.getElementsByClassName('gs_or_cit gs_nph')[0] 
        citeLink.click(); // open Cite window
        setTimeout(function(){
	        var elementExists = document.getElementById("gs_citi");
	        if (!!elementExists) {
	         	var endNoteLink = elementExists.children[1].href; // 1 for EndNote
	         	console.log("endNoteLink: "+ endNoteLink);
	         	window.open(endNoteLink,"_self"); //download
	        }
	        document.getElementById("gs_cit-x").click(); //close Cite window
    	},500); //ms to show window, need to be encreased if not working 
}

function downloadSciHub(article) {
	var sciHubLink = 'https://sci-hub.tw/';
	var articleLink = article.getElementsByTagName('a')[0].href
    console.log("sciHubLink: "+sciHubLink + articleLink);
	httpGetAsync(sciHubLink + articleLink)
}

function httpGetAsync(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
			var parser = new DOMParser();
			var doc = parser.parseFromString(xmlHttp.responseText, "text/html");
			pdfLink = doc.getElementById("pdf").src;
			console.log("pdfLink: "+pdfLink);
			window.open(pdfLink,"_blank"); //download
		}
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}
