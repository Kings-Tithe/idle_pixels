class Bat extends Monster {

    // Monster gets a random amount of hp each level between one and this
    hpRoll = 2;
    // Monster gets a guaranteed amount of hp each level equal to this
    hpBonus = 1;

    constructor(scene, level) {
        super(scene, 'bat', level);
    }
}