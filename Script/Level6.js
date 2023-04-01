class Level6 extends Phaser.Scene {
    constructor() {
        super('Level6');
    }

    create(){

        lvl=5;

        this.gravity="y";
        this.dir=0;
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
        this.background.setOrigin(0, 0);
        this.background.setInteractive();

        this.platforms = this.physics.add.staticGroup();
        // T
        this.platforms.create(600, 260, 'block2').setScale(1.2, 0.7).refreshBody();
        this.platforms.create(600, 420, 'block1').setScale(0.7, 2.1).refreshBody();
        // C
        this.platforms.create(1000, 500, 'block2').setScale(0.9, 0.7).refreshBody();
        this.platforms.create(1000, 260, 'block2').setScale(0.9, 0.7).refreshBody();
        this.platforms.create(910, 420, 'block1').setScale(0.7, 2.0).refreshBody();
        // U
        this.platforms.create(200, 520, 'block2').setScale(1.0, 0.7).refreshBody();
        this.platforms.create(100, 380, 'block1').setScale(0.7, 2.3).refreshBody();
        this.platforms.create(300, 380, 'block1').setScale(0.7, 2.3).refreshBody();
        this.input.setDraggable(this.background);
        this.player = this.physics.add.sprite(220, 70, "player").setScale(0.85);
        this.physics.add.collider(this.player, this.platforms);
        this.player.body.allowRotation = true;
        this.player.setOrigin(0.5, 0.5);
        this.player.setCollideWorldBounds(true);
        this.player.body.onWorldBounds = true;
        this.player.body.world.on('worldbounds', this.onBoundOut, this.player);
        this.player.setBounce(0);
        this.player.setGravityY(300);

        this.enemies = this.physics.add.group();
        this.enemies.create(500, 170, 'enemy').setScale(0.5);

        this.WKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.AKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.SKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.DKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.SpaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.warmhole = this.physics.add.sprite(200, 50, 'warmhole').setScale(0);
        this.warmhole2 = this.physics.add.sprite(1100, 200, 'warmhole').setScale(0.25);

        this.player.alpha = 0.3;
    
        this.warmhole.alpha = 1;
        var tween = this.tweens.add({
          targets: this.warmhole,
          scale: 0.25,
          ease: 'Linear',
          duration: 1000,
          repeat:0,
          onComplete: function(){
            this.player.alpha = 1;
    
            var tween2 = this.tweens.add({
              targets: this.warmhole,
              scale: 0,
              ease: 'Linear',
              duartion : 1000,
              reapeat:0,
    
              onComplete: function (){
                tween.stop();
              }
            })
          },
          callbackScope: this
        });  
        
    this.physics.add.overlap(this.player, this.enemies, this.gameOut, null, this);
    this.physics.add.overlap(this.player, this.warmhole2, this.nextLevel, null, this);

    pauseBtn=this.add.image(1230,50,"pause").setScale(0.7).setInteractive();
    pauseBtn.on('pointerdown',this.onPause);

    inGameMenuBg=this.add.image(640,360,"inGameMenu").setScale(1.3);
    inGameMenuBg.visible=false;
    reloadBtn=this.add.image(750,360,"reload").setScale(0.9).setInteractive();
    reloadBtn.on('pointerdown',this.onReload);
    reloadBtn.visible=false;
    playBtn=this.add.image(500,360,"play").setScale(0.9).setInteractive();
    playBtn.on('pointerdown',this.onPlay);
    playBtn.visible=false;

    }

    onBoundOut() {
        game.scene.start('Level6');
    }

    
  onPause(){
    inGameMenuBg.visible=true;
    reloadBtn.visible=true;
    playBtn.visible=true;
    pauseBtn.visible=false;
    game.scene.pause("Level"+lvl);
  }
  onPlay(){
    inGameMenuBg.visible=false;
    reloadBtn.visible=false;
    playBtn.visible=false;
    pauseBtn.visible=true;
    game.scene.resume("Level"+lvl);
  }
  onReload(){
    inGameMenuBg.visible=false;
    reloadBtn.visible=false;
    playBtn.visible=false;
    pauseBtn.visible=true;
    game.scene.start("Level6");
  }



  update(){
    this.PlayerPhysics();
  }

  gameOut(player, enemy){
    enemy.play('attack',true);
    this.player.body.enable = false;
    this.player.visible = false;

    this.scene.restart();
  }

  nextLevel(player,warmhole){
    this.player.body.enable = false;
    this.player.visible = false;
    game.scene.start("Level7");

  }

  PlayerPhysics(){

    if(this.gravity=="y"){
      if(this.dir==0){
        if (this.AKey.isDown) {
          this.player.setVelocityX(-100);
          this.player.play("left",true);
        } 
        else if (this.DKey.isDown) {
          this.player.setVelocityX(100);
          this.player.play("right",true);
        } 
        else if(this.SpaceKey.isDown && this.player.body.touching.down){
          this.player.setVelocityY(-250);
        }
        else{
          this.player.play("idle")
          this.player.setVelocityX(0);
        }
      }
      else if(this.dir==1){
        if (this.AKey.isDown) {
          this.player.setVelocityX(-100);
          this.player.play("right",true);
        } 
        else if (this.DKey.isDown) {
          this.player.setVelocityX(100);
          this.player.play("left",true);
        } 
        else if(this.SpaceKey.isDown && this.player.body.touching.up){
          this.player.setVelocityY(250);
        }
        else{
          this.player.play("idle")
          this.player.setVelocityX(0);
        }
      }
    }
    else if(this.gravity=="x"){
      if(this.dir==0){
        if (this.WKey.isDown) {
          this.player.setVelocityY(-100);
          this.player.play("right",true);
        } 
        else if (this.SKey.isDown) {
          this.player.setVelocityY(100);
          this.player.play("left",true);
        } 
        else if(this.SpaceKey.isDown && this.player.body.touching.right){
          this.player.setVelocityX(-250);
        }
        else{
          this.player.play("idle");
          this.player.setVelocityY(0);
        }
      }
      else if(this.dir==1){
        if (this.WKey.isDown) {
          this.player.setVelocityY(-100);
          this.player.play("left",true);
        } 
        else if (this.SKey.isDown) {
          this.player.setVelocityY(100);
          this.player.play("right",true);
        } 
        else if(this.SpaceKey.isDown && this.player.body.touching.left){
          this.player.setVelocityX(250);
        }
        else{
          this.player.play("idle");
          this.player.setVelocityY(0);
        }
      }
    }

    if(this.AKey.isDown && this.SpaceKey.isDown){
      this.player.setGravityY(0);
      this.player.setGravityX(300);
      this.player.setAngle(-90);
      this.player.setSize(96,52);
      this.gravity="x";
      this.dir=0;
    }
    else if(this.DKey.isDown && this.SpaceKey.isDown){
      this.player.setGravityY(0);
      this.player.setGravityX(-300);
      this.player.angle=90;
      this.player.setSize(96,52);
      this.gravity="x";
      this.dir=1;
    }
    else if(this.WKey.isDown && this.SpaceKey.isDown){
      this.player.setGravityY(300);
      this.player.setGravityX(0);
      this.player.angle=0;
      this.player.setSize(52,96);
      this.gravity="y";
      this.dir=0;
    }
    else if(this.SKey.isDown && this.SpaceKey.isDown){
      this.player.setGravityY(-300);
      this.player.setGravityX(0);
      this.player.angle=180;
      this.player.setSize(52,96);
      this.gravity="y";
      this.dir=1;
    }
  }
}