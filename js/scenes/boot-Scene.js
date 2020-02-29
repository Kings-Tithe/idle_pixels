// create a new scene
let BootScene = new Phaser.Scene('Boot');

//generally would load a logo or loading bar at this point

BootScene.create = function() {
    this.scene.start("Loading");
}