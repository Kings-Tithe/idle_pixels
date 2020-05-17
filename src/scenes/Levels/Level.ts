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
    /** Is the outside black container surrounding ProgressBar */
    progressContainer: Phaser.GameObjects.Graphics;
    /** Rendered within the container and used as a backgrounf for the progress bar */
    progressBackground: Phaser.GameObjects.Graphics;
    /** Shows the progression thru the level based on monster kills */
    progressBar: Phaser.GameObjects.Graphics;
    /** Stores an array of circular nodes representing killable monsters */
    monsterNodes: Phaser.GameObjects.Graphics[];

    //sounds
    bgMusic: Phaser.Sound.BaseSound;

    //numbers
    /** Used to keep track of how many monsters have been beaten */
    monsBeaten: number;

    //players
    /** Holds all the passable data about the player */
    player: Player;

    //ui elements
    /** Stores the passed in hud elements and updates them when related values change */
    hud: Hud;


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
        this.bgMusic = this.sound.add(this.bgMusicKey);
        this.bgMusic.play();
        // play the intro splash text
        this.splashText();
        //link all the hud elements to this scene
        this.hud.link(this);
        // generate the first monster for this area
        this.getRandMonster();
        //create a loop to handle passive damage of all non-player heros
        setInterval(this.passiveDamage.bind(this), 1000);
        //create progress bar
        this.createProgressBar();
        console.log(this.monsterNodes);
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
        //delete the current on screen monster
        this.currentMonster.destroy();
        //increment the amount of monsters beaten
        this.monsBeaten++;
        this.player.totalMonsBeaten++;
        //add coins earned and update coin counter
        this.player.coins += 100;
        this.hud.updateCoinCounter(this.player.coins);
        //if logging is on tell the console the number of currrently beaten monsters
        if (LOGGING){
            console.log("Number of monsters beaten: " + this.monsBeaten);
        }
        //check if the correct number of monsters are beaten to spawn a boss
        if (this.monsBeaten <= 9){
            //not time for the boss generate a random boss from the monsters list
            this.updateProgressBar(this.monsBeaten);
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
        //listener to handle the death of the current onscreen monster
        this.currentMonster.on("death", this.onBossDeath, this)
        // //not properly set up right now so onto the next level
        // this.nextLevel();
    }

    onBossDeath(){
        //delete the current on screen monster
        this.currentMonster.destroy();
        //increment the amount of monsters beaten
        this.monsBeaten++;
        this.player.totalMonsBeaten++;
        //add coins earned and update coin counter
        this.player.coins += 100;
        this.hud.updateCoinCounter(this.player.coins);
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

    createProgressBar(){
        //create top bar for graphical representation of monster kills
        // Progress bar container, black line that surrounds the progress bar
        this.progressContainer = new Phaser.GameObjects.Graphics(this);
        this.progressContainer.lineStyle(3, 0x000000, 1);
        this.progressContainer.strokeRoundedRect(CENTER.x - 150, 35, 440, 20, 15);
        this.progressContainer.depth = 3;
        this.add.existing(this.progressContainer);
        // Fills the container and acts as a background
        this.progressBackground = new Phaser.GameObjects.Graphics(this);
        this.progressBackground.fillStyle(EasyColor.dark_Red, 1);
        this.progressBackground.fillRoundedRect(CENTER.x - 150, 35, 440, 20, 15);
        this.progressBackground.depth = 1;
        this.add.existing(this.progressBackground);
        // the actually progression bar it's self
        this.progressBar = new Phaser.GameObjects.Graphics(this);
        this.progressBar.fillStyle(EasyColor.Green, 1);
        this.progressBar.fillRoundedRect(CENTER.x - 150, 35, 25, 20, 15);
        this.progressBar.depth = 2;
        this.add.existing(this.progressBar);
        this.monsterNodes = [];
        //an array of 9 nodes representing 9 killable basic eneimes
        for(let i = 0; i < 9; i ++){
            let pos = (CENTER.x - 120) + ((415/10) * i);
            this.monsterNodes.push(new Phaser.GameObjects.Graphics(this));
            this.monsterNodes[i].fillStyle(EasyColor.Red,1);
            this.monsterNodes[i].fillCircle(pos,45,17);
            this.monsterNodes[i].lineStyle(2, 0x000000, 1);
            this.monsterNodes[i].strokeCircle(pos,45,17);
            this.monsterNodes[i].depth = 4;
            this.add.existing(this.monsterNodes[i]); 
        }
        //10th node representing the boss monster
        let pos = (CENTER.x - 120) + ((430/10) * 9);
        this.monsterNodes.push(new Phaser.GameObjects.Graphics(this));
        this.monsterNodes[9].fillStyle(EasyColor.Red,1);
        this.monsterNodes[9].fillCircle(pos,45,20);
        this.monsterNodes[9].lineStyle(2.5, 0x000000, 1);
        this.monsterNodes[9].strokeCircle(pos,45,20);
        this.monsterNodes[9].depth = 4;
        this.add.existing(this.monsterNodes[9]);
    }

    updateProgressBar(monsKilled: number){
        let pos;
        //clear nodes and redraw them as green
        for(let i = 0; i < monsKilled && i < 9; i ++){
            this.monsterNodes[i].clear();
            pos = (CENTER.x - 120) + ((415/10) * i);
            this.monsterNodes[i].fillStyle(EasyColor.Spring,1);
            this.monsterNodes[i].fillCircle(pos,45,17);
            this.monsterNodes[i].lineStyle(2, 0x000000, 1);
            this.monsterNodes[i].strokeCircle(pos,45,17);
        }
        //handle boss node
        if(monsKilled == 10){
        //10th node representing the boss monster
        pos = (CENTER.x - 120) + ((430/10) * 9);
        this.monsterNodes[9].fillStyle(EasyColor.Spring,1);
        this.monsterNodes[9].fillCircle(pos,45,20);
        this.monsterNodes[9].lineStyle(2.5, 0x000000, 1);
        this.monsterNodes[9].strokeCircle(pos,45,20);
        }
        //clear main progress bar
        this.progressBar.clear();

        //draw to new node point
        this.progressBar.fillStyle(EasyColor.Green,1);
        this.progressBar.fillRoundedRect(CENTER.x - 150, 35, ((415/10) * monsKilled), 20, 15);
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
        this.bgMusic.stop();
        //set the player to be one level higher
        this.player.level++;
        //start the next scene with all passed in values
        this.scene.start(nextLevelKey, {player: this.player, hud: this.hud});
    }

}
