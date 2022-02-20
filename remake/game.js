
/**
 * WHRATIO is the ratio of width to height. It can be used to scale
 * the width to the height by width*WHRATIO, or to scale the height
 * to the width with height/WHRATIO
 */
const WINDOW_WIDTH = window.innerWidth;
const WINDOW_HEIGHT = window.innerHeight;
const WHRATIO = WINDOW_WIDTH / WINDOW_HEIGHT;

/**
 * VERTICAL determines if the game screen is vertical. This doesn't
 * exactly check if we're on mobile, but it does help to accomplish
 * competent scaling for mobile devices.
 */
const VERTICAL = WHRATIO < 1 ? true : false;

/**
 * GAME_WIDTH and GAME_HEIGHT represent the recommended size of the game
 * canvas, adjusting based on the ratio of the screen.
 */
const GAME_WIDTH = VERTICAL ? 640 : Math.floor(640 * WHRATIO);
const GAME_HEIGHT = VERTICAL ? Math.floor(640 / WHRATIO) : 640;

/**
 * CENTER marks the logical center of the screen and is helpful for
 * positioning objects.
 */
const GAME_CENTER = {
    x: GAME_WIDTH / 2,
    y: GAME_HEIGHT / 2
};

const config = {
    // Automatically determine how to render
    type: Phaser.AUTO,
    scene: [
        TitleScene
    ],
    // Title to display on the game
    title: 'Idle Pixels',
    // Prevents anti-aliasing
    render: {
        pixelArt: true
    },
    // Black background when nothing else is being displayed over it
    backgroundColor: '000000',
    /**Game (canvas) attaches to the div with id 'game'. Scale manager ensures
     * scaling of logical size (calculated) to actual size (window) */
    scale: {
        parent: 'game',
        mode: Phaser.Scale.FIT,
        width: GAME_WIDTH,
        height: GAME_HEIGHT
    },
    // Use HTML elements in phaser?
    dom: {
        createContainer: true
    },
    // Framerate, for optimization
    fps: {
        target: 30,
        min: 30
    }
}

new Phaser.Game(config);