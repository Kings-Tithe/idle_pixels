let Boot = new Phaser.Scene('Boot');

Boot.create = async function() {
    // Bring in files which need to be retrieved asyncronously (and thus can't be during preload)
    // Sprites found in the JSONs will be loaded in the next scene
    //read in level files
    this.game.levels = [];
    this.game.levels[0] = await $.getJSON("./js/json/levels/Slime.json")
    this.game.levels[1] = await $.getJSON("./js/json/levels/Water.json")
    this.game.levels[2] = await $.getJSON("./js/json/levels/Gothic.json")
    //load monster's json for each level
    for (level of this.game.levels){
        for(monster of level.monsters){
            monsters.push(await $.getJSON(monster_path));
        }
    }
  
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