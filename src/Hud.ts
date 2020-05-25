import { Scene } from 'phaser';
import { UShop } from './Ushop';
import { GAME_HEIGHT, GAME_WIDTH, CENTER } from './tools/Globals';
import { EasyColor } from './tools/EasyColor';
import { ScrollablePanel } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
import { OptionsMenu } from './OptionsMenu';

/** 
 * class used to store and handle the Hud elements on screen
 * Hud is passed from level to level along with the player's info
 * from the Player class, the Hud should be linked to the new scene
 * when switching scenes
 */

export class Hud {

    //member varibles

    //numbers
    /** Used to keep track of the times update skull has been run to sync blinking frames */
    skullIconFrames: number = 0;

    //text
    /** Stores the phaser text object for the coin counter */
    coinText: Phaser.GameObjects.Text;
    // text
    killText: Phaser.GameObjects.Text;

    //images
    /** Stores the sprite for the little spinning coin next to the coin text */
    spinningCoin: Phaser.GameObjects.Sprite;
    /** image that is used to display the skull icons */
    skullImage: Phaser.GameObjects.Image;


    //animations
    coinSpinAnim: Phaser.Animations.Animation;

    //upgrade Shop
    ushop: UShop;

    //graghics
     /** Is the outside black container surrounding ProgressBar */
     progressContainer: Phaser.GameObjects.Graphics;
     /** Rendered within the container and used as a backgrounf for the progress bar */
     progressBackground: Phaser.GameObjects.Graphics;
     /** Shows the progression thru the level based on monster kills */
     progressBar: Phaser.GameObjects.Graphics;
     /** Stores an array of circular nodes representing killable monsters */
     monsterNodes: Phaser.GameObjects.Graphics[];

    /** 
     * inital creation of elements before they are passed for the first time
     * they will temporarly upon creation be attached to home but not visibly 
     * on screen, before being passed to the first level
     */
    constructor(scene: Scene) {
        //create the Upgrade Shop menu
        this.ushop = new UShop;
        this.ushop.creationLink(scene);
        this.ushop.createUpgradeShop();
        /**
         * create all the other hud elements, order is important here as some
         * base their position directly on other elements, connections listed below
         * spinning coin goes first 
         * coin counter is based on spinning coin
         * skull image is based on spinning coin
         * kill text is based on skull image and coin counter
         * progress is self contained and only based on the global game size so it goes last
         */
        this.createSpinningCoin(scene);
        this.createCoinCounter(scene);
        this.createSkull(scene);
        this.createKillText(scene);
        this.createProgressBar(scene);

        //set intervals
        setInterval(this.updateSkull.bind(this,scene), 100);
    }

    /** used to link all elements to a new scene when entering the new scene */
    link(scene: Scene) {
        this.ushop.link(scene);
        scene.add.existing(this.spinningCoin);
        scene.add.existing(this.coinText);
        scene.add.existing(this.skullImage);
        scene.add.existing(this.killText);
        scene.add.existing(this.progressContainer);
        scene.add.existing(this.progressBackground);
        scene.add.existing(this.progressBar);
        for(let i = 0; i < 10; i ++){
            scene.add.existing(this.monsterNodes[i]); 
        }
        this.spinningCoin.play("coinSpin");
    }

    // Spinning Coin functions --------------------

    createSpinningCoin(scene){
        //add spinning coin
        this.spinningCoin = new Phaser.GameObjects.Sprite(scene, 10, GAME_HEIGHT - 65, "coin", 0);
        this.spinningCoin.setScale(2);
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
    }

    // Coin Text functions --------------------

    createCoinCounter(scene){
        //create golden coin counter
        this.coinText = new Phaser.GameObjects.Text(scene, this.spinningCoin.x + 70, this.spinningCoin.y - 2, "0", {
            fontSize: "50px",
            fontFamily: "Ariel",
            color: '#ffed70',
            fontStyle: "bold"
        });
        this.coinText.setStroke("#a69a47", 4);
        this.coinText.ignoreDestroy = true;
    }

    /** sets the graphical text coinCounter to match internal values */
    updateCoinCounter(coins: number) {
        this.coinText.setText(coins.toLocaleString());
    }

    // Skull image functions --------------------

