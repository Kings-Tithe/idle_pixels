import { CENTER, LOGGING } from '../../tools/Globals';
import { Rnd } from '../../tools/Rnd';

export class Monster extends Phaser.GameObjects.Sprite {

    //member varibles

    //numbers
    /** Monster gets a random amount of hp each level between one and this */
    hpRoll: number = 2;
    /** Monster gets a guaranteed amount of hp each level equal to this */
    hpBonus: number = 1;
    /** The monster's level for which everything else scales */
    level: number;
    /** Hold the Maximum Health of this monster */
    maxHp: number;
    /** Holds the monster's current health */
    hp: number;

    //strings
    /** Holds the internal key for the sprite image attached to this game object */
    key: string;

    //tweens
    /** Tween played when the monster is killed spins and shrinks the sprite at the same time down to a scale of 0 */
    deathTween: Phaser.Tweens.Tween;

    //animations
    /** Animation played while the monster is still alive, flips between sprite sheet frames 1 and 2 */
    idle: Phaser.Animations.Animation;
    /** Animation that plays when the monster is killed is used to force switch to frame 3 of the sprite sheet */
    death: Phaser.Animations.Animation;

    //graghics
    healthContainer: Phaser.GameObjects.Graphics;
    healthBar: Phaser.GameObjects.Graphics;

    constructor(scene, level, sprKey = '') {
        super(scene, CENTER.x, CENTER.y, sprKey, 0);
        this.scene = scene;
        this.key = sprKey;
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
        // Stores a animation object unless the key provided is already been used in which case it returns
        // false
        let idleAnim: Phaser.Animations.Animation | false = this.scene.anims.create({
            key: this.key + "_idle",
            frames: this.scene.anims.generateFrameNames(this.key, { frames: [0, 1] }),
            frameRate: 2,
            repeat: -1
        });
        // stores the above animation in idle so long as idle is not false;
        this.idle = idleAnim ? idleAnim : null;

        // Stores a animation object unless the key provided is already been used in which case it returns
        // false
        let deathAnims = this.scene.anims.create({
            key: this.key + "_death",
            frames: this.scene.anims.generateFrameNames(this.key, { frames: [2] }),
            frameRate: 0,
            repeat: -1
        });
        // stores the above animation in death so long as idle is not false;
        this.death = deathAnims ? deathAnims : null;

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

    createHealthBar() {
        //Health bar container, black line that surrounds the
        //health bar
        this.healthContainer = new Phaser.GameObjects.Graphics(this.scene);
        this.healthContainer.lineStyle(4.5, 0x000000, 1);
        this.healthContainer.strokeRoundedRect(250, 150, 150, 30, 15);
        this.healthContainer.depth = 2;
        //Colored health bar
        // this.healthBar = new Phaser.GameObjects.Graphics(this.scene);
        // this.healthBar.fillStyle(0x32a848, 1);
        // this.healthBar.fillRoundedRect(250, 150, 150, 30, 15);
        // this.healthBar.depth = 0;

        // //Add health text
        // this.healthText = this.add.text(330, 165, this.health + "/" +this.maxHealth,
        //     { font: "20px Arial", fill: "#000000" });
        // this.healthText.setOrigin(.5, .5);
        // this.healthText.depth = 1;
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
            //if logging is set to true log to the console that the monster has died
            if (LOGGING) { console.log("The monster has died!\n"); }
            // Signal to any listeners that the monster has died
            this.emit('death');
        }, this);
    }
}
