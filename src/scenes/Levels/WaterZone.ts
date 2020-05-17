import { Level } from './Level';
import { JellyFish } from '../../sprites/monsters/JellyFish';
import { Shark } from '../../sprites/monsters/Shark';
import { StarFish } from '../../sprites/monsters/StarFish';
import { Mermaid } from '../../sprites/monsters/Mermaid';

export class WaterZone extends Level {

    static key: string = "WaterZone";

    name = "Water Zone";
    bg = 'waterBg';
    monsters = [JellyFish,Shark,StarFish];
    boss = Mermaid;
    bgMusicKey = "ocean";

    constructor() {
        super(WaterZone.key);
    }

}