import { Scene } from 'phaser';
import { px, py } from '../../tools/PercentCoords';

export abstract class Level extends Scene {
    /**
     * Name displayed in the level's splash text
     */
    abstract name: string;
    /**
     * Key of the level's background image
     */
    abstract bg: string;
    /**
     * Monsters that this level uses
     */
    abstract monsters: Class[];
    /**
     * Monster this level uses as its boss.
     */
    abstract boss: Class;

    /**
     * Creates instance of Level scene
     * @param {String} sceneKey The key that Phaser uses to load this scene.
     */
    constructor(sceneKey) {
        super(sceneKey);
    }

    /**
     * Init is a Phaser Scene method that runs before any of the others. It can
     * be thought of like a sort of follow-up constructor that runs only once
     * the scene is actually being launched (instead of just being added to the
     * game object)
     * @param {{player: Player, stage: number}} levelData Object that contains
     *   data transferred between levels.
     */
    init() {
    }

    /**
     * Phaser.Scene method which represents the start of the Scene's behavior.
     * It runs after init() and preload() have completed
     */
    create() {
        // Create background image
        let bg = this.add.image(px(50), py(50), this.bg);
        bg.setScale(20);
    }

    /**
     * Creates a random monster from the monster list on the screen.
     */
    getRandMonster() {
    }

    /**
     * Switches either the monster or the level after a monster dies.
     */
    onMonsterDeath() {
    }

    /**
     * Starts the next level (ensuring that it is not the same level again)
     */
    nextLevel() {
    }

}
