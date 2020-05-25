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
    /** Holds all the text objects for the strings in logs */
    logsTextList: Phaser.GameObjects.Text[];

    //strings
    logs: string[];

    //thingy
    postCodes: {[key: string]: boolean}

    //bool
    open: boolean = false;

    constructor(scene: Phaser.Scene){
        this.createBackground(scene);
        this.createBackButton(scene);
        this.createVolumeOutline(scene);
        this.createVolumeFill(scene);
        this.createVolumeBall(scene);
        this.createLabels(scene);
        this.fillLogList();
        this.createLogsListVisuals(scene);
    }

    createBackground(scene){
        //create the background for the options menu
        this.background = new Phaser.GameObjects.Sprite(scene,25,25,'optionsbg');
        this.background.setScale(0);
        this.background.setOrigin(0);
        this.background.depth = 1;
        this.background.setInteractive();
        this.background.ignoreDestroy = true;
        scene.add.existing(this.background);
    }

    createBackButton(scene){
        //create the back button
        this.backButton = new Phaser.GameObjects.Sprite(scene,35,40,'back');
        this.backButton.setScale(0);
        this.backButton.setOrigin(0);
        this.backButton.depth = 1;
        scene.add.existing(this.backButton);
        //set it so when the button sprite is clicked on it toggles the window
        this.backButton.setInteractive();
        this.backButton.on("pointerdown",this.toggle.bind(this));
    }

    createVolumeOutline(scene){
        //create volume outline
        this.volumeOutline = new Phaser.GameObjects.Graphics(scene);
        this.volumeOutline.lineStyle(3, 0x000000, 1);
        this.volumeOutline.strokeRoundedRect(45, 80, GAME_WIDTH - 90, 15, 15);
        this.volumeOutline.setScale(0);
        this.volumeOutline.depth = 3;
        this.volumeOutline.ignoreDestroy = true;
        scene.add.existing(this.volumeOutline);
    }

    createVolumeFill(scene){
         //create volume fill
         this.volumeFill = new Phaser.GameObjects.Graphics(scene);
         this.volumeFill.fillStyle(EasyColor.percentTransform(EasyColor.light_Blue,EasyColor.dark_Blue,50), 1);
         this.volumeFill.fillRoundedRect(45, 80, CENTER.x-45, 15, 15);
         this.volumeFill.setScale(0);
         this.volumeFill.depth = 2;
         this.volumeFill.ignoreDestroy = true;
         scene.add.existing(this.volumeFill);
    }

    createVolumeBall(scene){
        //create volume ball
        this.volumeBall = new Phaser.GameObjects.Image(scene, CENTER.x, 85, "volumeball");
        this.volumeBall.setScale(0);
        this.volumeBall.setInteractive();
        scene.input.setDraggable(this.volumeBall);
        this.volumeBall.on("drag", this.dragVolumeBall.bind(this, scene));
        this.volumeBall.depth = 5;
        this.volumeBall.ignoreDestroy = true;
        scene.add.existing(this.volumeBall)
    }

    createLabels(scene){
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

    fillLogList(){
        /**lists the options for debugging and logging, current limit is
        *  set up for 30 items, 15 in 2 columns; All must be unique and
        * perferable should have their post code in front of them.
        */
        this.logs = [
            "00: Level Change",
            "01: Creatures-spawn",
            "02: Boss-spawn",
            "03: Boss-kill",
            "04: Boss-fail",
            "05: Damage dealt",
            "06: Coin update",
            "07: KillText update",
            "08: ProgressBar update"
        ];
        this.postCodes = {};
        for (let item of this.logs){
            /**take the first 2 numbers/the post code of each item and
             * as the key, then default the value to false;
             */
            let key: string = item[0] + item[1];
            this.postCodes[key] = false;
        }

    }

    createLogsListVisuals(scene){
        /** go thru and dynamically create each visual text object from 
         * this.logs, they'll be created in pairs of 2 to make it easier
         * to make them in 2 columns 
         * */
        this.logsTextList = [];
        //config for all the text objects being generated
        let textConfig = {
            fontSize: "30px",
            fontFamily: "Ariel",
            color: "#FF0000",
            fontStyle: "bold"
        }
        //calculate the x for the first column
        let column01X = 50;
        let column02X = 20 + ((GAME_WIDTH - 100) /2);
        let columnsNum = Math.ceil(this.logs.length/2);
        //run thru a loop creating all the text objects for the strings in logs
        for(let i = 0; i < this.logs.length; i += 2){
            let newY = 150 + (((GAME_HEIGHT - 185)/columnsNum) * i/2 );
            //we can assume if the for loop has not broken there is a first item
            this.logsTextList[i] = new Phaser.GameObjects.Text(scene,column01X, newY, this.logs[i], textConfig)
            this.logsTextList[i].depth = 2;
            this.logsTextList[i].setOrigin(0);
            this.logsTextList[i].setScale(0);
            this.logsTextList[i].setInteractive();
            this.logsTextList[i].on('pointerdown', this.logPointerDown.bind(this, this.logsTextList[i]));
            scene.add.existing(this.logsTextList[i]);
            //we must check to make sure there is a second in this set
            if (this.logs.length > i + 1){
                this.logsTextList[i + 1] = new Phaser.GameObjects.Text(scene,column02X, newY, this.logs[i + 1], textConfig)
                this.logsTextList[i + 1].depth = 2;
                this.logsTextList[i + 1].setOrigin(0);
                this.logsTextList[i + 1].setScale(0);
                this.logsTextList[i + 1].setInteractive();
                this.logsTextList[i + 1].on('pointerdown', this.logPointerDown.bind(this, this.logsTextList[i + 1]));
                scene.add.existing(this.logsTextList[i + 1]);
            }
        }
    }

    toggle(){
        if (this.open){
            this.background.setScale(0);
            this.backButton.setScale(0);
            this.volumeOutline.setScale(0);
            this.volumeBall.setScale(0)
            this.volumeFill.setScale(0);
            this.masterVolumeLabel.setScale(0);
            this.LoggingLabel.setScale(0);
            for (let i = 0; i < this.logsTextList.length; i++){
                this.logsTextList[i].setScale(0);
            }
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
            for (let i = 0; i < this.logsTextList.length; i++){
                this.logsTextList[i].setScale(1);
            }
            this.open = true;
        }
    }

    ifPostCode(postCode: string, output: any){
        if(this.postCodes[postCode] && this.postCodes[postCode] == true){
            console.log("Postcode " + postCode + ": ", output);
        }
    }

    logPointerDown(clickedText: Phaser.GameObjects.Text){
        let postCode: string = clickedText.text[0] + clickedText.text[1];
        if(this.postCodes[postCode] == false){
            this.postCodes[postCode] = true;
            clickedText.setColor("#20B2AA");
        } else {
            this.postCodes[postCode] = false;
            clickedText.setColor("#FF0000");
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
        this.volumeFill.fillRoundedRect(45, 80, newX - 32, 15, 15);
        //calculate valume bars current value
        soundHandler.changeGlobalVolume(percent);
    }
}