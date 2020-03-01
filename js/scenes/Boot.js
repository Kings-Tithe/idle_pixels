// create a new scene
let Boot = new Phaser.Scene('Boot');

//generally would load a logo or loading bar at this point

Boot.create = function() {
    let scale = Math.min(this.cameras.main.width / 32, this.cameras.main.height / 32);
    // Create a global object
    this.game.globals = {
        height: this.cameras.main.height,
        width: this.cameras.main.width,
        centerX: this.cameras.main.width / 2,
        centerY: this.cameras.main.height / 2,
        scale_screen: scale,
        scale_monster: scale * .3
    };
    this.scene.start("Loading");
}