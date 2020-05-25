import { px, py } from './tools/PercentCoords';
declare var CONFIG;

export interface ShopItem {
    // key used to reference the item
    key: string,
    // Title displayed as the name of the item in the shop
    title: string,
    // Description text can be 60 columns then separate with breaks
    description: string,
    // Image to be displayed in the shop, should be an assets link
    image: string
}

export class ShopMenu {

    scene: Phaser.Scene;
    shopList: Element;
    shopScreen: Phaser.GameObjects.DOMElement;
    toggleButton: Phaser.GameObjects.DOMElement;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        // Create the shop screen
        this.createShopScreen();
        // Create the shop purchase list
        this.createShopList();
        // Add a few shop elements
        this.pushShopItem({
            key: "hero",
            title: "Hero (that's you)",
            description: "Make your clicks do more damage. Be the <b>Ultimate Hero</b>!",
            image: "./assets/images/heroes/hero.png"
        });
        this.pushShopItem({
            key: "wizard",
            title: "Wizard",
            description: "Through a variety of powerful magic <b>hexes</b>, the Wizard can "
                + "<br>deal passive damage to foes!",
            image: "./assets/images/heroes/wizard.png"
        });
        // Create testing shop button sprite
        this.createToggleButton();
    }

    private createShopList() {
        // Creates the upgrade list for the shop
        let list = document.createElement('ul');
        // Add the list to the shop screen
        this.shopScreen.node.appendChild(list);
        // Set a reference to the list
        this.shopList = list;
    }

    private createShopScreen() {
        let shop = document.createElement('div');
        shop.style.backgroundColor = 'burlywood';
        shop.style.width = px(90).toString() + 'px';
        shop.style.height = py(94).toString() + 'px';
        // Add the new element to the scene's objects
        this.shopScreen = this.scene.add.dom(px(50), py(50), shop)
            .setVisible(false);
        // Do not destroy between scenes
        this.shopScreen.ignoreDestroy = true;
    }

    private createToggleButton() {

        // Add the button for opening the shop screen
        let button = document.createElement("button");
        button.onclick = this.toggleShopScreen.bind(this);
        button.style.width = "96px";
        button.style.height = "96px";
        button.style.backgroundImage = "url('" + CONFIG.ASSET_PATH + "images/ui/shop.png')";
        button.style.backgroundSize = "contain"
        button.style.backgroundRepeat = "no-repeat"
        button.style.backgroundColor = "rgba(0,0,0,0)";
        button.style.border = "none";
        button.style.visibility = "visible";
        button.style.outline = "0";

        // Add the new element to the scene's objects
        this.toggleButton = this.scene.add.dom(px(100) - 52, py(100) - 52, button);
        // Do not destroy between scenes
        this.toggleButton.ignoreDestroy = true;
    }

    link(scene: Phaser.Scene) {
        // Update the scene object
        this.scene = scene;
        // Add the shop screen to the new scene
        this.linkDOM(this.shopScreen);
        // Add the toggleButton to the new scene
        this.linkDOM(this.toggleButton);
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

    pushShopItem(item: ShopItem) {
        // Create the elements
        let el = document.createElement('li');
        let text = document.createElement('div');
        let title = document.createElement('h3');
        let description = document.createElement('p');
        let image = document.createElement('img');
        let button = document.createElement('button');

        // Configure HTML elements
        title.innerHTML = item.title + ' Lvl [?]';
        description.innerHTML = item.description;
        image.src = item.image;
        button.id = item.key;
        button.textContent = '0g'
        button.onclick = () => {
            console.log('You clicked to upgrade: ' + item.title + ", upgrades aren't finished yet...");
        }

        // Add the elements to HTML
        el.appendChild(image)
        text.appendChild(title);
        text.appendChild(description);
        el.appendChild(text);
        el.appendChild(button);

        this.shopList.appendChild(el);
    }

    toggleShopScreen() {
        this.shopScreen.visible ? this.shopScreen.setVisible(false) : this.shopScreen.setVisible(true);
        console.log(this.shopScreen.visible);
    }

}