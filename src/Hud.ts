import { Scene } from 'phaser';
import { UShop } from './Ushop';
import { GAME_HEIGHT, GAME_WIDTH, CENTER } from './tools/Globals';
import { EasyColor } from './tools/EasyColor';
import { ShopMenu } from './ShopMenu';

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
    /** Stores the sprite for the little spinning coin next to the coin text */
    spinningCoin: Phaser.GameObjects.Sprite;
    /** Button that allows for the opening of the ushop */
    shopButton: Phaser.GameObjects.Sprite;


    //animations
    coinSpinAnim: Phaser.Animations.Animation;

    //upgrade Shop
    ushop: UShop;
    shop: ShopMenu;

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
        this.coinText.ignoreDestroy = true;
        //add spinning coin
        this.spinningCoin = new Phaser.GameObjects.Sprite(scene, -5, 10, "coin", 0);
        this.spinningCoin.setScale(3, 3);
        this.spinningCoin.setOrigin(0, 0);
        this.spinningCoin.ignoreDestroy = true;
        //create animation to make the coin spin
        let anim = scene.anims.create({
            key: "coinSpin",
            frames: scene.anims.generateFrameNumbers('coin', { start: 0, end: 4 }),
            frameRate: 8,
            repeat: -1
        });
        this.coinSpinAnim = anim ? anim : null;
        // //add the ushop
        this.ushop = new UShop;
        this.ushop.creationLink(scene);
        this.ushop.createUpgradeShop();

        // Creates a shop in the new level
        this.shop = new ShopMenu(scene);
    }

    /** used to link all elements to a new scene when entering the new scene */
    link(scene: Scene) {
        scene.add.existing(this.coinText)
        scene.add.existing(this.spinningCoin);
        this.spinningCoin.play("coinSpin");
        this.ushop.link(scene);

        this.shop.link(scene);
    }

    /** sets the graphical text coinCounter to match internal values */
    updateCoinCounter(coins: number) {
        this.coinText.setText(coins.toLocaleString());
    }

}