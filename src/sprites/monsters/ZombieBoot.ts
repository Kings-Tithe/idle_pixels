/** 
 * The graveyard level and enemies was made by my nephews and this
 * branch is primarily for them to play with it. Do not merge.
 * ~Jeremy
 */

import { Monster } from './Monster';

export class ZombieBoot extends Monster {

    constructor(scene, level) {
        //construct monster using monster parent class
        super(scene, level, 'zombieboot', 10, 15);
    }

}