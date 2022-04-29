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

function scheduled(bars, beat, fraction)
  -- play_note(60, 80, 50)
  log('event')
  schedule(1000)
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

-- eg namemidi('C#4')
function namemidi(name)
  if string.len(name) < 2 then return 60 end

  name = string.lower(name)

  local notes = {
    c = 0, d = 2, e = 4, f = 5, g = 7, a = 9, b = 11
  }

  name = notes[string.sub(inNote,1,1)]
  mod = string.sub(inNote, 2, 2)
  oct = string.sub(inNote, -1, -1):match('^%-?%d+$')

  if name == nil then
    name = 0
  end

  if oct == nil then
    oct = 5
  else
    oct = tonumber(oct) + 1
  end

  if mod == '#' then
    name = name + 1
  elseif mod == 'b' then
    name = name - 1
  end

  return name + oct*12
end

function play_note(number, vel, dur_ms)
    outlet(0, {'note', number, vel, dur_ms})
end

function schedule(dur)
  outlet(0, {'schedule', dur})
end

function log(message)
  outlet(0, {'log', message})
end


