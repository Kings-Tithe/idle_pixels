// create a new scene
let Loading = new Phaser.Scene('Loading');

// load asset files for our game
Loading.preload = function () {
    //load our assets for use in the game
    //load in our testing image
    this.load.image("bg-forest", "./assets/free-use/forest.png");
    //load monsters sprites
    for (monster of this.game.Monsters) {
        this.load.spritesheet(monster.Name, monster.SpriteSheet, { frameWidth: 32, frameHeight: 32 });
    }
}

Loading.create = function () {
    //go onto the homescreen scene
    this.scene.start("Home");
}
