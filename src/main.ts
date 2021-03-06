import * as Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT } from './tools/Globals';
// Scenes
import { Boot } from './scenes/Boot';
import { LoadAssets } from './scenes/LoadAssets';
import { Home } from './scenes/Home';
import { Credits } from "./scenes/Credits";
import { SoundHandler } from './SoundHandler';

/**Idle Pixels game configuration, including settings such as render type,
 * logical size, anti-aliasing, and more. */
const config: Phaser.Types.Core.GameConfig = {

    // Automatically determine how to render
    type: Phaser.AUTO,
    // Primary scene objects, more will be added in LoadScripts
    scene: [
        Boot,
        LoadAssets,
        Home,
        Credits
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
        min: 30,
        forceSetTimeOut: true
    }
}

export const IdlePixels = new Phaser.Game(config);

export const soundHandler = new SoundHandler;