import { Monster } from './Monster';

export class JellyFish extends Monster {

    constructor(scene, level) {
        super(scene, level, 'jellyfish', 2, 1);
    }
}