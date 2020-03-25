import { Level } from './Level';
// Monsters
import { Bat } from '../../sprites/monsters/Bat';

export class SlimeRanch extends Level {

    static key: string = "SlimeRanch";

    name = "Slime Ranch";
    bg = 'slimeBg';
    monsters = [Bat];
    boss = null;

    constructor() {
        super(SlimeRanch.key);
        console.log("Scene Added: ", this);
    }

}