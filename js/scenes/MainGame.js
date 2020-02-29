// create a new scene
let MainGame = new Phaser.Scene('Game');

MainGame.init = function(){
    this.coins = 0;     //used to keep track of how many coins we've collected
}

MainGame.preload = function (){
    //load in our testing image
    this.load.image("ooze_Test","./assets/images/enemies/ooze_test.jpg");
    this.load.image("background","./assets/images/backgrounds/grassy_plains.jpg");
}

MainGame.create = function (){
    //create background image
    let bg = this.add.sprite(0,0,"background").setOrigin(0,0);
    bg.setScale(.7,.7)


    //add test ooze enemy
    let testOoze = this.add.sprite(360,240,"ooze_Test").setInteractive();
    testOoze.setScale(.3,.3);
    //set test ooze enemy to add coins when being clicked.
    testOoze.on("pointerdown",function (){
        this.coins += 5;
        console.log("you coins are now: " + this.coins);
    },this)

    $.getJSON("./js/json/monsters/Shark.json", (sharkfile) => {
        console.log(sharkfile);
    });

}