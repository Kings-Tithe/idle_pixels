import { CENTER, } from '../../tools/Globals';
import { Rnd } from '../../tools/Rnd';
import { Player } from '../../Player';
import { Level } from '../../scenes/Levels/Level';
import { EasyColor } from "../../tools/EasyColor";
import { soundHandler } from '../../main';

export class Monster extends Phaser.GameObjects.Sprite {

    //member varibles

    //numbers
    /** Monster gets a random amount of hp each level between one and this */
    hpRoll: number;
    /** Monster gets a guaranteed amount of hp each level equal to this */
    hpBonus: number;
    /** The monster's level for which everything else scales */
    level: number;
    /** Hold the Maximum Health of this monster */
    maxHp: number;
    /** Holds the monster's current health */
    hp: number;
    /** Stores the angle to adjust the hitTweens angle to */
    hitAngle: number = 0;

    //bools
    canDamage: boolean = true;

    //strings
    /** Holds the internal key for the sprite image attached to this game object */
    key: string;

    //text
    /** Text display of hp and max maxHp health */
    healthText: Phaser.GameObjects.Text;

    //tweens
    /** Tween played when the monster is killed spins and shrinks the sprite at the same time down to a scale of 0 */
    deathTween: Phaser.Tweens.Tween;
    /** Tween Played when the monster is hit, stretchs monster's scale towards a random point between -45 and 45 */
    hitTween: Phaser.Tweens.Tween;

    //animations
    /** Animation played while the monster is still alive, flips between sprite sheet frames 1 and 2 */
    idle: Phaser.Animations.Animation;
    /** Animation that plays when the monster is killed is used to force switch to frame 3 of the sprite sheet */
    death: Phaser.Animations.Animation;

    //graghics
    healthContainer: Phaser.GameObjects.Graphics;
    healthBar: Phaser.GameObjects.Graphics;
    healthBarMask: Phaser.GameObjects.Sprite;

    // World that the monster is occupying
    world: Level;

    /** 
     * Constructs a instance of the class setting all the initial values 
     */
    constructor(scene: Level, level, sprKey = '', hpRoll = 2, hpBonus = 1) {
        super(scene, CENTER.x, CENTER.y, sprKey, 0);
        this.scene = scene;
        this.world = scene;
        this.key = sprKey;
        this.level = level;
        this.hpBonus = hpBonus;
        this.hpRoll = hpRoll;
        // This is the monsters total HP
        // Random roll of hp each level + set bonus each level +15% per level
        this.maxHp = Rnd.int(1, this.hpRoll) * this.level;
        this.maxHp += this.hpBonus * this.level;
        this.maxHp += .15 * this.level * this.maxHp;
        this.maxHp = Math.floor(this.maxHp);
        //make sure that the monster has at the bare minimum 1 hp
        if (this.maxHp < 1) {
            this.maxHp = 1;
        }
        // This is the monster's current HP (starts off full)
        this.hp = this.maxHp;
        // Monster scaling
        this.setScale(5);
        //create the graghics for the health bar
        this.createHealthBar();
        // Create necessary animations
        this.createAnimations();
        this.anims.play(this.idle);
        // Make the monster clickable
        this.setInteractive();
        this.on("pointerdown", this.onClick, this);
    }

