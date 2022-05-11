outlets = 1;

var tempo = 120;
var numerator = 4;
var denominator = 4;
var current_held = [];

var cb_ind = 0;
var scheduled_cbs = {};

var controller_cbs = {
	intdial: function(){},
	floatdial: function(){},
	toggle: function(){},
	button: function(){},
	noteon: function(){},
	chordchange: function(){},
	metrotick: function(){}
};

function idial(ind, val){
	controller_cbs.intdial(ind, val)
}

function fdial(ind, val){
	controller_cbs.floatdial(ind, val)

}

function buttons(n){
	controller_cbs.button(n);
}

function toggle(ind, val){
	controller_cbs.toggle(ind, val)
}

function tempochange(newtempo){
	tempo = newtempo;
}

function timesigchange(num, denom){
	numerator = num;
	denominator = denom;
}

function noteon(number, vel){
	controller_cbs.noteon(number, vel)
}

function metro_tick(bars, beat, fraction){
	controller_cbs.metrotick(bars, beat, fraction)
}

function scheduled(ind){
	scheduled_cbs[ind]();
	delete scheduled_cbs[ind];
}

function held_notes(){
	var notes = Array.from(arguments);
	if (notes[0] == -1){
		current_held = [];
	} else {
		current_held = notes;
	}
}

var lib;

function loadbang(){
	var pref = jsarguments[1];	

	lib = new Global(pref+'lib');

	lib.register_cb = function(key, cb){

		controller_cbs[key] = cb;
	};

	lib.schedule = function(cb, delay){
		cb_ind++;
		scheduled_cbs[cb_ind] = cb;
		outlet(0, ['schedule', cb_ind, delay]);
	};

	lib.name_midi = function(name){
	  	var name_to_pc = { 
        	C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11
    	};
    	var letter = name[0];
    	var pc = name_to_pc[letter.toUpperCase()];
    
    	var mod_to_trans = { 'b': -1, '#': 1 };
    	var mod = name[1];
    	var trans = mod_to_trans[mod] || 0;
    
    	pc += trans;
    
    	var octave = parseInt(name[name.length-1])
    	if (octave){
			post(octave);
        	return pc + (12*(octave+2));
    	} else {
        	// negative mod 12
        	return ((pc % 12) + 12) % 12;
    	}
    
    	return pc;
	};
	
	lib.make_note = function(note, vel, dur){
		outlet(0, ['note', note, vel, dur]);
	};

	lib.beat_ms = function(nbeats){
		return nbeats*(60/tempo)*1000;
	};

	lib.gettempo = function(){ return tempo;}
	lib.gettimesig = function(){ return [numerator, denominator]; }
	lib.getcurheld = function(){ return current_held; }

	lib.log = function(msg){
		msg = msg || '[empty]';
		if (Array.isArray(msg)){
			outlet(0, ['log', msg.join(',') || '[empty]' ]);
		} else {
			outlet(0, ['log', msg]);
		}
	}
}
