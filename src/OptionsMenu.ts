import { CENTER, GAME_WIDTH, GAME_HEIGHT } from './tools/Globals';
import { scaleTo } from './tools/PercentCoords';
import { EasyColor } from './tools/EasyColor';
import { soundHandler } from './main';

export class OptionsMenu {

    //member Varibles

    //images
    /** Background image for the window it's self */
    background: Phaser.GameObjects.Sprite;
    /** Acts as a way to toggle the window if the button used to open it gets covered up */
    backButton: Phaser.GameObjects.Sprite;
    /** Acts as an outline for the volume slider */
    volumeOutline: Phaser.GameObjects.Graphics;
    /** Fills in the phaser volume outline up to the point of the draggable ball */
    volumeFill: Phaser.GameObjects.Graphics;
    /** Is a small ball that can be dragged to change the game volume */
    volumeBall: Phaser.GameObjects.Image;

    //text
    /** Marks the bar for the volume control */
    masterVolumeLabel: Phaser.GameObjects.Text;
    /** marks the section in the menu for logging controls */
    LoggingLabel: Phaser.GameObjects.Text;

    //bool
    open: boolean = false;

    constructor(scene: Phaser.Scene){
        //create the background for the options menu
        this.background = new Phaser.GameObjects.Sprite(scene,25,25,'optionsbg');
        this.background.setScale(0);
        this.background.setOrigin(0);
        this.background.depth = 1;
        this.background.ignoreDestroy = true;
        scene.add.existing(this.background);
        //create the back button
        this.backButton = new Phaser.GameObjects.Sprite(scene,35,40,'back');
        this.backButton.setScale(0);
        this.backButton.setOrigin(0);
        this.backButton.depth = 1;
        scene.add.existing(this.backButton);
        //set it so when the button sprite is clicked on it toggles the window
        this.backButton.setInteractive();
        this.backButton.on("pointerdown",this.toggletest.bind(this));
        //create volume slider
        this.volumeOutline = new Phaser.GameObjects.Graphics(scene);
        this.volumeOutline.lineStyle(3, 0x000000, 1);
        this.volumeOutline.strokeRoundedRect(45, 80, GAME_WIDTH - 90, 15, 15);
        this.volumeOutline.setScale(0);
        this.volumeOutline.depth = 3;
        this.volumeOutline.ignoreDestroy = true;
        scene.add.existing(this.volumeOutline);
        //create colume fill
        this.volumeFill = new Phaser.GameObjects.Graphics(scene);
        this.volumeFill.fillStyle(EasyColor.percentTransform(EasyColor.light_Blue,EasyColor.dark_Blue,50), 1);
        this.volumeFill.fillRoundedRect(45, 80, CENTER.x-45, 15, 15);
        this.volumeFill.setScale(0);
        this.volumeFill.depth = 2;
        this.volumeFill.ignoreDestroy = true;
        scene.add.existing(this.volumeFill);
        //create volume ball
        this.volumeBall = new Phaser.GameObjects.Image(scene, CENTER.x, 85, "volumeball");
        this.volumeBall.setScale(0);
        this.volumeBall.setInteractive();
        scene.input.setDraggable(this.volumeBall);
        this.volumeBall.on("drag", this.dragVolumeBall.bind(this, scene));
        this.volumeBall.depth = 5;
        this.volumeBall.ignoreDestroy = true;
        scene.add.existing(this.volumeBall)
        console.log(this.volumeBall);
        //create Master Volume Label
        this.masterVolumeLabel = new Phaser.GameObjects.Text(scene,CENTER.x, 50, "Master Volume",{
            fontSize: "30px",
            fontFamily: "Ariel",
            color: EasyColor.Black.toString(),
            fontStyle: "bold"
        })
        this.masterVolumeLabel.depth = 2;
        this.masterVolumeLabel.setOrigin(.5,.5);
        this.masterVolumeLabel.setScale(0);
        scene.add.existing(this.masterVolumeLabel);
        //create Logging Label
        this.LoggingLabel = new Phaser.GameObjects.Text(scene,CENTER.x, 120, "Debugging - Logging",{
            fontSize: "30px",
            fontFamily: "Ariel",
            color: EasyColor.Black.toString(),
            fontStyle: "bold"
        })
        this.LoggingLabel.depth = 2;
        this.LoggingLabel.setOrigin(.5,.5);
        this.LoggingLabel.setScale(0);
        scene.add.existing(this.LoggingLabel);
    }

    toggletest(){
        console.log(this);
        if (this.open){
            this.background.setScale(0);
            this.backButton.setScale(0);
            this.volumeOutline.setScale(0);
            this.volumeBall.setScale(0)
            this.volumeFill.setScale(0);
            this.masterVolumeLabel.setScale(0);
            this.LoggingLabel.setScale(0);
            this.open = false;
        } else {
            let scaleX = scaleTo(GAME_WIDTH - 50, 1280)
            let scaleY = scaleTo(GAME_HEIGHT - 50, 720)
            this.background.setScale(scaleX, scaleY);
            this.backButton.setScale(2.5);
            this.volumeOutline.setScale(1);
            this.volumeBall.setScale(1);
            this.volumeFill.setScale(1);
            this.masterVolumeLabel.setScale(1);
            this.LoggingLabel.setScale(1);
            this.open = true;
        }
    }

    dragVolumeBall(scene){
        //get a new x value and check to make sure it is dosen't go out of bounds
        let newX = scene.input.activePointer.x;
        if (newX < 45){
            newX = 45;
        } else if (newX > GAME_WIDTH - 45){
            newX = GAME_WIDTH - 45;
        }
        //redraw the ball
        this.volumeBall.x = newX;
        //redraw the bar's fill
        let percent = ((newX - 45) / (GAME_WIDTH - 90));
        this.volumeFill.clear();
        this.volumeFill.fillStyle(EasyColor.percentTransform(EasyColor.light_Azure,EasyColor.dark_Blue,percent * 100), 1);
        this.volumeFill.fillRoundedRect(45, 80, newX - 30, 15, 15);
        //calculate valume bars current value
        soundHandler.changeGlobalVolume(percent);
    }
}