import { useEffect, useRef, useState } from "react";
import Phaser from "phaser";

export default function PongGame() {
  const gameRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const height = 500;
  const width = 400;
  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: width,
      height: height,
      parent: gameRef.current,
      backgroundColor: "#0a0a0a",
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0 },
          debug: false,
        },
      },
      scene: {
        preload: preload,
        create: create,
        update: update,
      },
    };

    let paddle;
    let ball;
    let cursors;
    let hitSound;
    let loseSound;
    let particles;

    function preload() {
      this.load.audio("hit", "/assets/sounds/hit.wav");
      this.load.audio("lose", "/assets/sounds/lose.wav");
      // Load particle texture (white pixel)
      this.load.image(
        "particle",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
      );
    }

    function create() {
      // Create gradient background
      const gradient = this.add.graphics();
      gradient.fillGradientStyle(0x1a1a1a, 0x2a2a2a, 0x0a0a0a, 0x1a1a1a, 1);
      gradient.fillRect(0, 0, width, height);

      // Create walls
      this.physics.world.setBoundsCollision(true, true, true, true);

      // Create paddle
      paddle = this.add
        .rectangle(300, 450, 120, 20, 0xffffff)
        .setStrokeStyle(2, 0x00ff88);
      this.physics.add.existing(paddle);
      paddle.body.setImmovable(true);

      // Create ball
      ball = this.add
        .circle(300, 100, 10, 0xff4444)
        .setStrokeStyle(2, 0xff8888);
      this.physics.add.existing(ball);
      ball.body.setBounce(1, 1).setCollideWorldBounds(true);
      ball.body.setVelocity(Phaser.Math.Between(-200, 200), 200);

      // Initialize particle system
      particles = this.add.particles("particle");

      // Collision setup
      this.physics.add.collider(ball, paddle, () => {
        hitSound.play();
        setScore((prev) => prev + 1);
        const randomAngle = Phaser.Math.Between(-30, 30);
        ball.body.setVelocityY(-Math.abs(ball.body.velocity.y) * 1.05);
        ball.body.setVelocityX(ball.body.velocity.x + randomAngle);
        createParticles(this, ball.x, ball.y); // Remove scene parameter
      });

      // Lose condition
      ball.body.onWorldBounds = true;
      this.physics.world.on("worldbounds", (body) => {
        // console.log(body);
        console.log(body.blocked);

        if (body.gameObject === ball && body.blocked.down) {
          loseSound.play();
          setGameOver(true);
          this.physics.pause();
        }
      });

      // Input
      cursors = this.input.keyboard.createCursorKeys();

      // Sound
      hitSound = this.sound.add("hit");
      loseSound = this.sound.add("lose");
    }

    function update() {
      // Paddle movement
      if (cursors.left.isDown && paddle.x > 60) {
        paddle.x -= 5;
      } else if (cursors.right.isDown && paddle.x < width-60) {
        paddle.x += 5;
      }
    }

    function createParticles(scene, x, y) {
      scene.add.particles(x, y, "particle", {
        speed: { min: -200, max: 200 },
        angle: { min: 0, max: 360 },
        scale: { start: 0.4, end: 0 },
        blendMode: "ADD",
        lifespan: 600,
        quantity: 5,
      });
    }

    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true);
    };
  }, []);

  const restartGame = () => {
    setGameOver(false);
    setScore(0);
    window.location.reload();
  };

  return (
    <div className="relative h-screen w-screen bg-black flex items-center justify-center h-[fit-content]">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-purple-900/20 h-[fit-content]" />

      <div
        ref={gameRef}
        className="z-10 rounded-xl overflow-hidden shadow-2xl border-2 border-white/10 h-[fit-content]"
      />

      <div className="absolute  text-white/80 text-2xl font-mono">
        Score: {score}
      </div>

      {gameOver && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-20">
          <div className="text-center">
            <h2 className="text-4xl text-red-500 mb-4">Game Over!</h2>
            <p className="text-white text-xl mb-6">Final Score: {score}</p>
            <button
              onClick={restartGame}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all"
            >
              Play Again
            </button>
          </div>
        </div>
      )}

      <div className="absolute bottom-4 text-white/50 text-sm">
        Use ← → arrows to move the paddle
      </div>
    </div>
  );
}
