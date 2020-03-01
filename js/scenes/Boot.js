let Boot = new Phaser.Scene('Boot');

Boot.create = async function() {
    // Bring in files which need to be retrieved asyncronously (and thus can't be during preload)
    // Sprites found in the JSONs will be loaded in the next scene
    this.game.Monsters = [];
    this.game.Monsters[0] = await $.getJSON("./js/json/monsters/Shark.json");
    this.game.Monsters[1] = await $.getJSON("./js/json/monsters/Skelly.json");
    this.game.Monsters[2] = await $.getJSON("./js/json/monsters/Bat.json");
    this.game.Monsters[3] = await $.getJSON("./js/json/monsters/Blue.json");
    this.game.Monsters[4] = await $.getJSON("./js/json/monsters/Green.json");
    this.game.Monsters[5] = await $.getJSON("./js/json/monsters/Jellyfish.json");
    this.game.Monsters[6] = await $.getJSON("./js/json/monsters/Pink.json");
    this.game.Monsters[7] = await $.getJSON("./js/json/monsters/Red.json");
    this.game.Monsters[8] = await $.getJSON("./js/json/monsters/Starfish.json");
    this.game.Monsters[9] = await $.getJSON("./js/json/monsters/Witch.json");
  
    // Get general scale from 32x32 graphics to screen size
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
  
    // Go to the main asset loading scene
    this.scene.start("Loading");
}