    createSkull(scene){
        this.skullImage = scene.add.image(40,this.spinningCoin.y - 30,"skull_up0");
        this.skullImage.depth = 99;
        this.skullImage.setScale(5);
        this.skullImage.setOrigin(.5);
        this.skullImage.ignoreDestroy = true;
    }

    updateSkull(scene){
        //increment frame counter
        if (this.skullIconFrames < 46){
            this.skullIconFrames++;
        } else {
            this.skullIconFrames = 1;
        }

        //calculate the angle between the cursor and the skull icon
        let CurrentPointer = new Phaser.Math.Vector2(scene.input.activePointer.x, scene.input.activePointer.y)
        let CurrentSkull = new Phaser.Math.Vector2(40,500);
        let currentRadAngle: number = Phaser.Math.Angle.BetweenPoints(CurrentSkull,CurrentPointer);
        let currentDegAngle: number = Phaser.Math.RadToDeg(currentRadAngle) - 30;

        let textureDirection: string = "";
        //check through and see which texture direction to go with to go with
        if (currentDegAngle > 0 && currentDegAngle < 12 || -25 < currentDegAngle && currentDegAngle < -0){
            textureDirection = "skull_down-right";
        } else if (currentDegAngle > 12 && currentDegAngle < 90){
            textureDirection = "skull_down";
        } else if (currentDegAngle > 90 && currentDegAngle < 140){
            textureDirection = "skull_down-left";
        } else if (140 < currentDegAngle && currentDegAngle < 150 || -210 < currentDegAngle && currentDegAngle < -160){
            textureDirection = "skull_left";
        } else if (-160 < currentDegAngle && currentDegAngle < -145){
            textureDirection = "skull_up-left";
        } else if (-145 < currentDegAngle && currentDegAngle < -103){
            textureDirection = "skull_up";
        } else if (-103 < currentDegAngle && currentDegAngle < -46){
            textureDirection = "skull_up-right";
        }  else if (-46 < currentDegAngle && currentDegAngle < -25){
            textureDirection = "skull_right";
        }

        let blinkFrame: number;
        //determine blink frames
        
        if (this.skullIconFrames > 5){
            blinkFrame = 0;
        } else if(this.skullIconFrames == 1 || this.skullIconFrames == 5){
            blinkFrame = 1;
        } else if (this.skullIconFrames == 2 || this.skullIconFrames == 4) {
            blinkFrame = 2
        } else if (this.skullIconFrames == 3){
            blinkFrame = 3;
        }
        //finally put them all together and change the texture
        this.skullImage.setTexture(textureDirection + blinkFrame)
        
    }

    // Kill Text functions --------------------

    createKillText(scene){
        this.killText = new Phaser.GameObjects.Text(scene, this.coinText.x + 3, this.skullImage.y - 35, "0", {
            fontSize: "50px",
            fontFamily: "Ariel",
            color: '#000000',
            fontStyle: "bold"
        });
        this.killText.depth = 100;
        this.killText.ignoreDestroy = true;
    }

    updateKillText(monsKilled){
        this.killText.setText(monsKilled.toLocaleString());
    }

    // Progress Bar functions --------------------