    /**
     * Creates all the animations and tweens to be attached to the monster
     * current animations created this way:
     * -> idleAnim:   Flips between the first and second frame of the monster's spritesheet
     * -> deathAnims: Sets to the last frame of the monster's spritesheet
     * -> deathTween: Plays on monster death, twirls from center origin and shrinks scale to 0 over 700 miliseconds
     * -> HitTween:   Plays when the monster is hit, stretchs monster's scale towards a random point between -45 and 45
     */
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
            duration: 700,
            paused: true,
            yoyo: false,
            ease: 'Quad.easeInOut'
        });

        // Monster Hit animation tween
        this.hitTween = this.scene.tweens.add({
            targets: this,
            scaleY: this.scaleY * 1.5,
            angle: { value: () => { return this.hitAngle } },
            duration: 80,
            paused: true,
            yoyo: true,
            ease: 'Quad.easeInOut',
        });
    }

    /** Creates all the graphical elements that go with the health bar*/
    createHealthBar() {
        // Health bar container, black line that surrounds the
        this.healthContainer = new Phaser.GameObjects.Graphics(this.scene);
        this.healthContainer.lineStyle(4.5, 0x000000, 1);
        this.healthContainer.strokeRoundedRect(CENTER.x - 75, CENTER.y - 150, 150, 30, 15);
        this.healthContainer.depth = 3;
        this.scene.add.existing(this.healthContainer);

        // Creates a mask to help with displaying the current health
        this.healthBarMask = new Phaser.GameObjects.Sprite(this.scene, CENTER.x, CENTER.y - 135, 'healthBarMask')
            .setOrigin(0.5).setAlpha(1);
        // Make the mask unseen so that the bar shows instead.
        this.healthBarMask.setVisible(false);

        // Colored health bar
        this.healthBar = new Phaser.GameObjects.Graphics(this.scene);
        this.healthBar.setMask(this.healthBarMask.createBitmapMask());
        this.healthBar.fillStyle(EasyColor.Spring, 1);
        this.healthBar.fillRoundedRect(CENTER.x - 75, CENTER.y - 150, 150, 30, 15);
        this.healthBar.depth = 1;
        this.scene.add.existing(this.healthBar);

        // Text that displays the current monster's health out of it's original max health
        this.healthText = new Phaser.GameObjects.Text(this.scene, CENTER.x, CENTER.y - 135, this.hp + "/" + this.maxHp,
            { fontFamily: "Arial", fontSize: "20px", color: "#000000" });
        this.healthText.setOrigin(.5, .5);
        this.healthText.depth = 2;
        this.scene.add.existing(this.healthText);

    }

    /** Plays the hit tween and applies the players click damage */
    onClick() {
        //pick a random angle between -45 and 45
        this.hitAngle = Math.trunc(Math.random() * 45);
        this.hitAngle = Math.random() < .5 ? this.hitAngle : this.hitAngle * -1;
        //when being clicked or "attacked" by the player play a generic attack sound from
        //the list of possible attack sound
        soundHandler.play("attack");
        //play tween
        this.hitTween.play();
        //apply damage
        this.onDamage(this.world.player.damageSources["hero"]);
        this.world.optionsMenu.ifPostCode("05","damage dealt to monster: " + this.world.player.damageSources["hero"]);
    }

    /** Used when damage is done to the monster from any source */
    onDamage(damage: number) {
        this.emit("damaged");
        if (this.canDamage) {
            // Deal Damage
            this.hp -= damage;
            if (this.hp < 1) {
                this.hp = 0;
                this.canDamage = false;
                this.updateHealthBar;
                this.onDeath();
            } else {
                this.updateHealthBar();
            }
        }
    }

    clearHealthGraphics(){
        this.healthContainer.destroy();
        this.healthBar.destroy();
        this.healthText.destroy();
        this.healthBarMask.destroy();
    }

    /** Used when the Monster is killed */
    onDeath() {
        // Signals to functions ran before death completes
        this.emit("predeath");
        // Make the Monster non-clickable when dying
        this.removeInteractive();
        // Play the death animation
        this.anims.play(this.death);
        // Delete the healthContainer, healthBar and healthText
        this.clearHealthGraphics();
        // Play the death spiral animation, don't continue until its complete
        this.deathTween.play().on('complete', () => {
            // Signal to any listeners that the monster has died
            this.emit('death');
        }, this);
    }

    /** Used to update the graphics of the health bar to match the internal values */
    updateHealthBar() {
        // Update health text
        this.healthText.setText(this.hp + "/" + this.maxHp);

        // Health percentage
        let percentage = this.hp / this.maxHp;

        let maskPos = CENTER.x - 150 + (percentage * 150);
        this.healthBarMask.x = maskPos;

        this.healthBar.clear();
        let currentColor = EasyColor.percentTransform(EasyColor.Spring, EasyColor.Red, percentage);
        this.healthBar.fillStyle(Number(currentColor));
        this.healthBar.fillRoundedRect(CENTER.x - 75, CENTER.y - 150, 150, 30, 15);
    }

}
