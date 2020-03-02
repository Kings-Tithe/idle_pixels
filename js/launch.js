// Game configuration object
let config = {
  // Automatically determine how to render
  type: Phaser.AUTO,
  // Primary scene objects, more will be added in LoadScripts
  scene: [Boot, Loading, HomeScreen, MainGame],
  // Title to display on the game
  title: 'Idle Pixels',
  // Prevents anti-aliasing
  pixelArt: true,
  // Black background when nothing else is being displayed over it
  backgroundColor: 'ffffff',
  /* Game (canvas) attaches to the div with id 'game'.
   * The game's world is 640x640, but it will scale as needed. */
  scale: {
    parent: 'game',
    mode: Phaser.Scale.FIT,
    width: 640,
    height: 640
  }
};

/**Global game object which manages the entire Phaser engine.
 * This will automatically start the game in the first Scene (defined as the
 * first item int he scene list above, Boot)
 * @type {Phaser.Game} */
var GAME = new Phaser.Game(config);