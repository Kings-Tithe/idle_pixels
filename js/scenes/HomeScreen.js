// create a new scene
let HomeScreen = new Phaser.Scene('Home');

HomeScreen.create = function(){
    this.scene.start("Game", {
        stageNum: 1,
        coins: 0,
        prev_index: -1
    });
}