// Asset loading for sprites and images
import { towerCosts } from './constants.js';

export const enemySprites = {};
export function generateEnemySprites() {
  const types = [
    "normal", "fast", "armoredBoss", "shielded", "regenerator", "flying", "titan", "specter", "inferno"
  ];
  types.forEach(type => {
    const img = new Image();
    img.src = `enemyimages/${type}.png`;
    enemySprites[type] = img;
  });
}

export const bossSprite = new Image();
export function generateBossSprite() {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  ctx.translate(64, 64);
  ctx.fillStyle = "#3a3a3a";
  ctx.beginPath();
  ctx.ellipse(0, 0, 48, 28, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#ccaa00";
  ctx.beginPath();
  ctx.arc(0, -20, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#555";
  ctx.fillRect(-60, -4, 20, 8);
  ctx.fillRect(40, -4, 20, 8);
  ctx.fillStyle = "#222";
  ctx.beginPath();
  ctx.arc(-48, 12, 6, 0, Math.PI * 2);
  ctx.arc(48, 12, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#777";
  ctx.fillRect(-6, 28, 12, 8);
  ctx.fillRect(-3, 36, 6, 10);
  ctx.fillStyle = "#ff2222";
  ctx.beginPath();
  ctx.arc(0, 0, 3, 0, Math.PI * 2);
  ctx.fill();
  bossSprite.src = canvas.toDataURL();
}

export const towerSprites = {};
export function loadTowerSprites() {
  const types = Object.keys(towerCosts);
  types.forEach(type => {
    const img = new Image();
    img.src = `towerimages/${type}tower/sprite.png`;
    img.onload = () => console.log(`✅ Loaded: ${img.src}`);
    img.onerror = () => console.warn(`⚠️ Could not load: ${img.src}`);
    towerSprites[type] = img;
  });
}
