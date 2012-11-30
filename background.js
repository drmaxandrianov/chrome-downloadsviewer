chrome.downloads.onCreated.addListener(function(downloadItem) {
	$.post("http://downloads.pixelowner.com/ajax_add_downloads.php", { 
		download_id: downloadItem.id,  
		is_start: "true",  
		is_end: "false",  
		is_canceled: "false",  
		url: downloadItem.url,  
		name: downloadItem.url.substring(downloadItem.url.lastIndexOf("/")),  
		pc_hash: localStorage.pc_hash,  
		progress: 0 
	} );
});

chrome.downloads.onChanged.addListener(function(downloadDelta) {
	$.post("http://downloads.pixelowner.com/ajax_add_downloads.php", { 
		download_id: downloadDelta.id,  
		is_start: "false",  
		is_end: "false",  
		is_canceled: "false",  
		url: "",
		name: "",
		pc_hash: localStorage.pc_hash,  
		progress: downloadDelta.totalBytes 
	} );
} );