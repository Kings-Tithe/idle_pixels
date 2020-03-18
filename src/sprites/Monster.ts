export class Monster extends Phaser.GameObjects.Sprite {

    // Monster gets a random amount of hp each level between one and this
    hpRoll = 2;
    // Monster gets a guaranteed amount of hp each level equal to this
    hpBonus = 1;

    constructor(scene, sprKey, level) {
        super(scene, window.CENTER.x, window.CENTER.y, sprKey, 0);
        this.key = sprKey;
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
        // Monster scaling
        this.setScale(5);
        // Create necessary animations
        this.createAnimations();
        this.anims.play(this.idle);
        console.log(this.idle);
        // Make the monster clickable
        this.setInteractive();
        this.on("pointerdown", this.onClick, this);
    }

    createAnimations() {
        // Monster idle animation
        this.idle = this.scene.anims.create({
            key: this.key + "_idle",
            frames: this.scene.anims.generateFrameNames(this.key, { frames: [0, 1] }),
            frameRate: 2,
            repeat: -1
        });
        // Monster death animation
        this.death = this.scene.anims.create({
            key: this.key + "_death",
            frames: this.scene.anims.generateFrameNames(this.key, { frames: [2] }),
            frameRate: 0,
            repeat: -1
        });
        // Monster death animation tween
        this.deathTween = this.scene.tweens.add({
            delay: 500,
            targets: this,
            scaleY: 0,
            scaleX: 0,
            angle: 1440,
            duration: 1100,
            paused: true,
            yoyo: false,
            ease: 'Quad.easeInOut'
        });
    }

    onClick() {
        // For now, just kill the monster on a click
        this.onDeath();
    }

    onDeath() {
        // Make the Monster non-clickable when dying
        this.removeInteractive();
        // Play the death animation
        this.anims.play(this.death);
        // Play the death spiral animation, don't continue until its complete
        this.deathTween.play().on('complete', () => {
            if (window.LOGGING) { console.log("He's dead, Jim."); }
            // Signal to any listeners that the monster has died
            this.emit('death');
        }, this);
    }
}