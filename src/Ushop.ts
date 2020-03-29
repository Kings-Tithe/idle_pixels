import { Level } from './scenes/Levels/Level';
import { Player } from './Player';
import { Hud } from './Hud';
export class UShop {

    level: Level;
    upgrades = {};
    player: Player;
    hud: Hud;

    constructor(){
        this.upgrades = {
            hero: {
                lvl: 1,
                cost: 5,
                inc: 1.2
            },
            wizard: {
                lvl: 0,
                cost: 15,
                inc: 2.5
            }
        }
    }

    /** 
     * allows ushop to know what scene it is being initally constructed in
     * must be constructed within a scene or things get kinda fucky
     */
    creationLink(level){
        this.level = level;
    }

    /** 
     * Allows the linking to a new scene, the primary purpose of which is
     * to link to a new payer character
     */
    link(level){
        this.player = level.player;
        this.hud = level.hud;
        this.level = level;
    }

    createUpgradeShop(){
        // Get the shop panel
        let shop = document.getElementById('upgrade-shop');
        // Get the shop content panel
        let shopContent = document.getElementById('ushop-content');
    
        // Creates the close button for the shop
        let btnDiv = document.createElement('div');
        btnDiv.className = 'close';
        let btnImg = document.createElement('img');
        btnImg.src = "./assets/images/free-use/CloseButton.png";
        let button = document.createElement('button');
        button.innerText = 'X';
        // Events for the close button (handled through the image)
        button.onclick = this.toggleUpgradeShop;
        button.onmousedown = () => { btnImg.src = "./assets/images/free-use/CloseButtonPressed.png"; }
        button.onmouseup = () => { btnImg.src = "./assets/images/free-use/CloseButton.png"; }
        button.onmouseleave = () => { btnImg.src = "./assets/images/free-use/CloseButton.png"; }
        // Add the close button to HTML
        btnDiv.appendChild(btnImg);
        btnDiv.appendChild(button);
        shop.appendChild(btnDiv);

        // Add the button for opening the upgrade shop
        let openButton = document.createElement("button");
        openButton.onclick =  this.toggleUpgradeShop;
        openButton.style.position = "absolute";
        openButton.style.right = "50px";
        openButton.style.bottom = "50px";
        openButton.style.width = "96px";
        openButton.style.height = "96px";
        openButton.style.backgroundImage = "url('./assets/images/ui/shop.png')";
        openButton.style.backgroundSize = "contain"
        openButton.style.backgroundRepeat = "no-repeat"
        openButton.style.backgroundColor = "rgba(0,0,0,0)";
        openButton.style.border = "none";
        openButton.style.visibility = "visible";
        openButton.style.outline = "0";
        document.body.appendChild(openButton);

    
        // Creates the upgrade list for the shop
        let list = document.createElement('ul');
        shopContent.appendChild(list);
    
        // Create example items for the shop
        list.appendChild(this.addUpgradeShopItem({
            key: "hero",
            title: "  Hero (that's you)",
            // description text can be about 60 columns, not including tags
            description: "Make your clicks do more damage. Be the <b>Ultimate Hero</b>!",
            image: "./assets/images/heroes/hero.png"
        }));
        list.appendChild(this.addUpgradeShopItem({
            key: "wizard",
            title: "  Wizard",
            description: "Through a variety of powerful magic <b>hexes</b>, the Wizard can "
                + "<br>deal passive damage to foes!",
            image: "./assets/images/heroes/wizard.png"
        }));
    }
    
    toggleUpgradeShop() {
        /** @type {HTMLElement} */
        let el = document.getElementById("upgrade-shop");
        el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
        window.scrollTo(0, 0);
    }
    
    addUpgradeShopItem(upgrade) {
        // Create the elements
        let item = document.createElement('li');
        let text = document.createElement('div');
        let title = document.createElement('h3');
        let description = document.createElement('p');
        let image = document.createElement('img');
        let button = document.createElement('button');
    
        // Configure HTML elements
        title.innerHTML = upgrade.title + ' Lvl [' + this.upgrades[upgrade.key].lvl + ']';
        description.innerHTML = upgrade.description;
        image.src = upgrade.image;
        button.id = upgrade.key;
        button.textContent = this.upgrades[upgrade.key].cost + 'g';
        let that = this;
        let hud = this.hud;
        button.onclick = function() {
            // Get current cost (to be updated at various times)
            if (that.player.coins >= that.upgrades[button.id].cost) {
                // Update coins
                that.player.coins -= that.upgrades[button.id].cost;
                that.hud.updateCoinCounter(that.player.coins);
                // Update upgrade status
                that.upgrades[button.id].lvl++;
                that.upgrades[button.id].cost = Math.ceil(that.upgrades[button.id].cost * that.upgrades[button.id].inc);
                // Update cost text
                button.innerText = that.upgrades[button.id].cost + 'g';
                // Update title with lvl
                title.innerHTML = title.innerHTML.replace(/Lvl \[[0-9]*\]/g, 'Lvl [' + that.upgrades[button.id].lvl) + ']';
            }
        }


    
        // Add the elements to HTML
        item.appendChild(image)
        text.appendChild(title);
        text.appendChild(description);
        item.appendChild(text);
        item.appendChild(button);
    
        return item;
    }
}