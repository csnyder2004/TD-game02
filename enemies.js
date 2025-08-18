// ENEMIES
class Enemy {
      constructor(path, type, waveNumber = 1) {
        // --- Path & position ---
        this.path = path;
        this.currentPathIndex = 0;
        this.x = path[0].x;
        this.y = path[0].y;

        // --- Enemy attributes ---
        this.type = type;
        this.hitRadius = (type === "titan") ? 50 : 16;
        this.dead = false;

        // --- Enemy stats based on type ---
        switch (type) {
          case "fast":
            this.speed = 2.2 + 0.2 * waveNumber;
            this.health = 40 + 7 * waveNumber;
            this.spriteSize = 56;
            break;
          case "armoredBoss":
            this.speed = 0.8 + 0.2 * waveNumber;
            this.health = 200 + 7 * waveNumber;
            this.spriteSize = 80;
            break;
          case "shielded":
            this.speed = 1.2 + 0.2 * waveNumber;
            this.health = 150 + 7 * waveNumber;
            this.spriteSize = 110;
            break;
          case "regenerator":
            this.speed = 1 + 0.2 * waveNumber;
            this.health = 80 + 7 * waveNumber;
            this.regenRate = 0.3;
            this.spriteSize = 64;
            break;
          case "flying":
            this.speed = 1.8 + 0.2 * waveNumber;
            this.health = 50 + 7 * waveNumber;
            this.spriteSize = 80;
            break;
          case "titan":
            this.speed = 0.4 + 0.02 * waveNumber;
            this.health = 10000 + waveNumber * 700;
            this.hitRadius = 24;
            this.reward = 50 + waveNumber * 5;
            this.spriteSize = 200;
            break;
          case "specter":
            this.speed = 2.5 + 0.2 * waveNumber;
            this.health = 100 + 7 * waveNumber;
            this.evasive = true;
            this.spriteSize = 56;
            break;
          case "inferno":
            this.speed = 1.2 + 0.2 * waveNumber;
            this.health = 300 + 7 * waveNumber;
            this.burnAura = true;
            this.spriteSize = 64;
            break;
          default:
            this.speed = 1 + 0.1 * waveNumber;
            this.health = 50 + 5 * waveNumber;
            this.reward = 5;
            this.spriteSize = 100;
        }


        this.maxHealth = this.health;
      }

      // === UPDATE METHOD ===
      update() {
        if (this.dead) return;

        const target = this.path[this.currentPathIndex + 1];

        // === Reached end of path ===
        if (!target) {
          this.dead = true;
          lives--;
          showMessage("Enemy escaped! -1 Life", 1500);

          // Remove from enemies list
          const index = enemies.indexOf(this);
          if (index !== -1) enemies.splice(index, 1);

          return;
        }

        // --- Movement toward next path point ---
        const dx = target.x - this.x;
        const dy = target.y - this.y;
        const dist = Math.hypot(dx, dy);

        // === SPECIAL ABILITIES ===

        // Specter: 20% chance to evade update
        if (this.evasive && Math.random() < 0.2) return;

        // Inferno: slow nearby towers
        if (this.burnAura) {
          towers.forEach(t => {
            if (distance(this.x, this.y, t.x, t.y) < 50) {
              t.reloadSpeed += 0.05 * gameSpeed;
            }
          });
        }

        // --- Step forward or snap to next path point ---
        if (dist < this.speed * gameSpeed) {
          this.x = target.x;
          this.y = target.y;
          this.currentPathIndex++;
        } else {
          this.x += (dx / dist) * this.speed * gameSpeed;
          this.y += (dy / dist) * this.speed * gameSpeed;
        }

        // === STATUS EFFECTS ===

        // Regenerator healing
        if (this.type === "regenerator") {
          this.health = Math.min(this.maxHealth, this.health + this.regenRate * gameSpeed);
        }

        // Poison damage over time
        if (this.poison) {
          this.poison.elapsed += gameSpeed;
          if (this.poison.elapsed % 20 === 0) {
            this.health -= this.poison.dps / 3;
          }
          this.poison.duration -= gameSpeed;
          if (this.poison.duration <= 0) delete this.poison;
        }

        // Slow effect
        if (this.slowTimer) {
          this.slowTimer -= gameSpeed;
          if (this.slowTimer <= 0) {
            this.speed = this.originalSpeed;
            delete this.slowTimer;
          }
        }

        // Burn effect
        if (this.burn) {
          this.burn.elapsed += gameSpeed;
          if (this.burn.elapsed % 20 === 0) {
            this.health -= this.burn.damagePerSecond / 3;
          }
          this.burn.duration -= gameSpeed;
          if (this.burn.duration <= 0) delete this.burn;
        }

        // === DEATH ===
        if (this.health <= 0) {
          this.dead = true;
          const reward = this.reward || 5;
          money += reward;
          showMessage(`+${reward} Gold!`, 1000);
        }
      }

