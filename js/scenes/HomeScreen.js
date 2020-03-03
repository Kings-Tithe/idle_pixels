// create a new scene
let HomeScreen = new Phaser.Scene('Home');

HomeScreen.create = function () {
    //paint the background
    let background = this.add.image(0,0,"titleBackground").setOrigin(0,0);
    background.setScale(5.72,5.26);

    //add the play button
    this.playButton = this.add.sprite(160,430,"playButton").setScale(0);
    this.playButton.setInteractive();
    this.playButton.introTween = this.tweens.add({
        targets: this.playButton,
        x : 334,
        y : 250,
        scaleX: 6.97,
        scaleY: 6,
        duration: 500,
        paused: false,
        yoyo: false,
        repeat: false,
    });

    this.playButton.on("pointerdown",function(){
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
    }, this)

    //add the options button
    this.optionsButton = this.add.sprite(160,430,"optionsButton").setScale(0);
    this.optionsButton.setInteractive();
    this.optionsButton.introTween = this.tweens.add({
        targets: this.optionsButton,
        x : 330,
        y : 360,
        scaleX: 6.7,
        scaleY: 6,
        duration: 500,
        paused: false,
        yoyo: false,
        repeat: false,
    });

    //add the credits button
    this.creditsButton = this.add.sprite(160,430,"creditsButton").setScale(0);
    this.creditsButton.setInteractive();
    this.creditsButton.introTween = this.tweens.add({
        targets: this.creditsButton,
        x : 323,
        y : 465,
        scaleX: 6.28,
        scaleY: 6,
        duration: 500,
        paused: false,
        yoyo: false,
        repeat: false,
    });
    //set it to move to Credits scene when clicked
    this.creditsButton.on("pointerdown",function(){
        this.scene.start("Credits");
    },this);
}