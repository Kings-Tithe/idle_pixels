/**Global game object which manages the entire Phaser engine.
 * This will automatically start the game in the first Scene (defined as the
 * first item int he scene list above, Boot)
 * @type {Phaser.Game} */
var IdlePixels = null;
/**launchGame creates a game object to store in IdlePixels. This is done at
 * the bottom of the file just for formatting. Size calculation and config
 * creation are handled below before the actual creation (calling launchGame())
 * allowing for neater code at the top of the file.
 */
launchGame = function () {
    IdlePixels = new Phaser.Game(config);
}

// Calculate an acceptable logical width and height for the game.
let width = 640;
let height = 640;
let w = window.innerWidth;
let h = window.innerHeight;
if ((w / h) > 1) {
    width = Math.floor(640 * (w / h));
} else {
    height = Math.floor(640 / (w / h));
}

/**Idle Pixels game configuration, including settings such as render type,
 * logical size, anti-aliasing, and more. */
let config = {
    // Automatically determine how to render
    type: Phaser.AUTO,
    // Primary scene objects, more will be added in LoadScripts
    scene: [
        Boot,
        LoadScripts,
        LoadAssets,
        Splash,
        //Home,
        //Play
    ],
    // Title to display on the game
    title: 'Idle Pixels',
    // Prevents anti-aliasing
    pixelArt: true,
    // Black background when nothing else is being displayed over it
    backgroundColor: '000000',
    /**Game (canvas) attaches to the div with id 'game'. Scale manager ensures
     * scaling of logical size (calculated) to actual size (window) */
    scale: {
        parent: 'game',
        mode: Phaser.Scale.FIT,
        width: width,
        height: height
    }
}

launchGame();