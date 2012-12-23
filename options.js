

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
		
		$('#password').val(localStorage.syncPassword);
		
	} else {
		$('#firstOpenModel').modal();
	}
});

// -------------
// Save settings
// -------------

$('#save_button').click(function() {
	var status = true;
	var messageInError = "";
	var syncStatus = $('#syncEnable').prop('checked');
	var syncPassword = $('#password').val();
	if (syncStatus) {
		if (syncPassword == "") { 
			status = false;
			messageInError = "Password can not be empty for syncing. Please, set it up.";
		} else {
			localStorage.syncEnabled = syncStatus;
			localStorage.syncPassword = syncPassword;
		}
	} else {
		localStorage.syncEnabled = syncStatus;
		localStorage.syncPassword = syncPassword;
	}
	showSaveStatus(status, messageInError);
});

function showSaveStatus(success, messageInError) {
	if (success) {
		$('#save_status').html('<span class="label label-success">Successfully saved!</span>');
	} else {
		$('#save_status').html('<span class="label label-important">' + messageInError + '</span>');
	}
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
