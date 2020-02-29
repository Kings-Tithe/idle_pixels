// our game's configuration
let config = {
    type: Phaser.AUTO,
    width: 720,
    height: 480,
    scene: [Boot,Loading,HomeScreen,MainGame],
    title: 'Idle Pixels',
    pixelArt: false,
    backgroundColor: 'ffffff'
  };
  
  // create the game, and pass it the configuration
  let game = new Phaser.Game(config);