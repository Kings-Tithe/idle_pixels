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
    //load coin sprites
    for (let i = 1; i < 11; i++){
        this.load.image("gold"+ i, "./assets/free-use/coin/Gold_" + i + ".png");
    }
}

Loading.create = function () {
    //--------------------Animations------------------------------
    this.anims.create({
        key: "coinSpin",
        frames: [
            { key: 'gold1' },
            { key: 'gold2' },
            { key: 'gold3' },
            { key: 'gold4' },
            { key: 'gold5' },
            { key: 'gold6' },
            { key: 'gold7' },
            { key: 'gold8' },
            { key: 'gold9' , duration: 10 },
        ],
        frameRate: 25,
        repeat: -1
    });

    for(monster of this.game.Monsters){
        this.anims.create({
        key: monster.Name + "Idle",
        frames: this.anims.generateFrameNames(monster.Name, {frames: [0, 1]}),
        frameRate: 2,
        repeat: -1})
    }

    //go onto the homescreen scene
    this.scene.start("Home");
}
