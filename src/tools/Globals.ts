/**
 * LEVELS is a list of Level scenes' keys. It is used for random level
 * selection when starting new levels. (we can't just use the phaser
 * list of scenes, because menus and similar also count as scenes)
 */
export var LEVELS = [];

/**
 * LOGGING marks whether we should print out some informational logs to
 * the console. We should still keep logging to a minimum even with
 * this set. Temporary debugging statements are okay, but if the
 * console is flooded then none of the logs help.
 */
export var LOGGING: boolean = true;

/**
 * DUMMY_FILES marks whether we should load in additional dummy files. 
 * This is helpful when testing progress-dependent UI elements, such as
 * loading bars.
 */
export var DUMMY_FILES: boolean = true;

/**
 * WHRATIO is the ratio of width to height. It can be used to scale
 * the width to the height by width*WHRATIO, or to scale the height
 * to the width with height/WHRATIO
 */
let w: number = window.innerWidth;
let h: number = window.innerHeight;
export var WHRATIO: number = w / h;

/**
 * VERTICAL determines if the game screen is vertical. This doesn't
 * exactly check if we're on mobile, but it does help to accomplish
 * competent scaling for mobile devices.
 */
export var VERTICAL: boolean = WHRATIO < 1 ? true : false;

/**
 * GAME_WIDTH and GAME_HEIGHT represent the recommended size of the game
 * canvas, adjusting based on the ratio of the screen.
 */
export var GAME_WIDTH: number = VERTICAL? 640 : Math.floor(640 * WHRATIO);
export var GAME_HEIGHT: number = VERTICAL? Math.floor(640 / WHRATIO) : 640;

/**
 * CENTER marks the logical center of the screen and is helpful for
 * positioning objects.
 */
interface Point { x: number, y: number }
export var CENTER: Point = {
    x: GAME_WIDTH / 2,
    y: GAME_HEIGHT / 2
};