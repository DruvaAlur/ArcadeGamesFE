/*
 * React Component integrating Phaser.js for a 2D Space Invaders–style game
 *
 * Instructions:
 * 1. Install dependencies:
 *    npm install phaser
 *    (Optionally: npm install --save-dev @types/phaser)
 *
 * 2. Place your assets in `public/assets/`:
 *    - images/player.png
 *    - images/alien.png
 *    - images/bullet.png
 *    - images/laser.png
 *    - sounds/shoot.wav
 *    - sounds/explosion.wav
 *
 * 3. Import and render the <SpaceInvadersGame /> component in your React app.
 */

import React, { useRef, useEffect } from "react";
import Phaser from "phaser";

class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: "MainScene" });
    this.player = null;
    this.cursors = null;
    this.bullets = null;
    this.lastFired = 0;
  }

  preload() {
    // Images
    this.load.image("player", "/assets/player.png");
    this.load.image("alien", "/assets/alien.png");
    this.load.image("bullet", "/assets/bullet.png");
    // Sounds
    this.load.audio("shoot", "/assets/sounds/gunshot.wav");
    this.load.audio("explosion", "/assets/sounds/explosion.wav");
  }

  create() {
    // Player
    this.player = this.physics.add.image(400, 550, "player");
    this.player.setCollideWorldBounds(true);

    // Bullets group
    this.bullets = this.physics.add.group({
      defaultKey: "bullet",
      maxSize: 10,
    });

    // Aliens group
    this.aliens = this.physics.add.group();
    for (let x = 100; x <= 700; x += 100) {
      for (let y = 100; y <= 200; y += 50) {
        console.log("alien");

        this.aliens.create(x, y, "alien");
      }
    }

    // Collisions
    this.physics.add.overlap(
      this.bullets,
      this.aliens,
      this.hitAlien,
      null,
      this
    );

    // Input
    this.cursors = this.input.keyboard.createCursorKeys();
    this.shootSound = this.sound.add("shoot");
    this.explosionSound = this.sound.add("explosion");
  }

  update(time) {
    // Move player
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-300);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(300);
    } else {
      this.player.setVelocityX(0);
    }

    // Shoot
    if (this.cursors.space.isDown && time > this.lastFired) {
      const bullet = this.bullets.get(this.player.x, this.player.y - 20);
      if (bullet) {
        bullet.setActive(true);
        bullet.setVisible(true);
        bullet.body.velocity.y = -500;
        this.shootSound.play();
        this.lastFired = time + 500;
      }
    }

    // Remove off-screen bullets
    this.bullets.children.each((b) => {
      if (b.active && b.y < 0) {
        b.setActive(false);
        b.setVisible(false);
      }
    });
  }

  hitAlien(bullet, alien) {
    bullet.setActive(false);
    bullet.setVisible(false);
    alien.destroy();
    this.explosionSound.play();
  }
}

const SpaceInvadersGame = () => {
  const gameContainerRef = useRef(null);
  const phaserGameRef = useRef(null);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      backgroundColor: "#000000",
      physics: {
        default: "arcade",
        arcade: { debug: false },
      },
      scene: [MainScene],
      parent: gameContainerRef.current,
    };

    phaserGameRef.current = new Phaser.Game(config);

    return () => {
      if (phaserGameRef.current) {
        phaserGameRef.current.destroy(true);
      }
    };
  }, []);

  return <div ref={gameContainerRef} />;
};

export default SpaceInvadersGame;
