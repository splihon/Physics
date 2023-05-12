class Cover extends Phaser.Scene {
    constuctor(){
        super("Cover");
    }
    preload(){
        this.preload.path = './assets/';
        this.load.image();
    }
    create(){
//tint for behind Play button (to be also used for other buttons)
//bounce for header??
//delay on play button??
    this.input.on('pointer')
    }
}

const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [Cover, Level1, Results1, Level2, Results2, Level3, Results3, GameOver, GameComplete],
    title: "Pysics Game",
});
