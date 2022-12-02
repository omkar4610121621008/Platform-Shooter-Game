import Phaser from "phaser";

const game = new Phaser.Game({
    type: Phaser.AUTO,
    width: 1030,
    height: 526,
    backgroundColor: "#FFF",
    physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 300 },
          debug: false
      }
    },
    scene: {
      preload: preload,
      create: create,
      update: update
    }
  });
  
  let red;
  let cursors;
  let audio_feet;
  let isRunning;
  
  
  function preload () {
    this.load.spritesheet('idle', 'assets/Idle.png', {frameWidth: 200, frameHeight: 135})
    this.load.spritesheet('run', 'assets/Run.png', {frameWidth: 200, frameHeight: 135})
    this.load.spritesheet('jump', 'assets/Jump.png', {frameWidth: 200, frameHeight: 135})
    this.load.spritesheet('strike', 'assets/Attack1.png', {frameWidth: 200, frameHeight: 135})
    this.load.spritesheet('fall', 'assets/Fall.png', {frameWidth: 200, frameHeight: 135})
    this.load.image("ground", 'assets/')
    this.load.audio('feet', 'assets/feet.ogg')
    this.load.audio('strike', 'assets/strike.ogg')
    this.load.image("forest", 'assets/background/proper-background.png')
  }
  
  function create () {
  
    this.add.image(440, 300, 'forest');
  
    red = this.physics.add.sprite(300, 300, 'idle')
    red.setScale(1.8)
    red.setBounce(0.2)
    red.setCollideWorldBounds(true)
  
    cursors = this.input.keyboard.createCursorKeys()
    audio_feet = this.sound.add('feet')
    audio_strike = this.sound.add("strike")
  
    this.anims.create({
        key: 'left',
        frameRate: 10,
        repeat: -1,
        frames: this.anims.generateFrameNumbers('run', { start:1, end: 8 })
    })
  
    this.anims.create({
        key: 'right',
        frameRate: 10,
        repeat: -1,
        frames: this.anims.generateFrameNumbers('run', { start:1, end: 8 })
    })
  
    this.anims.create({
        key: 'idle',
        frameRate: 8,
        repeat: -1,
        frames: this.anims.generateFrameNumbers('idle', { start: 1, end: 8 })
    })
  
    this.anims.create({
        key: "jump",
        frameRate: 35,
        repeat: -1,
        frames: this.anims.generateFrameNumbers('jump', { start: 1, end: 19 })
    })
  
    this.anims.create({
        key: "strike",
        frameRate: 8,
        repeat: -1,
        frames: this.anims.generateFrameNumbers('strike', { start: 1, end: 6 })
        
    })
  
    this.anims.create({
        key: "fall",
        frameRate: 3,
        repeat: -1,
        frames: this.anims.generateFrameNumbers('strike', { start: 1, end: 2 })
        
    })
  }
  
  function update () {
    if (cursors.left.isDown) {
        isRunning = true
        red.setVelocityX(-290)
        red.flipX = true
        red.anims.play('left', true)
    } else if (cursors.right.isDown) {
        isRunning = true
        red.flipX = false
        red.setVelocityX(290)
        red.anims.play('right', true)
    } else if (cursors.space.isDown) {
        isRunning = false
        red.anims.play('strike', true)
    } else if (cursors.up.isDown) {
        isRunning = false
        red.setVelocityY(-100)
        red.anims.play("jump", true)
    } else if (cursors.down.isDown) {
        isRunning = false
        red.anims.play("fall", true)
    } else {
        isRunning = false
        red.setVelocityX(0)
        red.anims.play('idle', true)
    }
  
    if(isRunning && !audio_feet.isPlaying) {
        audio_feet.play()
    }
  
    if(!isRunning && audio_feet.isPlaying) {
        audio_feet.stop()
    }
  
    if(!isRunning && audio_strike.isPlaying){
        audio_strike.play()
    }
  
    if(isRunning && !audio_strike.isPlaying) {
        audio_strike.stop()
    }
  }