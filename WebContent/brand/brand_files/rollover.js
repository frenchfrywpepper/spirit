<!--

function newImage(arg) {
	if (document.images) {
		rslt = new Image();
		rslt.src = arg;
		return rslt;
	}
}

function changeImages() {
	if (document.images && (preloadFlag == true)) {
		for (var i=0; i<changeImages.arguments.length; i+=2) {
			document[changeImages.arguments[i]].src = changeImages.arguments[i+1];
		}
	}
}

var preloadFlag = false;
function preloadImages() {
	if (document.images) {
		subnavigation_01_over = newImage("images/subnavigation_01-over.jpg");
		subnavigation_02_over = newImage("images/subnavigation_02-over.jpg");
		subnavigation_03_over = newImage("images/subnavigation_03-over.jpg");
		subnavigation_04_over = newImage("images/subnavigation_04-over.jpg");
		subnavigation_05_over = newImage("images/subnavigation_05-over.jpg");
		subnavigation_06_over = newImage("images/subnavigation_06-over.jpg");
		preloadFlag = true;
	}
}

// -->