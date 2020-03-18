import { GAME_WIDTH, GAME_HEIGHT } from './Globals';

export class PercentCoords {

    static x(percentage) {
        return percentage / 100 * GAME_WIDTH;
    }

    static y(percentage) {
        return percentage / 100 * GAME_HEIGHT;
    }

}