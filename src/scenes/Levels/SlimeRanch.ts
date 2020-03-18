import { Level } from './Level';

export class SlimeRanch extends Level {

    static key: string = "SlimeRanch";

    name = "Slime Ranch";
    bg = 'slimeBg';
    monsters = [];
    boss = null;

    constructor() {
        super(SlimeRanch.key);
        console.log("Scene Added: ", this);
    }

}