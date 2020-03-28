import { Monster } from './Monster';

export class Shark extends Monster {

    /** Monster gets a random amount of hp each level between one and this */
    hpRoll = 4;
    /** Monster gets a guaranteed amount of hp each level equal to this */
    hpBonus = 2;

    constructor(scene, level) {
        super(scene, level, 'shark');
    }
}