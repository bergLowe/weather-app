// This file contains logic behind the UI of menu's underline on the site.

let anchorList = document.querySelector("#header").getElementsByTagName("a");
let selectedList = [];
for (let i = 0; i < anchorList.length; i++) {
	if (document.location.href.indexOf(anchorList[i].href) >= 0) {
		/*
		Everytime we go on different link,
		our server will go from root to other link.
		So everytime root link will be underlined. So to ignore
		that we are creating list and the first element pushed will
		be root link and then the real link. 
		*/
		// anchorList[i].className = "active";
		// console.log("Active: " + anchorList[i]);
		selectedList.push(anchorList[i]);
  	}
}

// Checks for the valid path. If an invalid path is specified, it will then attach active class
// to root link, to ignore that we check if root is called, then only root is attached with active.
if (selectedList[selectedList.length - 1].href.includes(document.location.pathname)) {
	selectedList[selectedList.length - 1].className = "active";
}
