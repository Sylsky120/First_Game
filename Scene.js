class Scene extends Phaser.Scene{
    constructor(){
        super({key: "Scene"});
        this.player=null;
        this.platforms=null;
        this.hearts=null;
        this.enemys=null;
        this.coin_right=null;
        this.coin_left=null;
        this.lose=null;
    }
    preload(){
        this.load.audio('lose', 'phasertest-main/music/lose.mp3');
        this.load.audio('pick', 'phasertest-main/music/pick.mp3');
        
        this.load.image("platform", "phasertest-main/assets/platform.png");
        this.load.image("heart", 'phasertest-main/assets/heart.png');
        this.load.image("lose", "phasertest-main/assets/lose.png");
        this.load.spritesheet("enemy", "phasertest-main/assets/enemy1.png", {frameWidth:43.6, frameHeight:65});
        this.load.image("coin", "phasertest-main/assets/coin.png");

        this.load.spritesheet('player', 'phasertest-main/assets/rabbit3 - doux.png', {frameWidth:72, frameHeight:72});
    }
    create(){
        this.lose=this.add.image(450, 170, 'lose').setInteractive();

        this.score = 0;
        this.scoreText = this.add.text(10, 10, "Score: ", {
            fontSize: 50,
            fill: "white"
        })

        this.enemy1=new Enemy(this, 100, 570);
        this.enemy2=new Enemy(this, 200, 570);
        this.enemys = [this.enemy1,this.enemy2];

        this.coin_right=this.physics.add.staticGroup();
        this.coin_right.create(50,400,'coin');

        this.coin_left=this.physics.add.staticGroup();
        this.coin_left.create(500,400,'coin');

        this.player=new Player(this, 400, 165).setInteractive();

        this.input.setDraggable([this.lose, this.player]);
        this.input.on("drag", function(pointer, gameObj, dragX, dragY){
            gameObj.x=dragX;
            gameObj.y=dragY;
        })

        this.input.on("dragstart", function(pointer, gameObject){
            gameObject.setTint(0xff69b4);
            gameObject.setScale(2);
            gameObject.setDepth(1);
        })

        this.input.on("dragend", function(pointer, gameObject){
            gameObject.setTint();
            gameObject.setScale();
            gameObject.setDepth();
        })

        this.hearts=this.physics.add.staticGroup();
        this.hearts.create(320, 170, 'heart').setScale(1);
        this.hearts.create(270, 170, 'heart').setScale(0.5);
        this.hearts.create(220, 170, 'heart').setScale(2);
        
        this.platforms=this.physics.add.staticGroup();
        this.platforms.create(300, 250, 'platform');
        this.platforms.create(600, 214, 'platform');

        this.physics.add.collider(this.player, this.platforms);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', {start:14, end:16}),
            frameRate: 10,
            repeat: 1
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', {start:5, end:7}),
            frameRate: 10,
            repeat: 1
        });
        this.anims.create({
            key: 'eleft',
            frames: this.anims.generateFrameNumbers('enemy', {start:13, end:25}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'eright',
            frames: this.anims.generateFrameNumbers('enemy', {start:0, end:12}),
            frameRate: 10,
            repeat: -1
        });

        this.physics.add.overlap(
            this.hearts,
            this.player,
            this.player_touch_heart,
            null,
            this
        );

        this.physics.add.overlap(
            this.coin_right, 
            this.enemys, 
            this.enemy_touch_coin_right,
            null,
            this
        );
    
        this.physics.add.overlap(
            this.coin_left, 
            this.enemys, 
            this.enemy_touch_coin_left,
            null,
            this
        );

        this.physics.add.overlap(
            this.enemys,
            this.player,
            this.player_touch_enemy,
            null,
            this
        );

        this.cursors = this.input.keyboard.createCursorKeys();
    }
    player_touch_enemy(enemys, player){
        player.disableBody(true, true);
        //this.sound.play('lose');
    }
    enemy_touch_coin_right(enemys,coin_right) {
        enemys.setDirection("right");
    }
        
    enemy_touch_coin_left(enemys,coin_left) {
        enemys.setDirection("left");
    }

    player_touch_heart(player, hearts){
        hearts.disableBody(true, true);
        //this.sound.play('pick');
        this.score++;
    }
    update(){
        this.scoreText.setText("Score: " + this.score);
        if(this.cursors.left.isDown){
            this.player.setVelocityX(-200);
            this.player.anims.play('left', true);
        }else if(this.cursors.right.isDown){
            this.player.setVelocityX(200);
            this.player.anims.play('right', true);
        }else{
            this.player.setVelocityX(0);
        }

        for(let enemy of this.enemys){
            if(enemy.getDirection() === "left"){
                enemy.setVelocity(-50, 0);
                enemy.anims.play("eleft", true);
            }else if(enemy.getDirection() === "right"){
                enemy.setVelocity(50, 0);
                enemy.anims.play("eright", true);
            }
        }
    }
}
