// create a new scene
let Loading = new Phaser.Scene('Loading');

// load asset files for our game
Loading.preload = function(){
    //load our assets for use in the game
    //load in our testing image
    this.load.spritesheet("shark","./assets/images/enemies/shark.png", { frameWidth: 32, frameHeight: 32 });
    this.load.image("world-gothic","./assets/images/worlds/gothic.png");
}

Loading.create = function(){
    //go onto the homescreen scene
    this.scene.start("Home");
}