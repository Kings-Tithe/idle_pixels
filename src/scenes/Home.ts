import * as Phaser from 'phaser';
import { px,py } from "../tools/PercentCoords"

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

    //member varibles

    //images
    /** stores the background image for the scene */
    background: Phaser.GameObjects.Image = this.add.image(px(50), py(50), "title");
    /** stores the image for the play button and has attached onDown functionality */
    playButton: Phaser.GameObjects.Image = this.add.sprite(px(50) - 145, py(50) + 110, "play");

    //Tweens
    playButtonTween: Phaser.Tweens.Tween;

    /**
     * Phaser.Scene method which represents the start of the Scene's behavior.
     * It runs after init() and preload() have completed
     */
    create() {
        // setup the scene's background
        this.background.setOrigin(.5, .5);
        this.background.setScale(5.72, 5.26);

        // setup the play button
        this.playButton.setScale(0);
        this.playButton.setOrigin(0.5, 0.5);
        this.playButton.setInteractive();
        this.playButtonTween = this.tweens.add({
            targets: this.playButton,
            x: px(50),
            y: py(40),
            scaleX: 6,
            scaleY: 6,
            duration: 500,
            paused: false,
            yoyo: false,
            repeat: false,
        });
     this.playButton.on("pointerdown", function(){} ,this);
    }

}
