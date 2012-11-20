// -----------------------------------------
// Functions for working with array of notes
// -----------------------------------------

// Get number of notes in the storage
function getNumberOfNotes() {
	return arrayOfNotes.length;
}

// Set selected note ID
function setSelectedNote(value) {
	writeProperty("selectedNote", value);
}

// Get last selected note ID
function getSelectedNote() {
	var selectedNote = readProperty("selectedNote");
	if (selectedNote == null) {
		selectedNote = 0;
		writeProperty("selectedNote", selectedNote);
	}
	return selectedNote;
}


// -----------------------------------------
// Functions for working with locale storage
// -----------------------------------------

// Read property value if exist, otherwise return null
function readProperty(property) {
	return localStorage[property];
}

// Write property
function writeProperty(property, value) {
	localStorage[property] = value;
}

// Initialise property with default value if it does not exist
function initProperty(property, defValue) {
	if(localStorage[property] == null) {
		localStorage[property] = defValue;
	}
}


// --------------------------
// Other additional functions
// --------------------------

// Function to make a GET request to any URL
function getFromURL(url, params) {
    var form = document.createElement('form');
    form.action = url;
    form.method = 'POST';

    for (var i in params) {
        if (params.hasOwnProperty(i)) {
            var input = document.createElement('input');
            input.type = 'hidden';
            input.name = i;
            input.value = params[i];
            form.appendChild(input);
        }
    }

    form.submit();
}

// Set selection range
function setSelectionRange(input, start, end) {
	if (arguments.length < 3)
        end = start;
    if ("selectionStart" in input)
    {
        setTimeout(function ()
        {
            input.selectionStart = start;
            input.selectionEnd = end;
        }, 1);
    }
    else if (input.createTextRange)
    {
        var rng = input.createTextRange();
        rng.moveStart("character", start);
        rng.moveEnd("character", end - input.value.length);
        rng.select();
    }
}

// Get caret position
function GetCursorPosition(input) {
	if ("selectionStart" in input && document.activeElement == input)
    {
        return input.selectionStart;
    }
    else if (input.createTextRange)
    {
        var sel = document.selection.createRange();
        var rng = input.createTextRange();
        if (rng.inRange(sel))
        {
            rng.setEndPoint("EndToStart", sel);
            return rng.text.length;
        }
    }
    return -1;
}

// Set caret position
function setCaretToPos (input, pos) {
	setSelectionRange(input, pos, pos);
}

// Convert all new lines to <br /> tag
function newLineToBrTag (text) {
	return text.replace(/\n\r?/g, '<br />');
}
