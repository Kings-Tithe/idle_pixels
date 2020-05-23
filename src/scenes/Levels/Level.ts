import { Scene } from 'phaser';
import { px, py, scaleTo } from '../../tools/PercentCoords';
import { Rnd } from '../../tools/Rnd';
import { Monster } from '../../sprites/monsters/Monster';
import { LOGGING, CENTER } from '../../tools/Globals';
import { Player } from '../../Player';
import { Keys, LevelMap } from "./index"
import { Hud } from '../../Hud';
import { UShop } from "../../Ushop"
import { EasyColor } from '../../tools/EasyColor';
import { soundHandler } from '../../main';

export abstract class Level extends Scene {

    //Member Varibles

    //strings
    /** Name displayed in the level's splash text */
    abstract name: string;
    /** Key of the level's background image */
    abstract bg: string;
    /** Stores the path leading to the background music's file */
    abstract bgMusicKey: string;
    /** stores the key of the level, used to pick the next level without repeats */
    currentKey: string;

    //classes
    /** list of monster classes this level uses */
    abstract monsters: (typeof Monster)[];
    /** Monster this level uses as its boss */
    abstract boss: (typeof Monster);
    /** Stores a instance of a monster class from monsters[] */
    currentMonster: Monster;

    //images
    background: Phaser.GameObjects.Image;

    //graphics
    /** Is the graphical representation of the boss timer, a pie chart timer */
    bossTimerGraphic: Phaser.GameObjects.Graphics;
    /** Is a backing for the boss timer,*/
    bossTimerBack: Phaser.GameObjects.Graphics;

    //numbers
    /** Used to keep track of how many monsters have been beaten */
    monsBeaten: number;
    /** Used to keep track of the tick of the boss timer */
    bossTime: number;
    /** used to store where the boss timer starts, done in 1/10 second intervals so 1 = 100ms */
    BossTimeMax: number = 50;

    //players
    /** Holds all the passable data about the player */
    player: Player;

    //ui elements
    /** Stores the passed in hud elements and updates them when related values change */
    hud: Hud;

    //NodeJS.Timeout
    /** Stores the id for the boss timer interval */
    bossIntervalId : NodeJS.Timeout;
    /**
     * Returned from the passive damage setInterval call, we need to make sure
     * to stop the interval timer before moving on from this level.
     */
    passiveInterval: NodeJS.Timeout;



    /**
     * Creates instance of Level scene
     * @param {String} sceneKey The key that Phaser uses to load this scene.
     */
    constructor(sceneKey) {
        super(sceneKey);
        this.currentKey = sceneKey;
    }

    /**
     * Init is a Phaser Scene method that runs before any of the others. It can
     * be thought of like a sort of follow-up constructor that runs only once
     * the scene is actually being launched (instead of just being added to the
     * game object)
     * @param {{player: Player, stage: number}} levelData Object that contains
     *   data transferred between levels.
     */
    init(data) {
        //if logging is on, log the start of this scene
        if (LOGGING){console.log("Scene Started: " + this.name)};
        //grab the passed in data
        this.player = data.player;
        this.hud = data.hud;
        //set the number of monsters beaten to 0 as a baseline
        this.monsBeaten = 0;
    }

    /**
     * Phaser.Scene method which represents the start of the Scene's behavior.
     * It runs after init() and preload() have completed
     */
    create() {
        // setup the scene's background image
        this.background = this.add.image(0, 0, this.bg);
        this.background.setOrigin(0, 0);
        this.background.scaleX = scaleTo(px(100),this.background.width);
        this.background.scaleY = scaleTo(py(100),this.background.height);
        // setup the scene's background music
        soundHandler.play(this.bgMusicKey);
        // play the intro splash text
        this.splashText();
        //link all the hud elements to this scene
        this.hud.link(this);
        // generate the first monster for this area
        this.getRandMonster();
        //create a loop to handle passive damage of all non-player heros
        this.passiveInterval = setInterval(this.passiveDamage.bind(this), 1000);
        //make sure to reset the progress bar at the start of the level
        this.hud.updateProgressBar(this.monsBeaten);
    }
    

