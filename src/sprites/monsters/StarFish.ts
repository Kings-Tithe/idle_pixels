import { Monster } from './Monster';

export class StarFish extends Monster {

    constructor(scene, level) {
        super(scene, level, 'starfish', 2, 1);
    }
}