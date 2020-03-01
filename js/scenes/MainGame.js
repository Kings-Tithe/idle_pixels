// create a new scene
let MainGame = new Phaser.Scene('Game');

MainGame.init = function(){
    this.coins = 0;     //used to keep track of how many coins we've collected
}

MainGame.preload = function (){
}

MainGame.create = function (){
    //create background image
    // let bg = this.add.image(0,0,"bg-forest");
    // bg.setOrigin(0,0);
    // bg.setScale(.7,.7)


    //add test ooze enemy
    this.game.Monsters[0].sprite = this.add.sprite(360,240,"Shark",1).setScale(2,2);
    this.game.Monsters[0].sprite.setInteractive();
    console.log(this.game.Monsters[0].sprite);
    //set test ooze enemy to add coins when being clicked.
    this.game.Monsters[0].sprite.on("pointerdown",function (){
        this.coins += 5;
        console.log("you coins are now: " + this.coins);
        //console.log()
    },this)
}