    /**
     * Creates a random monster from the monster list on the screen.
     */
    getRandMonster() {
        //decide what kind of monster to create
        let monIndex: number = Rnd.int(0,this.monsters.length - 1);
        let MonsterClass: (typeof Monster) = this.monsters[monIndex];
        //now create an instance of that monster class
        this.currentMonster = new MonsterClass(this,this.player.level);
        this.add.existing(this.currentMonster);
        this.add.existing(this.currentMonster.healthContainer);
        //listener to handle the death of the current onscreen monster
        this.currentMonster.on("death", this.onMonsterDeath, this)
    }

    /**
     * Switches either the monster or the level after a monster dies.
     */
    onMonsterDeath() {
        //add coins earned and update coin counter
        this.player.coins += Math.ceil(this.currentMonster.maxHp/4);
        this.hud.updateCoinCounter(this.player.coins);
        //delete the current on screen monster
        this.currentMonster.destroy();
        //increment the amount of monsters beaten
        this.monsBeaten++;
        this.player.totalMonsBeaten++;
        this.hud.updateKillText(this.player.totalMonsBeaten);
        //if logging is on tell the console the number of currrently beaten monsters
        if (LOGGING){
            console.log("Number of monsters beaten: " + this.monsBeaten);
        }
        //update the progress bars graghic
        this.hud.updateProgressBar(this.monsBeaten);
        //check if the correct number of monsters are beaten to spawn a boss
        if (this.monsBeaten < 9){
            //generate a random boss from the monsters list
            this.getRandMonster();
        } else {
            //time to spawn the boss
            this.spawnBoss();
            if (LOGGING){console.log("Spawning the boss: ", this.currentMonster)};
        }
    }

    /**
     * Function ran a after every set number of miliseconds and deals all
     * the passive heros damage, at the current version the wizard is the
     * only passive hero
     */
    passiveDamage(this){
        this.currentMonster.onDamage(this.player.damageSources["wizard"]);
    }

    /** Spawns the boss created for the level and sets up the elements related to him */
    spawnBoss(){
        //now create an instance of that monster class
        this.currentMonster = new this.boss(this,this.player.level);
        this.add.existing(this.currentMonster);
        this.add.existing(this.currentMonster.healthContainer);
        //listener that clears the boss timer before death completes
        this.currentMonster.on("predeath", () => {
            this.destroyBossTimer();
            this.hud.updateProgressBar(this.monsBeaten + 1);
            this.hud.updateKillText(this.player.totalMonsBeaten + 1);
        }, this);
        //listener to handle the death of the current onscreen monster
        this.currentMonster.on("death", this.onBossDeath, this)
        this.createBossTimer();
    }

    createBossTimer(){
        //set the starting time for the boss timer
        this.bossTime = this.BossTimeMax;
        //create the white background for the boss timer
        this.bossTimerBack = new Phaser.GameObjects.Graphics(this);
        this.bossTimerBack.fillStyle(EasyColor.White, 1);
        this.bossTimerBack.fillCircle(CENTER.x + 125, CENTER.y - 140, 42)
        this.bossTimerBack.depth = 5;
        this.add.existing(this.bossTimerBack);
        //create pie graghic
        this.bossTimerGraphic = new Phaser.GameObjects.Graphics(this);
        this.bossTimerGraphic.fillStyle(EasyColor.Spring, 1);
        this.bossTimerGraphic.slice(CENTER.x + 125, CENTER.y - 140, 40,Phaser.Math.DegToRad(270), Phaser.Math.DegToRad(270.01),true);
        this.bossTimerGraphic.fillPath();
        this.bossTimerGraphic.depth = 6;
        this.add.existing(this.bossTimerGraphic);
        //set an interval to run every 1000ms or every second
        this.bossIntervalId = setInterval(this.incrementTimer.bind(this), 100);
        console.log("Boss timer created!");
    }

