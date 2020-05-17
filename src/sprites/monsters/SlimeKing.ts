import { Monster } from './Monster';

export class SlimeKing extends Monster {

    constructor(scene, level) {
        super(scene, level, 'slimeking', 4, 5);
    }
}