import { Level } from './Level';
import { Blue } from '../../sprites/monsters/Blue';
import { Green } from '../../sprites/monsters/Green';
import { Pink } from '../../sprites/monsters/Pink';
import { Red } from '../../sprites/monsters/Red';

export class SlimeRanch extends Level {

    static key: string = "SlimeRanch";

    name = "Slime Ranch";
    bg = 'slimeBg';
    monsters = [Blue,Green,Pink,Red];
    boss = null;

    constructor() {
        super(SlimeRanch.key);
    }

}