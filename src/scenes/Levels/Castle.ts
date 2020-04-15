import { Level } from './Level';
import { Bat } from '../../sprites/monsters/Bat';
import { Skelly } from '../../sprites/monsters/Skelly';
import { Witch } from '../../sprites/monsters/Witch';

export class Castle extends Level {

    static key: string = "Castle";

    name = "Castle";
    bg = 'gothicBg';
    monsters = [Bat,Skelly,Witch];
    boss = null;
    bgMusicKey = "gothic";

    constructor() {
        super(Castle.key);
    }

}