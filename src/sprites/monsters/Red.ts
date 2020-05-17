import { Monster } from './Monster';

export class Red extends Monster {

    constructor(scene, level) {
        super(scene, level, 'red', 2, 2);
    }
}