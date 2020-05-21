import { Loader, GameObjects, Scene } from 'phaser';
import { DUMMY_FILES } from '../tools/Globals';
import { px, py } from '../tools/PercentCoords';
import { Rnd } from '../tools/Rnd';
import { IDLE_PIXELS_CONFIG } from '../config';

/**
 * Loads assets (images, sound, etc) for use by the Phaser Engine. This means
 * assigning each one a unique key and sending it to Phaser's loader.
 */
export class LoadAssets extends Scene {

    /**List of all asset files which need to be loaded */
    private files: { [key: string]: string };
    /** Box which underlies the loading bar */
    private progressBox: GameObjects.Graphics;
    /** Loading bar which tracks loading progress */
    private progressBar: GameObjects.Graphics;
    /** Text to inform player which graphic is being loaded */
    private assetText: GameObjects.Text;
    /** Percentage text tracking loading progress */
    private percentText: GameObjects.Text;

    /**Creates instance of Scene */
    constructor() {
        super('LoadAssets');
        /**
         * List of all asset files which need to be loaded. Each line starts
         * with an asset type identifying code, then the path to the asset.
         * A = Audio
         * I = Image
         * S = Spritesheet
         */
        this.files = {
            // Images
            // Images: UI
            'credits': 'I' + IDLE_PIXELS_CONFIG.ASSETS_DIRECTORY + 'images/ui/credits.png',
            'options': 'I' + IDLE_PIXELS_CONFIG.ASSETS_DIRECTORY + 'images/ui/options.png',
            'play': 'I' + IDLE_PIXELS_CONFIG.ASSETS_DIRECTORY + 'images/ui/play.png',
            'shop': 'I' + IDLE_PIXELS_CONFIG.ASSETS_DIRECTORY + 'images/ui/shop.png',
            'title': 'I' + IDLE_PIXELS_CONFIG.ASSETS_DIRECTORY + 'images/ui/title.png',
            'back' : 'I' + IDLE_PIXELS_CONFIG.ASSETS_DIRECTORY + 'images/ui/back.png',
            'coin' : 'S' + IDLE_PIXELS_CONFIG.ASSETS_DIRECTORY + 'images/ui/coin.png',
            // Images: Free Use
            'close': 'I' + IDLE_PIXELS_CONFIG.ASSETS_DIRECTORY + 'images/free-use/CloseButton.png',
            'closePressed': 'I' + IDLE_PIXELS_CONFIG.ASSETS_DIRECTORY + 'images/free-use/CloseButtonPressed.png',
            // Images: Heroes
            'hero': 'I' + IDLE_PIXELS_CONFIG.ASSETS_DIRECTORY + 'images/heroes/hero.png',
            'wizard': 'I' + IDLE_PIXELS_CONFIG.ASSETS_DIRECTORY + 'images/heroes/wizard.png',
            // Images: Monsters
            'bat': 'S' + IDLE_PIXELS_CONFIG.ASSETS_DIRECTORY + 'images/monsters/bat.png',
            'blue': 'S' + IDLE_PIXELS_CONFIG.ASSETS_DIRECTORY + 'images/monsters/blue.png',
            'green': 'S' + IDLE_PIXELS_CONFIG.ASSETS_DIRECTORY + 'images/monsters/green.png',
            'jellyfish': 'S' + IDLE_PIXELS_CONFIG.ASSETS_DIRECTORY + 'images/monsters/jellyfish.png',
            'pink': 'S' + IDLE_PIXELS_CONFIG.ASSETS_DIRECTORY + 'images/monsters/pink.png',
            'red': 'S' + IDLE_PIXELS_CONFIG.ASSETS_DIRECTORY + 'images/monsters/red.png',
            'shark': 'S' + IDLE_PIXELS_CONFIG.ASSETS_DIRECTORY + 'images/monsters/shark.png',
            'skelly': 'S' + IDLE_PIXELS_CONFIG.ASSETS_DIRECTORY + 'images/monsters/skelly.png',
            'starfish': 'S' + IDLE_PIXELS_CONFIG.ASSETS_DIRECTORY + 'images/monsters/starfish.png',
            'witch': 'S' + IDLE_PIXELS_CONFIG.ASSETS_DIRECTORY + 'images/monsters/witch.png',
            'mermaid': 'S' + IDLE_PIXELS_CONFIG.ASSETS_DIRECTORY + 'images/monsters/boss_mermaid.png',
            'slimeking': 'S' + IDLE_PIXELS_CONFIG.ASSETS_DIRECTORY + 'images/monsters/boss_slime.png',
            'vampire': 'S' + IDLE_PIXELS_CONFIG.ASSETS_DIRECTORY + 'images/monsters/boss_vampire.png',
            // Images: Worlds
            'gothicBg': 'I' + IDLE_PIXELS_CONFIG.ASSETS_DIRECTORY + 'images/worlds/gothic.png',
            'slimeBg': 'I' + IDLE_PIXELS_CONFIG.ASSETS_DIRECTORY + 'images/worlds/slime.png',
            'waterBg': 'I' + IDLE_PIXELS_CONFIG.ASSETS_DIRECTORY + 'images/worlds/water.png',
            // Sounds
            'punch': 'A' + IDLE_PIXELS_CONFIG.ASSETS_DIRECTORY + 'sounds/dull_punch.mp3',
            'gothic': 'A' + IDLE_PIXELS_CONFIG.ASSETS_DIRECTORY + 'sounds/Gothic_Music.mp3',
            'ocean': 'A' + IDLE_PIXELS_CONFIG.ASSETS_DIRECTORY + 'sounds/Ocean_Music.mp3',
            'slap': 'A' + IDLE_PIXELS_CONFIG.ASSETS_DIRECTORY + 'sounds/slap.mp3',
            'slime': 'A' + IDLE_PIXELS_CONFIG.ASSETS_DIRECTORY + 'sounds/Slime_Music.mp3',
        }

    }

