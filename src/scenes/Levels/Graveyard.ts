/** 
 * The graveyard level and enemies was made by my nephews and this
 * branch is primarily for them to play with it. Do not merge.
 * ~Jeremy
 */

import { Level } from './Level';
import { Bat } from '../../sprites/monsters/Bat';
import { Skelly } from '../../sprites/monsters/Skelly';
import { SirenHead } from '../../sprites/monsters/SirenHead';
import { ZombieBoot } from '../../sprites/monsters/ZombieBoot'

export class Graveyard extends Level {

    static key: string = "Graveyard";

    name = "Graveyard";
    bg = 'graveBg';
    monsters = [Bat, Skelly, ZombieBoot];
    boss = SirenHead;
    bgMusicKey = "gothic";

    constructor() {
        super(Graveyard.key);
    }

}