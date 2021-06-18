import { GameObjects, Scene } from 'phaser';
import { px, py } from '../tools/PercentCoords';
import { soundHandler } from "../main"

/**
 * Loads assets (images, sound, etc) for use by the Phaser Engine. This means
 * assigning each one a unique key and sending it to Phaser's loader.
 */
export class LoadAssets extends Scene {

    /**Creates instance of Scene */
    constructor() {
        super('LoadAssets');
    }

    /**
     * Phaser.Scene method which allows for loading of assets with the Phaser
     * loader. Runs after init() and before create()
     */
    preload() {
        let logo: GameObjects.Sprite = this.add.sprite(px(50), py(50) - 50, 'hero')
            .setOrigin(0.5, 0.5)
            .setScale(10)
            .setAlpha(1);
        // Fade in and out 2 times
        this.add.tween({
            targets: [logo],
            alpha: 0,
            duration: 500,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1,
        });
        // Create loading bars and callbacks based on loading progress
        this.trackProgess();

        // Config for loading spritesheets
        const ssconf = { frameWidth: 32, frameHeight: 32 };

        // Images: UI
        this.load.image('kings-tithe', './assets/images/kings-tithe-shark.png');
        this.load.image('credits', './assets/images/ui/credits.png');
        this.load.image('options', './assets/images/ui/options.png');
        this.load.image('play', './assets/images/ui/play.png');
        this.load.image('shop', './assets/images/ui/shop.png');
        this.load.image('title', './assets/images/ui/title.png');
        this.load.image('back', './assets/images/ui/back.png');
        this.load.image('optionsbg', './assets/images/ui/options_menu_bg.png');
        this.load.spritesheet('coin', './assets/images/ui/coin.png', ssconf);
        // Images: UI Skull
        this.load.image('skull_down0', './assets/images/ui/skull/down/skull_down0.png');
        this.load.image('skull_down1', './assets/images/ui/skull/down/skull_down1.png');
        this.load.image('skull_down2', './assets/images/ui/skull/down/skull_down2.png');
        this.load.image('skull_down3', './assets/images/ui/skull/down/skull_down3.png');
        this.load.image('skull_down-left0', './assets/images/ui/skull/down-left/skull_down-left0.png');
        this.load.image('skull_down-left1', './assets/images/ui/skull/down-left/skull_down-left1.png');
        this.load.image('skull_down-left2', './assets/images/ui/skull/down-left/skull_down-left2.png');
        this.load.image('skull_down-left3', './assets/images/ui/skull/down-left/skull_down-left3.png');
        this.load.image('skull_down-right0', './assets/images/ui/skull/down-right/skull_down-right0.png');
        this.load.image('skull_down-right1', './assets/images/ui/skull/down-right/skull_down-right1.png');
        this.load.image('skull_down-right2', './assets/images/ui/skull/down-right/skull_down-right2.png');
        this.load.image('skull_down-right3', './assets/images/ui/skull/down-right/skull_down-right3.png');
        this.load.image('skull_left0', './assets/images/ui/skull/left/skull_left0.png');
        this.load.image('skull_left1', './assets/images/ui/skull/left/skull_left1.png');
        this.load.image('skull_left2', './assets/images/ui/skull/left/skull_left2.png');
        this.load.image('skull_left3', './assets/images/ui/skull/left/skull_left3.png');
        this.load.image('skull_right0', './assets/images/ui/skull/right/skull_right0.png');
        this.load.image('skull_right1', './assets/images/ui/skull/right/skull_right1.png');
        this.load.image('skull_right2', './assets/images/ui/skull/right/skull_right2.png');
        this.load.image('skull_right3', './assets/images/ui/skull/right/skull_right3.png');
        this.load.image('skull_up0', './assets/images/ui/skull/up/skull_up0.png');
        this.load.image('skull_up1', './assets/images/ui/skull/up/skull_up1.png');
        this.load.image('skull_up2', './assets/images/ui/skull/up/skull_up2.png');
        this.load.image('skull_up3', './assets/images/ui/skull/up/skull_up3.png');
        this.load.image('skull_up-left0', './assets/images/ui/skull/up-left/skull_up-left0.png');
        this.load.image('skull_up-left1', './assets/images/ui/skull/up-left/skull_up-left1.png');
        this.load.image('skull_up-left2', './assets/images/ui/skull/up-left/skull_up-left2.png');
        this.load.image('skull_up-left3', './assets/images/ui/skull/up-left/skull_up-left3.png');
        this.load.image('skull_up-right0', './assets/images/ui/skull/up-right/skull_up-right0.png');
        this.load.image('skull_up-right1', './assets/images/ui/skull/up-right/skull_up-right1.png');
        this.load.image('skull_up-right2', './assets/images/ui/skull/up-right/skull_up-right2.png');
        this.load.image('skull_up-right3', './assets/images/ui/skull/up-right/skull_up-right3.png');
        // Images: Free Use
        this.load.image('close', './assets/images/free-use/CloseButton.png');
        this.load.image('closePressed', './assets/images/free-use/CloseButtonPressed.png');
        // Images: Heroes
        // this.load.image('hero', './assets/images/heroes/hero.png'); // Loaded in Boot
        this.load.image('wizard', './assets/images/heroes/wizard.png');
        // Images: Monsters
        this.load.spritesheet('bat', './assets/images/monsters/bat.png', ssconf);
        this.load.spritesheet('blue', './assets/images/monsters/blue.png', ssconf);
        this.load.spritesheet('green', './assets/images/monsters/green.png', ssconf);
        this.load.spritesheet('jellyfish', './assets/images/monsters/jellyfish.png', ssconf);
        this.load.spritesheet('pink', './assets/images/monsters/pink.png', ssconf);
        this.load.spritesheet('red', './assets/images/monsters/red.png', ssconf);
        this.load.spritesheet('shark', './assets/images/monsters/shark.png', ssconf);
        this.load.spritesheet('skelly', './assets/images/monsters/skelly.png', ssconf);
        this.load.spritesheet('starfish', './assets/images/monsters/starfish.png', ssconf);
        this.load.spritesheet('witch', './assets/images/monsters/witch.png', ssconf);
        this.load.spritesheet('mermaid', './assets/images/monsters/boss_mermaid.png', ssconf);
        this.load.spritesheet('slimeking', './assets/images/monsters/boss_slime.png', ssconf);
        this.load.spritesheet('vampire', './assets/images/monsters/boss_vampire.png', ssconf);
        // Images: Worlds
        this.load.image('gothicBg', './assets/images/worlds/gothic_extended.png');
        this.load.image('slimeBg', './assets/images/worlds/slime_extended.png');
        this.load.image('waterBg', './assets/images/worlds/water_extended.png');

        // Loading sounds
        this.load.audio('attack0', './assets/sounds/Jab.mp3');
        this.load.audio('attack1', './assets/sounds/Left Hook.mp3');
        this.load.audio('attack2', './assets/sounds/Punch_Hd.mp3');
        this.load.audio('gothic', './assets/sounds/Gothic_Music.mp3');
        this.load.audio('ocean', './assets/sounds/Ocean_Music.mp3');
        this.load.audio('slime', './assets/sounds/Slime_Music.mp3');
        this.load.audio('menumusic', './assets/sounds/Menu-Music.mp3');
    }

