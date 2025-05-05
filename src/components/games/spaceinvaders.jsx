import { useEffect, useRef, useState } from "react";
import Phaser from "phaser";

export default function SpaceInvaders() {
  const gameRef = useRef(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 600,
      height: 800,
      parent: gameRef.current,
      backgroundColor: "#000000",
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

    let player;
    let aliens;
    let bullets;
    let enemyBullets;
    let cursors;
    let fireSound;
    let explosionSound;

    function preload() {
      this.load.image("player", "assets/player.png");
      this.load.image("alien", "assets/alien.png");
      this.load.image("bullet", "assets/bullet.png");
      this.load.audio("laser", "assets/sounds/laser.wav");
      this.load.audio("explosion", "assets/sounds/explosion.wav");
    }

    function create() {
      // Create starfield background
      createStarfield(this);

      // Player setup
      player = this.physics.add
        .sprite(300, 700, "player")
        .setScale(0.8)
        .setTint(0x00ff00);
      player.setCollideWorldBounds(true);

      // Aliens setup
      aliens = this.physics.add.group({
        key: "alien",
        repeat: 10,
        setXY: { x: 100, y: 100, stepX: 50, stepY: 40 },
      });
      aliens.children.each((alien) => {
        alien.setTint(Phaser.Math.Between(0xff0000, 0xffff00));
        alien.body.velocityX = 100;
      });

      // Bullets setup
      bullets = this.physics.add.group();
      enemyBullets = this.physics.add.group();

      // Input
      cursors = this.input.keyboard.createCursorKeys();
      this.input.keyboard.on("keydown-SPACE", shootBullet);

      // Collisions
      this.physics.add.overlap(bullets, aliens, hitAlien, null, this);
      this.physics.add.overlap(player, enemyBullets, hitPlayer, null, this);

      // Sound
      fireSound = this.sound.add("laser");
      explosionSound = this.sound.add("explosion");
    }

    function update() {
      // Player movement
      if (cursors.left.isDown) {
        player.setVelocityX(-300);
      } else if (cursors.right.isDown) {
        player.setVelocityX(300);
      } else {
        player.setVelocityX(0);
      }

      // Alien movement
      let changeDirection = false;
      aliens.children.each((alien) => {
        if (alien.x >= 580 || alien.x <= 20) {
          changeDirection = true;
        }
      });

      if (changeDirection) {
        aliens.children.each((alien) => {
          alien.body.velocityX *= -1;
          alien.y += 10;
        });
      }

      // Enemy shooting
      if (Phaser.Math.Between(1, 100) > 98) {
        const shooter = Phaser.Math.RND.pick(aliens.getChildren());
        if (shooter) {
          const bullet = enemyBullets
            .create(shooter.x, shooter.y, "bullet")
            .setTint(0xff0000);
          bullet.body.velocity.y = 200;
        }
      }
    }

    function shootBullet() {
      if (bullets.countActive() < 2) {
        const bullet = bullets
          .create(player.x, player.y - 20, "bullet")
          .setTint(0x00ff00);
        bullet.body.velocity.y = -400;
        fireSound.play();
      }
    }

    function hitAlien(bullet, alien) {
      bullet.destroy();
      alien.destroy();
      explosionSound.play();
      createExplosion(this, alien.x, alien.y);
      setScore((prev) => prev + 100);

      if (aliens.countActive() === 0) {
        // Wave cleared
        this.time.delayedCall(1000, () => {
          aliens.children.each((a) => a.destroy());
          createAlienWave(this);
        });
      }
    }

    function hitPlayer(player, bullet) {
      bullet.destroy();
      setLives((prev) => {
        if (prev <= 1) {
          setGameOver(true);
          this.physics.pause();
          return 0;
        }
        return prev - 1;
      });
    }

    function createStarfield(scene) {
      const stars = scene.add.graphics();
      for (let i = 0; i < 200; i++) {
        stars.fillStyle(0xffffff, Math.random());
        stars.fillCircle(
          Math.random() * 600,
          Math.random() * 800,
          Math.random() * 2
        );
      }
    }

    function createExplosion(scene, x, y) {
      const particles = scene.add.particles("bullet");
      particles.createEmitter({
        x: x,
        y: y,
        speed: { min: -200, max: 200 },
        angle: { min: 0, max: 360 },
        scale: { start: 0.5, end: 0 },
        blendMode: "ADD",
        lifespan: 500,
        quantity: 10,
        tint: [0xff0000, 0xffff00],
      });
    }

    function createAlienWave(scene) {
      aliens = scene.physics.add.group({
        key: "alien",
        repeat: 10,
        setXY: { x: 100, y: 100, stepX: 50, stepY: 40 },
      });
      aliens.children.each((alien) => {
        alien.setTint(Phaser.Math.Between(0xff0000, 0xffff00));
        alien.body.velocityX = 100;
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
    setLives(3);
    // Implement proper game reset logic
    window.location.reload();
  };

  return (
    <div className="relative h-screen w-screen bg-black flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-purple-900/20" />

      <div
        ref={gameRef}
        className="z-10 rounded-xl overflow-hidden shadow-2xl border-2 border-white/10"
      />

      <div className="absolute top-4 left-4 text-green-400 text-xl font-mono">
        Score: {score}
      </div>

      <div className="absolute top-4 right-4 text-red-400 text-xl font-mono">
        Lives: {lives}
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
        Use ← → to move • Space to shoot
      </div>
    </div>
  );
}
