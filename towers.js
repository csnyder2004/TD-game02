// ========================================
// =============== TOWERS ==================
// ========================================

class Tower {
  constructor(x, y, type) {
    this.x = x; this.y = y; this.type = type;
    this.level = 1; this.reloadTimer = 0; this.rotation = 0; this.targetMode = "first";
    this.projectileCount = 1;

    switch (type) {
      case "basic": this.range = 100; this.damage = 15; this.reloadSpeed = 15; this.size = 100; break;
      case "sniper": this.range = 200; this.damage = 40; this.reloadSpeed = 40; this.size = 80; break;
      case "cannon": this.range = 120; this.damage = 40; this.reloadSpeed = 25; this.size = 105; break;
      case "flame": this.range = 80; this.damage = 10; this.reloadSpeed = 5; this.size = 75; break;
      case "ice": this.range = 90; this.damage = 5; this.reloadSpeed = 20; this.size = 80; break;
      case "tesla": this.range = 110; this.damage = 35; this.reloadSpeed = 15; this.size = 90; break;
      case "missile": this.range = 160; this.damage = 50; this.reloadSpeed = 50; this.size = 90; break;
      case "sniperelite": this.range = 250; this.damage = 70; this.reloadSpeed = 30; this.size = 90; break;
      case "obsidian": this.range = 160; this.damage = 40; this.reloadSpeed = 12; this.size = 110; break;
      case "nova": this.range = 100; this.damage = 60; this.reloadSpeed = 20; this.fireCooldown = 0; this.size = 65; break;
      case "poison": this.range = 100; this.damage = 10; this.reloadSpeed = 20; this.size = 75; break;
      case "railgun": this.range = 400; this.damage = 200; this.reloadSpeed = 100; this.size = 115; break;
      case "hyperlaser": this.range = 280; this.damage = 65; this.reloadSpeed = 2; this.size = 100; break;
      case "omegacannon": this.range = 280; this.damage = 800; this.reloadSpeed = 20; this.size = 120; break;
    }

    this.upgrades = { path1: 0, path2: 0 };
  }

  update() {
    this.reloadTimer += gameSpeed;
    if (this.fireCooldown > 0) this.fireCooldown -= gameSpeed;
    if (this.reloadTimer < this.reloadSpeed) return;
    this.reloadTimer = 0;

    const inRange = enemies.filter(e => !e.dead && distance(this.x, this.y, e.x, e.y) <= this.range);
    if (!inRange.length) return;

    let target = null;
    switch (this.targetMode) {
      case "first": target = inRange.reduce((a, b) => a.currentPathIndex > b.currentPathIndex ? a : b); break;
      case "last": target = inRange.reduce((a, b) => a.currentPathIndex < b.currentPathIndex ? a : b); break;
      case "strong": target = inRange.reduce((a, b) => a.health > b.health ? a : b); break;
      case "close": target = inRange.reduce((a, b) => distance(this.x,this.y,a.x,a.y) < distance(this.x,this.y,b.x,b.y) ? a : b); break;
    }
    if (!target) return;

    this.rotation = Math.atan2(target.y - this.y, target.x - this.x);

    switch (this.type) {
      case "flame":
        target.health -= this.damage * 0.5; break;
      case "ice":
        if (!target.slowTimer) { target.originalSpeed = target.speed; target.speed *= 0.03; target.slowTimer = 60; }
        target.health -= this.damage * 0.8; break;
      case "tesla":
        enemies.forEach(e => { if (!e.dead && distance(e.x, e.y, target.x, target.y) < 40) e.health -= this.damage; });
        break;
      case "obsidian":
        target.health -= this.damage; if (!target.burn) target.burn = { damagePerSecond: 5, duration: 3, elapsed: 0 };
        effects.push(new BurnEffect(target.x, target.y)); break;
      case "poison":
        target.health -= this.damage * 0.3; if (!target.poison) target.poison = { dps: 4, duration: 4, elapsed: 0 }; break;
      case "nova":
        if (this.fireCooldown <= 0) {
          enemies.forEach(e => { if (distance(this.x, this.y, e.x, e.y) <= this.range) e.health -= this.damage; });
          this.fireCooldown = this.reloadSpeed; effects.push(new SunBeamEffect(this.x, this.y));
        }
        break;
      default:
        for (let i = 0; i < this.projectileCount; i++) {
          const spread = (this.projectileCount > 1) ? (i - (this.projectileCount - 1) / 2) * 0.1 : 0;
          bullets.push(new Bullet(this.x, this.y, target, this.damage, this.rotation + spread, this.type));
        }
    }
    effects.push(new RecoilBlast(this.x, this.y, this.rotation));
  }

  draw() {
    ctx.save(); ctx.translate(this.x, this.y); ctx.rotate(this.rotation);
    if (towerSprites[this.type] && towerSprites[this.type].complete) {
      ctx.drawImage(towerSprites[this.type], -this.size/2, -this.size/2, this.size, this.size);
    } else {
      ctx.fillStyle = "#999"; ctx.fillRect(-16, -16, 32, 32);
    }
    ctx.restore();

    ctx.fillStyle = "#cdf7b9"; ctx.font = "bold 16px Arial"; ctx.textAlign = "center";
    ctx.fillText(`Lv.${this.level}`, this.x, this.y + 40);

    if (this === hoveredTower || this === selectedTower) {
      ctx.save(); ctx.strokeStyle = (this === selectedTower) ? "#cdf7b9" : "rgba(205,247,185,0.5)";
      ctx.setLineDash([8,8]); ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(this.x, this.y, this.range, 0, Math.PI*2); ctx.stroke();
      const up = this.upgrades; const icons = [];
      if (up.path1 > 0) icons.push(upgradePaths[this.type].path1[1]);
      if (up.path2 > 0) icons.push(upgradePaths[this.type].path2[1]);
      ctx.fillStyle = "#fff"; ctx.font = "bold 12px Arial";
      icons.forEach((ico,i) => ctx.fillText(ico, this.x, this.y - 25 - i*14));
      ctx.restore();
    }
  }
}
