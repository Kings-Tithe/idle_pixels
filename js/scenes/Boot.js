/**Handles initial startup of game. Loads absolutely basic resources such as
 * loading bar graphics. (for display when loading OTHER resources) Manages
 * any configurations needed when Phaser starts. Also creates global variables
 * during construction by accessing the JavaScript 'window' object. */
class Boot extends Phaser.Scene {

    /**Creates instance of Scene */
    constructor() {
        super('Boot');
    }

    /**Phaser.Scene method which represents the start of the Scene's behavior.
     * It runs after init() and preload() have completed */
    create() {
        // Declare any globals to be used in our game
        this.declareGlobals();
        // Start the next scene
        this.scene.start('LoadScripts');
    }

    /**Declare global variables to be used in other parts of the game */
    declareGlobals() {
        window.LEVELS = [];
        /**LOGGING marks whether we should print out some informational logs to
         * the console. We should still keep logging to a minimum even with
         * this set. Temporary debugging statements are okay, but if the
         * console is flooded then none of the logs help. */
        window.LOGGING = true;
        /**DUMMY_FILES marks whether we should load in additional dummy files. 
         * This is helpful when testing progress-dependent UI elements, such as
         * loading bars. */
        window.DUMMY_FILES = false;
        /**WHRATIO is the ratio of width to height. It can be used to scale
         * the width to the height by width*WHRATIO, or to scale the height
         * to the width with height/WHRATIO */
        let w = window.innerWidth;
        let h = window.innerHeight;
        window.WHRATIO = w / h;
        /**VERTICAL determines if the game screen is vertical. This doesn't
         * exactly check if we're on mobile, but it does help to accomplish
         * competent scaling for mobile devices. */
        window.VERTICAL = window.WHRATIO < 1 ? true : false;
        /**CENTER marks the logical center of the screen and is helpful for
         * positioning objects. */
        window.CENTER = {
            x: this.game.scale.width / 2,
            y: this.game.scale.height / 2
        };
    }

}