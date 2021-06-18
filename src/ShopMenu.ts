import { px, py } from './tools/PercentCoords';
import { Level } from './scenes/Levels/Level';

export interface Price {
    base: number,
    per: number,
    multPer: number
}

export interface ShopItem {
    // key used to reference the item
    key: string,
    // Title displayed as the name of the item in the shop
    title: string,
    // Description text can be 60 columns then separate with breaks
    description: string,
    // Image to be displayed in the shop, should be an assets link
    image: string,
    // The current rank of the shop item
    rank: number,
    // The pricing for the shop item
    cost: Price
}

export class ShopMenu {

    scene: Phaser.Scene;
    shopList: Element;
    shopScreen: Phaser.GameObjects.DOMElement;
    toggleButton: Phaser.GameObjects.DOMElement;
    shopItems: ShopItem[];

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        // Create the shop screen
        this.createShopScreen();
        // Create the shop purchase list
        this.createShopList();
        // Create an empty item list initially
        this.shopItems = [];
        // Add a few shop elements
        this.pushShopItem({
            key: "hero",
            title: "Hero (that's you)",
            description: "Make your clicks do more damage. Be the <b>Ultimate Hero</b>!",
            image: "./assets/images/heroes/hero.png",
            rank: 1,
            cost: {
                base: 0,
                per: 5,
                multPer: 1.05
            }
        });
        this.pushShopItem({
            key: "wizard",
            title: "Wizard",
            description: "Through a variety of powerful magic <b>hexes</b>, the Wizard can "
                + "<br>deal passive damage to foes!",
            image: "./assets/images/heroes/wizard.png",
            rank: 0,
            cost: {
                base: 15,
                per: 5,
                multPer: 1.1
            }
        });
        // Create testing shop button sprite
        this.createToggleButton();
    }

    private createShopList() {
        // Creates the upgrade list for the shop
        let list = document.createElement('ul');
        // Style the list
        list.style.listStyleType = 'none';
        list.style.textAlign = 'center';
        list.style.padding = '5px';
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
        shop.style.overflowY = 'scroll';
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
        button.style.backgroundImage = "url('./assets/images/ui/shop.png')";
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

    priceCalc(price: Price, rank: number) {
        let cost = price.base;
        for (let i = 0; i < rank; i++) {
            cost += price.per;
            cost *= price.multPer;
        }
        return Math.floor(cost);
    }

    private purchase(item: ShopItem) {
        let level = <Level>this.scene;
        let hud = level.hud;
        let player = level.player;
        let price = this.priceCalc(item.cost, item.rank);

        // Check if the player has enough coins
        if (player.coins >= price) {
            // Update coins
            player.coins -= price;
            hud.updateCoinCounter(player.coins);
            // Update upgrade status
            item.rank++;
            // Update the players Stored Damage for that button's associated damage
            player.damageUpdate(item.key, item.rank);
        }
        return item.rank;
    }

    pushShopItem(item: ShopItem) {
        // Create the elements
        let el = document.createElement('li');
        let text = document.createElement('div');
        let title = document.createElement('h3');
        let description = document.createElement('p');
        let image = document.createElement('img');
        let button = document.createElement('button');

        // Styling of the HTML elements
        el.style.borderRadius = '10px';
        // Alternating colors
        if (this.shopItems.length % 2) {
            // If there are an odd number of shop items...
            el.style.backgroundColor = '#b19a69';
        } else {
            // Even number...
            el.style.backgroundColor = 'wheat';
        }
        // Spacing of list items
        title.style.margin = '6px';
        description.style.margin = '4px';
        button.style.marginBottom = '5px';
        el.style.marginBottom = '5px';
        // Size of elements
        button.style.width = '320px';
        button.style.height = '60px';
        image.style.height = '60px';
        // Font sizes
        title.style.fontSize = '28pt';
        description.style.fontSize = '16pt';
        button.style.fontSize = '28pt';

        // Setup the texts and displays of the HTML elements
        title.innerHTML = item.title + ' Lvl [' + item.rank.toString() + ']';
        description.innerHTML = item.description;
        image.src = item.image;
        button.id = item.key;
        button.textContent = this.priceCalc(item.cost, item.rank) + 'g';

        // The button click listener for purchasing items
        button.onclick = () => {
            let newRank = this.purchase(item);
            // Update cost text
            button.innerText = this.priceCalc(item.cost, newRank) + 'g';
            // Update title with new rank
            title.innerHTML = title.innerHTML.replace(/Lvl \[[0-9]*\]/g, 'Lvl [' + item.rank) + ']';
        }

        // Add the elements to HTML
        el.appendChild(image)
        text.appendChild(title);
        text.appendChild(description);
        el.appendChild(text);
        el.appendChild(button);

        // Add the item as a child of the shop display list
        this.shopList.appendChild(el);
        // Add the item to the list of item objects
        this.shopItems.push(item);
    }

    toggleShopScreen() {
        this.shopScreen.visible ? this.shopScreen.setVisible(false) : this.shopScreen.setVisible(true);
    }

}