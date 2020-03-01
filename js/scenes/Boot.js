let Boot = new Phaser.Scene('Boot');

Boot.create = async function () {
    // Read in the levels and monsters
    // Lists are for iteration, objects for lookup
    this.game.monsters = {};
    this.game.levels = {};
    this.game.monsters = await $.getJSON("./js/json/monsters.json");
    this.game.levels = await $.getJSON("./js/json/levels.json");
    // Create list equivalents to get values from
    this.game.monsterList = vList(this.game.monsters);
    this.game.levelList = vList(this.game.levels);

    // Get general scale from 32x32 graphics to screen size
    let scale = Math.min(this.cameras.main.width / 32, this.cameras.main.height / 32);
    // Create a global object
    this.game.globals = {
        height: this.cameras.main.height,
        width: this.cameras.main.width,
        centerX: this.cameras.main.width / 2,
        centerY: this.cameras.main.height / 2,
        scale_screen: scale,
        scale_monster: scale * .3,
        scale_ui: scale * .15
    };

    // Go to the main asset loading scene
    this.scene.start("Loading");
}