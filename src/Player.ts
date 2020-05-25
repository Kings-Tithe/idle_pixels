export class Player {

    /** Keeps track all the damage sources tied to the current game 
     *  The list is taken straight from the ushop and is should never
     * be changed from an instance of the class but from the class interface
     * it's self. The type is declared as a object containing string keys and
     * matching number values.
    */
    damageSources: {[key: string]: number};
    /** Keeps track of the amount of coins the player has */
    coins: number;
    /** Keeps track of the number of monster's killed across all scenes */
    totalMonsBeaten: number;
    /** Keeps track of the player's level */
    level:number;

    constructor(coins: number = 0, totalMonsBeaten: number = 0, level: number = 1, damageSources:{[key: string]: number} = null) {
        this.coins = coins;
        this.totalMonsBeaten = totalMonsBeaten;
        this.level = level;
        //defaulted to null if nothing is passed in, set to passed in values if something was passed in
        //otherwise set to default values below.
        if (damageSources != null){
            this.damageSources = damageSources;
        } else {
            this.damageSources = {
                hero: 1,
                wizard: 0
            }
        }
    }

    /** Updates a passed in damage source with a passed in value */
    damageUpdate(sourceKey: string, newDamage: number){
        this.damageSources[sourceKey] = newDamage;
    }

}