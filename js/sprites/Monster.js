class Monster extends Phaser.GameObjects.Sprite {

    // Monster gets a random amount of hp each level between one and this
    hpRoll = 2;
    // Monster gets a guaranteed amount of hp each level equal to this
    hpBonus = 1;

    constructor(scene, sprKey, level) {
        super(scene, window.CENTER.x, window.CENTER.y, sprKey, 0);
        // The monster's level for which everything else scales
        this.level = level;
        // This is the monsters total HP
        // Random roll of hp each level + set bonus each level +15% per level
        this.maxHp = Rnd.int(1, this.hpRoll) * this.level;
        this.maxHp += this.hpBonus * this.level;
        this.maxHp += .15 * this.level * this.maxHp;
        this.maxHp = Math.floor(this.maxHp);
        // This is the monster's current HP (starts off full)
        this.hp = this.maxHp;
        // Monster sprite details
        this.setScale(5);
    }
}