    /**
     * Phaser.Scene method which represents the start of the Scene's behavior.
     * It runs after init() and preload() have completed
     */
    create() {
        // Adding sounds to the sound manager
        this.addSound('attack0', 'attack');
        this.addSound('attack1', 'attack');
        this.addSound('attack2', 'attack');
        this.addSound('gothic', 'gothic');
        this.addSound('ocean', 'ocean');
        this.addSound('slime', 'slime');
        this.addSound('menumusic', 'menumusic');
        // Set custom configs for sounds that need them
        soundHandler.setConfig("menumusic", soundHandler.globalVolume, true);
        soundHandler.setConfig("slime", .15, true);
        soundHandler.setConfig("ocean", .15, true);
        soundHandler.setConfig("gothic", .15, true);
        // Start the next scene
        this.scene.start('Home');
    }

    addSound(cacheKey: string, handlerKey: string): void {
        let sound = this.sound.add(cacheKey);
        soundHandler.addSound(handlerKey, sound);
    }

    /**
     * Create loading bars and callbacks based on loading progress
     */
    trackProgess(): void {
        this.add.rectangle(px(50), py(75), px(50), 50, 0x222222, 0.8);
        let bar: Phaser.GameObjects.Rectangle = this.add.rectangle(px(50), py(75), (px(50) - 20), 30, 0x777777, 1);
        // Create text that just says "loading assets"
        let loadingText = this.add.text(px(50), py(75) - 50,
            'Loading Assets...',
            {
                font: '20px monospace',
                fill: '#ffffff'
            });
        loadingText.setOrigin(0.5, 0.5);
        // Create the text that tracks progress percentage
        let percent = this.add.text(px(50), py(75),
            '0%',
            {
                font: '18px monospace',
                fill: '#ffffff'
            });
        percent.setOrigin(0.5, 0.5);
        // Create text that displays the currently loading file
        let asset = this.add.text(px(50), py(75) + 50,
            '',
            {
                font: '18px monospace',
                fill: '#ffffff'
            });
        asset.setOrigin(0.5, 0.5);
        // Tracking loading progress
        this.load.on('progress', (p) => {
            percent.setText((p * 100).toFixed(2) + '%');
            bar.setScale(p, 1);
        });
        this.load.on('fileprogress', (file) => {
            asset.setText(file.src);
        });
    }
}