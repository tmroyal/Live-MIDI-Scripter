-- You may define your own variables here

-- These are used for internal functions
-- overwriting will have poor effects
-- reading can be cool though
local current_tempo = 120 
local current_beats_measure = 4
local seconds_per_beat = 0.5
local current_held = {}

-- this method is called when metro is enabled
-- it is called at the interval specified
function metro_tick(bars, beat, fraction)
  -- play_note(60, 80, 50)
end

function noteon(number, vel)
  -- do things with incoming notes
end

function fdial(index, val)
end

function idial(index, val)
end

function toggle(index, val)
end

function chord_change()
  -- log(current_held)
end


-- Library
-- 
-- The below functions comprise a number of helper functions. Delete at 
-- your own risk.
--
local scheduled_cbs = {}
local cb_ind = 1

function schedule(cb, delay)
  scheduled_cbs[cb_ind] = cb
  send_delay(cb_ind, delay)
  cb_ind = cb_ind + 1
end

function scheduled(num)
  scheduled_cbs[num]()
  scheduled_cbs[num] = nil
end

function held_notes(...)
  if arg[1] ~= -1 then
    current_held = arg
  else
    current_held = {}
  end
  chord_change()
end

function tempochange(tempo)
  current_tempo = tempo 
  seconds_per_beat = 60/current_tempo
end

function timesigchange(num)
  current_beats_measure = num
end

function beatms(n_beats)
  return 1000*n_beats*seconds_per_beat
end

function play_note(number, vel, dur_ms)
    outlet(0, {'note', number, vel, dur_ms})
end

function send_delay(cb_ind, del)
  outlet(0, {'schedule', cb_ind, del })
end

function log(message)
  if message == nil or message == '' then
    message = '[nil]'
  end

  if type(message) == 'table' then
	table.insert(message, 1, 'log')
	if table.getn(message) == 1 then
		table.insert(message, 2, '[empty]')
	end
	outlet(0, message)
  else
  	outlet(0, {'log', message})
  end
end