    createProgressBar(scene){
        //create top bar for graphical representation of monster kills
        // Progress bar container, black line that surrounds the progress bar
        this.progressContainer = new Phaser.GameObjects.Graphics(scene);
        this.progressContainer.lineStyle(3, 0x000000, 1);
        this.progressContainer.strokeRoundedRect(15, 35, GAME_WIDTH - 30, 30, 15);
        this.progressContainer.depth = 3;
        this.progressContainer.ignoreDestroy = true;
        // Fills the container and acts as a background
        this.progressBackground = new Phaser.GameObjects.Graphics(scene);
        this.progressBackground.fillStyle(EasyColor.dark_Red, 1);
        this.progressBackground.fillRoundedRect(15, 35, GAME_WIDTH - 30, 30, 15);
        this.progressBackground.depth = 1;
        this.progressBackground.ignoreDestroy = true;
        // the actually progression bar it's self
        this.progressBar = new Phaser.GameObjects.Graphics(scene);
        this.progressBar.fillStyle(EasyColor.Green, 1);
        this.progressBar.fillRoundedRect(15, 35, GAME_WIDTH - 30, 30, 15);
        this.progressBar.depth = 2;
        this.progressBar.ignoreDestroy = true;

        this.monsterNodes = [];
        //an array of 9 nodes representing 9 killable basic eneimes
        for(let i = 0; i < 9; i ++){
            let pos = 50 + (((GAME_WIDTH - 30)/10) * i);
            this.monsterNodes.push(new Phaser.GameObjects.Graphics(scene));
            this.monsterNodes[i].fillStyle(EasyColor.Red,1);
            this.monsterNodes[i].fillCircle(pos,50,22);
            this.monsterNodes[i].lineStyle(2.5, 0x000000, 1);
            this.monsterNodes[i].strokeCircle(pos,50,22);
            this.monsterNodes[i].depth = 4;
            this.monsterNodes[i].ignoreDestroy = true;
        }
        //10th node representing the boss monster
        let pos = 50 + (((GAME_WIDTH - 30)/10) * 9);
        this.monsterNodes.push(new Phaser.GameObjects.Graphics(scene));
        this.monsterNodes[9].fillStyle(EasyColor.Red,1);
        this.monsterNodes[9].fillCircle(pos,50,20);
        this.monsterNodes[9].lineStyle(2.5, 0x000000, 1);
        this.monsterNodes[9].strokeCircle(pos,50,25);
        this.monsterNodes[9].depth = 4;
        this.monsterNodes[9].ignoreDestroy = true;
    }

    updateProgressBar(monsKilled: number){
        let pos;
        //clear nodes and redraw the correct ones green
        for(let i = 0; i < monsKilled && i < 9; i ++){
            this.monsterNodes[i].clear();
            pos = 50 + (((GAME_WIDTH - 30)/10) * i);
            this.monsterNodes[i].fillStyle(EasyColor.Spring,1);
            this.monsterNodes[i].fillCircle(pos,50,22);
            this.monsterNodes[i].lineStyle(2.5, 0x000000, 1);
            this.monsterNodes[i].strokeCircle(pos,50,22);
        }
        //clear nodes and redraw the correct ones as red
        for(let i = monsKilled; i >= monsKilled && i < 9; i++){
            this.monsterNodes[i].clear();
            pos = 50 + (((GAME_WIDTH - 30)/10) * i);;
            this.monsterNodes[i].fillStyle(EasyColor.Red,1);
            this.monsterNodes[i].fillCircle(pos,50,22);
            this.monsterNodes[i].lineStyle(2.5, 0x000000, 1);
            this.monsterNodes[i].strokeCircle(pos,50,22);
        }
        //handle boss node
        if(monsKilled > 9){
            //10th node representing the boss monster
            pos = 50 + (((GAME_WIDTH - 30)/10) * 9);;
            this.monsterNodes[9].fillStyle(EasyColor.Spring,1);
            this.monsterNodes[9].fillCircle(pos,50,25);
            this.monsterNodes[9].lineStyle(2.5, 0x000000, 1);
            this.monsterNodes[9].strokeCircle(pos,50,25);
        } else {
            pos = 50 + (((GAME_WIDTH - 30)/10) * 9);;
            this.monsterNodes[9].fillStyle(EasyColor.Red,1);
            this.monsterNodes[9].fillCircle(pos,50,25);
            this.monsterNodes[9].lineStyle(2.5, 0x000000, 1);
            this.monsterNodes[9].strokeCircle(pos,50,25);
        }

        //clear main progress bar
        this.progressBar.clear();

        //draw to new node point
        this.progressBar.fillStyle(EasyColor.Green,1);
        this.progressBar.fillRoundedRect(15, 35, (50 + ((GAME_WIDTH - 30)/10) * (monsKilled)), 30, 15);
    }

    shopToggle(scene: Scene) {
        let rectangle = new Phaser.GameObjects.Rectangle(scene, 0, 0, 500, 500, 0xFFFFFF, 1);
        scene.add.existing(rectangle);
        let panel = new ScrollablePanel(scene,
            {
                scrollMode: 'vertical',
                panel: {
                    child: rectangle,
                    mask: {
                        padding: 0,
                        updateMode: 0
                    }
                }
            });
        scene.add.existing(panel);
    }

}