class ScenePlus extends Phaser.Scene {
    constructor(name) { super(name) }

    lazy(filetype, key, path, callback) {
        this.load[filetype](key, path);
        this.load.once(`filecomplete-${filetype}-${key}`, callback);
        this.load.start();
    }

}