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
        // as the levels increase maybe the bar descreases in scale
        //combine these if can crop better if not just bring side of wall to side of crop
        //resize and recrop wall images
        const Leftwall = this.add.image(100, 468, 'Rightwall').setScale(0.50);
        const Rightwall = this.add.image(1190, 468, 'Leftwall').setScale(0.50);
        //const Ball = this.physics.add.image('Ball').setScale(0.20);
        const Bar = this.add.image(600, 1015, 'Bar').setScale(0.40);
        //const cursors = this.input.keyboard.createCursorKeys();

        //Add more bricks(less color??)
        //all colors but one of each and each level adds another row possibly (and top or bottom has effect of taking two hits)
        //const brick = this.add.image(850,870, 'Red').setScale(0.20);
        this.add.text(20, 20, "Level: 1").setFontSize(50).setAlpha(0);
        this.cameras.main.setBackgroundColor(0xf3e5ab);
        //this.add.text(40,20, "Lives: ").setFontSize(50).setAlpha(0);
        //Options:
        // 1: when bar misses ball go to game over/level lost with report of missing ball
        // 2: have lives what that when ball is missid starts again at the bar for three times edits lives: text and on third attempt goes to game over or level lost
        // when going to game over/level lost screen does it go back to scene or cover??

        //should I have an instruction page that explains how to control bar and what bricks take more than one hit??
        //if this works i dont think i need the walls
        this.physics.world.setBoundsCollision(true, true, true, false);

        this.bricks = this.physics.add.staticGroup();
        // const redBrick = this.bricks.create(850, 870, 'Red').setScale(0.20);
        // const peachBrick = this.bricks.create(800, 800, 'Peach').setScale(0.20);
        //const beigeBrick = this.bricks.create(600, 600, 'Beige').setScale(0.20);


        this.bricks = this.physics.add.staticGroup({
            key: ['Red', 'Peach', 'Beige'],
            frameQuantity: 2,
            gridAlign: {
                width: 2,
                height: 3,
                cellWidth: 20,
                cellHeight: 40,
                x: 112,
                y: 100
            }
        });

        // this.bricks = this.physics.add.staticGroup({
        //     key: 'assets', frame: ['Red','Peach','Beige'],
        //     frameQuantity: 2,
        //     gridAlign: {width: 2, height: 3, cellWidth: 64, cellHeight: 32, x: 112, y: 100}
        // });

        //for when ball hits bricks
        // this.bricks.getchildren().forEach(brick => {
        //     brick.setInteractive();


        this.Ball = this.physics.add.image(600, 1015, 'Ball')
            .setCollideWorldBounds(true)
            .setBounce(1)
            .setScale(0.20);
        this.Ball.setData('onBar', true);

        this.Bar = this.physics.add.image(600, 15, 'Bar')
            .setImmovable().setScale(0.40);

        this.physics.add.collider(this.Ball, this.bricks, this.hitBrick, null, this);
        this.physics.add.collider(this.Ball, this.Bar, this.hitBar, null, this);

        this.input.on('pointermove', function (pointer) { //this.Bar.x = Phaser.Math.Clamp(pointer.x, 650, 1455);
            Bar.x = Phaser.Math.Clamp(pointer.x, 650 - Bar.width / 2, 1455 - Bar.width / 2);
            if (this.Ball.getData('onBar')) {
                this.Ball.x = this.Bar.x;
            }
            // if (Ball.getData('onBar')){
            //     Ball.x = Bar.x;
            // }
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
        this.Ball.setPosition(this.Bar.x, 500);
        this.Ball.setData('onBar', true);
    }
    // //and i having more than one life?
    //     resetLevel(){
    //         this.resetBall();
    //         this.bricks.children.each(brick => {
    //             brick.enableBody(false, 0, 0, true, true);
    //         });
    //     }

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
        if (this.Ball.y > 600) {
            this.resetBall();
        }
    }

    //Ball.setData('onBar',true);

    // Ball.setCollideWorldBounds(true);
    // Ball.setBounce(1);
    // Ball.setVelocity(150);
    // this.physics.add.collider(Ball);



    // this.input.on('pointerdown', () => {
    //     if (Ball.getData('onBar')) {
    //         Ball.setData("onBar", false);
    //         Ball.setVelocity(200,-200);
    //     }
    // });

    // this.physics.add.collider(Ball, Bar, () => {
    //     if (!Ball.getData('onBar')){
    //         Ball.setVelocityY(-Ball.body.velocity.y);
    //     }
    // });

    // //enable mouse input
    //         this.input.on('pointerdown', () => {
    //             if (Ball.getData('onBar')) {
    //                 Ball.setData('onBar', false)
    //                 Ball.setVelocity(200, -200);
    //             }
    //         });

    //         // this.input.keyboard.on('keydown-LEFT', () => {
    //         //     Bar.x -= 10;
    //         //     Bar.x = Phaser.Math.Clamp(Bar.x, Leftwall.width + Bar.displayWidth / 2, this.sys.game.config.width - Rightwall.width - Bar.displayWidth /2);
    //         // });

    //         // this.input.keyboard.on('keydown-RIGHT', () => {
    //         //     Bar.x += 10;
    //         //     Bar.x = Phaser.Math.Clamp(Bar.x, Leftwall.width + Bar.displayWidth /2, this.sys.game.config.width - Rightwall.width + Bar.displayWidth /2);
    //         // });

    //         // this.physics.world.setBoundCollision(true, true, ture, false); //enable collision with the world bounds
    //         // this.physics.add.collider(Ball, Bar, () =>{
    //         //     if (!Ball.getData('onBar')) {
    //         //         Ball.setVelocityY(-Ball.body.velocity.y);
    //         //     }
    //         // });

    // //bar
    // //enable mouse input
    //         this.input.on('pointermove', (pointer) => {
    //             Bar.x = Phaser.Math.Clamp(pointer.x, Leftwall.width, this.sys.game.config.width - Rightwall.width);
    //         });

    // //Update the bar's position based on keyboard input
    //         this.input.keyboard.on('keydown_LEFT', () => {
    //             Bar.x -= 10;
    //             Bar.x = Phaser.Math.Clamp(bar.x, Leftwall.width, this.sys.game.config.width - Rightwall.width);
    //         });

    //         this.input.keyboard.on('keydown_Right', () => {
    //             Bar.x += 10;
    //             Bar.x = Phaser.Math.Clamp(bar.x, Leftwall.width, this.sys.game.config.width - Rightwall.width);
    //         });



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
    scene: [Level1],
    //scene: [Cover, Level1, Level2, Level3, GameOver, GameComplete],
    title: "Pysics Game",
    physics: {
        default: 'arcade'
    }
};
const game = new Phaser.Game(config);
    //render: Phaser.Auto,
    //title: "Pysics Game",
//});
