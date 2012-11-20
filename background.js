// --------------------------------------------
// Code, which operates with context mouse menu
// --------------------------------------------

// Initialise variables
arrayOfNotes = [];

// Function will be called, when menu is pressed
function menuItemClicked(info, tab) {
	arrayOfNotes = loadAllNotes();
	newNote();
	arrayOfNotes[getSelectedNote()].name = tab.title;
	arrayOfNotes[getSelectedNote()].body = info.selectionText;
	finalise();
}

// Function will be called, when menu is pressed
function menuItemClickedToLast(info, tab) {
	arrayOfNotes = loadAllNotes();
	arrayOfNotes[getSelectedNote()].body += "\n" + info.selectionText;
	finalise();
}

//Setting up the context menu
menuId = chrome.contextMenus.create({
	'type' : 'normal',
	'title' : 'Add to Mini Notepad',
	'contexts' : ['selection', 'link', 'editable'],
	'onclick' : menuItemClicked
	});
	
menuIdToLast = chrome.contextMenus.create({
	'type' : 'normal',
	'title' : 'Add to Mini Notepad (add to last edited note)',
	'contexts' : ['selection', 'link', 'editable'],
	'onclick' : menuItemClickedToLast
	});

function loadAllNotes() {
	var arrayOfNotes = readProperty("arrayOfNotes");
	if (arrayOfNotes == null) {
		arrayOfNotes = [];
		return arrayOfNotes;
	} else {
		arrayOfNotes = JSON.parse(arrayOfNotes);
		return arrayOfNotes;
	}
}

function newNote() {
	var id = getNumberOfNotes();
	arrayOfNotes[id] = {"name": "", "body": ""};
	setSelectedNote(id);
	finalise();
}

function finalise() {
	storeAllNotes();	
}

function storeAllNotes() {
	writeProperty("arrayOfNotes", JSON.stringify(arrayOfNotes));
}
