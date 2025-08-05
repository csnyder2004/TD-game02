// Core game logic for Tower Defense
// Handles game state, wave logic, update, draw, and main loop
import { towerCosts, upgradeEffects, upgradeCosts, upgradePaths, upgradeDescriptions, enemyPath, enemyDescriptions } from './constants.js';
import { distance, showMessage, roundRect } from './utils.js';
import { Tower } from './entities/tower.js';
import { Enemy } from './entities/enemy.js';
import { BossEnemy } from './entities/bossEnemy.js';
import { Bullet } from './entities/bullet.js';
import { BurnEffect, SunBeamEffect, RecoilBlast } from './entities/effects.js';

export let money = 500,
  lives = 10,
  waveNumber = 0,
  enemiesToSpawn = 0,
  spawning = false,
  spawnTimer = 0,
  gamePaused = false,
  autoStart = true,
  gameSpeed = 1,
  enemyTypes = ["normal", "fast"];

export let selectedTowerType = null,
  placingTower = false,
  selectedTower = null,
  hoveredTower = null;

export let placementX = 0, placementY = 0;

export let towers = [],
  enemies = [],
  bullets = [],
  effects = [];

// Export core game functions for use in main.js and ui.js
export function updateDisplays(moneyDisplay, livesDisplay, waveDisplay, enemiesLeftDisplay) {
  moneyDisplay.textContent = `Money: ${money}`;
  livesDisplay.textContent = `Lives: ${lives}`;
  waveDisplay.textContent = `Wave: ${waveNumber}`;
  enemiesLeftDisplay.textContent = `Enemies Left: ${enemies.length + enemiesToSpawn}`;
}

// Add more core logic (startWave, gameLoop, etc.) as needed
