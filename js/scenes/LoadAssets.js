/**Loads assets (images, sound, etc) for use by the Phaser Engine. This means
 * assigning each one a unique key and sending it to Phaser's loader. */
class LoadAssets extends Phaser.Scene {

    constructor() {
        super('LoadAssets');
        /**List of all asset files which need to be loaded */
        this.files = {
            // Images
            'play': 'I./assets/images/play.png',
            'shop': 'I./assets/images/shop.png',
            // Images: Free Use
            'close': 'I./assets/images/free-use/CloseButton.png',
            'closePressed': 'I./assets/images/free-use/CloseButtonPressed.png',
            // Images: Heroes
            'hero': 'I./assets/images/heroes/hero.png',
            'wizard': 'I./assets/images/heroes/wizard.png',
            // Images: Monsters
            'bat': 'I./assets/images/monsters/bat.png',
            'blue': 'I./assets/images/monsters/blue.png',
            'green': 'I./assets/images/monsters/green.png',
            'jellyfish': 'I./assets/images/monsters/jellyfish.png',
            'pink': 'I./assets/images/monsters/pink.png',
            'red': 'I./assets/images/monsters/red.png',
            'shark': 'I./assets/images/monsters/shark.png',
            'skelly': 'I./assets/images/monsters/skelly.png',
            'starfish': 'I./assets/images/monsters/starfish.png',
            'witch': 'I./assets/images/monsters/witch.png',
            // Images: Worlds
            'gothicBg': 'I./assets/images/worlds/gothic.png',
            'slimeBg': 'I./assets/images/worlds/slime.png',
            'waterBg': 'I./assets/images/worlds/water.png',
            // Sounds
            'punch': 'S./assets/sounds/dull_punch.mp3',
            'gothic': 'S./assets/sounds/Gothic_Music.mp3',
            'ocean': 'S./assets/sounds/Ocean_Music.mp3',
            'slap': 'S./assets/sounds/slap.mp3',
            'slime': 'S./assets/sounds/Slime_Music.mp3'
        }
    }

    /**Phaser.Scene method which allows for loading of assets with the Phaser
     * loader. Runs after init() and before create()*/
    preload() {
        // Add dummy assets to test progress bar
        if (window.DUMMY_FILES) for (let i = 0; i < 250; i++)
            this.files[i.toString()] = 'I./assets/images/play.png';

        // Create visual trackers to display script loading progress
        this.createProgressTrackers();

        // Loop through every key in the file list
        for (let key of Object.keys(this.files)) {
            /**Check the type of asset, then load the asset. When loading, take
             * a slice that doesn't include the first character. That first
             * character just tells use the type of asset. */
            if (this.files[key][0] == 'I') {
                this.load.image(key, this.files[key].slice(1));
            } else if (this.files[key][0] == 'S') {
                this.load.audio(key, this.files[key].slice(1));
            }
        }
        // Tracking loading progress
        this.load.on('progress', this.onProgress, this);
        this.load.on('fileprogress', this.onFileProgress, this);
    }

    /**Phaser.Scene method which represents the start of the Scene's behavior.
     * It runs after init() and preload() have completed */
    create() {
        // Start the next scene
        this.scene.start('Splash');
    }

    /**Creates several visual elements to assist in tracking the current
     * progress of scripts being loaded. */
    createProgressTrackers() {
        // Progess bars to track loading
        this.progressBox = this.add.graphics();
        this.progressBar = this.add.graphics();
        // Draw progress bar background
        this.progressBox.fillStyle(0x222222, 0.8);
        this.progressBox.fillRect(160, 295, 320, 50);
        // Create loading texts
        this.loadingText = this.add.text(320, 270, 'Loading Assets...', {
            font: '20px monospace',
            fill: '#ffffff'
        });
        this.loadingText.setOrigin(0.5, 0.5);
        this.percentText = this.add.text(320, 320, '0%', {
            font: '18px monospace',
            fill: '#ffffff'
        });
        this.percentText.setOrigin(0.5, 0.5);
        this.assetText = this.add.text(320, 370, '', {
            font: '18px monospace',
            fill: '#ffffff'
        });
        this.assetText.setOrigin(0.5, 0.5);
    }

    /**Event handler for loader event 'progress'.
     * Gets the current asset loading progress and updates the
     * visual trackers. */
    onProgress(value) {
        this.progressBar.clear();
        this.progressBar.fillStyle(0x777777, 1);
        this.progressBar.fillRect(170, 305, 300 * value, 30);
        this.percentText.setText(parseInt(value * 100) + '%');
    }

    /**Event handler for loader event 'fileprogress'.
     * Gets the current asset being loaded and updates the
     * visual trackers. */
    onFileProgress(file) {
        this.assetText.setText(file.src);
    }

}