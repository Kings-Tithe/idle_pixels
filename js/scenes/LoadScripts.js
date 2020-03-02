/**Loads additional scripts using jQuery. Loading of large amounts of scripts
 * (levels, monsters, etc) is performed here to prevent crowding in
 * 'index.html' This does not use Phaser's loader and thus cannot be done in
 * the preload() method, but instead in create()
 */
class LoadScripts extends Phaser.Scene {

    constructor() {
        super({
            key: 'LoadScripts'
        });
        /**List of all script files which need to be loaded
         * Scripts that were not added in 'index.html' MUST be added here
         * for loading */
        this.files = [
            // Sprites
            // Sprites: Heroes
            // Sprites: Monsters
            // Scenes
            // Scenes: Levels
            // Tools
            "./js/tools/Rnd.js"
        ]
    }

    async create() {
        // Add dummy scripts to test progress bar
        if (window.DUMMY_FILES) for (let i = 0; i < 1000; i++)
            this.files.push('./js/tools/DoNothing.js');

        // Total number of files and number processed for tracking progess
        let total = this.files.length;
        let processed = 0;

        // Progess bars to track loading
        let progressBox = this.add.graphics();
        let progressBar = this.add.graphics();
        // Draw progress bar background
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(160, 295, 320, 50);

        // Log list of additional scripts
        if (window.LOGGING) console.log("Loading additional scripts: ", this.files);

        // Load and wait on various scripts
        for (let file of this.files) {
            await $.getScript(file);
            // Update number of files processed
            processed++;
            // Update the progess bar
            progressBar.clear();
            progressBar.fillStyle(0x777777, 1);
            progressBar.fillRect(170, 305, 300 * (processed / total), 30);
        }

        // Launch the next scene (LoadAssets)
        this.game.scene.start('LoadAssets');
    }

}