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
    spinningCoin: Phaser.GameObjects.Sprite;

    //animations
    coinSpinAnim: Phaser.Animations.Animation;

    /** 
     * inital creation of elements before they are passed for the first time
     * they will temporarly upon creation be attached to home but not visibly 
     * on screen, before being passed to the first level
     */
    constructor(scene: Scene) {
        //create golden coin counter
        this.coinText = new Phaser.GameObjects.Text(scene, 85, 0, "0", {
            fontSize: "100px",
            fontFamily: "Ariel",
            color: '#ffed70',
            align: "right",
            fontStyle: "bold"
        });
        this.coinText.setStroke("#a69a47", 8);

        //add spinning coin
        this.spinningCoin = new Phaser.GameObjects.Sprite(scene, -5, 10, "coin",0);
        this.spinningCoin.setScale(3, 3);
        this.spinningCoin.setOrigin(0,0);
        //create animation to make the coin spin
        let anim = scene.anims.create({
            key: "coinSpin",
            frames: scene.anims.generateFrameNumbers('coin', { start: 0, end: 4 }),
            frameRate: 8,
            repeat: -1
        });
        this.coinSpinAnim = anim ? anim : null;
    }

    /** used to link all elements to a new scene when entering the new scene */
    link(scene: Scene) {
        scene.add.existing(this.coinText)
        scene.add.existing(this.spinningCoin);
        this.spinningCoin.play("coinSpin");
    }


    updateCoinCounter(coins: number) {
        this.coinText.setText(coins.toLocaleString());
    }
}