import { Monster } from './Monster';

export class Mermaid extends Monster {

    constructor(scene, level) {
        //construct monster using monster parent class
        super(scene, level, 'mermaid', 4, 5);
    }

}