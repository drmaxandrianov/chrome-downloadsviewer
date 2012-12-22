

// -------------
// Load settings
// -------------

$('document').ready(function() {
	if (localStorage.pc_hash != undefined) {
		$('#pc_hash').val(localStorage.pc_hash);
		$('#link_to_page').val("http://downloads.pixelowner.com/index.php?pc_hash=" + localStorage.pc_hash);
		$('#link_to_page_button').attr('href', "http://downloads.pixelowner.com/index.php?pc_hash=" + localStorage.pc_hash);
		
		if (localStorage.syncEnabled == "true") {
			$('#syncEnable').attr('checked', 'checked'); 
		} else {
			$('#syncDisable').attr('checked', 'checked');
			$('#password').attr('disabled', 'disabled');
		}
		
	} else {
		$('#firstOpenModel').modal();
	}
});

// -------------
// Save settings
// -------------

$('#save_button').click(function() {
	localStorage.syncEnabled = $('#syncEnable').attr('checked') == "checked";
	showSaveStatus(status);
});

function showSaveStatus(status) {

}


// ----------------------------------------
// Checkings for enable/disable sync status
// ----------------------------------------

$('#syncDisable').click(function() {
	$('#password').attr('disabled', 'disabled');
});

$('#syncEnable').click(function() {
	$('#password').removeAttr('disabled');
});
