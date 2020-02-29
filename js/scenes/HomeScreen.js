// create a new scene
let HomeScreen = new Phaser.Scene('Home');

HomeScreen.create = function(){
    this.scene.start("Game");
}