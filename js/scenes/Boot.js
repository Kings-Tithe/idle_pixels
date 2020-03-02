/**Handles initial startup of game. Loads absolutely basic resources such as
 * loading bar graphics. (for display when loading OTHER resources) Manages
 * any configurations needed when Phaser starts. Also creates global variables
 * during construction by accessing the JavaScript 'window' object. */
class Boot extends Phaser.Scene {

    /**Creates instance of Scene */
    constructor() {
        super('Boot');
    }

    create() {
        // Declare any globals to be used in our game
        this.declareGlobals();
        // Start the next scene
        this.scene.start('LoadScripts');
    }

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
    }

}