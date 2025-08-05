// Tower class
import { towerSprites } from '../assets.js';
import { upgradePaths, upgradeEffects } from '../constants.js';
import { distance } from '../utils.js';

export class Tower {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.level = 1;
    this.reloadTimer = 0;
    this.rotation = 0;
    this.targetMode = "first";
    switch (type) {
      case "basic": this.range = 100; this.damage = 15; this.reloadSpeed = 15; this.size = 100; break;
      case "sniper": this.range = 200; this.damage = 40; this.reloadSpeed = 40; this.size = 100; break;
      case "cannon": this.range = 120; this.damage = 40; this.reloadSpeed = 25; this.size = 105; break;
      case "flame": this.range = 80; this.damage = 10; this.reloadSpeed = 5; this.size = 75; break;
      case "ice": this.range = 90; this.damage = 5; this.reloadSpeed = 20; this.size = 80; break;
      case "tesla": this.range = 110; this.damage = 35; this.reloadSpeed = 15; this.size = 90; break;
      case "missile": this.range = 160; this.damage = 50; this.reloadSpeed = 50; this.size = 90; break;
      case "sniperElite": this.range = 250; this.damage = 70; this.reloadSpeed = 30; this.size = 90; break;
      case "Obsidian": this.range = 160; this.damage = 40; this.reloadSpeed = 12; this.size = 90; break;
      case "Nova": this.range = 100; this.damage = 60; this.reloadSpeed = 20; this.fireCooldown = 0; this.size = 65; break;
      case "poison": this.range = 100; this.damage = 10; this.reloadSpeed = 20; this.size = 75; break;
      case "railgun": this.range = 400; this.damage = 200; this.reloadSpeed = 100; this.size = 115; break;
      case "hyperLaser": this.range = 280; this.damage = 65; this.reloadSpeed = 2; this.size = 100; break;
      case "omegaCannon": this.range = 280; this.damage = 800; this.reloadSpeed = 20; this.size = 120; break;
    }
    this.upgrades = { path1: 0, path2: 0 };
  }
  // ...methods will be added in next step...
}
