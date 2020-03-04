/**
 *      Phaser Game Scene - Credits
 *  It plays a scrolling set of text giving credit
 *  to everyone that contributed to the game.
 * 
 *  Accessed from:   Home
 *  Lead back to:    Home
 */


//Scene for credits
class Credits extends Phaser.Scene {
     /**Creates instance of Scene */
    constructor(){
        super("Credits");
    }

    /**Init is a Phaser Scene method that runs before any of the others. It can
     * be thought of like a sort of follow-up constructor that runs only once
     * the scene is actually being launched (instead of just being added to the
     * game object) */
    init() {
        //Actual text to be displayed, speerated by lines to make code more readable
        //no Height limit
        //Limit of 55 characters for width to keep formatting
        this.creditString = "";
        this.creditString += "From the team at Idle Pixels\n\n"
        this.creditString += "Gracie Glebe\n"
        this.creditString += "Zachary Kingcade\n"
        this.creditString += "Jeremy Glebe\n\n\n"
        this.creditString += "A Special Thanks to the following free assets artists\n"
        this.creditString += "Images\n"
        this.creditString += "something something\n"
        this.creditString += "Audio\n"
        this.creditString += "Something Somthing\n"

        //set the font size and spacing of the text in pixels
        //(soon to be in relative size)
        this.fontSize = 20;
        this.spacing = this.fontSize/4;
        //calculate text element size
        this.stringPixelHeight = (this.creditString.split('\n').length) * (this.fontSize + this.spacing);
    };

    /**Phaser.Scene method which represents the start of the Scene's behavior.
     * It runs after init() and preload() have completed */
    create() {
        //Create The Text Graphic element for the credit's text
        this.splashText = this.add.text(330, 640, this.creditString,{
            font: this.fontSize + "px Arial",
            fill: "#ffffff",
            align: "center"
        });
        //set correcct line spacing based on values from init
        this.splashText.setLineSpacing(this.spacing);
        //set origin to the center(x) and top (y) of the text element to
        //make our scrolling tween go much smoother
        this.splashText.setOrigin(.5, 0);
        //set scrolling tween - tween that slowly scrolls from the top to
        //the bottom of the screen in an infinite loop
        this.scrollTween = this.tweens.add({
            targets: this.splashText,
            y : 0 - this.stringPixelHeight,
            duration: 30 * this.stringPixelHeight,
            paused: false,
            yoyo: false,
            repeatDelay: 2000,
            repeat: -1,
        });


        //add back button
        this.creditsButton = this.add.sprite(0,0,"backButton").setOrigin(0,0);
        this.creditsButton.setScale(2.5)
        //set it so when the button sprite is clicked on it takes the player
        //back to the HomeScreen
        this.creditsButton.setInteractive();
        this.creditsButton.on("pointerdown",function(){
            this.scene.start("Home");
        },this);
    }
    
}