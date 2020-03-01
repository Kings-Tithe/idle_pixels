// create a new scene
let MainGame = new Phaser.Scene('Game');

MainGame.init = function () {
    this.coins = 0;     //used to keep track of how many coins we've collected
}

MainGame.preload = function () {
}

MainGame.create = function () {
    // Create shop menu
    this.createUpgradeShop();
    this.toggleUpgradeShop();
    //create background image
    let bg = this.add.image(this.game.globals.centerX, this.game.globals.centerY, 'world-gothic');
    bg.setScale(this.game.globals.scale_screen);
    // Create the first monster
    this.createMonster();
}

MainGame.createMonster = function () {
    //pick a random moster from our list
    let ref = this.game.Monsters[Math.trunc(Math.random() * this.game.Monsters.length)];
    this.currentMonster = jQuery.extend(true, {}, ref);
    console.log(Math.random() * this.game.Monsters.length)
    //add the sprite to the gamescreen
    this.currentMonster.sprite = this.add.sprite(this.game.globals.centerX, this.game.globals.centerY, this.currentMonster.Name, 1);
    console.log(this.currentMonster, ref);
    // set the sprite's origin to its center
    this.currentMonster.sprite.setOrigin(.5, .5);
    //set sprite scale
    this.currentMonster.sprite.setScale(this.game.globals.scale_monster);
    //set sprite to be interactive
    this.currentMonster.sprite.setInteractive();
    //set the actions to happen when the sprite is clicked on
    this.currentMonster.sprite.on("pointerdown", function () {
        this.coins += 5;
        this.currentMonster.Health -= 5;
        console.log("you coins are now: " + this.coins, this.currentMonster.Health);
        if (this.currentMonster.Health <= 0) { this.killMonster(); }
    }, this)
}

MainGame.killMonster = function () {
    this.currentMonster.sprite.destroy();
    this.createMonster();
}

MainGame.createUpgradeShop = function () {
    /** Get the shop panel 
     * @type {HTMLElement} */
    let shop = document.getElementById('upgrade-shop');
    /** Get the shop content panel 
     * @type {HTMLElement} */
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
    // Design example item
    let item = document.createElement('li');
    item.innerHTML += "<h3>Hero (that's you)</h3>";
    item.innerHTML += "<p><img src='assets/images/heroes/hero.png'/>";
    item.innerHTML += "Make your clicks do more damage. Be the <b>Ultimate Hero</b>!</p>";
    item.innerHTML += "<button id='hero-upgrade' type='button' onclick='upgrade(\"hero\")'>$15";
    // Add the example item to the list
    list.appendChild(item);
    // Design example item
    item = document.createElement('li');
    item.innerHTML += "<h3>Wizard</h3>";
    item.innerHTML += "<p><img src='assets/images/heroes/wizard.png'/>";
    item.innerHTML += "Through a variety of powerful magic <b>hexes</b>, the Wizard";
    item.innerHTML += " can deal passive damage to foes!</p>";
    item.innerHTML += "<button id='wizard-upgrade' type='button' onclick='upgrade(\"wizard\")'>$15";
    // Add the example item to the list
    list.appendChild(item);

}

MainGame.toggleUpgradeShop = function () {
    /** @type {HTMLElement} */
    let el = document.getElementById("upgrade-shop");
    console.log(el.style.visibility);
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
    console.log(el.style.visibility);
    window.scrollTo(0, 0);
}