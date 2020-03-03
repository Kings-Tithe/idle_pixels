/**Creates and animates a splash screen before launching into the main game */
class Splash extends Phaser.Scene {

    /**Creates instance of Scene */
    constructor() {
        super('Splash');
    }

    /**Init is a Phaser Scene method that runs before any of the others. It can
     * be thought of like a sort of follow-up constructor that runs only once
     * the scene is actually being launched (instead of just being added to the
     * game object) */
    init() {
        this.p = PercentCoords;
    }

    /**Phaser.Scene method which represents the start of the Scene's behavior.
     * It runs after init() and preload() have completed */
    create() {
        // Create the splash screen visuals
        let logo = this.add.sprite(this.p.x(50), this.p.y(50) - 15, 'hero')
            .setOrigin(0.5, 0.5)
            .setScale(10)
            .setAlpha(0);
        let text = this.add.text(this.p.x(50), this.p.y(50) + 150, 'Idle Pixels', {
            fontFamily: "Lucida Console, Monaco, monospace",
            fontSize: '32px'
        })
            .setOrigin(0.5, 0.5)
            .setAlpha(0);
        // Fade in and out 2 times
        let fade = this.add.tween({
            targets: [logo, text],
            alpha: 1,
            duration: 500,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: 1,
            callbackScope: this,
            onComplete: (tween, targets) => {
                this.scene.start('Home');
            }
        });
    }
}