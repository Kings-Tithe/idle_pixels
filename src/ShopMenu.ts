import { px, py } from './tools/PercentCoords';

export class ShopMenu {

    scene: Phaser.Scene;
    testText: Phaser.GameObjects.DOMElement;
    toggleButton: Phaser.GameObjects.Sprite;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        // Create some random testing text
        this.createTestText();
        // Create testing shop button sprite
        this.createToggleButton();
    }

    private createTestText() {
        let test = document.createElement('h1');
        test.textContent = "Hello there.";
        // Add this element to the game's container
        this.scene.game.domContainer.appendChild(test);
        // Add the new element to the scene's objects
        this.testText = this.scene.add.dom(px(50), py(50), test);
        // Do not destroy between scenes
        this.testText.ignoreDestroy = true;
    }

    private createToggleButton() {
        this.toggleButton = new Phaser.GameObjects.Sprite(this.scene, 300, 300, 'shop');
        this.toggleButton.ignoreDestroy = true;
    }

    link(scene: Phaser.Scene) {
        // Update the scene object
        this.scene = scene;
        // Add the test text to the new scene
        this.linkDOM(this.testText);
        // Add the toggleButton to the new scene
        this.linkGameObject(this.toggleButton);
    }

    private linkDOM(element: Phaser.GameObjects.DOMElement) {
        this.scene.add.existing(element);
        this.linkObjScene(element);
    }

    private linkGameObject(object: Phaser.GameObjects.GameObject) {
        this.scene.add.existing(object);
    }

    private linkObjScene(object: Phaser.GameObjects.GameObject) {
        // WARNING!!! THIS CODE IS A "NECESSARY EVIL". DO NOT REUSE THIS
        // TECHNIQUE UNLESS THERE IS NO ALTERNATIVE.
        // Scene is a protected member, for good reason too! But, in this
        // case only, we know what we're doing and there is NO WAY to manually
        // update a Game Object's internal scene reference. With HTML game
        // objects, we REALLY need to update that reference. So we break
        // TypeScript rules by accessing scene using the '[]' operator instead
        // of using the '.' operator. This let's us update the scene which
        // keeps the HTML being displayed between scenes.
        object['scene'] = this.scene;
    }

}