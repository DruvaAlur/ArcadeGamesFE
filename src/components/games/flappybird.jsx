import Phaser from "phaser";
import { useEffect, useRef } from "react";

export default function FlappyBird({ isGameRunning, onGameOver, updateScore }) {
  const gameRef = useRef(null);
  useEffect(() => {
    if (!isGameRunning) return;

    let bird;
    let pipes;
    let score = 0;
    let scoreText;

    const config = {
      type: Phaser.AUTO,
      width: 1000,
      height: 565,
      parent: gameRef.current,
      physics: {
        default: "arcade",
        arcade: { gravity: { y: 300 } },
      },
      audio: {
        disableWebAudio: false,
        noAudio: true,
      },
      scene: {
        preload: preload,
        create: create,
        update: update,
      },
    };

    function preload() {
      this.load.image("bird", "/assets/bird.png");
      this.load.image("pipe", "/assets/pipe.png");
    }

    function create() {
      bird = this.physics.add.sprite(100, 300, "bird").setScale(0.05);
      bird.setCollideWorldBounds(true);

      pipes = this.physics.add.group();

      this.input.keyboard.on("keydown-SPACE", flap);
      this.input.on("pointerdown", flap);

      scoreText = this.add.text(20, 20, "Score: 0", {
        fontSize: "20px",
        fill: "#fff",
      });

      this.physics.add.collider(bird, pipes, () => onGameOver(score));
    }

    function update() {
      if (this.time.now % 1500 < 10) {
        createPipe.call(this);
      }
      pipes.getChildren().forEach((pipe) => {
        if (pipe.isTop && !pipe.passed && pipe.x < bird.x) {
          pipe.passed = true;
          score++;
          scoreText.setText(`Score: ${score}`);
          updateScore(score);
        }
      });

      bird.angle = bird.body.velocity.y * 0.1;
    }

    function flap() {
      bird.setVelocityY(-150);
    }

    function createPipe() {
      const gap = Math.floor(Math.random() * (220 - 180 + 1)) + 180;
      const pipeY = Math.floor(Math.random() * (40 - 0 + 1)) + 0;

      this.physics.world.createDebugGraphic();

      const topPipe = pipes.create(500, gap, "pipe").setOrigin(1, 1);
      topPipe.body.allowGravity = false;
      topPipe.setVelocityX(-200);
      topPipe.isTop = true;
      topPipe.passed = false;

      const bottomPipe = pipes.create(500, pipeY, "pipe").setOrigin(-1, -1);
      bottomPipe.body.allowGravity = false;
      bottomPipe.setVelocityX(-200);

      topPipe.passed = false;
    }

    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true);
    };
  });

  return <div ref={gameRef} />;
}
