// create a new scene
let Loading = new Phaser.Scene('Loading');

// load asset files for our game
Loading.preload = function(){
    //load our assets for use in the game

    //go onto the homescreen scene
    this.scene.start("Home");
}