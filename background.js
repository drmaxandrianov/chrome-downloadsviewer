// New downloadable item created
chrome.downloads.onCreated.addListener(function(downloadItem) {
	$.post("http://downloads.pixelowner.com/ajax_add_downloads.php", { 
		action: "created",
		pc_hash: localStorage.pc_hash,
		download_id: downloadItem.id,  
		state: downloadItem.state, // "in_progress", "interrupted", "complete"
		url: downloadItem.url,  
		name: downloadItem.filename.replace(/^.*[\\\/]/, ''), //downloadItem.url.substring(downloadItem.url.lastIndexOf("/") + 1),  
		bytes_received: downloadItem.bytesReceived, 
		bytes_total: downloadItem.totalBytes,
		paused: downloadItem.paused
	} );
});

//http://downloads.pixelowner.com/ajax_add_downloads.php?action=created&pc_hash=123&download_id=1&state=in_progress&url='httplink'&name='filename'&bytes_received=10&bytes_total=100&paused=false
//http://downloads.pixelowner.com/ajax_add_downloads.php?action=changed&pc_hash=123&download_id=1&state=complete&url='httplink'&name='filename'&bytes_received=10&bytes_total=100&paused=false

// Downloadable item was changed
chrome.downloads.onChanged.addListener(function(downloadDelta) {
	$.post("http://downloads.pixelowner.com/ajax_add_downloads.php", { 
		action: "changed",
		pc_hash: localStorage.pc_hash,  
		download_id: downloadDelta.id,  
		state: (typeof downloadDelta.state != "undefined") ? downloadDelta.state.current : "", // "in_progress", "interrupted", "complete"
		url: (typeof downloadDelta.url != "undefined") ? downloadDelta.url.current : "",
		name: (typeof downloadDelta.filename != "undefined") ? downloadDelta.filename.current.replace(/^.*[\\\/]/, '') : "",
		bytes_received: "", 
		bytes_total: (typeof downloadDelta.totalBytes != "undefined") ? downloadDelta.totalBytes.current : "",
		paused: (typeof downloadDelta.paused != "undefined") ? downloadDelta.paused.current : ""
	} );
} );

// Update downloaded size for each item, which is downloading now (repeat each X seconds)
setInterval(updateDownload, 5000);
function updateDownload() {
	chrome.downloads.search({state: "in_progress"}, function(items) {
		for (ind in items) {
			if (items[ind].state != "in_progress") continue;
			console.log(items[ind].totalBytes);
			$.post("http://downloads.pixelowner.com/ajax_add_downloads.php", { 
				action: "changed",
				pc_hash: localStorage.pc_hash,  
				download_id: items[ind].id,  
				state: items[ind].state, // "in_progress", "interrupted", "complete"
				url: "",
				name: items[ind].filename.replace(/^.*[\\\/]/, ''),
				bytes_received: items[ind].bytesReceived, 
				bytes_total: items[ind].totalBytes,
				paused: ""
			} );
		}
	});	
}

