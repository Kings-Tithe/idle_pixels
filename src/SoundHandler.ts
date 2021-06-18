import { Rnd } from "./tools/Rnd";

/** 
 * Acts as an handler overtop that manages and interacts
 * with Phaser to globally handle all music and sounds for the game
 * this allows you to keep better track of what is playing, global
 * volume and to handle sounds over scenes.
 */
interface iSoundConfig {
    volumeMultiple: number,
    loop: boolean,
    delay: number,
    seek: number,
    rate: number,
    detune: number,
    mute: boolean
}

export class SoundHandler {

    /** 
     * Stores all the sound keys and sounds or sound lists attached to them.
     * 
     * Sound Groups: Keys can have more then one sound attached, in that case
     * a random sound will be selected from the list when playing. Great for
     * alternating sounds for the same event!
     */
    sounds: { [key: string]: Phaser.Sound.BaseSound[] }

    /** Configurations for managed sounds */
    configs: { [key: string]: iSoundConfig };

    /** Default volume on all managed sounds */
    globalVolume: number = .5;
    /** Default delay on all managed sounds */
    globalDelay: number = 0;
    /** Default value for whether sounds should loop */
    globalLoop: boolean = false;

    constructor() {
        this.sounds = {};
        this.configs = {};
    }

    addSound(key: string, BaseSound: Phaser.Sound.BaseSound) {
        if (!this.sounds[key]) {
            this.sounds[key] = [BaseSound];
        } else {
            this.sounds[key].push(BaseSound);
        }
    }

    play(key: string) {
        // Choose a random sound index (in case of sound groups) to play
        let randomNum = Rnd.int(0, this.sounds[key].length - 1);
        // Obtain or create a configuration with which the sound should be played
        let config = {};
        if (key in this.configs) {
            // If a configuration exists for this sound or sound list, use it
            config = {
                volume: this.globalVolume * this.configs[key]["volumeMultiple"],
                loop: this.configs[key]["loop"],
                delay: this.configs[key]["delay"],
                seek: this.configs[key]["seek"],
                rate: this.configs[key]["rate"],
                detune: this.configs[key]["detune"],
                mute: this.configs[key]["mute"]
            }
        } else {
            // If a configuration does not exist, use global values
            config = {
                volume: this.globalVolume,
                loop: this.globalLoop,
                delay: this.globalDelay
            }
        }
        // Play the sound
        this.sounds[key][randomNum].play(config);
    }

    checkIfPlaying(key) {
        let result: boolean = false;
        for (let sound of this.sounds[key]) {
            if (sound.isPlaying) {
                result = true;
            }
        }
        return result;
    }

    stop(key) {
        for (let sound of this.sounds[key]) {
            if (sound.isPlaying) {
                sound.stop();
            }
        }
    }

    setConfig(key: string, volumeMultiple: number = 1, loop: boolean = false, delay: number = 0, seek: number = 0, rate: number = 1, detune: number = 0, mute: boolean = false) {
        this.configs[key] = {
            volumeMultiple: volumeMultiple,
            loop: loop,
            delay: delay,
            seek: seek,
            rate: rate,
            detune: detune,
            mute: mute
        }
    }

    changeGlobalVolume(newVolume: number) {
        //change the internal global volume
        this.globalVolume = newVolume;
        //restart any sounds currently playing
        for (let key of Object.keys(this.sounds)) {
            for (let i = 0; i < this.sounds[key].length; i++) {
                if (this.sounds[key][i].isPlaying) {
                    if (key in this.configs) {
                        this.sounds[key][i]["volume"] = this.globalVolume * this.configs[key].volumeMultiple;
                    } else {
                        this.sounds[key][i]["volume"] = this.globalVolume;
                    }
                }
            }
        }
    }
}