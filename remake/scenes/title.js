class TitleScene extends ScenePlus {
    constructor() { super("Title") }

    preload() {
        this.load.image('title', './assets/title-bg.png');
    }

    create() {
        // Add the background image
        this.add.image(GAME_CENTER.x, GAME_CENTER.y, 'title').setScale(6);
        // Lazy load background music and then play
        this.lazy('audio', 'theme', './assets/idle-pixels-theme.mp3', () => {
            let theme = this.sound.add('theme', { volume: 0.25 });
            theme.play();
        });
        // Add a play button
        this.lazy('image', 'play-button', './assets/play-button.png', () => {
            this.add.image(GAME_CENTER.x, GAME_CENTER.y - 100, 'play-button')
                .setScale(5).setInteractive()
                .on('pointerdown', () => {
                    console.log("PLAYING")
                });
        });
    }
}