import { Monster } from './Monster';

export class Vampire extends Monster {

    constructor(scene, level) {
        super(scene, level, 'vampire', 5, 6);
    }
}