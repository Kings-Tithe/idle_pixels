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
        // Fade in tween makes the splash screen visible
        let fadeIn = this.add.tween({
            targets: [logo, text],
            alpha: 1,
            duration: 500,
            ease: 'Sine.easeInOut',
            paused: true,
            callbackScope: this,
            onComplete: (tween, targets) => {
                // This animation is .5s and is called every 1s
                // By calling fadeOut here we ensure it is also
                // called every second, but at a .5s offset from
                // fadeIn.
                fadeOut.play();
            }
        });
        // Fade out tween makes the splash screen disappear
        let fadeOut = this.add.tween({
            targets: [logo, text],
            alpha: 0,
            duration: 500,
            ease: 'Sine.easeInOut',
            paused: true,
            callbackScope: this
        });
        // Fade in every second for half a second
        fadeIn.play();
        setInterval(() => {
            fadeIn.play();
        }, 1000);
        // After a total of 3 seconds, start the next scene
        setTimeout(() => {
            this.scene.start('Home');
        }, 3000);
    }
}