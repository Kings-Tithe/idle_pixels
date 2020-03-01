// create a new scene
let Loading = new Phaser.Scene('Loading');

// load asset files for our game
Loading.preload = function () {
    // load monsters spritesheets
    for (monster of this.game.monsterList) {
        this.load.spritesheet(monster.key, monster.spriteSheet, { frameWidth: 32, frameHeight: 32 });
    }
    // level backgrounds
    for (level of this.game.levelList) {
        this.load.image('bg_' + level.key, level.background)
    }
    //load coin sprites
    for (let i = 1; i < 11; i++) {
        this.load.image("gold" + i, "./assets/free-use/coin/Gold_" + i + ".png");
    }
    //loud sound effects
    this.load.audio("punch","./assets/sounds/dull_punch.mp3");
    this.load.audio("slap","./assets/sounds/slap.mp3");
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
            { key: 'gold9', duration: 10 },
        ],
        frameRate: 25,
        repeat: -1
    });

    for (monster of this.game.monsterList) {
        //idle character animation
        this.anims.create({
            key: monster.key + "_idle",
            frames: this.anims.generateFrameNames(monster.key, { frames: [0, 1] }),
            frameRate: 2,
            repeat: -1
        })
        //death character animation
        this.anims.create({
            key: monster.key + "_death",
            frames: this.anims.generateFrameNames(monster.key, { frames: [2] }),
            frameRate: 0,
            repeat: -1
        })
    }
    

    //go onto the homescreen scene
    this.scene.start("Home");
}
