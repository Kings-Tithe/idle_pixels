import { Scene } from 'phaser';
import { UShop } from './Ushop';
import { GAME_HEIGHT, GAME_WIDTH, CENTER } from './tools/Globals';
import { EasyColor } from './tools/EasyColor';

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
    /** Button that allows for the opening of the ushop */
    shopButton: Phaser.GameObjects.Sprite;
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
        //create golden coin counter
        this.coinText = new Phaser.GameObjects.Text(scene, 96, 510, "0", {
            fontSize: "50px",
            fontFamily: "Ariel",
            color: '#ffed70',
            fontStyle: "bold"
        });
        this.coinText.setStroke("#a69a47", 5);
        this.coinText.ignoreDestroy = true;
        //add spinning coin
        this.spinningCoin = new Phaser.GameObjects.Sprite(scene, 10, 510, "coin", 0);
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
        //add the ushop
        this.ushop = new UShop;
        this.ushop.creationLink(scene);
        this.ushop.createUpgradeShop();
        this.createProgressBar(scene);
        this.createKillText(scene);
        this.createSkull(scene);

        //set intervals
        setInterval(this.updateSkull.bind(this,scene), 100);
    }

    /** used to link all elements to a new scene when entering the new scene */
    link(scene: Scene) {
        scene.add.existing(this.coinText)
        scene.add.existing(this.spinningCoin);
        scene.add.existing(this.progressContainer);
        scene.add.existing(this.progressBackground);
        scene.add.existing(this.progressBar);
        scene.add.existing(this.killText);
        scene.add.existing(this.skullImage);
        for(let i = 0; i < 10; i ++){
            scene.add.existing(this.monsterNodes[i]); 
        }
        this.spinningCoin.play("coinSpin");
        this.ushop.link(scene);
    }

    /** sets the graphical text coinCounter to match internal values */
    updateCoinCounter(coins: number) {
        this.coinText.setText(coins.toLocaleString());
    }

    createProgressBar(scene){
        //create top bar for graphical representation of monster kills
        // Progress bar container, black line that surrounds the progress bar
        this.progressContainer = new Phaser.GameObjects.Graphics(scene);
        this.progressContainer.lineStyle(3, 0x000000, 1);
        this.progressContainer.strokeRoundedRect(CENTER.x - 150, 35, 440, 20, 15);
        this.progressContainer.depth = 3;
        this.progressContainer.ignoreDestroy = true;
        // Fills the container and acts as a background
        this.progressBackground = new Phaser.GameObjects.Graphics(scene);
        this.progressBackground.fillStyle(EasyColor.dark_Red, 1);
        this.progressBackground.fillRoundedRect(CENTER.x - 150, 35, 440, 20, 15);
        this.progressBackground.depth = 1;
        this.progressBackground.ignoreDestroy = true;
        // the actually progression bar it's self
        this.progressBar = new Phaser.GameObjects.Graphics(scene);
        this.progressBar.fillStyle(EasyColor.Green, 1);
        this.progressBar.fillRoundedRect(CENTER.x - 150, 35, 25, 20, 15);
        this.progressBar.depth = 2;
        this.progressBar.ignoreDestroy = true;

        this.monsterNodes = [];
        //an array of 9 nodes representing 9 killable basic eneimes
        for(let i = 0; i < 9; i ++){
            let pos = (CENTER.x - 120) + ((415/10) * i);
            this.monsterNodes.push(new Phaser.GameObjects.Graphics(scene));
            this.monsterNodes[i].fillStyle(EasyColor.Red,1);
            this.monsterNodes[i].fillCircle(pos,45,17);
            this.monsterNodes[i].lineStyle(2, 0x000000, 1);
            this.monsterNodes[i].strokeCircle(pos,45,17);
            this.monsterNodes[i].depth = 4;
            this.monsterNodes[i].ignoreDestroy = true;
        }
        //10th node representing the boss monster
        let pos = (CENTER.x - 120) + ((430/10) * 9);
        this.monsterNodes.push(new Phaser.GameObjects.Graphics(scene));
        this.monsterNodes[9].fillStyle(EasyColor.Red,1);
        this.monsterNodes[9].fillCircle(pos,45,20);
        this.monsterNodes[9].lineStyle(2.5, 0x000000, 1);
        this.monsterNodes[9].strokeCircle(pos,45,20);
        this.monsterNodes[9].depth = 4;
        this.monsterNodes[9].ignoreDestroy = true;
    }

    updateProgressBar(monsKilled: number){
        let pos;
        //clear nodes and redraw the correct ones green
        for(let i = 0; i < monsKilled && i < 9; i ++){
            this.monsterNodes[i].clear();
            pos = (CENTER.x - 120) + ((415/10) * i);
            this.monsterNodes[i].fillStyle(EasyColor.Spring,1);
            this.monsterNodes[i].fillCircle(pos,45,17);
            this.monsterNodes[i].lineStyle(2, 0x000000, 1);
            this.monsterNodes[i].strokeCircle(pos,45,17);
        }
        //clear nodes and redraw the correct ones as red
        for(let i = monsKilled; i >= monsKilled && i < 9; i++){
            this.monsterNodes[i].clear();
            pos = (CENTER.x - 120) + ((415/10) * i);
            this.monsterNodes[i].fillStyle(EasyColor.Red,1);
            this.monsterNodes[i].fillCircle(pos,45,17);
            this.monsterNodes[i].lineStyle(2, 0x000000, 1);
            this.monsterNodes[i].strokeCircle(pos,45,17);
        }
        //handle boss node
        if(monsKilled > 9){
            //10th node representing the boss monster
            pos = (CENTER.x - 120) + ((430/10) * 9);
            this.monsterNodes[9].fillStyle(EasyColor.Spring,1);
            this.monsterNodes[9].fillCircle(pos,45,20);
            this.monsterNodes[9].lineStyle(2.5, 0x000000, 1);
            this.monsterNodes[9].strokeCircle(pos,45,20);
        } else {
            pos = (CENTER.x - 120) + ((430/10) * 9);
            this.monsterNodes[9].fillStyle(EasyColor.Red,1);
            this.monsterNodes[9].fillCircle(pos,45,20);
            this.monsterNodes[9].lineStyle(2.5, 0x000000, 1);
            this.monsterNodes[9].strokeCircle(pos,45,20);
        }

        //clear main progress bar
        this.progressBar.clear();

        //draw to new node point
        this.progressBar.fillStyle(EasyColor.Green,1);
        this.progressBar.fillRoundedRect(CENTER.x - 150, 35, ((415/10) * (monsKilled + 1)), 20, 15);
    }

    createKillText(scene){
        this.killText = new Phaser.GameObjects.Text(scene, 100, 450, "0", {
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

    createSkull(scene){
        this.skullImage = scene.add.image(40,487,"skull_up0");
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
        let CurrentPointer = new Phaser.Math.Vector2(scene.game.input.mousePointer.x, scene.game.input.mousePointer.y)
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
        console.log(this.skullIconFrames, textureDirection + blinkFrame)
        //finally put them all together and change the texture
        this.skullImage.setTexture(textureDirection + blinkFrame)
        
    }

}