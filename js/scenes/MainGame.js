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
}

MainGame.createMonster = function(){
    //pick a random moster from our list
    let ref = this.game.Monsters[Math. trunc(Math.random() * this.game.Monsters.length)];
    this.currentMonster = jQuery.extend(true,{},ref);
    console.log(Math.random() * this.game.Monsters.length);
    //add the sprite to the gamescreen
    this.currentMonster.sprite = this.add.sprite(this.game.globals.centerX,this.game.globals.centerY,this.currentMonster.Name,1);
    console.log(this.currentMonster, ref);
    // set the sprite's origin to its center
    this.currentMonster.sprite.setOrigin(.5, .5);
    //set sprite scale
    this.currentMonster.sprite.setScale(this.game.globals.scale_monster);
    //set sprite to be interactive
    this.currentMonster.sprite.setInteractive();
    //create health bar
    this.currentMonster.healthBar = this.add.graphics();
    this.currentMonster.healthBar.fillStyle(0x32a848, 1);
    this.currentMonster.healthBar.fillRect(300, 160, 100, 20);
    //set the actions to happen when the sprite is clicked on
    this.currentMonster.sprite.on("pointerdown",function (){
        this.coins += 5;
        this.currentMonster.Health -= 5;
        console.log("you coins are now: " + this.coins, this.currentMonster.Health);
        if (this.currentMonster.Health <= 0){this.killMonster();}
    },this)
}

MainGame.killMonster = function(){
    this.currentMonster.sprite.destroy();
    this.createMonster();
}