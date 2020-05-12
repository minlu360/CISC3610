class GameStart extends Phaser.Scene {
    germSpeed = 30;
    germDirection = [-1, 1, -1];
    state = -1; // -1 for play, 0 for pause, 1 for help

    constructor() {
        super({ key: "GameStart" });
    }

    // preload images and sounds
    preload() {
        // sounds
        this.load.audio('menuClick', './resource/sounds/click.wav');

        this.load.audio('running', './resource/sounds/running.wav');
        this.load.audio('falling', './resource/sounds/falling.wav');
        this.load.audio('falling2', './resource/sounds/falling2.wav');
        this.load.audio('jump', './resource/sounds/Jump.wav');
        this.load.audio('catch', './resource/sounds/catch.wav');
        this.load.audio('germS', './resource/sounds/germ.wav');

        // images
        this.load.image('background', "./resource/images/background.png");
        this.load.image('player', "./resource/images/player.png");
        this.load.image('floor', "./resource/images/floor.jpg");
        this.load.image('germ', "./resource/images/germ.png");
        this.load.image('mask', "./resource/images/mask.png");

        this.load.image('panel', './resource/images/panel.png');
        this.load.image('green', './resource/images/green.jpg');
        this.load.image('arrows', './resource/images/arrows.png')
        this.load.image('check', './resource/images/check.png')
        this.load.image('cross', './resource/images/cross.png')
        this.load.image('playBtn', './resource/images/play.png');

    }

    // Main Page
    create() {
        // sounds
        this.menuClick = this.sound.add('menuClick');
        this.jump = this.sound.add('jump');
        this.running = this.sound.add('running');
        this.falling = this.sound.add('falling');
        this.falling2 = this.sound.add('falling2');
        this.catch = this.sound.add('catch');
        this.germS = this.sound.add('germS');

        // background
        var gameBg = this.add.sprite(config.width / 2, 150, 'background');
        gameBg.setScale(0.7);

        // score and hp text
        this.score = 0;
        this.scoreString = "Score: ";
        this.scoreText = this.add.text(50, 10, this.scoreString + this.score, { font: "15px", fill: "#FF0000" });
        this.hpString = "HP: ";
        this.hpText = this.add.text(50, 30, this.hpString + config.hp, { font: "15px", fill: "#FF0000" });

        // setting variables 
        config.hp = 3;
        this.germSpeed = 30;

        // texts
        this.helpText = this.add.text(30, 510, "Press: 'H' for help, 'P' for pause, 'N' for new game, 'E' for end game", { font: "15px", fill: "#FFFFFF" });

        // platforms
        var platforms = this.physics.add.staticGroup();
        // floor1 
        platforms.create(config.width / 2, 500, 'floor').setScale(0.57, 0.02).refreshBody();
        platforms.create(config.width * 0.69, 420, 'floor').setScale(0.05, 0.02).refreshBody();
        // floor2
        platforms.create(config.width / 2 - 125, 342, 'floor').setScale(0.38, 0.02).refreshBody();
        platforms.create(config.width / 2 + 275, 342, 'floor').setScale(0.14, 0.02).refreshBody();
        platforms.create(65, 260, 'floor').setScale(0.05, 0.02).refreshBody();
        // floor3
        platforms.create(config.width / 2 + 35, 176, 'floor').setScale(0.52, 0.02).refreshBody();
        // walls
        platforms.create(36, 75, 'floor', null, { isStatic: true }).setScale(0.01, 1.2).refreshBody();
        platforms.create(764, 75, 'floor', null, { isStatic: true }).setScale(0.01, 1.2).refreshBody();

        //player
        this.player = this.physics.add.sprite(70, 400, 'player').setScale(0.4);
        window.player = this.player;
        player.setBounce(0.1);
        player.setCollideWorldBounds(true);

        // masks
        var masks = [];
        masks = this.physics.add.staticGroup({
            key: "mask",
            repeat: 7
        });
        masks.children.iterate(function (mask) {
            mask.setX(Phaser.Math.Between(100, 730));
            mask.setY(Phaser.Math.Between(20, 400));
            mask.setScale(0.15).refreshBody();
        });

        // germs
        this.germs = [
            this.germ1 = this.physics.add.sprite(720, 400, 'germ').setScale(0.05),
            this.germ2 = this.physics.add.sprite(80, 250, 'germ').setScale(0.05),
            this.germ3 = this.physics.add.sprite(720, 80, 'germ').setScale(0.05)
        ];

        // help, pause panels
        this.panelBG = this.add.sprite(config.width / 2, config.height / 2, 'green').setScale(0.4, 0.5);
        this.panelBG.alpha = 0.8;
        this.panelBG.visible = false;

        this.panel = this.add.sprite(config.width / 2, config.height / 2, 'panel').setScale(0.4);
        this.panel.visible = false;

        this.playBtn = this.add.image(650, 400, 'playBtn').setDepth(1);
        this.playBtn.setScale(0.25);
        this.playBtn.setInteractive();
        this.playBtn.visible = false;


        // keyboard input
        this.cursors = this.input.keyboard.createCursorKeys();
        this.input.keyboard.on('keydown_H', this.help, this);
        this.input.keyboard.on('keydown_P', this.pause, this);
        this.input.keyboard.on('keydown_N', this.newGame, this);
        this.input.keyboard.on('keydown_E', this.end, this);

        // collider in the game
        this.physics.add.collider(this.germs, platforms);
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(masks, masks, this.replaceMask, null, this);
        this.physics.add.collider(platforms, masks, this.replaceMask, null, this);
        this.physics.add.overlap(player, masks, this.catchMask, null, this);
        this.physics.add.overlap(player, this.germs, this.touchGerm, null, this);

    }

    update() {
        // display the update hp and score in game view
        this.scoreText.setText(this.scoreString + this.score);
        this.hpText.setText(this.hpString + config.hp);

        if (this.state == -1) {
            // player movement by keyboard
            var cursors = this.cursors;

            if (cursors.left.isDown) {
                this.running.play();
                this.player.setVelocityX(-160 - this.germSpeed / 5);
                this.player.setFlipX(true);
            }
            else if (this.cursors.right.isDown) {
                this.running.play();
                this.player.setVelocityX(160 + this.germSpeed / 5);
                this.player.setFlipX(false);
            }
            else if (this.cursors.up.isDown && player.body.touching.down) {
                this.jump.play();
                this.player.setVelocityY(-250);
                this.falling2.play();

            }
            else if (cursors.down.isDown) {
                this.falling.play();
                this.player.setVelocityY(250);
            }
            else {
                player.setVelocityX(0);
            }

        }

        // movement of germs
        for (var i = 0; i < this.germs.length; i++) {
            if (this.state == -1)
                this.germs[i].setVelocityX(this.germSpeed * this.germDirection[i]);
            else
                this.germs[i].setVelocityX(0);

            if (this.germs[i].x < 80) {
                this.germDirection[i] = 1;
            }
            else if (this.germs[i].x > 710) {
                this.germDirection[i] = -1;
            }
            if (this.score > 60) {
                this.germSpeed = this.score / 2;
            }
        }


    }
    // when player touch mask
    catchMask(player, mask) {
        this.catch.play();
        this.replaceMask(player, mask);
        this.score += 10;

    }
    // relocate mask 
    replaceMask(platforms, mask) {
        mask.setX(Phaser.Math.Between(100, 730));
        mask.setY(Phaser.Math.Between(20, 400));
        mask.setScale(0.15).refreshBody();
    }
    // when player touch germ
    touchGerm(player, germs) {
        this.germS.play();
        // decrement hp value
        config.hp--;

        germs.x = 720;

        // when hp == 0, game end
        if (config.hp <= 0) {
            this.end();
        }

        // replace player
        if (player.y < 260) {
            player.setX(80);
            player.setY(175);
        }
        else {
            player.setX(540);
            player.setY(335);
        }

    }
    // end game
    end() {
        if (this.state == -1) {
            this.menuClick.play();
            this.scene.start('GameEnd');
        }

    }
    // new game
    newGame() {
        if (this.state == -1) {
            this.menuClick.play();
            this.scene.start('GameStart');
        }
    }
    // game pause
    pause() {
        if (this.state == -1) {
            this.menuClick.play();
            // set state = 0 for pause 
            this.state = 0;
            // background
            this.panelBG.visible = true;
            this.panel.visible = true;
            // text
            var text = this.add.text(config.width / 2 - 200, config.height / 2 - 50, "Game On Pause", { font: "50px", fill: "#000000" });

            this.playBtn.visible = true;
            // when button been pressed, disable everything in pause panel and back to game
            this.playBtn.on("pointerdown", function () {
                this.menuClick.play();
                this.panelBG.visible = false;
                this.panel.visible = false;
                text.visible = false;
                this.playBtn.visible = false;
                // set state = -1 for play 
                this.state = -1;
            }, this);
        }

    }
    // help panel
    help() {
        if (this.state == -1) {
            this.menuClick.play();
            // set state = 1 for help
            this.state = 1;

            // background
            this.panelBG.visible = true;
            this.panel.visible = true;

            // text
            var text1 = this.add.text(config.width / 2 - 100, 100, "Instructions", { font: "30px", fill: "#000000" });
            var text2 = this.add.text(100, 150, "\t\t\t\tcollect all the masks and avoid all the germs \n" +
                "by using up, down ,left, and right key. ",
                { font: "20px", fill: "#000000" });

            // key
            var arrows = this.add.sprite(270, 300, 'arrows');
            arrows.setScale(0.4);

            // do touch mask
            var mask = this.add.sprite(420, 300, 'mask');
            mask.setScale(0.3);
            var check = this.add.sprite(440, 320, 'check');
            check.setScale(0.2);

            // don't touch germ
            var germ = this.add.sprite(550, 300, 'germ');
            germ.setScale(0.06);
            var cross = this.add.sprite(570, 320, 'cross');
            cross.setScale(0.12);

            this.playBtn.visible = true;
            // when button been pressed, disable everything in help panel and back to game
            this.playBtn.on("pointerdown", function () {
                this.menuClick.play();
                this.panelBG.visible = false;
                this.panel.visible = false;
                text1.visible = false;
                text2.visible = false;
                arrows.visible = false;
                mask.visible = false;
                check.visible = false;
                germ.visible = false;
                cross.visible = false;
                this.playBtn.visible = false;
                // set state = -1 for play
                this.state = -1;
            }, this);

        }
    }

}
