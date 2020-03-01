// create a new scene
let MainGame = new Phaser.Scene('Game');

MainGame.init = function(){
    this.coins = 0;     //used to keep track of how many coins we've collected
}

MainGame.preload = function (){
}

MainGame.create = function (){
    //create background image
    let bg = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'bg-forest')
    let scaleX = this.cameras.main.width / bg.width
    let scaleY = this.cameras.main.height / bg.height
    let scale = Math.max(scaleX, scaleY)
    bg.setScale(scale).setScrollFactor(0)

    //add test shark enemy
    let shark = this.add.sprite(360,240,"shark", 0);
    shark.setInteractive();
    shark.setScale(.3,.3);
    //set test ooze enemy to add coins when being clicked.
    shark.on("pointerdown",function (){
        this.coins += 5;
        console.log("you coins are now: " + this.coins);
    },this)

    $.getJSON("./js/json/monsters/Shark.json", (sharkfile) => {
        console.log(sharkfile);
    });

}