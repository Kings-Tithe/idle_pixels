import { GAME_WIDTH, GAME_HEIGHT } from './Globals';

export function px(percentage) {
    return percentage / 100 * GAME_WIDTH;
}

export function py(percentage) {
    return percentage / 100 * GAME_HEIGHT;
}