// create a new scene
let MainGame = new Phaser.Scene('Game');

MainGame.init = function () {
    this.coins = 0;     //used to keep track of how many coins we've collected
}

MainGame.preload = function () {
}

MainGame.create = function () {
    //create background image
    let bg = this.add.image(this.game.globals.centerX, this.game.globals.centerY, 'world-gothic');
    bg.setScale(this.game.globals.scale_screen);

    //add test shark enemy
    let shark = this.add.sprite(this.game.globals.centerX, this.game.globals.centerY, "shark", 0);
    shark.setOrigin(.5, .5);
    shark.setInteractive();
    shark.setScale(this.game.globals.scale_monster);
    //set test ooze enemy to add coins when being clicked.
    shark.on("pointerdown", function () {
        this.coins += 5;
        console.log("you coins are now: " + this.coins);
    }, this)

    $.getJSON("./js/json/monsters/Shark.json", (sharkfile) => {
        console.log(sharkfile);
    });

}