import { Monster } from './Monster';

export class Shark extends Monster {

    constructor(scene, level) {
        super(scene, level, 'shark', 2, 2);
    }
}