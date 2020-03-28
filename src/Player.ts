export class Player {

    /** Keeps track of the player's damage */
    damage: number;
    /** Keeps track of the amount of coins the player has */
    coins: number;
    /** Keeps track of the number of monster's killed across all scenes */
    totalMonsBeaten: number;
    /** Keeps track of the player's level */
    level:number

    constructor(damage: number = 1, coins: number = 0, totalMonsBeaten: number = 0, level: number = 0) {
        this.damage = damage;
        this.coins = coins;
        this.totalMonsBeaten = totalMonsBeaten;
        this.level = level;
    }

}