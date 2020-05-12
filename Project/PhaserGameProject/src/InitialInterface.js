class InitialInterface extends Phaser.Scene {

    constructor() {
        super({ key: "InitialInterface" });
    }

    // preload images and sounds
    preload() {
        // sounds
        this.load.audio('bgSound', './resource/sounds/YourAnswer.wav');
        this.load.audio('menuClick', './resource/sounds/click.wav');

        // images
        this.load.image('menuBg', './resource/images/menuBg.jpg');
        this.load.image('panel', './resource/images/panel.png');
        this.load.image('green', './resource/images/green.jpg');
        this.load.image('arrows', './resource/images/arrows.png')
        this.load.image('check', './resource/images/check.png')
        this.load.image('cross', './resource/images/cross.png')
        this.load.image('germ', './resource/images/germ.png');
        this.load.image('mask', './resource/images/mask.png');
        this.load.image('playBtn', './resource/images/play.png');

    }
    // Menu Panel
    create() {
        // sound
        config.bgSound = this.sound.add('bgSound');
        config.bgSound.loop = true;
        config.bgSound.play();

        // background
        var menuBg = this.add.sprite(config.width / 2, config.height / 2, 'menuBg');
        menuBg.setScale(0.6);

        var panelBG = this.add.sprite(config.width / 2, config.height / 2, 'green');
        panelBG.alpha = 0.6;
        panelBG.setScale(0.4);

        var panel = this.add.sprite(config.width / 2, config.height / 2, 'panel');
        panel.setScale(0.3);

        // text
        var style = { font: "40px", fill: "#000000", align: "center" };
        var titleText = this.add.text(300, 130, "Survivor", style);

        var authorText = this.add.text(450, 180, "by Minlu Jiang",
            { font: "20px", fill: "#000000" });

        var introText = this.add.text(170, 210,
            "    This game requires you to collect \n" +
            "all the masks and avoid all the germs.\n" +
            "You can move by using arrow key.",
            { font: "20px", fill: "#000000" });

        // key image
        var arrows = this.add.sprite(270, 340, 'arrows');
        arrows.setScale(0.4);

        // do touch mask
        var mask = this.add.sprite(420, 340, 'mask');
        mask.setScale(0.3);
        var check = this.add.sprite(440, 360, 'check');
        check.setScale(0.2);

        // don't touch germ
        var germ = this.add.sprite(550, 340, 'germ');
        germ.setScale(0.06);
        var cross = this.add.sprite(570, 360, 'cross');
        cross.setScale(0.12);

        // play button
        var playBtn = this.add.image(700, 450, 'playBtn').setDepth(1);
        playBtn.setScale(0.25);

        playBtn.setInteractive();
        playBtn.on("pointerdown", function () {
            this.menuClick = this.sound.add('menuClick');
            this.menuClick.play();
            this.scene.start('GameStart');
        }, this);

    }

}
