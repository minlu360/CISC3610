class GameEnd extends Phaser.Scene {
    constructor() {
        super({ key: "GameEnd" });
    }

    // preload images and sounds
    preload() {
        // sounds
        this.load.audio('menuClick', './resource/sounds/click.wav');
        this.load.audio('end', './resource/sounds/gameEnd.mp3');
        // images
        this.load.image('menuBg', './resource/images/menuBg.jpg');
        this.load.image('panel', './resource/images/panel.png');
        this.load.image('playBtn', './resource/images/play.png');
    }
    // Menu Page
    create() {
        // sound
        this.menuClick = this.sound.add('menuClick');
        this.gameEnd = this.sound.add('end');
        this.gameEnd.play();

        // background
        var menuBg = this.add.sprite(config.width / 2, config.height / 2, 'menuBg');
        menuBg.setScale(0.6);

        var panelBG = this.add.sprite(config.width / 2, config.height / 2, 'green');
        panelBG.alpha = 0.6;
        panelBG.setScale(0.4);

        var panel = this.add.sprite(config.width / 2, config.height / 2, 'panel');
        panel.setScale(0.3);

        // text
        var style = { font: "20px", fill: "#000000", align: "center" };
        if (config.hp == 0) {
            this.add.text(305, 180, "You Lose", { font: "40px", fill: "#000000", align: "center" });
            this.add.text(230, 230, "Press button below to replay", style);
            this.add.text(290, 260, " Press 'B': back", style);

        }
        else {
            this.add.text(220, 180, "Are you leaving?", { font: "40px", fill: "#000000", align: "center" });
            this.add.text(300, 230, "Hope you enjoy it", style);
            this.add.text(300, 260, " Press 'B': back", style);

        }

        this.input.keyboard.on('keydown_B', this.back, this);

        // button
        var playBtn = this.add.image(400, 350, 'playBtn').setDepth(1);
        playBtn.setScale(0.3);

        // when button pressed, back to game
        playBtn.setInteractive();
        playBtn.on("pointerdown", function () {
            this.menuClick.play();
            this.scene.start('GameStart');
        }, this);

    }
    // back to main
    back() {
        this.menuClick.play();
        config.bgSound.stop();
        this.scene.start('InitialInterface');
    }

}
