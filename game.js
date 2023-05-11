const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [Cover, Level1, Results1, Level2, Results2, Level3, Results3, Level4, Results4, GameOver, GameComplete],
    title: "Pysics Game",
});
