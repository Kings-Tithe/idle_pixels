// create a new scene
let MainGame = new Phaser.Scene('Game');

MainGame.init = function(){
    this.coins = 0;     //used to keep track of how many coins we've collected
}

MainGame.preload = function (){
}

MainGame.create = function (){
    //create background image
    let bg = this.add.image(0,0,"bg-forest");
    bg.setOrigin(0,0);
    bg.setScale(.7,.7)


    //add test ooze enemy
    let shark = this.add.sprite(360,240,"shark", 0);
    shark.setInteractive();
    shark.setScale(.3,.3);
    //set test ooze enemy to add coins when being clicked.
    shark.on("pointerdown",function (){
        this.coins += 5;
        console.log("you coins are now: " + this.coins);
    },this)
}