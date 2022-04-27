outlets = 4

var script_out = 0
var error_out = 1
var init_out = 2
var filename_out = 3

var storedPath;

function newfile(path){
	var defaultFile = new File("LuaScripterDefault.lua", "read");
	
	defaultFile.open();
	if (!defaultFile.isopen){
		outlet(error_out, 'default lua file missing, reinstall');
		cancelbang();
		return;
	}
	
	var dfContents = defaultFile.readstring(9999);
	
	var outfile = new File(path, "write");
	
	outfile.open();
	if (!outfile.isopen){
		outlet(error_out, 'cannot write to this location');
		cancelbang();
		return;
	}
	
	outfile.writestring(dfContents);
	outfile.close();
	defaultFile.close();

	outlet(script_out, ['read', path]);
	outlet(filename_out, ['set', path]);
}


function openfile(path){
	outlet(script_out, ['read', path]);
	outlet(filename_out, ['set', path]);
}

function cancelbang(v){
	if (!storedPath){
		outlet(error_out, 'no stored filename');
	}
}

function storedfile(path){
	if (path === '<empty>'){
		outlet(init_out, 'bang');
	} else {
		storedPath = path;
		outlet(script_out, ['read', path]);
	}
}
