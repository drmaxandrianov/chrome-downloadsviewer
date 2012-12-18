// ----------------------------------------
// Checkings for enable/disable sync status
// ----------------------------------------

$('#syncDisable').click(function() {
	$('#password').attr('disabled', 'disabled');
});

$('#syncEnable').click(function() {
	$('#password').removeAttr('disabled');
});

$('#syncDisable').attr('checked', function() {
	$('#password').attr('disabled', 'disabled');
});
