// create a new scene
let Boot = new Phaser.Scene('Boot');

//generally would load a logo or loading bar at this point

Boot.create = function() {
    this.scene.start("Loading");
}