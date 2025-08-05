

// Main entry for Tower Defense (modularized)
import * as game from './game.js';
import { setupUI } from './ui.js';
import { generateEnemySprites, generateBossSprite, loadTowerSprites } from './assets.js';

// === DOM ELEMENT REFERENCES ===
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const moneyDisplay = document.getElementById("money-display");
const livesDisplay = document.getElementById("lives-display");
const waveDisplay = document.getElementById("wave-display");
const enemiesLeftDisplay = document.getElementById("enemies-left");
const towerMenu = document.getElementById("tower-menu");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const autoBtn = document.getElementById("autoBtn");
const speedBtn = document.getElementById("speedBtn");
const upgradePanel = document.getElementById("upgrade-panel");
const upgrade1Btn = document.getElementById("upgrade1Btn");
const upgrade2Btn = document.getElementById("upgrade2Btn");
const sellBtn = document.getElementById("sellBtn");
const messageBox = document.getElementById("message-box");

// === ASSET LOADING ===
generateEnemySprites();
generateBossSprite();
loadTowerSprites();

// === UI SETUP ===
setupUI({
  canvas, ctx, moneyDisplay, livesDisplay, waveDisplay, enemiesLeftDisplay,
  towerMenu, startBtn, stopBtn, autoBtn, speedBtn, upgradePanel, upgrade1Btn, upgrade2Btn, sellBtn, messageBox
});

// === GAME INIT ===
game.updateDisplays(moneyDisplay, livesDisplay, waveDisplay, enemiesLeftDisplay);
// game.startWave(); // Call as needed from UI
// gameLoop(); // Call as needed from UI or game.js
