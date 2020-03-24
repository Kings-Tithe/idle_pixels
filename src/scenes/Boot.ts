import { Keys, LevelMap } from './Levels';

/**
 * Handles initial startup of game. Loads absolutely basic resources such as
 * loading bar graphics. (for display when loading OTHER resources) Manages
 * any configurations needed when Phaser starts.
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
        // Add level scenes to the game object
        this.addLevels();
        // Start the next scene
        this.scene.start('LoadAssets');
    }

    /**
     * Adds all the levels from the Levels module to the phaser game object
     */
    addLevels() {
        for (let key of Keys) {
            this.scene.add(key, LevelMap[key], false);
        }
    }
}