      // === DRAW METHOD ===
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);

        // --- Rotate to face next path direction ---
        const next = this.path[this.currentPathIndex + 1];
        if (next) {
          const dx = next.x - this.x;
          const dy = next.y - this.y;
          ctx.rotate(Math.atan2(dy, dx));
        }

        // --- Flash red when damaged ---
        if (this._flashTimer && this._flashTimer > 0) {
          ctx.globalAlpha = 0.6;
          ctx.fillStyle = "red";
          ctx.beginPath();
          ctx.arc(0, 0, this.hitRadius, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;
          this._flashTimer -= gameSpeed;
        }

        // --- Draw enemy sprite ---
        const sprite = enemySprites[this.type];
        if (sprite) {
          const size = this.spriteSize || 64;
          ctx.drawImage(sprite, -size / 2, -size / 2, size, size);
        }


        // --- Effects: glow outlines for special types ---
        if (this.type === "shielded") {
          ctx.strokeStyle = "rgba(100,200,255,0.5)";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(0, 0, this.hitRadius + 4, 0, Math.PI * 2);
          ctx.stroke();
        }
        if (this.type === "regenerator") {
          ctx.strokeStyle = "rgba(100,255,100,0.3)";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(0, 0, this.hitRadius + 6, 0, Math.PI * 2);
          ctx.stroke();
        }

        // --- Health bar (always upright) ---
        ctx.rotate(-Math.PI / 2);
        ctx.fillStyle = "red";
        ctx.fillRect(-this.hitRadius, -this.hitRadius - 12, this.hitRadius * 2, 5);
        ctx.fillStyle = "lime";
        ctx.fillRect(
          -this.hitRadius,
          -this.hitRadius - 12,
          (this.health / this.maxHealth) * this.hitRadius * 2,
          5
        );

        ctx.restore();
      }
    }

class BossEnemy {
      constructor(path, waveNumber = 10) {
        // Path and position
        this.path = path;
        this.currentPathIndex = 0;
        this.x = path[0].x;
        this.y = path[0].y;

        // Core stats
        this.hitRadius = 30;
        this.dead = false;
        this.speed = 0.5 + 0.1 * (waveNumber / 10);
        this.health = 5000 + waveNumber * 600;
        this.maxHealth = this.health;
        this.reward = 150 + waveNumber * 20;
      }

      update() {
        if (this.dead) return;

        const target = this.path[this.currentPathIndex + 1];
        if (!target) {
          this.dead = true;
          lives--;
          showMessage("BOSS escaped! -1 Life", 1500);
          return;
        }

        // Movement logic
        const dx = target.x - this.x;
        const dy = target.y - this.y;
        const dist = Math.hypot(dx, dy);

        if (dist < this.speed * gameSpeed) {
          this.x = target.x;
          this.y = target.y;
          this.currentPathIndex++;
        } else {
          this.x += (dx / dist) * this.speed * gameSpeed;
          this.y += (dy / dist) * this.speed * gameSpeed;
        }

        // Check for death
        if (this.health <= 0) {
          this.dead = true;
          money += this.reward;
          showMessage(`💰 Boss defeated! +$${this.reward}`, 2500);
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);

        // Rotate to face direction of movement
        const next = this.path[this.currentPathIndex + 1];
        if (next) {
          const dx = next.x - this.x;
          const dy = next.y - this.y;
          ctx.rotate(Math.atan2(dy, dx));
        }

        // Draw sprite
        if (bossSprite.complete) {
          ctx.drawImage(bossSprite, -64, -64, 128, 128);
        }

        // Health bar
        ctx.rotate(-Math.PI / 2);
        ctx.fillStyle = "#800";
        ctx.fillRect(-40, -56, 80, 10);
        ctx.fillStyle = "#0f0";
        ctx.fillRect(-40, -56, (this.health / this.maxHealth) * 80, 10);

        ctx.restore();
      }
    }
