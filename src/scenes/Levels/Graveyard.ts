/** 
 * The graveyard level and zombie boot boss was made by my nephew and this
 * branch is primarily for him to play with it. Do not merge.
 * ~Jeremy
 */

import { Level } from './Level';
import { Bat } from '../../sprites/monsters/Bat';
import { Skelly } from '../../sprites/monsters/Skelly';
import { Witch } from '../../sprites/monsters/Witch';
import { Zombie } from '../../sprites/monsters/Zombie'

export class Graveyard extends Level {

    static key: string = "Graveyard";

    name = "Graveyard";
    bg = 'graveBg';
    monsters = [Bat,Skelly,Witch];
    boss = Zombie;
    bgMusicKey = "gothic";

    constructor() {
        super(Graveyard.key);
    }

}