class Enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, "enemy");
        this.scene = scene;
        scene.physics.world.enable(this);
        scene.add.existing(this);
        this.setBounce(1);
        this.setCollideWorldBounds(true);
        this.direction="left";
    }
    getDirection() {
        return this.direction;
    }
    setDirection(dir) {
        this.direction = dir;
    }
}