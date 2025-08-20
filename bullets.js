// BULLETS
class Bullet {
      constructor(x, y, target, damage, angle, type = "default") {
        // --- Bullet position and source ---
        this.x = x;
        this.y = y;
        this.startX = x;
        this.startY = y;

        // --- Targeting and type ---
        this.target = target;
        this.damage = damage;
        this.angle = angle;
        this.type = type;

        // --- Movement and speed settings ---
        this.speed = (type === "sniperelite") ? 6 : 12;
        this.traveled = 0;
        this.framesAlive = 0;

        // --- Status flags ---
        this.dead = false;
        this.hitDetected = false;

        // --- Special handling for bullet types ---
        if (type === "hyperlaser") {
          this.pierceCount = 4;
          this.maxDistance = 800;
          this.speed = 16;
        } else if (type === "railgun" || type === "sniperelite") {
          this.pierceCount = 2;
          this.maxDistance = 600;
          this.speed = 6;
        } else {
          this.pierceCount = 1;
          this.maxDistance = 9999;
          this.speed = 12;
        }

        // --- Track what enemies were hit (for pierce logic) ---
        this.hitEnemies = new Set();
      }

      // === UPDATE METHOD ===
      update() {
        this.framesAlive++;
        if (this.dead) return;

        if (!this.target || this.target.dead) {
          this.dead = true;
          return;
        }

        // --- Travel distance calculation ---
        const dx = this.target.x - this.x;
        const dy = this.target.y - this.y;
        const dist = Math.hypot(dx, dy);
        const travel = this.speed * gameSpeed;

        // === HIT DETECTION ===

        if (this.type === "hyperlaser") {
          // Multi-hit piercing laser
          enemies.forEach(enemy => {
            if (!enemy.dead && !this.hitEnemies.has(enemy)) {
              const d = distance(this.x, this.y, enemy.x, enemy.y);
              if (d < (enemy.hitRadius || 16)) {
                enemy.health -= this.damage;
                this.hitEnemies.add(enemy);
                effects.push(new RecoilBlast(this.x, this.y, this.angle));
                if (this.hitEnemies.size >= this.pierceCount) {
                  this.dead = true;
                }
              }
            }
          });

        } else if (dist <= travel + (this.target.hitRadius || 16)) {
          // Standard collision logic
          this.hitDetected = true;

          switch (this.type) {
            case "cannon":
              enemies.forEach(e => {
                const d2 = distance(this.x, this.y, e.x, e.y);
                if (d2 < 40 && !e.dead) {
                  e.health -= this.damage * (1 - d2 / 40);
                }
              });
              break;

            case "poison":
              this.target.health -= this.damage;
              if (!this.target.poison) {
                this.target.poison = { dps: 4, duration: 4, elapsed: 0 };
              }
              break;

            case "ice":
              this.target.health -= this.damage;
              if (!this.target.slowTimer) {
                this.target.originalSpeed = this.target.speed;
                this.target.speed *= 0.6;
                this.target.slowTimer = 90;
              }
              break;

            case "obsidian":
              this.target.health -= this.damage;
              if (!this.target.burn) {
                this.target.burn = { damagePerSecond: 5, duration: 3, elapsed: 0 };
              }
              effects.push(new BurnEffect(this.x, this.y));
              break;

            case "omegacannon":
              enemies.forEach(e => {
                if (!e.dead && distance(this.x, this.y, this.target.x, this.target.y) < 100) {
                  e.health -= this.damage;
                  effects.push(new RecoilBlast(e.x, e.y, this.angle));
                }
              });
              break;

            default:
              this.target.health -= this.damage;
              break;
          }

          effects.push(new RecoilBlast(this.x, this.y, this.angle));
          this.dead = true;
          return;
        }

        // --- Move toward target if not hit ---
        this.x += (dx / dist) * travel;
        this.y += (dy / dist) * travel;

        this.traveled += travel;
        if (this.traveled > this.maxDistance) this.dead = true;
      }

      // === DRAW METHOD ===
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        console.log("Drawing bullet:", this.type, this.x, this.y);

