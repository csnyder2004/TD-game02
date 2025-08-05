// BossEnemy class
import { bossSprite } from '../assets.js';

export class BossEnemy {
  constructor(path, waveNumber = 10) {
    this.path = path;
    this.currentPathIndex = 0;
    this.x = path[0].x;
    this.y = path[0].y;
    this.hitRadius = 30;
    this.dead = false;
    this.speed = 0.5 + 0.1 * (waveNumber / 10);
    this.health = 5000 + waveNumber * 600;
    this.maxHealth = this.health;
    this.reward = 150 + waveNumber * 20;
  }
  // ...methods will be added in next step...
}
