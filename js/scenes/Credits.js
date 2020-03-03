let Credits = new Phaser.Scene('Credits');

Credits.create = function () {
    //create credit string
    let creditString = "";
    creditString += "From the team at Idle Pixels\n\n"
    creditString += "Gracie Glebe\n"
    creditString += "Zachary Kingcade\n"
    creditString += "Jeremy Glebe\n\n\n"
    creditString += "A Special Thanks to the following free assets artists\n"
    creditString += "Images\n"
    creditString += "something something\n"
    creditString += "Audio\n"
    creditString += "Something Somthing\n"

    let fontSize = 50;
    let stringPixelHeight = (split('\n').length) * fontSize;
    console.log(stringPixelHeight);

    this.splashText = this.add.text(330, 0, "Welcome to!",
        { font: stringsize + "px Arial", fill: "#000000" });
    this.splashText.setOrigin(.5, 0);
    this.splashText.setScale(0);

    // // Go to the main asset loading scene
    // this.scene.start("Loading");
}