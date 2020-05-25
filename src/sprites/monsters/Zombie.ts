/** 
 * The graveyard level and zombie boot boss was made by my nephew and this
 * branch is primarily for him to play with it. Do not merge.
 * ~Jeremy
 */

import { Monster } from './Monster';

export class Zombie extends Monster {

    constructor(scene, level) {
        //construct monster using monster parent class
        super(scene, level, 'zombie', 10, 15);
    }

}