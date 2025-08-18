// EFFECTS
class BurnEffect {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.timer = 0;
      }

      update() {
        this.timer += gameSpeed;
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.globalAlpha = 0.6 - (this.timer % 20) * 0.03;
        ctx.fillStyle = "orange";
        ctx.beginPath();
        ctx.arc(0, 0, 6 + Math.sin(this.timer * 0.2) * 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      get finished() {
        return this.timer > 60;
      }
    }
class SunBeamEffect {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.timer = 0;
        this.finished = false;
      }

      update() {
        this.timer += gameSpeed;
        if (this.timer > 20) this.finished = true;
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.globalAlpha = 1 - this.timer / 20;

        // 12 rays spinning outward
        for (let i = 0; i < 12; i++) {
          const angle = (Math.PI * 2 * i) / 12;
          ctx.strokeStyle = `rgba(255, 255, 100, ${1 - this.timer / 20})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(Math.cos(angle) * 40, Math.sin(angle) * 40);
          ctx.stroke();
        }

        ctx.restore();
      }
    }
class RecoilBlast {
      constructor(x, y, angle) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.timer = 0;
        this.finished = false;
      }

      update() {
        this.timer += gameSpeed;
        if (this.timer > 15) this.finished = true;
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.globalAlpha = 1 - this.timer / 15;

        // Expanding flash
        ctx.fillStyle = "orange";
        ctx.beginPath();
        ctx.arc(10, 0, 6 + this.timer / 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }
    }
