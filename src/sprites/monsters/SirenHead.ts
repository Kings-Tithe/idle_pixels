/** 
 * The graveyard level and enemies was made by my nephews and this
 * branch is primarily for them to play with it. Do not merge.
 * ~Jeremy
 */

import { Monster } from './Monster';

export class SirenHead extends Monster {

    constructor(scene, level) {
        //construct monster using monster parent class
        super(scene, level, 'sirenhead', 99, 158);
    }

}