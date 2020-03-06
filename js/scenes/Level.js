class Level extends Phaser.Scene {
    /**
     * Creates instance of Level scene
     * @param {String} sceneKey The key that Phaser uses to load this scene.
     */
    constructor(sceneKey) {
        super(sceneKey);
        // Save the scene's key
        this.key = sceneKey;
        /**
         * Name displayed in the level's splash text
         * @type {String}
         */
        this.name = "";
        /**
         * Key of the level's background image
         * @type {String}
         */
        this.bg = '';
        /**
         * Monsters that this level uses
         * @type {Array.<Class>} array of classes extending Monster
         */
        this.monsters = [];
        /**
         * Monster this level uses as its boss.
         * @type {Class} class extending Monster
         */
        this.boss = null;
    }

    /**
     * Init is a Phaser Scene method that runs before any of the others. It can
     * be thought of like a sort of follow-up constructor that runs only once
     * the scene is actually being launched (instead of just being added to the
     * game object)
     * @param {{player: Player, stage: number}} levelData Object that contains
     *   data transferred between levels.
     */
    init(levelData) {
        this.p = PercentCoords;
        this.player = levelData.player;
        this.stage = levelData.stage + 1;
        this.slain = 0;
    }

    /**
     * Phaser.Scene method which represents the start of the Scene's behavior.
     * It runs after init() and preload() have completed
     */
    create() {
        // Create background image
        let bg = this.add.image(this.p.x(50), this.p.y(50), this.bg);
        bg.setScale(20);
    }

    nextLevel() {
        let key = this.key;
        while (key == this.key) {
            key = this.levels[Rnd.int(0, this.levels.length - 1)];
        }
        this.scene.start(key, {
            player: this.player,
            stage: this.stage
        });
    }

}