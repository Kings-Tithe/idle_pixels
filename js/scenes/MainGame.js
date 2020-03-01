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
    // Create the first monster
    this.createMonster();
    //add spinning coin
    this.coin = this.add.sprite(35, 50, "gold1").setScale(.1,.1)
    this.coin.play("coinSpin");
    //create the coin counter
    this.createCoinCounter();
}

//----------------------------------------Additional Functions----------------------------------------

MainGame.createMonster = function(){
    //pick a random moster from our list
    this.currentOriginal = this.game.Monsters[Math.trunc(Math.random() * this.game.Monsters.length)];
    this.currentMonster = jQuery.extend(true,{},this.currentOriginal);
    console.log(Math.random() * this.game.Monsters.length);
    //add the sprite to the gamescreen
    this.currentMonster.sprite = this.add.sprite(this.game.globals.centerX,this.game.globals.centerY,this.currentMonster.Name,1);
    // set the sprite's origin to its center
    this.currentMonster.sprite.setOrigin(.5, .5);
    //set sprite scale
    this.currentMonster.sprite.setScale(this.game.globals.scale_monster);
    //set sprite to be interactive
    this.currentMonster.sprite.setInteractive();
    //set the actions to happen when the sprite is clicked on
    this.currentMonster.sprite.on("pointerdown",function (){
        this.coins += 100;
        this.currentMonster.Health -= 5;
        this.updateHealthBar();
        this.updateCoinCounter();
        if (this.currentMonster.Health <= 0){this.killMonster();}
    },this)

    //create monster's health bar
    this.createHealthBar();
}

MainGame.killMonster = function(){
    this.currentMonster.sprite.destroy();
    this.createMonster();
}

MainGame.createHealthBar = function(){
    //create health bar
    this.currentMonster.healthBar = this.add.graphics();
    this.currentMonster.healthBar.fillStyle(0x32a848, 1);
    this.currentMonster.healthBar.fillRect(250, 160, 150, 30);
}

MainGame.updateHealthBar = function(){
    //health bar color codes
    colors = [
        0x42f598 ,
        0x42f578 ,
        0x42f54b ,
        0x69f542 ,
        0xb8a425 ,
        0xb88c25 ,
        0xb87625 ,
        0xb86a25 ,
        0xb85625 ,
        0xb84225 ,
    ]
    //health percentage
    let percentage = this.currentMonster.Health / this.currentOriginal.Health;
    //clear graghics of old health bar
    this.currentMonster.healthBar.clear();
    //redraw and change bar size/color
    this.currentMonster.healthBar.fillStyle(colors[10 - (Math.trunc(percentage * 10))], 1);
    this.currentMonster.healthBar.fillRect(250, 160, Math.trunc(percentage * 150), 30);
}

MainGame.createCoinCounter = function(){
    //create string object and style it
    this.coinText = this.add.text(75,0, "0",{
        font: "100px Ariel", 
        fill: '#ffed70'
    });
    this.coinText.align = "right";
    this.coinText.fontWeight = 'bold';
    //for gold outline "#FFDF00"
    this.coinText.setStroke("#a69a47", 8);
}

MainGame.updateCoinCounter = function(){
    this.coinText.setText(this.coins.toLocaleString());
}