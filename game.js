var config = {
    width: 1280,
    height: 720,
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
    },
    scene: [Load, Level, Level1,Level3,Level4, Level5, Level6, Level9, Level10],
}
var playerSprite;
var game = new Phaser.Game(config);