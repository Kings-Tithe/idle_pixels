class Home extends Phaser.Scene {

    /**Creates instance of Scene */
    constructor() {
        super('Home');
    }

    /**
     * Init is a Phaser Scene method that runs before any of the others. It can
     * be thought of like a sort of follow-up constructor that runs only once
     * the scene is actually being launched (instead of just being added to the
     * game object)
     */
    init() {
        this.p = PercentCoords;
    }

    /**
     * Phaser.Scene method which represents the start of the Scene's behavior.
     * It runs after init() and preload() have completed
     */
    create() {
        // Paint the background
        let background = this.add.image(this.p.x(50), this.p.y(50), "title").setOrigin(.5, .5);
        background.setScale(5.72, 5.26);

        // Add the play button
        this.playButton = this.add.sprite(this.p.x(50) - 145, this.p.y(50) + 110, "play")
            .setScale(0).setOrigin(0.5, 0.5).setInteractive();
        this.playButton.introTween = this.tweens.add({
            targets: this.playButton,
            x: this.p.x(50),
            y: this.p.y(40),
            scaleX: 6,
            scaleY: 6,
            duration: 500,
            paused: false,
            yoyo: false,
            repeat: false,
        });
        this.playButton.on("pointerdown", this.onPlay, this);


        // Add the options button
        this.optionsButton = this.add.sprite(this.p.x(50) - 145, this.p.y(50) + 110, "options")
            .setScale(0).setOrigin(0.5, 0.5).setInteractive();
        this.optionsButton.introTween = this.tweens.add({
            targets: this.optionsButton,
            x: this.p.x(50),
            y: this.p.y(40) + 90,
            scaleX: 6.7,
            scaleY: 6,
            duration: 500,
            paused: false,
            yoyo: false,
            repeat: false,
        });

        //add the credits button
        this.creditsButton = this.add.sprite(this.p.x(50) - 145, this.p.y(50) + 110, "credits")
            .setScale(0).setOrigin(0.5, 0.5).setInteractive();
        this.creditsButton.introTween = this.tweens.add({
            targets: this.creditsButton,
            x: this.p.x(50),
            y: this.p.y(40) + 180,
            scaleX: 6.28,
            scaleY: 6,
            duration: 500,
            paused: false,
            yoyo: false,
            repeat: false,
        });
        //set it to move to Credits scene when clicked
        this.creditsButton.on("pointerdown", function () {
            this.scene.start("Credits");
        }, this);

    }

    onPlay() {
        this.scene.start("Game", {
            stageNum: 1,
            coins: 0,
            prev_index: -1,
            upgrades: {
                hero: {
                    lvl: 1,
                    cost: 5,
                    inc: 1.2
                },
                wizard: {
                    lvl: 0,
                    cost: 15,
                    inc: 2.5
                }
            }
        });
    }

}
