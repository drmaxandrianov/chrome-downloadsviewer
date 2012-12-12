$('document').ready(function() {
    if (localStorage.pc_hash == undefined) {
		$("#pc_hash").html("Retrieving personal PC hash...");
		$.get("http://downloads.pixelowner.com/ajax_add_computer.php")
			.success(function(data) { 
				localStorage.pc_hash = data;
				$("#pc_hash").html("Your personal PC hash is " + localStorage.pc_hash);
			})
			.error(function() { 
				$("#pc_hash").html("Can not connect to server. " +
									"Try to reopen this extension (click on icon above)." +
									"If problem repeats then check Internet connection");
			});
	} else {
		$("#pc_hash").html("Your personal PC hash is " + localStorage.pc_hash);
	}
	$('#qrcode').qrcode({width: 300,height: 300,text: "http://downloads.pixelowner.com/index.php?pc_hash=" + localStorage.pc_hash});
});