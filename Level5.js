class Level5 extends Phaser.Scene {
    constructor() {
        super('Level5')
    }

    create() {
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "background").setInteractive();
        this.background.setOrigin(0, 0);

        this.platforms = this.physics.add.staticGroup();




        this.platforms.create(100, 200, 'block2').setScale(0.8).refreshBody().setInteractive();
        this.platforms.create(300, 200, 'block2').setScale(0.8).refreshBody().setInteractive();
        this.platforms.create(500, 200, 'block2').setScale(0.8).refreshBody().setInteractive();
        this.platforms.create(700, 200, 'block2').setScale(0.8).refreshBody().setInteractive();



        this.platforms.create(770, 300, 'block1').setScale(0.8).refreshBody().setInteractive();
        this.platforms.create(770, 400, 'block1').setScale(0.8).refreshBody().setInteractive();

        this.platforms.create(930, 400, 'block2').setScale(0.8).refreshBody().setInteractive();




        this.platforms.create(1170, 670, 'block2').setScale(0.8).refreshBody().setInteractive();
        this.platforms.create(930, 670, 'block2').setScale(0.8).refreshBody().setInteractive();



        this.platforms.create(550, 730, 'block2').setScale(0.8).refreshBody().setInteractive();
        this.platforms.create(360, 730, 'block2').setScale(0.8).refreshBody().setInteractive();
        this.platforms.create(130, 730, 'block2').setScale(0.8).refreshBody().setInteractive();


        this.platforms.create(600, 450, 'block2').setScale(0.8).refreshBody().setInteractive();
        this.platforms.create(400, 450, 'block2').setScale(0.8).refreshBody().setInteractive();
        this.platforms.create(200, 450, 'block2').setScale(0.8).refreshBody().setInteractive();

        this.player = this.physics.add.sprite(50, 50, "player").setScale(0.85);
        this.physics.add.collider(this.player, this.platforms);
        this.player.body.allowRotation = true;
        this.player.setOrigin(0.5, 0.5);
        this.player.setCollideWorldBounds(true);
        this.player.body.onWorldBounds = true;
        this.player.body.world.on('worldbounds', this.onBoundOut, this.player);
        this.player.setBounce(0);
        this.player.setGravityY(300);

        this.WKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.AKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.SKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.DKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.SpaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    }

    update() {
        this.PlayerPhysics();
    }

    onBoundOut() {
        game.scene.start('Level5dw wa wa');
    }

    PlayerPhysics() {

        if (this.gravity == "y") {
            if (this.dir == 0) {
                if (this.AKey.isDown) {
                    this.player.setVelocityX(-100);
                    this.player.play("left", true);
                } else if (this.DKey.isDown) {
                    this.player.setVelocityX(100);
                    this.player.play("right", true);
                } else if (this.SpaceKey.isDown && this.player.body.touching.down) {
                    this.player.setVelocityY(-250);
                } else {
                    this.player.play("idle")
                    this.player.setVelocityX(0);
                }
            } else if (this.dir == 1) {
                if (this.AKey.isDown) {
                    this.player.setVelocityX(-100);
                    this.player.play("right", true);
                } else if (this.DKey.isDown) {
                    this.player.setVelocityX(100);
                    this.player.play("left", true);
                } else if (this.SpaceKey.isDown && this.player.body.touching.up) {
                    this.player.setVelocityY(250);
                } else {
                    this.player.play("idle")
                    this.player.setVelocityX(0);
                }
            }
        } else if (this.gravity == "x") {
            if (this.dir == 0) {
                if (this.WKey.isDown) {
                    this.player.setVelocityY(-100);
                    this.player.play("right", true);
                } else if (this.SKey.isDown) {
                    this.player.setVelocityY(100);
                    this.player.play("left", true);
                } else if (this.SpaceKey.isDown && this.player.body.touching.right) {
                    this.player.setVelocityX(-250);
                } else {
                    this.player.play("idle");
                    this.player.setVelocityY(0);
                }
            } else if (this.dir == 1) {
                if (this.WKey.isDown) {
                    this.player.setVelocityY(-100);
                    this.player.play("left", true);
                } else if (this.SKey.isDown) {
                    this.player.setVelocityY(100);
                    this.player.play("right", true);
                } else if (this.SpaceKey.isDown && this.player.body.touching.left) {
                    this.player.setVelocityX(250);
                } else {
                    this.player.play("idle");
                    this.player.setVelocityY(0);
                }
            }
        }

        if (this.AKey.isDown && this.SpaceKey.isDown) {
            this.player.setGravityY(0);
            this.player.setGravityX(300);
            this.player.setAngle(-90);
            this.player.setSize(96, 52);
            this.gravity = "x";
            this.dir = 0;
        } else if (this.DKey.isDown && this.SpaceKey.isDown) {
            this.player.setGravityY(0);
            this.player.setGravityX(-300);
            this.player.angle = 90;
            this.player.setSize(96, 52);
            this.gravity = "x";
            this.dir = 1;
        } else if (this.WKey.isDown && this.SpaceKey.isDown) {
            this.player.setGravityY(300);
            this.player.setGravityX(0);
            this.player.angle = 0;
            this.player.setSize(52, 96);
            this.gravity = "y";
            this.dir = 0;
        } else if (this.SKey.isDown && this.SpaceKey.isDown) {
            this.player.setGravityY(-300);
            this.player.setGravityX(0);
            this.player.angle = 180;
            this.player.setSize(52, 96);
            this.gravity = "y";
            this.dir = 1;
        }
    }
}