// create a new scene
let LoadingScene = new Phaser.Scene('Loading');

// load asset files for our game
LoadingScene.preload = function(){
    //load our assets for use in the game

    //go onto the homescreen scene
    this.scene.start("Home");
}