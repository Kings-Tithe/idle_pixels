import { Scene } from 'phaser';

/** 
 * class used to store and handle the Hud elements on screen
 * Hud is passed from level to level along with the player's info
 * from the Player class, the Hud should be linked to the new scene
 * when switching scenes
 */

export class Hud {

    //member varibles

    //text
    /** Stores the phaser text object for the coin counter */
    coinText: Phaser.GameObjects.Text;

    //images
    spinningCoin: Phaser.GameObjects.Image;

    //animations
    coinSpinAnim: Phaser.Animations.Animation;

    /** 
     * inital creation of elements before they are passed for the first time
     * they will temporarly upon creation be attached to home but not visibly 
     * on screen, before being passed to the first level
     */
    constructor(scene: Scene) {
        //create golden coin counter
        this.coinText = new Phaser.GameObjects.Text(scene, 75, 0, "0", {
            fontSize: "100px",
            fontFamily: "Ariel",
            color: '#ffed70',
            align: "right",
            fontStyle: "bold"
        });
        this.coinText.setStroke("#a69a47", 8);

        //add spinning coin
        this.spinningCoin = new Phaser.GameObjects.Image(scene, 35, 50, "gold1");
        this.spinningCoin.setScale(.1, .1);
        //create animation to make the coin spin
        let anim = scene.anims.create({
            key: "coinSpin",
            frames: scene.anims.generateFrameNumbers('gold1', { start: 0, end: 0 }),
            frameRate: 25,
            repeat: -1
        });
        this.coinSpinAnim = anim ? anim : null;
        //this.spinningCoin.play("coinSpin");
        let test = new Phaser.GameObjects.Sprite(scene, 35, 50, "gold1");
        test.play('coinSpin');
    }

    /** used to link all elements to a new scene when entering the new scene */
    link(scene: Scene) {
        scene.add.existing(this.coinText)
    }


    updateCoinCounter(coins: number) {
        this.coinText.setText(coins.toLocaleString());
    }
}