var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 540,
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y:  300 },
            debug: false,
            enableBody: true
        }
    },
    scene: [InitialInterface, GameStart, GameEnd],
    hp: 3,
    bgSound: null
};

var game = new Phaser.Game(config);



