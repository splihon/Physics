class Cover extends Phaser.Scene {
    constructor() {
        super("Cover");
    }
    preload() {
        this.load.path = './assets/';
        this.load.image('Buttonbackground', 'Buttonbackground.png');
        this.load.image('Brickbreaker', 'Brickbreaker.png');
        this.load.image('Play', 'Play.png');
        this.load.image('Screenbackground', 'Screenbackground.png');

    }
    create() {
        this.add.image(320, 210, 'Screenbackground').setOrigin(0.25, 0.30).setScale(0.70);
        let Buttonbackground = this.add.image(680, 870, 'Buttonbackground').setScale(0.40);
        this.add.image(680, 870, 'Play').setScale(0.40);
        let Brickbreaker = this.add.image(680, 400, 'Brickbreaker').setScale(0.60);

        //tint for behind Play button (to be also used for other buttons)
        //bounce for header??
        //delay on play button??
        this.tweens.add({
            targets: Brickbreaker,
            y: '+=10', //move down by 10 pixels
            ease: 'Sine.easeInOut',
            duration: 1000,
            yoyo: true,
            repeat: -1
        });
        Buttonbackground.setInteractive()
            .on('pointerover', () => {
                Buttonbackground.setTint(0xff0000);
            })
            .on('pointerout', () => {
                Buttonbackground.clearTint();
            })
            .on('pointerdown', () => {
                this.scene.start('Level1');
                //this.gotoScene('Level1');
            });
    }
}

class Level1 extends Phaser.Scene {
    constructor() {
        super("Level1");
    }
    preload() {
        this.load.path = './assets/';
        this.load.image('Ball', 'Ball.png');
        this.load.image('Bar', 'Bar.png');
        this.load.image('Leftwall', 'Leftwall.png');
        this.load.image('Rightwall', 'Rightwall.png');
        this.load.image('Red', 'Red.png');
        this.load.image('Peach', 'Peach.png');
        this.load.image('Beige', 'Beige.png');
    }
    create() {
        const Leftwall = this.add.image(100, 468, 'Rightwall').setScale(0.50);
        const Rightwall = this.add.image(1190, 468, 'Leftwall').setScale(0.50);
        //const Ball = this.physics.add.image('Ball').setScale(0.20);
        const Bar = this.add.image(600, 1015, 'Bar').setScale(0.40);
        //const cursors = this.input.keyboard.createCursorKeys();

        this.add.text(120, 20, "Level: 1", { color: '#000000'}).setFontSize(40);
        this.cameras.main.setBackgroundColor(0xf3e5ab);

        this.physics.world.setBoundsCollision(true, true, true, false);

        this.bricks = this.physics.add.staticGroup();

        this.bricks = this.physics.add.staticGroup({
            key: ['Red', 'Peach', 'Beige'],
            frameQuantity: 2,
            gridAlign: {
                width: 1,
                height: 30,
                cellWidth: 20,
                cellHeight: 60,
                x: 350,
                y: 100
            }
        });

        this.Ball = this.physics.add.image(600, 1015, 'Ball')
            .setCollideWorldBounds(true)
            .setBounce(1)
            .setScale(0.20);
        this.Ball.setData('onBar', true);

        Bar.x = Bar;

        this.physics.add.collider(this.Ball, this.bricks, this.hitBrick, null, this);
        this.physics.add.collider(this.Ball, this.Bar, this.hitBar, null, this);

        this.input.on('pointermove', function (pointer) {
            Bar.x = Phaser.Math.Clamp(pointer.x, 650 - Bar.width / 2, 1455 - Bar.width / 2);
            if (this.Ball.getData('onBar')) {
                this.Ball.x = this.Bar;
            }
          
        }, this);

        this.input.on('pointerup', function (pointer) {
            if (this.Ball.getData('onBar')) {
                this.Ball.setVelocity(-75, -300);
                this.Ball.setData('onBar', false);
            }
        }, this);
    }

    hitBrick(Ball, brick) {
        brick.disableBody(true, true);
        if (this.bricks.countActive() === 0) {
            this.scene.start('Level2');
        }
    }

