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
        x : 330,
        y : 250,
        scaleX: 6,
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
}