        // === Style per bullet type ===
        switch (this.type) {
          case "sniper":
            ctx.strokeStyle = "#00f";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(14, 0);
            ctx.stroke();
            break;

          case "cannon":
            ctx.fillStyle = "#f00";
            ctx.beginPath();
            ctx.arc(0, 0, 6, 0, Math.PI * 2);
            ctx.fill();
            break;

          case "missile":
            ctx.fillStyle = "#aaa";
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(12, -3);
            ctx.lineTo(12, 3);
            ctx.closePath();
            ctx.fill();
            break;

          case "poison":
            ctx.fillStyle = "green";
            ctx.beginPath();
            ctx.arc(0, 0, 4, 0, Math.PI * 2);
            ctx.fill();
            break;

          case "ice":
            ctx.fillStyle = "#00ffff";
            ctx.beginPath();
            ctx.arc(0, 0, 4, 0, Math.PI * 2);
            ctx.fill();
            break;

          case "railgun":
            ctx.strokeStyle = "#99f";
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(-10, 0);
            ctx.lineTo(10, 0);
            ctx.stroke();
            break;

          case "basic":
            ctx.fillStyle = "#ffcc00";
            ctx.fillRect(0, -2, 10, 4);
            break;

          case "flame":
            ctx.fillStyle = "orange";
            ctx.beginPath();
            ctx.arc(0, 0, 3 + Math.random() * 2, 0, Math.PI * 2);
            ctx.fill();
            break;

          case "tesla":
            ctx.strokeStyle = "#ffff00";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(-4, -4);
            ctx.lineTo(4, 4);
            ctx.moveTo(-4, 4);
            ctx.lineTo(4, -4);
            ctx.stroke();
            break;

          case "sniperelite":
            ctx.strokeStyle = "#ff00ff";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(16, 0);
            ctx.stroke();
            break;

          case "obsidian":
            ctx.fillStyle = "#a83232";
            ctx.beginPath();
            ctx.arc(0, 0, 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = "#ff6600";
            ctx.beginPath();
            ctx.arc(0, 0, 2, 0, Math.PI * 2);
            ctx.fill();
            break;

          case "nova":
            ctx.fillStyle = "#ffffff";
            ctx.beginPath();
            ctx.arc(0, 0, 5 + Math.sin(Date.now() / 50) * 2, 0, Math.PI * 2);
            ctx.fill();
            break;

          case "hyperlaser":
            // Core laser beam
            ctx.strokeStyle = "#ffff66";
            ctx.lineWidth = 3 + Math.sin(this.framesAlive * 0.6);
            ctx.beginPath();
            ctx.lineTo(24, (Math.random() - 0.5) * 2);
            ctx.stroke();

            // Blue glow
            ctx.strokeStyle = "rgba(100,200,255,0.4)";
            ctx.lineWidth = 6;
            ctx.beginPath();
            ctx.lineTo(24, (Math.random() - 0.5) * 2);
            ctx.stroke();

            // Sparks
            for (let i = 0; i < 2; i++) {
              ctx.strokeStyle = `rgba(255,255,255,${0.3 + Math.random() * 0.3})`;
              ctx.beginPath();
              ctx.moveTo(8 + Math.random() * 8, -1 + Math.random() * 2);
              ctx.lineTo(8 + Math.random() * 8, -6 + Math.random() * 12);
              ctx.stroke();
            }

            // Orb at origin
            ctx.fillStyle = "#ffffcc";
            ctx.beginPath();
            ctx.arc(0, 0, 3 + Math.sin(this.framesAlive * 0.4), 0, Math.PI * 2);
            ctx.fill();
            break;

          case "omegacannon":
            const gradient = ctx.createRadialGradient(0, 0, 2, 0, 0, 12);
            gradient.addColorStop(0, "#fff");
            gradient.addColorStop(0.3, "#99f");
            gradient.addColorStop(0.6, "#33f");
            gradient.addColorStop(1, "#001133");
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(0, 0, 12, 0, Math.PI * 2);
            ctx.fill();

            ctx.strokeStyle = "rgba(100,150,255,0.4)";
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(0, 0, 18 + Math.sin(this.framesAlive * 0.4) * 2, 0, Math.PI * 2);
            ctx.stroke();

            ctx.strokeStyle = "#ccf";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(-14, 0);
            ctx.lineTo(14, 0);
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(0, 0, 6 + Math.sin(this.framesAlive / 3) * 2, 0, Math.PI * 2);
            ctx.strokeStyle = "rgba(255,255,255,0.1)";
            ctx.lineWidth = 1;
            ctx.stroke();
            break;

          default:
            ctx.fillStyle = "#ffcc00";
            ctx.fillRect(0, -2, 10, 4);
            break;
        }

        ctx.restore();
      }
    }
