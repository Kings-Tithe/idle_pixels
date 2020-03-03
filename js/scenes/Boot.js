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
        // Change the game's logical size to match ratio
        this.resizeGame();
        // Start the next scene
        this.scene.start('LoadScripts');
    }

    /**Declare global variables to be used in other parts of the game */
    declareGlobals() {
        /**LOGGING marks whether we should print out some informational logs to
         * the console. We should still keep logging to a minimum even with
         * this set. Temporary debugging statements are okay, but if the
         * console is flooded then none of the logs help. */
        window.LOGGING = true;
        /**DUMMY_FILES marks whether we should load in additional dummy files. 
         * This is helpful when testing progress-dependent UI elements, such as
         * loading bars. */
        window.DUMMY_FILES = false;
        /**VERTICAL determines if the game screen is vertical. This doesn't
         * exactly check if we're on mobile, but it does help to accomplish
         * competent scaling for mobile devices. */
        window.VERTICAL = false;
        /**WHRATIO is the ratio of width to height. It can be used to scale
         * the width to the height by width*WHRATIO, or to scale the height
         * to the width with height/WHRATIO */
        window.WHRATIO = 1;
    }

    /**Resize the game's logical size (not just scaling) to match the ratio
     * of the window. Will be of the form 640xH or Wx640. Then the scale
     * manager will ensure it actually matches the full size. */
    resizeGame() {
        // Get the window size and ratio of width to height
        let w = window.innerWidth;
        let h = window.innerHeight;
        window.WHRATIO = w / h;
        // Determiine if the window is vertical (mobile, usually) or horizontal
        window.VERTICAL = window.RATIO < 1 ? true : false;
        // Logical resize of game based on vertical/horizontal and ratio
        if (window.VERTICAL) {
            // The ratio is < 1, so to scale height up we divide by it
            this.game.scale.setGameSize(32, Math.floor(32 / window.WHRATIO));
        } else {
            // The ratio is > 1, so to scale width up we multiply by it
            this.game.scale.setGameSize(Math.floor(32 * window.WHRATIO), 32);
        }
    }

}