/**
 * This is the central import/export file for the Levels module. It groups
 * together all individual level modules and exports them as one.
 * It also creates a list of levels for use in loading random levels.
 */

/**
 * Import all level classes so that we can export them in one module.
 */
import { SlimeRanch } from './SlimeRanch';
import { Castle } from './Castle';
import { WaterZone } from './WaterZone';
import { Graveyard } from './Graveyard';

/**
 * Add all keys and levels to our map of levels. This map is useful for random
 * selection later.
 */
export var LevelMap: { [key: string]: Class } = {};
LevelMap[SlimeRanch.key] = SlimeRanch;
LevelMap[Castle.key] = Castle;
LevelMap[WaterZone.key] = WaterZone;
LevelMap[Graveyard.key] = Graveyard;

/**
 * Automatically adds all level keys to a list of keys.
 * Keys is a list that just holds the keys of the levels. It is also used for
 * random selection, but is a little more concise when we often only need keys.
 */
export var Keys: string[] = Object.keys(LevelMap);

/**
 * Export all level classes for use in other modules.
 */
export { SlimeRanch } from './SlimeRanch';
export { Castle } from './Castle';
export { WaterZone } from './WaterZone';
export { Graveyard } from './Graveyard';