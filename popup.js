$('document').ready(function() {
    if (localStorage.pc_hash == undefined) {
		$("#pc_hash").html("Retrieving personal PC hash...");
		$.get("http://downloads.pixelowner.com/ajax_add_computer.php")
			.success(function(data) { 
				localStorage.pc_hash = data;
				$("#pc_hash").html("Your personal PC hash is " + localStorage.pc_hash);
				$('#qrcode').qrcode({width: 300,height: 300,text: "http://downloads.pixelowner.com/index.php?pc_hash=" + localStorage.pc_hash});
				$('#visit_button').attr("href", "http://downloads.pixelowner.com/index.php?pc_hash=" + localStorage.pc_hash);
			})
			.error(function() { 
				$("#qrcode").html("Can not connect to server. " +
									"Try to reopen this extension (click on icon above)." +
									"If problem repeats then check Internet connection");
			});
	} else {
		$("#pc_hash").html("Your personal PC hash is " + localStorage.pc_hash);
		$('#qrcode').qrcode({width: 300,height: 300,text: "http://downloads.pixelowner.com/index.php?pc_hash=" + localStorage.pc_hash});
		$('#visit_button').attr("href", "http://downloads.pixelowner.com/index.php?pc_hash=" + localStorage.pc_hash);
	}
	
	// Make button clickable
	$('#visit_button').click(function(){
		chrome.tabs.create({url: $(this).attr('href')});
		return false;
	});
});

$('#options_link').click(function() {
	chrome.tabs.create({url: 'options.html'});
});