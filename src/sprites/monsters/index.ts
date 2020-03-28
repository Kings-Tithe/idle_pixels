/**
 * This is the central import/export file for all Monster modules. It groups
 * together all individual monster modules and exports them as one.
 * this file kinda acts like a redirect
 */

/**
 * Import all Monster child classes so that we can export them in one module.
 */
import { Bat } from './Bat';
import { Blue } from './Blue';
import { Green } from './Green';
import { JellyFish } from './JellyFish';
import { Pink } from './Pink';
import { Red } from './Red';
import { Shark } from './Shark';
import { Skelly } from './Skelly';
import { StarFish } from './Starfish';
import { Witch } from './Witch';

/**
 * Export all Monster classes for use in other modules.
 */
export { Bat } from './Bat';
export { Blue } from './Blue';
export { Green } from './Green';
export { JellyFish } from './JellyFish';
export { Pink } from './Pink';
export { Red } from './Red';
export { Shark } from './Shark';
export { Skelly } from './Skelly';
export { StarFish } from './Starfish';
export { Witch } from './Witch';