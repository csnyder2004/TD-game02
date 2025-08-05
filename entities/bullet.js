// Bullet class
import { distance } from '../utils.js';

export class Bullet {
  constructor(x, y, target, damage, angle, type = "default") {
    this.x = x;
    this.y = y;
    this.startX = x;
    this.startY = y;
    this.target = target;
    this.damage = damage;
    this.angle = angle;
    this.type = type;
    this.speed = (type === "sniperElite") ? 6 : 12;
    this.traveled = 0;
    this.framesAlive = 0;
    this.dead = false;
    this.hitDetected = false;
    if (type === "hyperLaser") {
      this.pierceCount = 4;
      this.maxDistance = 800;
      this.speed = 16;
    } else if (type === "railgun" || type === "sniperElite") {
      this.pierceCount = 2;
      this.maxDistance = 600;
      this.speed = 6;
    } else {
      this.pierceCount = 1;
      this.maxDistance = 9999;
      this.speed = 12;
    }
    this.hitEnemies = new Set();
  }
  // ...methods will be added in next step...
}
