
MainGame.createUpgradeShop = function () {
    // Get the shop panel
    let shop = document.getElementById('upgrade-shop');
    // Get the shop content panel
    let shopContent = document.getElementById('ushop-content');

    // Creates the close button for the shop
    let btnDiv = document.createElement('div');
    btnDiv.className = 'close';
    let btnImg = document.createElement('img');
    btnImg.src = "./assets/free-use/PaperUIKit/CloseButton.png";
    let button = document.createElement('button');
    button.innerText = 'X';
    // Events for the close button (handled through the image)
    button.onclick = this.toggleUpgradeShop;
    button.onmousedown = () => { btnImg.src = "./assets/free-use/PaperUIKit/CloseButtonPressed.png"; }
    button.onmouseup = () => { btnImg.src = "./assets/free-use/PaperUIKit/CloseButton.png"; }
    button.onmouseleave = () => { btnImg.src = "./assets/free-use/PaperUIKit/CloseButton.png"; }
    // Add the close button to HTML
    btnDiv.appendChild(btnImg);
    btnDiv.appendChild(button);
    shop.appendChild(btnDiv);

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

MainGame.toggleUpgradeShop = function () {
    /** @type {HTMLElement} */
    let el = document.getElementById("upgrade-shop");
    console.log(el.style.visibility);
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
    console.log(el.style.visibility);
    window.scrollTo(0, 0);
}

MainGame.addUpgradeShopItem = function (upgrade) {
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
    button.onclick = function () {
        // Get current cost (to be updated at various times)
        if (that.coins >= that.upgrades[button.id].cost) {
            // Update coins
            that.coins -= that.upgrades[button.id].cost;
            that.updateCoinCounter();
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