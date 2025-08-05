// Enemy class
import { enemySprites } from '../assets.js';
import { distance } from '../utils.js';

export class Enemy {
  constructor(path, type, waveNumber = 1) {
    this.path = path;
    this.currentPathIndex = 0;
    this.x = path[0].x;
    this.y = path[0].y;
    this.type = type;
    this.hitRadius = (type === "titan") ? 50 : 16;
    this.dead = false;
    switch (type) {
      case "fast": this.speed = 2.2 + 0.2 * waveNumber; this.health = 40 + 7 * waveNumber; this.spriteSize = 56; break;
      case "armoredBoss": this.speed = 0.8 + 0.2 * waveNumber; this.health = 200 + 7 * waveNumber; this.spriteSize = 80; break;
      case "shielded": this.speed = 1.2 + 0.2 * waveNumber; this.health = 150 + 7 * waveNumber; this.spriteSize = 110; break;
      case "regenerator": this.speed = 1 + 0.2 * waveNumber; this.health = 80 + 7 * waveNumber; this.regenRate = 0.3; this.spriteSize = 64; break;
      case "flying": this.speed = 1.8 + 0.2 * waveNumber; this.health = 50 + 7 * waveNumber; this.spriteSize = 80; break;
      case "titan": this.speed = 0.4 + 0.02 * waveNumber; this.health = 10000 + waveNumber * 700; this.hitRadius = 24; this.reward = 50 + waveNumber * 5; this.spriteSize = 200; break;
      case "specter": this.speed = 2.5 + 0.2 * waveNumber; this.health = 100 + 7 * waveNumber; this.evasive = true; this.spriteSize = 56; break;
      case "inferno": this.speed = 1.2 + 0.2 * waveNumber; this.health = 300 + 7 * waveNumber; this.burnAura = true; this.spriteSize = 64; break;
      default: this.speed = 1 + 0.1 * waveNumber; this.health = 50 + 5 * waveNumber; this.reward = 5; this.spriteSize = 100;
    }
    this.maxHealth = this.health;
  }
  // ...methods will be added in next step...
}
