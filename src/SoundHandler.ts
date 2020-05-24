/** 
 * Acts as an interface/handler overtop that manages and interacts
 * with Phaser to globally handle all music and sounds for the game
 * this allows you to keep better track of what is playing, global
 * volume and to handle sounds over scenes.
 */

import { Rnd } from "./tools/Rnd";

export class SoundHandler {

    //member Varibles

    //BaseSounds
    /** 
     * Stores all the keys and sound(s) related to the game, keys
     * can have more then one base sound attached to it. 
     */
    sounds: {[key: string]: Phaser.Sound.BaseSound[]}

    //numbers
    globalVolume: number = .5;
    globalDelay: number = 0;
    
    //bools
    globalLoop: boolean = false;

    //config
    configs: {[key: string]: object};

    constructor(){
        this.sounds = {};
        this.configs = {};
    }

    addSound(key: string, BaseSound: Phaser.Sound.BaseSound){
        if (!this.sounds[key]){
            this.sounds[key] = [BaseSound];
        } else {
            this.sounds[key].push(BaseSound);
        }
    }

    play(key: string){
        //choose an index between 0 and the number of item
        //for the passed in key
        let randomNum = Rnd.int(0, this.sounds[key].length - 1);
        //check if there is a preset config for this sound/sound set
        let config;
        if (key in this.configs){
            config = this.configs[key];
            console.log("Custom Config Found!");
        } else {
            config = {
                volume: this.globalVolume,
                loop: this.globalLoop,
                delay: this.globalDelay
            }
        }
        //play the sound at the index of that key
        this.sounds[key][randomNum].play(config);
    }

    checkIfPlaying(key){
        let result: boolean = false;
        for (let sound of this.sounds[key]){
            if (sound.isPlaying){
                result = true;
            }
        }
        return result;
    }

    stop(key){
        for (let sound of this.sounds[key]){
            if (sound.isPlaying){
                sound.stop();
            }
        }
    }

    setConfig(key: string, volumeMultiple: number = 1 ,loop: boolean = false, delay: number = 0, seek: number = 0, rate: number = 1, detune: number = 0, mute: boolean = false){
        this.configs[key] = {
            volumeMultiple: volumeMultiple,
            volume: this.globalVolume * volumeMultiple,
            loop: loop,
            delay: delay,
            seek: seek,
            rate: rate,
            detune: detune,
            mute: mute
        }
    }
}