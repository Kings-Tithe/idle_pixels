import { Monster } from './Monster';

export class Witch extends Monster {

    constructor(scene, level) {
        super(scene, level, 'witch', 2, 1);
    }
}