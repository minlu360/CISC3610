var config = {
    type: Phaser.AUTO,
    width: 508,
    height: 480,
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create
    },
};

var game = new Phaser.Game(config);

// preload images
function preload() {
    this.load.image('background', 'images/court.jpg');
    this.load.image('ball', 'images/ball.png');
    this.load.image('basket', 'images/basket.png');
    this.load.image('player1', 'images/player1.png');
    this.load.image('player2', 'images/player2.png');
    this.load.image('player3', 'images/player3.png');

}

function create() {

    // background
    var bg = this.physics.add.sprite(config.width / 2, config.height / 2, 'background');

    // basket
    var basket = this.physics.add.sprite(config.width / 2, 110, 'basket');
    basket.setScale(0.15);

    // ball
    var ball = this.physics.add.sprite(450, 0, 'ball');
    ball.setScale(0.2);
    ball.setInteractive();
    this.input.setDraggable(ball);
    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
        gameObject.x = dragX;
        gameObject.y = dragY;
    });
    ball.setCollideWorldBounds(true);
    this.physics.add.overlap(ball, basket, moveBall, null, this);

    // player1
    var player1 = this.physics.add.sprite(400, 300, 'player1');
    player1 .setScale(0.6);
    player1 .setInteractive();
    this.input.setDraggable(player1);
    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
        gameObject.x = dragX;
        gameObject.y = dragY;
    });
    
    //player2
    var player2 = this.physics.add.sprite(100, 100, 'player2');
    player2.setInteractive();
    this.input.setDraggable(player2);
    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
        gameObject.x = dragX;
        gameObject.y = dragY;
    });
    
    // player3
    var player3 = this.physics.add.sprite(200, 300, 'player3');
    player3.setScale(0.2);
    player3.setInteractive();
    this.input.setDraggable(player3);
    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
        gameObject.x = dragX;
        gameObject.y = dragY;
    });

}
// move ball to random position
function moveBall(ball) {
    ball.x = Phaser.Math.Between(ball.width * 0.2, config.width - ball.width * 0.2);
    ball.y = Phaser.Math.Between(300, config.width - ball.height * 0.2);
}
