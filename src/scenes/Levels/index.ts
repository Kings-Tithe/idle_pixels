/**
 * This is the central import/export file for the Levels module. It groups
 * together all individual level modules and exports them as one.
 * It also creates a list of levels for use in loading random levels.
 */

/**
 * Import all level classes so that we can export them in one module.
 */
import { SlimeRanch } from './SlimeRanch';

/**
 * Add all keys and levels to our map of levels. This map is useful for random
 * selection later.
 */
export var LevelMap: { [key: string]: Class};
LevelMap[SlimeRanch.key] = SlimeRanch;
/**
 * Keys is a list that just holds the keys of the levels. It is also used for
 * random selection, but is a little more concise when we often only need keys.
 */
export var Keys: Class[] = Object.keys(LevelMap);

/**
 * Export all level classes for use in other modules.
 */
export { SlimeRanch } from './SlimeRanch';