// create a new scene
let Loading = new Phaser.Scene('Loading');

// load asset files for our game
Loading.preload = function () {
    // load monsters spritesheets
    for (monster of this.game.Monsters) {
        this.load.spritesheet(monster.Name, monster.SpriteSheet, { frameWidth: 32, frameHeight: 32 });
    }
    // load test world
    this.load.image("world-gothic","./assets/images/worlds/gothic.png");
}

Loading.create = function () {
    //go onto the homescreen scene
    this.scene.start("Home");
}
