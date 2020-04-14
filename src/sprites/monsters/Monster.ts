import { CENTER, LOGGING } from '../../tools/Globals';
import { Rnd } from '../../tools/Rnd';
import { Player } from '../../Player';
import { Level } from '../../scenes/Levels/Level';

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

    //animations
    /** Animation played while the monster is still alive, flips between sprite sheet frames 1 and 2 */
    idle: Phaser.Animations.Animation;
    /** Animation that plays when the monster is killed is used to force switch to frame 3 of the sprite sheet */
    death: Phaser.Animations.Animation;

    //graghics
    healthContainer: Phaser.GameObjects.Graphics;
    healthBar: Phaser.GameObjects.Graphics;

    // World that the monster is occupying
    world: Level;

    constructor(scene: Level, level, sprKey = '') {
        super(scene, CENTER.x, CENTER.y, sprKey, 0);
        this.scene = scene;
        this.world = scene;
        this.key = sprKey;
        this.level = level;
        // This is the monsters total HP
        // Random roll of hp each level + set bonus each level +15% per level
        this.maxHp = Rnd.int(1, this.hpRoll) * this.level;
        this.maxHp += this.hpBonus * this.level;
        this.maxHp += .15 * this.level * this.maxHp;
        this.maxHp = Math.floor(this.maxHp);
        //make sure that the monster has at the bare minimum 1 hp
        if (this.maxHp < 1){ 
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
        // Health bar container, black line that surrounds the
        this.healthContainer = new Phaser.GameObjects.Graphics(this.scene);
        this.healthContainer.lineStyle(4.5, 0x000000, 1);
        this.healthContainer.strokeRoundedRect(CENTER.x - 75, CENTER.y - 150, 150, 30, 15);
        this.healthContainer.depth = 3;
        this.scene.add.existing(this.healthContainer);
        // Colored health bar
        this.healthBar = new Phaser.GameObjects.Graphics(this.scene);
        this.healthBar.fillStyle(0x32a848, 1);
        this.healthBar.fillRoundedRect(CENTER.x - 75, CENTER.y - 150, 150, 30, 15);
        this.healthBar.depth = 1;
        this.scene.add.existing(this.healthBar);

        // Text that displays the current monster's health out of it's original max health
        this.healthText = new Phaser.GameObjects.Text(this.scene,CENTER.x, CENTER.y - 135, this.hp + "/" +this.maxHp,
        { fontFamily: "Arial", fontSize: "20px", color: "#000000" });
        this.healthText.setOrigin(.5, .5);
        this.healthText.depth = 2;
        this.scene.add.existing(this.healthText);
    }

    onClick() {
        this.onDamage(this.world.player.damageSources["hero"]);
    }

    onDamage(damage: number) {
        if (this.canDamage){
            // Deal Damage
            this.hp -= damage;
            if (this.hp < 1){
                this.hp = 0;
                this.canDamage = false;
                this.updateHealthBar;
                this.onDeath();
            } else {
                this.updateHealthBar();
            }
        }
    }

    onDeath() {
        // Make the Monster non-clickable when dying
        this.removeInteractive();
        // Play the death animation
        this.anims.play(this.death);
        // Delete the healthContainer, healthBar and healthText
        this.healthContainer.destroy();
        this.healthBar.destroy();
        this.healthText.destroy();
        // Play the death spiral animation, don't continue until its complete
        this.deathTween.play().on('complete', () => {
            // Signal to any listeners that the monster has died
            this.emit('death');
        }, this);
    }

    updateHealthBar(){
        // Update health text
        this.healthText.setText(this.hp + "/" + this.maxHp);

        // Health percentage
        let percentage = this.hp / this.maxHp;
        // Ensures health bar value does not go below 0
        if (10 - (Math.trunc(percentage * 10)) >= 0 && Math.trunc(percentage * 150) >= 0) {
            // Clear graghics of old health bar
            this.healthBar.clear();

            // Health bar color codes
            let colors = [
                0x42f598,
                0x42f578,
                0x42f54b,
                0x69f542,
                0xb8a425,
                0xb88c25,
                0xb87625,
                0xb86a25,
                0xb85625,
                0xb84225,
            ]
            // Calculate fill color of the bar, make sure it never tries to go beyond the bounds of
            // the above color array
            if (10 - (Math.trunc(percentage * 10)) > 9){
                this.healthBar.fillStyle(colors[9], 1);
            } else {
                this.healthBar.fillStyle(colors[10 - (Math.trunc(percentage * 10))], 1);
            }
            // Make sure the angles don't overlap on the health bar
            if (percentage < .13){
                this.healthBar.fillRoundedRect(CENTER.x - 75, CENTER.y - 145, Math.trunc(percentage * 150), 20,2);
            } else {
                this.healthBar.fillRoundedRect(CENTER.x - 75, CENTER.y - 150, Math.trunc(percentage * 150), 30,15);
            }
        } else {
            this.healthBar.clear();
        }
    }
    
}
