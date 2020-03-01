// create a new scene
let HomeScreen = new Phaser.Scene('Home');

HomeScreen.create = function () {
    this.scene.start("Game", {
        stageNum: 1,
        coins: 150,
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