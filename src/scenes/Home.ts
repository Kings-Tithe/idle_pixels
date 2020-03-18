import { PercentCoords } from "../tools/PercentCoords" 
/**
 * Works as a title screen once all the assets are loaded
 * allows the player to click 1 of 3 buttons: play, options, credits.
 * play takes the player into the actual game
 * options allows players to change game setting before getting into the actual game
 * credits allows the player to view a list of credits detailing all the conponets and who
 * they are credited to
 */

export class Home extends Phaser.Scene {


    /**Creates instance of Scene */
    constructor() {
        super('Home');
    }

    /**
     * Init is a Phaser Scene method that runs before any of the others. It can
     * be thought of like a sort of follow-up constructor that runs only once
     * the scene is actually being launched (instead of just being added to the
     * game object)
     */
    init() {
    }

}
