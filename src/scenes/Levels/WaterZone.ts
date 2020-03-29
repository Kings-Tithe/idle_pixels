import { Level } from './Level';
import { JellyFish } from '../../sprites/monsters/JellyFish';
import { Shark } from '../../sprites/monsters/Shark';
import { StarFish } from '../../sprites/monsters/Starfish';

export class WaterZone extends Level {

    static key: string = "WaterZone";

    name = "Water Zone";
    bg = 'waterBg';
    monsters = [JellyFish,Shark,StarFish];
    boss = null;
    bgMusicKey = "ocean";

    constructor() {
        super(WaterZone.key);
    }

}