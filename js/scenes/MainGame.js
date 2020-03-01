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


    this.createMonster();
}

MainGame.createMonster = function(){
    //pick a random moster from our list
    let ref = this.game.Monsters[Math. trunc(Math.random() * this.game.Monsters.length)];
    this.currentMonster = jQuery.extend(true,{},ref);
    console.log(Math.random() * this.game.Monsters.length)
    //add the sprite to the gamescreen
    this.currentMonster.sprite = this.add.sprite(360,240,this.currentMonster.Name,1);
    console.log(this.currentMonster, ref);
    //set sprite scale
    this.currentMonster.sprite.setScale(2,2);
    //set sprite to be interactive
    this.currentMonster.sprite.setInteractive();
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