    incrementTimer(){
        //decrement the boss timer by one second
        this.bossTime -= 1;
        //update the graghic for the boss timer
        //determines the percentage taken out of the overall time
        let percentageMissing = (((this.BossTimeMax - this.bossTime) / this.BossTimeMax) * 360) + 270;
        //used to calculate the color of the graghic
        let currentColor = EasyColor.percentTransform(EasyColor.Spring,EasyColor.Red,this.bossTime/ this.BossTimeMax);
        this.bossTimerGraphic.clear();
        this.bossTimerGraphic.fillStyle(Number(currentColor), 1);
        this.bossTimerGraphic.slice(CENTER.x + 125, CENTER.y - 140, 40,Phaser.Math.DegToRad(270), Phaser.Math.DegToRad(percentageMissing),true);
        this.bossTimerGraphic.fillPath();
        //check to see if time is up
        if(this.bossTime <= 0){
            this.destroyBossTimer();
            this.onBossFail();
        }
    }

    destroyBossTimer(){
        clearInterval(this.bossIntervalId);
        this.bossTimerGraphic.destroy();
        this.bossTimerBack.destroy();
    }

    onBossFail(){
        //this is normally ran internally on monster death but here we have to manually
        //clear it since onDeath is not actually called
        this.currentMonster.clearHealthGraphics();
        //clear the current monster
        this.currentMonster.destroy();
        //reset monsters beaten and progress bar
        this.monsBeaten = 0;
        this.hud.updateProgressBar(this.monsBeaten);
        //get another basic monster and start the cycle again
        this.getRandMonster();
    }

    onBossDeath(){
        //increment the amount of monsters beaten
        this.monsBeaten++;
        this.player.totalMonsBeaten++;
        //add coins earned and update coin counter
        this.player.coins += Math.ceil(this.currentMonster.maxHp/2);
        this.hud.updateCoinCounter(this.player.coins);
        //delete the current on screen monster
        this.currentMonster.destroy();
        //if logging is on tell the console the number of currrently beaten monsters
        if (LOGGING){
            console.log("The boss has been beaten! Preparing to move to next level");
        }
        //move onto the next level
        this.nextLevel();
    }

    /**
     * creates and runs the animation for the opening splash text of the level 
     * all elements are self contained and auto deleted after this function is over
    */
    splashText(){
        let splashText: Phaser.GameObjects.Text = this.add.text(
            CENTER.x, 
            CENTER.y - 180,
            "Welcome to " + this.name + "!",
            {
            font: "50px Arial", 
            fill: "#5bf2fc" 
            });
        splashText.setOrigin(.5, .5)
        splashText.setScale(0);
        let splashIntroText: Phaser.Tweens.Tween = this.tweens.add({
            targets: splashText,
            scaleX: 1,
            scaleY: 1,
            duration: 500,
            yoyo: true,
            hold: 3000,
            repeat: 0,
        });
    }

    /**
     * Starts the next level (ensuring that it is not the same level again)
     */
    nextLevel() {
        let nextLevelKey: string = this.currentKey;
        //choose the key for a random level not matching the level we are currently in so 
        //long as there is more then one level loaded currently
        while(nextLevelKey == this.currentKey && Keys.length > 1){
            //try to find a new key not matching the one for the current level
            nextLevelKey = Keys[Rnd.int(0, Keys.length - 1)];
            console.log(nextLevelKey);
        }
        //stop the current scene's background music
        soundHandler.stop(this.bgMusicKey);
        //set the player to be one level higher
        this.player.level++;
        // Clear the interval for passive damage to avoid "clusters" of damage calls
        clearInterval(this.passiveInterval);
        //start the next scene with all passed in values
        this.scene.start(nextLevelKey, {player: this.player, hud: this.hud});
    }

}
