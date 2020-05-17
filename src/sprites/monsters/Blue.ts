import { Monster } from './Monster';

export class Blue extends Monster {

    constructor(scene, level) {
        super(scene, level, 'blue', 2, 1);
    }
}