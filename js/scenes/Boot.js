// create a new scene
let Boot = new Phaser.Scene('Boot');

//generally would load a logo or loading bar at this point

Boot.create = async function() {
    this.game.Monsters = [];
    this.game.Monsters[0] = await $.getJSON("./js/json/monsters/Shark.json");
    this.game.Monsters[1] = await $.getJSON("./js/json/monsters/Skelly.json");
    this.scene.start("Loading");
}