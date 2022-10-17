class Menu extends Phaser.Scene{
    constructor(){
        super({key: "Menu"});
        this.button=null;
        this.particles=null;
    }
    preload(){
        this.load.image("button", "phasertest-main/PNG/simple/24.png");
        this.load.image("heart", "phasertest-main/assets/heart.png");
    }
    create(){
        this.button=this.add.image(450, 250, "button").setInteractive({useHandCursor: true}).on("pointerup", () => {this.startgame();});
        this.gamestart=this.add.text(400, 235, "start", {
            fontSize: "32px",
            color: '#ffffff'
        });

        this.particles=this.add.particles('heart');
    }
    startgame(){
        this.scene.start("Scene");
    }
    update(){}
}