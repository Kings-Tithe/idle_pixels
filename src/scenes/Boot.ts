/**
 * Handles initial startup of game. Loads absolutely basic resources such as
 * loading bar graphics. (for display when loading OTHER resources) Manages
 * any configurations needed when Phaser starts. Also creates global variables
 * during construction by accessing the JavaScript 'window' object.
 */
export class Boot extends Phaser.Scene {

    /**Creates instance of Scene */
    constructor() {
        super('Boot');
    }

    /**
     * Phaser.Scene method which represents the start of the Scene's behavior.
     * It runs after init() and preload() have completed
     */
    create() {
        // Start the next scene
        this.scene.start('LoadScripts');
    }

}