    resetBall() {
        this.Ball.setVelocity(0);
        this.Ball.setPosition(this.Bar, 500);
        this.Ball.setData('onBar', true);
    }

    hitBar(Ball, Bar) {
        let diff = 0;
        if (Ball.x < Bar.x) {
            diff = Bar.x - Ball.x;
            Ball.setVelocityX(-10 * diff);
        }
        else if (Ball.x > Bar.x) {
            diff = Ball.x - Bar.x;
            Ball.setVelocityX(10 * diff);
        }
        else {
            Ball.setVelocityX(2 + Math.random() * 8);
        }
    }

    update() {
        if (this.Ball.y > 900) {
            this.resetBall();
        }
    }
}


class Level2 extends Phaser.Scene {
    constructor() {
        super('Level2');
    }
    preload() {
        this.load.path = './assets/';
        this.load.image('Ball', 'Ball.png');
        this.load.image('Bar', 'Bar.png');
        this.load.image('Leftwall', 'Leftwall.png');
        this.load.image('Rightwall', 'Rightwall.png');
        this.load.image('Red', 'Red.png');
    }
    create() {


        //bar
        //enable mouse input
        this.input.on('pointermove', (pointer) => {
            Bar.x = Phaser.Math.Clamp(pointer.x, Leftwall.width, this.sys.game.config.width - Rightwall.width);
        });

        //Update the bar's position based on keyboard input
        this.input.keyboard.on('keydown_LEFT', () => {
            Bar.x -= 10;
            Bar.x = Phaser.Math.Clamp(bar.x, Leftwall.width, this.sys.game.config.width - Rightwall.width);
        });

        this.input.keyboard.on('keydown_Right', () => {
            Bar.x += 10;
            Bar.x = Phaser.Math.Clamp(bar.x, Leftwall.width, this.sys.game.config.width - Rightwall.width);
        });
    }
}

class Level3 extends Phaser.Scene {
    constructor() {
        super('Level3');
    }
    preload() {
        this.load.path = './assets/';
        this.load.image('Ball', 'Ball.png');
        this.load.image('Bar', 'Bar.png');
        this.load.image('Leftwall', 'Leftwall.png');
        this.load.image('Rightwall', 'Rightwall.png');
        this.load.image('Red', 'Red.png');
    }
    create() {


        //bar
        //enable mouse input
        this.input.on('pointermove', (pointer) => {
            Bar.x = Phaser.Math.Clamp(pointer.x, Leftwall.width, this.sys.game.config.width - Rightwall.width);
        });

        //Update the bar's position based on keyboard input
        this.input.keyboard.on('keydown_LEFT', () => {
            Bar.x -= 10;
            Bar.x = Phaser.Math.Clamp(bar.x, Leftwall.width, this.sys.game.config.width - Rightwall.width);
        });

        this.input.keyboard.on('keydown_Right', () => {
            Bar.x += 10;
            Bar.x = Phaser.Math.Clamp(bar.x, Leftwall.width, this.sys.game.config.width - Rightwall.width);
        });
    }
}

