# Live MIDI Scripter

Scriptable arpeggiator and algorithmic generators for Ableton Live using Max for Live.

Options for scripting in Lua and JavaScript.

## Usage

This Max for Live plugin serves as a wrapper for the jit.gl.lua and js objects, allowing preset storage, 
file io, and some other basic functionality. Currently, this work is in a late alpha stage.

## Motivation

Max for Live is a fair "scripting" environment, but I wanted the ability to use text to express music. 

jit.gl.lua is rumored to run on the high priority queue in Max unlike the js object, but it cannot
handle libraries and there is no Global object as there is with the js object.

js is a very flexible object, but there may be latency due to it running on the low priority scheduler
in Max.

## Limitations

According Cycling74, [jit.gl.lua is no longer being maintained](https://cycling74.com/forums/ann-jit-gl-lua-beta-1). 

See above for js latency issues.

File IO with the Max scripting objects is limited. It is best to use autowatch and
and external editor.

Software is provided as is, without warranty.