    /**
     * Init is a Phaser Scene method that runs before any of the others. It can
     * be thought of like a sort of follow-up constructor that runs only once
     * the scene is actually being launched (instead of just being added to the
     * game object) 
     */
    init() { }

    /**
     * Phaser.Scene method which allows for loading of assets with the Phaser
     * loader. Runs after init() and before create()
     */
    preload() {
        // Add dummy assets to test progress bar
        if (DUMMY_FILES) for (let i = 0; i < 1000; i++)
            this.files[i.toString()] = this.files[Object.keys(this.files)[Rnd.int(0, 9)]];

        // Create visual trackers to display script loading progress
        this.createProgressTrackers();

        // Loop through every key in the file list
        for (let key of Object.keys(this.files)) {
            /**Check the type of asset, then load the asset. When loading, take
             * a slice that doesn't include the first character. That first
             * character just tells use the type of asset. */
            if (this.files[key][0] == 'S') {
                this.load.spritesheet(key, this.files[key].slice(1), { frameWidth: 32, frameHeight: 32 });
            } else if (this.files[key][0] == 'I') {
                this.load.image(key, this.files[key].slice(1));
            } else if (this.files[key][0] == 'A') {
                this.load.audio(key, this.files[key].slice(1));
            }
        }
        // Tracking loading progress
        this.load.on('progress', this.onProgress, this);
        this.load.on('fileprogress', this.onFileProgress, this);
    }

    /**
     * Phaser.Scene method which represents the start of the Scene's behavior.
     * It runs after init() and preload() have completed
     */
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
        this.progressBox.fillRect(px(25), py(50) - 20, px(50), 50);
        // Create loading texts
        let loadingText = this.add.text(px(50), py(50) - 50,
            'Loading Assets...',
            {
                font: '20px monospace',
                fill: '#ffffff'
            });
        loadingText.setOrigin(0.5, 0.5);
        this.percentText = this.add.text(px(50), py(50),
            '0%',
            {
                font: '18px monospace',
                fill: '#ffffff'
            });
        this.percentText.setOrigin(0.5, 0.5);
        this.assetText = this.add.text(px(50), py(50) + 50,
            '',
            {
                font: '18px monospace',
                fill: '#ffffff'
            });
        this.assetText.setOrigin(0.5, 0.5);
    }

    /**
     * Event handler for loader event 'progress'.
     * Gets the current asset loading progress and updates the
     * visual trackers.
     */
    onProgress(value: number) {
        this.progressBar.clear();
        this.progressBar.fillStyle(0x777777, 1);
        this.progressBar.fillRect(px(25) + 10, py(50) - 15,
            (px(50) - 20) * value, 30);
        this.percentText.setText((value * 100).toFixed(2) + '%');
    }

    /**
     * Event handler for loader event 'fileprogress'.
     * Gets the current asset being loaded and updates the
     * visual trackers.
     */
    onFileProgress(file: Loader.File) {
        this.assetText.setText(file.src);
    }

}