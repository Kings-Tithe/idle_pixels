import * as Phaser from 'phaser';
import { px, py, scaleTo } from "../tools/PercentCoords"

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
    background: Phaser.GameObjects.Image;
    /** stores the image for the play button and has attached on-pointerdown functionality */
    playButton: Phaser.GameObjects.Image;
    //** Stores the image for the options button and has attached on-pointerdown functionality */
    optionsButton: Phaser.GameObjects.Image;
    //** Stores the image for the credits button and has attached on-pointerdown functionality */
    creditsButton: Phaser.GameObjects.Image;

    //Tweens
    //** Tween that takes playButton from the wizards staff to it's proper place */
    playButtonTween: Phaser.Tweens.Tween;
    //** Tween that takes optionsButton from the wizards staff to it's proper place */
    optionsButtonTween: Phaser.Tweens.Tween;
    //** Tween that takes playButton from the wizards staff to it's proper place */
    creditsButtonTween: Phaser.Tweens.Tween;

    /**
     * Phaser.Scene method which represents the start of the Scene's behavior.
     * It runs after init() and preload() have completed
     */
    create() {
        // setup the scene's background
        this.background = this.add.image(0, 0, "title");
        this.background.setOrigin(0, 0);
        this.background.scaleX = scaleTo(px(100),this.background.width);
        this.background.scaleY = scaleTo(py(100),this.background.height);

        // setup the play button
        this.playButton = this.add.sprite(px(50) - 145, py(50) + 110, "play");
        this.playButton.setScale(0);
        this.playButton.setOrigin(0.5, 0.5);
        this.playButton.setInteractive();
        //set the tween to move from the wizrds staff to it's proper place
        this.playButtonTween = this.tweens.add({
            targets: this.playButton,
            x: px(50),
            y: py(40),
            scaleX: scaleTo(190,this.playButton.width),
            scaleY: scaleTo(65,this.playButton.height),
            duration: 500,
            paused: false,
            yoyo: false,
            repeat: false,
        });
        //set on-pointerdown to change to maingame scene
        this.playButton.on("pointerdown", this.onPlay, this);

        // setup the options button
        this.optionsButton = this.add.sprite(px(50) - 145, py(50) + 110, "options")
        this.optionsButton.setScale(0);
        this.optionsButton.setOrigin(0.5, 0.5);
        this.optionsButton.setInteractive();
        //set on-pointerdown to change to Options scene
        this.optionsButton.on("pointerdown", function () {
            //this.scene.start("Options");
        }, this);
        //set tween to move the button from the wizrds staff to it's proper place
        this.optionsButtonTween = this.tweens.add({
            targets: this.optionsButton,
            x: px(50),
            y: py(40) + 90,
            scaleX: scaleTo(190,this.optionsButton.width),
            scaleY: scaleTo(65,this.optionsButton.height),
            duration: 500,
            paused: false,
            yoyo: false,
            repeat: false,
        });

        // setup the credits button
        this.creditsButton = this.add.sprite(px(50) - 145, py(50) + 110, "credits");
        this.creditsButton.setScale(0);
        this.creditsButton.setOrigin(0.5, 0.5);
        this.creditsButton.setInteractive();
        //set on-pointerdown to change to credits scene
        this.creditsButton.on("pointerdown", function () {
            this.scene.start("Credits");
        }, this);
        //set the tween to move from the wizrds staff to it's proper place
        this.creditsButtonTween = this.tweens.add({
            targets: this.creditsButton,
            x: px(50),
            y: py(40) + 180,
            scaleX: scaleTo(190,this.creditsButton.width),
            scaleY: scaleTo(65,this.creditsButton.height),
            duration: 500,
            paused: false,
            yoyo: false,
            repeat: false,
        });
    }

    /**
     * Play button loads previous game save data and relaunches the game
     * at the correct level/monster OR starts a new game at Slime Ranch.
     * (Currently, saves are not implemented. It just starts a new game.)
     */
    onPlay() {
        this.scene.start("SlimeRanch");
    }


}
