import { Monster } from './Monster';

export class Bat extends Monster {

    constructor(scene, level) {
        super(scene, level, 'bat', 2, 1);
    }
}