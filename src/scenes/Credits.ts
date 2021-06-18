/**
 *      Phaser Game Scene - Credits
 *  It plays a scrolling set of text giving credit
 *  to everyone that contributed to the game.
 */
import { CENTER, GAME_HEIGHT, GAME_WIDTH } from '../tools/Globals';

//Scene for credits
export class Credits extends Phaser.Scene {
    /**
     * String containing all the credits for the game. Tabs will be removed
     * when displayed. Lines should not exceed 55 characters for display.
     */
    creditString: string = `The following great people worked on Idle Pixels
                            *******************************************************
                            
                            Developers
                            Zachary Kingcade
                            Jeremy Glebe
                            
                            
                            Artists
                            Gracie Glebe (Visuals)
                            Kaleb Brown (Musician)
                            
                            
                            A Special Thanks to the following free assets artists
                            
                            Audio from AudioBible.com

                            Punch HD Sound by Mark DiAngelo
                            Jab Sound by Mike Koenig
                            Left Hook Sound by Mike Koenig
                            
                            
                            And YOU for checking out our game!
                            
                            

                            `.replace(/                            /g, '');
    /** Size of the font in pixels */
    fontSize: number = 20;
    /** Spacing between lines in pixels */
    spacing: number;
    /** Height of creditString in pixels */
    creditStringHeight: number;
    /** Stores the graphic version of creditString */
    splashText: Phaser.GameObjects.Text;
    /** Twwen that slowly scrolls splashText across the screen from bottom to top */
    scrollTween: Phaser.Tweens.Tween;
    /** Button used to return to the home screen */
    creditsButton: Phaser.GameObjects.Image;
    /** The music that plays During this scene */
    bgMusic: Phaser.Sound.BaseSound;

    /** Creates instance of Scene */
    constructor() {
        super("Credits");
        // Set the spacing as a function of font size
        this.spacing = this.fontSize / 4;
        // Calculate the full height of the credits string (all lines and spacing)
        this.creditStringHeight = this.creditString.split('\n').length
            * (this.fontSize + this.spacing)
            + (this.spacing * 2);
    }

    /**
     * Phaser.Scene method which represents the start of the Scene's behavior.
     * It runs after init() and preload() have completed
     */
    create() {
        // Create the KT logo
        this.add.image(GAME_WIDTH - 60, 120, 'kings-tithe').setAlpha(0.5);
        // Create the text object for the credits
        this.splashText = this.add.text(CENTER.x, GAME_HEIGHT, this.creditString, {
            fontSize: this.fontSize,
            color: 'white',
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
            y: 0 - this.creditStringHeight,
            duration: 30 * this.creditStringHeight,
            paused: false,
            yoyo: false,
            repeatDelay: 2000,
            repeat: -1,
        });
        //add back button
        this.creditsButton = this.add.sprite(0, 0, "back").setOrigin(0, 0);
        this.creditsButton.setScale(2.5)
        //set it so when the button sprite is clicked on it takes the player
        //back to the HomeScreen
        this.creditsButton.setInteractive();
        this.creditsButton.on("pointerdown", function () {
            this.scene.start("Home");
        }, this);
    }

}