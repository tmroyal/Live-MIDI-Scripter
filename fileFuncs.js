outlets = 5

var SCRIPT_OUT = 0
var PRINT_OUT = 1
var ERROR_OUT = 2
var FILENAME_OUT = 3
var DIALOG_OUT = 4

var storedPath;
var defaultFilePath = '';
var initFinished = false;

var defaultFile = jsarguments[1] || 'LuaLiveScripterDefault.lua';
var loadMsg = (jsarguments[2] || 'LuaLiveScripter');

// initialization
function storedfile(path){
	if (path && path !== 'null' && path !== 0){
		if (!initFinished && path !== storedPath){
			openpath(path);
			initFinished = true;
		} 
		storedPath = path;
	}
}

function patcherpath(path){
	patcherPath = path;
	defaultFilePath = patcherPath +  defaultFile;
	if (!fileExists(defaultFilePath)){
		showError('Default file does not exist');
	}
}

function startup(){
	messageOut(loadMsg);
	messageOut('----');
}

// ui functions

function createfile(){
	initFinished = true;
	createNew();
}

function copyto(){
	initFinished = true;

	if (storedPath){
		copyCurrent();
	} else {
		createNew();
	}
}

function openfile(){
	initFinished = true;

	openExisting();
}

// ------- File Functions

function createNew(){	
	showDialog('showcreate');
}

function createpath(path){
	var copyerror = copyFile(defaultFilePath, path);
	
	if (copyerror){
		showError(copyerror);
		return;
	}
	readScript(path);
	storePath(path);
	messageOut('File created '+path);	
}

function copyCurrent(){
	if (!storedPath){
		showError('No file open to copy. Click create or open.');
		return;
	}
	showDialog('showcopy');
}

function copytopath(path){
	if (storedPath == path){ return; }
		
	var copyerror = copyFile(storedPath, path);
	if (copyerror){
		showError(copyerror);
		return;
	}
	
	messageOut('File opened' + path);
	readScript(path);
	storePath(path);
}

function openExisting(){
	showDialog('showopen');
}

function openpath(path){
	if(fileExists(path)){
		readScript(path);
		storePath(path);
		messageOut('File opened'+ path);
	} else {
		showError('File does not exist: ' + path);
	}
}

// print path

function ppath(){
	if (!storedPath){
		messageOut('No stored path');
	} else {
		messageOut(storedPath);
	}
}

//------- Outlet functions


function messageOut(msg){
	outlet(PRINT_OUT, msg);
}

function showDialog(route){
	outlet(DIALOG_OUT, route);
}

function showError(msg){
	outlet(ERROR_OUT, msg);
}

function storePath(path){
	storedPath = path;
	outlet(FILENAME_OUT, path);
}

function readScript(path){
	outlet(SCRIPT_OUT, path);
}


// ------- file functions

function fileExists(path){
	var file =  new File(path, 'read');
	file.open();
	var res = file.isopen;
	file.close();
	return res;
}


// returns error if unsuccessful, otherwise, undefined
function copyFile(fromPath, toPath){
	if (fileExists(toPath)){
		return 'Cannot overwrite existing file';
	}
	
	var fromFile = new File(fromPath, "read");
	
	fromFile.open();
	if (!fromFile.isopen){ return 'failed to open ' + fromPath; }
		
	try {
		var ffCont = fromFile.readstring(9999);
	} catch (e){
		fromFile.close();
		return 'failed to read ' + fromPath;
	}
	
	var toFile = new File(toPath, "write");

	toFile.open();
	if (!toFile.isopen){ 
		fromFile.close();
		return 'cannot open ' +  toPath; 
	}
		
	try {
		toFile.writestring(ffCont);
	} catch (e) {
		toFile.close();
		fromFile.close();
		return 'failed to write ' + toPaath;
	}
	
	toFile.close();
	fromFile.close();
}

