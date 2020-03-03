let Credits = new Phaser.Scene("Credits");

Credits.create = function(){
    //create credit string
    this.creditString = "";
    this.creditString += "From the team at Idle Pixels\n\n"
    this.creditString += "Gracie Glebe\n"
    this.creditString += "Zachary Kingcade\n"
    this.creditString += "Jeremy Glebe\n\n\n"
    this.creditString += "A Special Thanks to the following free assets artists\n"
    this.creditString += "Images\n"
    this.creditString += "something something\n"
    this.creditString += "Audio\n"
    this.creditString += "Something Somthing\n"

    //set font size and calculate text element size
    this.fontSize = 20;
    this.spacing = 5;
    this.stringPixelHeight = (this.creditString.split('\n').length) * (this.fontSize + this.spacing);

    this.splashText = this.add.text(330, 640, this.creditString,
        {font: this.fontSize + "px Arial", fill: "#ffffff", align: "center"});
    this.splashText.setLineSpacing(this.spacing);
    this.splashText.setOrigin(.5, 0);
    
    //set scrolling tween
    this.creditString.scrollTween = this.tweens.add({
        targets: this.splashText,
        y : 0 - this.stringPixelHeight,
        duration: 30 * this.stringPixelHeight,
        paused: false,
        yoyo: false,
        repeatDelay: 2000,
        repeat: -1,
    });

    //add back button
    this.creditsButton = this.add.sprite(80,80,"backButton").setScale(2.5);
    this.creditsButton.setInteractive();

    this.creditsButton.on("pointerdown",function(){
        this.scene.start("Home");
    },this);

}