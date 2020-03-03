// our game's configuration
let config = {
  type: Phaser.AUTO,
  scene: [Boot, Loading, HomeScreen, Credits, MainGame],
  title: 'Idle Pixels',
  pixelArt: true,
  backgroundColor: '000000',
  scale: {
    parent: 'game',
    mode: Phaser.Scale.FIT,
    width: 640,
    height: 640
}
};

// create the game, and pass it the configuration
let game = new Phaser.Game(config);