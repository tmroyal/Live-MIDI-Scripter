# LiveLuaScripter
Lua Generative Music in Live

## Usage

This Max for Live plugin serves as a wrapper for the jit.gl.lua object, allowing preset storage, 
file io, and some other basic functionality. Currently, this work is in an alpha stage.

## Motivation

Max for Live is a fair "scripting" environment, but I wanted the ability to use text to express music. 

jit.gl.lua runs on the high priority queue in Max unlike the js object, which results in audible delays when used.

Node for Max has latency issues dealing with IPC. 

## Limitations

According to the creators of Max, [jit.gl.lua is no longer being maintained](https://cycling74.com/forums/ann-jit-gl-lua-beta-1). 
There are occasional bugs that are not being worked on, and important functionality (such as the ability to close files) is missing
from the plugin.

There are other strange bugs that occur dealing with file/io.
