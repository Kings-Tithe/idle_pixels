/**
 *      Phaser Game Scene - Credits
 *  It plays a scrolling set of text giving credit
 *  to everyone that contributed to the game.
 */

import { CENTER,GAME_HEIGHT } from '../tools/Globals';

//Scene for credits
export class Credits extends Phaser.Scene {
    /**Creates instance of Scene */
   constructor(){
       super("Credits");
   }

   //Member Varibles

   //strings
   /** used to store the string containing all the credits for the game */
   creditString: string = "";

   //numbers
   /** Used to store the size of the font in pixels */
   fontSize: number;
   /** Used to store the spacing between lines in pixels */
   spacing: number;
   /** Used to store the height of creditString in pixels */
   creditStringHeight: number;

   //phaser text
   /** Stores the graghic version of creditString */
   splashText: Phaser.GameObjects.Text;

   //tweens
   /** Twwen that slowly scrolls splashText across the screen from bottom to top */
   scrollTween: Phaser.Tweens.Tween;

   //images
   /** Button used to return to the home screen */
   creditsButton: Phaser.GameObjects.Image;

   //Sounds
   /** The music that plays During this scene */
   bgMusic: Phaser.Sound.BaseSound;

   /**Init is a Phaser Scene method that runs before any of the others. It can
    * be thought of like a sort of follow-up constructor that runs only once
    * the scene is actually being launched (instead of just being added to the
    * game object) */
   init() {

       //Actual text to be displayed, speerated by lines to make code more readable
       //no Height limit
       //Limit of 55 characters for width to keep formatting
       //First line acts as a great guide
       this.creditString += "The following great people worked on Idle Pixels:\n\n"
       this.creditString += "Art assets, frame animations, ui design, Artist:\n"
       this.creditString += "Gracie Glebe\n\n"
       this.creditString += "Interface implementation, typescript conversions,\n"
       this.creditString += "core gameplay, Project lead:\n"
       this.creditString += "Zachary Kingcade\n\n"
       this.creditString += "State management and class structures, Build Scripts\n"
       this.creditString += "Former project lead:\n"
       this.creditString += "Jeremy Glebe\n\n"
       this.creditString += "Music and sound design, Audio Advisor:\n"
       this.creditString += "Kaleb Brown\n\n\n"
       this.creditString += "A Special Thanks to the following free assets artists\n\n"
       this.creditString += "Audio from AudioBible.com:\n"
       this.creditString += "Punch HD Sound by Mark DiAngelo\n"
       this.creditString += "Jab Sound by Mike Koenig\n"
       this.creditString += "Left Hook Sound by Mike Koenig\n\n\n"
       this.creditString += "And you for checking out our game!\n"
       
       



       //set the font size and spacing of the text in pixels
       //(soon to be in relative size)
       this.fontSize = 20;
       this.spacing = this.fontSize/4;
       //calculate text element size
       this.creditStringHeight = (this.creditString.split('\n').length) * (this.fontSize + this.spacing) + (this.spacing * 2);
   };

   /**Phaser.Scene method which represents the start of the Scene's behavior.
    * It runs after init() and preload() have completed */
   create() {
       //Create The Text Graphic element for the credit's text
       this.splashText = this.add.text(CENTER.x, GAME_HEIGHT, this.creditString,{
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
           y : 0 - this.creditStringHeight,
           duration: 30 * this.creditStringHeight,
           paused: false,
           yoyo: false,
           repeatDelay: 2000,
           repeat: -1,
       });


       //add back button
       this.creditsButton = this.add.sprite(0,0,"back").setOrigin(0,0);
       this.creditsButton.setScale(2.5)
       //set it so when the button sprite is clicked on it takes the player
       //back to the HomeScreen
       this.creditsButton.setInteractive();
       this.creditsButton.on("pointerdown",function(){
           this.scene.start("Home");
       },this);
   }
   
}