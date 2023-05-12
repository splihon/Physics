class Scene extends Phaser.Scene{
    
    constructor(key, name) {
        super(key);
        this.name = name;
    }

    create(){
        this.add.text(this.w-3*this.s, this.h-3*this.s, "📺")
            .setStyle({ fontSize: `${2 * this.s}px` })
            .setInteractive({useHandCursor: true})
            .on('pointerover', () => this.showMessage('Fullscreen?'))
            .on('pointerdown', () => {
                if (this.scale.isFullscreen) {
                    this.scale.stopFullscreen();
                } else {
                    this.scale.startFullscreen();
                }
            });
        }
    //to be used when ball hits a block but takes more than one hit to dissapear??
    //Or for board when the ball hits the board?? probably not
        notouching(item){
            this.tweens.add({
                targets: item,
                x: '+=' + this.s,
                repeat: 2,
                yoyo: true,
                ease: 'Sine.inOut',
                duration: 100
            });
        }
}