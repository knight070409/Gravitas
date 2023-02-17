class Load extends Phaser.Scene{
    constructor(){
        super('load')
    }

    preload(){
        this.load.image("background", "Assets/Background.png");
        this.load.image("block1", "Assets/Block.png");
        this.load.image("block2", "Assets/Block_stretched.png");
        playerSprite=this.load.spritesheet("player", "Assets/player.png", {
            frameHeight:96,
            frameWidth:52
        });
        this.load.spritesheet("enemy", "Assets/enemy.png", {
            frameHeight:256,
            frameWidth:256
        });
        this.load.image("warmhole", "Assets/Warm_Hole.png");

        this.load.image("menu", "Assets/UI/Menu.png");
        this.load.image("play", "Assets/UI/Pause.png");
        this.load.image("pause", "Assets/UI/Play.png");
        this.load.image("reload", "Assets/UI/reload.png");


        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);
        
        //var width = this.cameras.main.width;
        //var height = this.cameras.main.height;
        var loadingText = this.make.text({
            x: 1280 / 2,
            y: 720 / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);
        
        var percentText = this.make.text({
            x: 1280 / 2,
            y: 720 / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);
        
        var assetText = this.make.text({
            x: 1280 / 2,
            y: 720 / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        assetText.setOrigin(0.5, 0.5);
        
        this.load.on('progress', function (value) {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
        });
        
        this.load.on('fileprogress', function (file) {
            assetText.setText('Loading asset: ' + file.key);
        });
        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });
        
        this.load.image('logo', 'Assets/Logo.png');
    }

    create(){
        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("player",{start:0,end:1}),
            frameRate:6,
            repeat: -1
        });

        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("player",{
                start:4,
                end:3
            }),
            frameRate:6,
            repeat: -1
        });

        this.anims.create({
            key: "idle",
            frames: this.anims.generateFrameNumbers("player",{
                start:2,
                end:2
            }),
            frameRate:6,
        });

        this.anims.create({
            key: "attack",
            frames: this.anims.generateFrameNumbers("enemy",{
                start:0,
                end:3
            }),
            frameRate:6,
        });


        this.logo = this.add.image(1280/2, 720/2, 'logo').setScale(0.25);
    }

    update(time){
       if(time > 3000){
        this.scene.switch("Level");
        }
    }
}