//should I make reults/lost level and game over all one scene
//so that when ball is missed on missed on third attempt goes to game over screen
//and game over scene could have two buttons one restart or one continue
//restart going back to cover and continue going to previous level player lost at
class GameOver extends Phaser.Scene {
    constructor() {
        super('GameOver');
    }
    preload() {
        this.load.path = './assets/';
        this.load.image('Buttonbackground', 'Buttonbackground.png');
        this.load.image('Continue', 'Continue.png');
        this.load.image('Restart', 'Restart.png');
        this.load.image('Screenbackground', 'Screenbackground.png');
        this.load.image('Brickbreaker', 'Brickbreaker.png');
    }
    create() {
        this.add.image(320, 210, 'Screenbackground').setOrigin(0.25, 0.30).setScale(0.70);
        let Buttonbackground = this.add.image(500, 870, 'Buttonbackground').setScale(0.40);
        let Buttonbackground2 = this.add.image(900, 870, 'Buttonbackground').setScale(0.40);
        this.add.image(500, 870, 'Restart').setScale(0.40);
        this.add.image(900, 870, 'Continue').setScale(0.40);
        let Brickbreaker = this.add.image(680, 400, 'Brickbreaker').setScale(0.60);
        //this.add.text(20,20, "Level: 1").setFontSize(50);
        this.add.text(550, 700, 'Ball was dropped!', { color: '#000000' }).setFontSize(30);
        this.add.text(400, 970, 'Click Continue to retry the level', { color: '#000000' }).setFontSize(30);
        this.add.text(340, 999, 'Click Restart to return to the Homepage', { color: '#000000' }).setFontSize(30);

        this.tweens.add({
            targets: Brickbreaker,
            y: '+=10', //move down by 10 pixels
            ease: 'Sine.easeInOut',
            duration: 1000,
            yoyo: true,
            repeat: -1
        });

        //restart will take you to the Cover
        Buttonbackground.setInteractive()
            .on('pointerover', () => {
                Buttonbackground.setTint(0xff0000);
            })
            .on('pointerout', () => {
                Buttonbackground.clearTint();
            })
            .on('pointerdown', () => {
                this.scene.start('Cover');
                //this.gotoScene('Level1');

            });

        //Continue will tak you back the level you lost at
        Buttonbackground2.setInteractive()
            .on('pointerover', () => {
                Buttonbackground2.setTint(0xff0000);
            })
            .on('pointerout', () => {
                Buttonbackground2.clearTint();
            })
            .on('pointerdown', () => {
                // how to make it go back to the scene/level they lost on
                //this.scene.start('Cover');
                //this.gotoScene('Level1');

            });
    }
}

class GameComplete extends Phaser.Scene {
    constructor() {
        super('GameComplete');
    }
    preload() {
        this.load.path = './assets/';
        this.load.image('Buttonbackground', 'Buttonbackground.png');
        this.load.image('Restart', 'Restart.png');
        this.load.image('Screenbackground', 'Screenbackground.png');
        this.load.image('Brickbreaker', 'Brickbreaker.png');
    }
    create() {
        this.add.image(320, 210, 'Screenbackground').setOrigin(0.25, 0.30).setScale(0.70);
        let Buttonbackground = this.add.image(680, 870, 'Buttonbackground').setScale(0.40);
        this.add.image(680, 870, 'Restart').setScale(0.40);
        let Brickbreaker = this.add.image(680, 400, 'Brickbreaker').setScale(0.60);

        this.tweens.add({
            targets: Brickbreaker,
            y: '+=10', //move down by 10 pixels
            ease: 'Sine.easeInOut',
            duration: 1000,
            yoyo: true,
            repeat: -1
        });
        Buttonbackground.setInteractive()
            .on('pointerover', () => {
                Buttonbackground.setTint(0xff0000);
            })
            .on('pointerout', () => {
                Buttonbackground.clearTint();
            })
            .on('pointerdown', () => {
                this.scene.start('Cover');
                //this.gotoScene('Level1');
            });

    }
}
const config = {
    type: Phaser.WEBGL,
    width: 1300,
    height: 1070,
    scene: [Level1],
    //scene: [Cover, Level1, Level2, Level3, GameOver, GameComplete],
    title: "Pysics Game",
    physics: {
        default: 'arcade'
    }
};

    // const game = new Phaser.Game({
    //     type: Phaser.Auto,
    //     width:1300,
    //     height: 1070,
    //     physics:{
    //         default: "arcade",
    //         arcade: {
    //             // gravity: {y: 0},
    //             // debug: false,
    //             debug: true,
    //             gravity: {y: 100}
    //         },
    //     },
    // });

    // const game = new Phaser.Game({
    //     scale: {
    //         mode: Phaser.Scale.FIT,
    //         autoCenter: Phaser.Scale.CENTER_BOTH,
    //         width: 1300,
    //         height: 1070
    //     },
    //possibly combining: Result 1,2,and 3 with Game Over

const game = new Phaser.Game(config);
    //render: Phaser.Auto,
    //title: "Pysics Game",
//});
