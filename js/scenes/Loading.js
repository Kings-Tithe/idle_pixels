// create a new scene
let Loading = new Phaser.Scene('Loading');

// load asset files for our game
Loading.preload = function () {
    console.log(this.game.levels)
    // load monsters spritesheets
    for (monster of vList(this.game.monsters)) {
        console.log(monster);
        this.load.spritesheet(monster.name, monster.spriteSheet, { frameWidth: 32, frameHeight: 32 });
    }
    // level backgrounds
    for (level of vList(this.game.levels)) {
        this.load.image('bg_' + level.key, level.background)
    }
    //load coin sprites
    for (let i = 1; i < 11; i++) {
        this.load.image("gold" + i, "./assets/free-use/coin/Gold_" + i + ".png");
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
            { key: 'gold9', duration: 10 },
        ],
        frameRate: 25,
        repeat: -1
    });

    for (monster of vList(this.game.monsters)) {
        //idle character animation
        this.anims.create({
            key: monster.key + "_idle",
            frames: this.anims.generateFrameNames(monster.name, { frames: [0, 1] }),
            frameRate: 2,
            repeat: -1
        })
        //death character animation
        this.anims.create({
            key: monster.key + "_death",
            frames: this.anims.generateFrameNames(monster.name, { frames: [2] }),
            frameRate: 0,
            repeat: -1
        })
    }

    //go onto the homescreen scene
    this.scene.start("Home");
}
