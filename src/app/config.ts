// Maze generation constants
// Path chance distribution: weighed chance array for the number of paths generated from a tile
export const pcd = [3];

// Isolated path chance: the chance that a path will get immediately surriounded by solid blocks
export const ipc = .5;

// Minimum number of fields that should be diggable.
// The algorithm will iterate until this number is met.
export const MINIMUMDIGGABLEFIELDS = 300;

// Number of powerups in each game. This number may be smaller,
// because the powerups are generated before the border and the centerpiece.
export const POWERUPS = 5;

// Initial number of AP for each player
export const INITIALAP = 4;

// Base chance of finding a song when digging. This number is modified
// by player stats (e.g. powerups, or earlier findings of songs).
export const SONGBASECHANCE = .1;

// Percentage of chance to find a song that is reduced when finding a song.
// This chance is divided between all other players.
export const CHANCEMODIFIER = .5;

// Delay between two turns, to prevent accidental movements for another player.
export const TURNDELAY = 500;

// Duration of the popup telling the player he can choose a song
export const SONGMODALTIME = 8000;

// Duration of the popup telling the players they are walking down
export const NEXTROOMTIME = 2000;

// FIXED CONSTANTS, DO NOT TOUCH
export const MAZEWIDTH         = 33;
export const MAZEHEIGHT        = 24;
export const SPRITESHEETWIDTH  = 64;
export const SPRITESHEETHEIGHT = 48;
export const TILEWIDTH         = 48;
export const TILEHEIGHT        = 48;
