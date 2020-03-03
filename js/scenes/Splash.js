/**Creates and animates a splash screen before launching into the main game */
class Splash extends Phaser.Scene {

    /**Creates instance of Scene */
    constructor() {
        super('Splash');
    }

    /**Phaser.Scene method which represents the start of the Scene's behavior.
     * It runs after init() and preload() have completed */
    create() {
        // Create the splash screen visuals
        let logo = this.add.sprite(335, 305, 'hero')
            .setOrigin(0.5, 0.5)
            .setScale(10)
            .setAlpha(0);
        let text = this.add.text(320, 470, 'Idle Pixels', {
            fontFamily: "Lucida Console, Monaco, monospace",
            fontSize: '32px'
        })
            .setOrigin(0.5, 0.5)
            .setAlpha(0);
        // Fade in and out 3 times
        let fade = this.add.tween({
            targets: [logo, text],
            alpha: 1,
            duration: 500,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: 2,
            callbackScope: this,
            onComplete: (tween, targets) => {
                this.scene.start('Home');
            }
        });
    }
}