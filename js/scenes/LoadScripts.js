/**
 * Loads additional scripts using jQuery. Loading of large amounts of scripts
 * (levels, monsters, etc) is performed here to prevent crowding in
 * 'index.html' This does not use Phaser's loader and thus cannot be done in
 * the preload() method, but instead in create()
 */
class LoadScripts extends Phaser.Scene {

    /**Creates instance of Scene */
    constructor() {
        super('LoadScripts');
        /**
         * List of all script files which need to be loaded
         * Scripts that were not added in 'index.html' MUST be added here
         * for loading
         */
        this.files = [
            // Sprites
            // Sprites: Heroes
            // Sprites: Monsters
            // Scenes
            // Scenes: Levels
            // Make sure to also add levels to list in "addLevels()" method
            "./js/scenes/levels/SlimeRanch.js",
            // Tools
            "./js/tools/Rnd.js",
            "./js/tools/PercentCoords.js"
        ]
    }

    /**
     * Phaser.Scene method which represents the start of the Scene's behavior.
     * It runs after init() and preload() have completed
     */
    async create() {
        // Add dummy scripts to test progress bar
        if (window.DUMMY_FILES) for (let i = 0; i < 250; i++)
            this.files.push('./js/tools/DoNothing.js');

        // Log list of additional scripts
        if (window.LOGGING) console.log("Loading additional scripts: ", this.files);

        // Create visual trackers to display script loading progress
        this.createProgressTrackers();

        // Load and wait on various scripts
        for (let file of this.files) {
            // Update loading file text
            this.scriptText.setText(file);
            // Get the script
            await $.getScript(file);
            // Update number of files processed
            this.updateProgress();
        }

        // Add all the levels that were loaded from scripts above to the game
        this.addLevels();

        // Start the next scene
        this.scene.start('LoadAssets');
    }

    /**
     * Adds a set of classes (loaded above from list of scripts) to the game's
     * scene list and to a list of keys associated with Level scenes.
     * Levels need to be added to the list below and the script list in the
     * constructor.
     */
    addLevels() {
        // A list of levels from the above scripts to add to the game
        let levels = {
            "SlimeRanch": SlimeRanch
        }
        for (let key of Object.keys(levels)) {
            window.LEVELS.push(key);
            this.scene.add(key, levels[key]);
        }
    }

    /**
     * Creates several visual elements to assist in tracking the current
     * progress of scripts being loaded.
     */
    createProgressTrackers() {
        // Total number of files and number processed for tracking progess
        this.total = this.files.length;
        this.processed = 0;
        // Progess bars to track loading
        this.progressBox = this.add.graphics();
        this.progressBar = this.add.graphics();
        // Draw progress bar background
        this.progressBox.fillStyle(0x222222, 0.8);
        this.progressBox.fillRect(window.CENTER.x / 2, window.CENTER.y - 25,
            window.CENTER.x, 50);
        // Create loading texts
        this.loadingText = this.add.text(window.CENTER.x, window.CENTER.y - 50,
            'Loading Scripts...',
            {
                font: '20px monospace',
                fill: '#ffffff'
            });
        this.loadingText.setOrigin(0.5, 0.5);
        this.percentText = this.add.text(window.CENTER.x, window.CENTER.y,
            '0%',
            {
                font: '18px monospace',
                fill: '#ffffff'
            });
        this.percentText.setOrigin(0.5, 0.5);
        this.scriptText = this.add.text(window.CENTER.x, window.CENTER.y + 50,
            '',
            {
                font: '18px monospace',
                fill: '#ffffff'
            });
        this.scriptText.setOrigin(0.5, 0.5);
    }

    /**
     * Updates the number of loaded scripts and the visual representations
     * of our current progress.
     */
    updateProgress() {
        this.processed++;
        // Update the progess bar
        this.progressBar.clear();
        this.progressBar.fillStyle(0x777777, 1);
        this.progressBar.fillRect(window.CENTER.x / 2 + 10, window.CENTER.y - 15,
            (window.CENTER.x - 20) * (this.processed / this.total), 30);
        // Update progress percentage
        this.percentText.setText(parseInt((this.processed / this.total) * 100) + '%');
    }

}