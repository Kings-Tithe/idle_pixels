import { Monster } from './Monster';

export class Skelly extends Monster {

    constructor(scene, level) {
        super(scene, level, 'skelly', 2, 2);
    }
}