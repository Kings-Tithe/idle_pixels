// create a new scene
let HomeScreenScene = new Phaser.Scene('Home');

HomeScreenScene.create = function(){
    this.scene.start("Game");
}