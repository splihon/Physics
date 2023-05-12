class Cover extends Phaser.Scene {
    constuctor(){
        super("Cover");
    }
    preload(){
        this.preload.path = './assets/';
        this.load.image('Buttonbackground', 'Buttonbackground.png');
        this.load.image('Brickbreaker', 'Brickbreaker.png');
        this.load.image('Play','Play.png');
        this.load.image('Screenbackground', 'Screenbackground');

    }
    create(){
        this.add.image(320,210, 'Screenbackground').setOrigin(0.20,0.30).setScale(0.60);
        let Buttonbackground = this.add.image(240,800, 'Buttonbackground').setScale(0.40);
        this.add.image(240,800, 'Play').setScale(0.40);
        let Brickbreaker = this.add.image(240,800, 'Brickbreaker').setScale(0.40);

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
            .on('pointerover', () => { Buttonbackground.setTint(0xff0000);
            })
            .on('pointerout', () => { Buttonbackground.clearTint();
            })
            .on('pointerdown', () => {
                //tint affect
                this.gotoScene('Level1');
            });
        }
}

class Level1 extends Phaser.Scene {
    constructor(){
        super("Level1");
    }
    preload(){
        this.preload.path = './assets/';
        this.load.image('Ball', 'Ball.png');
        this.load.image('Bar', 'Bar.png');
        this.load.image('Wall','Wall.png');
        this.load.image('Red', 'Red.png');
        }
    create(){
//combine these if can crop better if not just bring side of wall to side of crop
        const Leftwall = this.add.image(850,870, 'Wall').setScale(0.40);
        const Rightwall = this.add.image(850,870, 'Wall').setScale(0.40);
        this.add.image(850,870, 'Ball').setScale(0.40);
        const Bar = this.add.image(900,870, 'Bar').setScale(0.40);
        const cursors = this.input.keyboard.createCursorKeys();
//Add more bricks(less color??)
//all colors but one of each and each level adds another row possibly (and top or bottom has effect of taking two hits)
        this.add.image(850,870, 'Red').setScale(0.40);
        this.add.text(20,20, "Level: 1").setFontSize(50).setAlpha(0);
        //this.add.text(40,20, "Lives: ").setFontSize(50).setAlpha(0);
        //Options:
// 1: when bar misses ball go to game over/level lost with report of missing ball
// 2: have lives what that when ball is missid starts again at the bar for three times edits lives: text and on third attempt goes to game over or level lost
// when going to game over/level lost screen does it go back to scene or cover??

//should I have an instruction page that explains how to control bar and what bricks take more than one hit??

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

class Level2 extends Phaser.Scene {
    constructor(){
        super('Level2');
    }
    preload(){
        this.preload.path = './assets/';
        this.load.image('Ball', 'Ball.png');
        this.load.image('Bar', 'Bar.png');
        this.load.image('Wall','Wall.png');
        this.load.image('Red', 'Red.png');
    }
    create(){

    }
}

class Level3 extends Phaser.Scene {
    constructor(){
        super('Level3');
    }
    preload(){
        this.preload.path = './assets/';
        this.load.image('Ball', 'Ball.png');
        this.load.image('Bar', 'Bar.png');
        this.load.image('Wall','Wall.png');
        this.load.image('Red', 'Red.png');
    }
    create(){

    }
}

//should I make reults/lost level and game over all one scene
//so that when ball is missed on missed on third attempt goes to game over screen
//and game over scene could have two buttons one restart or one continue
//restart going back to cover and continue going to previous level player lost at
class GameOver extends Phaser.Scene {
    constructor(){
        super('GameOver');
    }
    preload(){
        this.preload.path = './assets/';
        this.load.image('Buttonbackground', 'Buttonbackground.png');
        this.load.image('Continue', 'Continue.png');
        this.load.image('Restart', 'Restart.png');
        this.load.image('Screenbackground', 'Screenbackground');
    }
    create(){

    }
}

class GameComplete extends Phaser.Scene {
    constructor(){
        super('GameComplete');
    }
    preload(){
        this.preload.path = './assets/';
        this.load.image('Buttonbackground', 'Buttonbackground.png');
        this.load.image('Restart', 'Restart.png');
        this.load.image('Screenbackground', 'Screenbackground');
    }
    create(){
        
    }
}



const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    //possibly combining: Result 1,2,and 3 with Game Over
    scene: [Cover, Level1, Level2, Level3, GameOver, GameComplete],
    title: "Pysics Game",
});
