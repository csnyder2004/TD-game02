// ========================================
// ============== UI / DOM =================
// ========================================

// DOM refs (ids must match index.html)
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
const enemyInfoBtn = document.getElementById("enemyInfoBtn");

const messageBox = document.getElementById("message-box");

const enemyInfoPanel = document.getElementById("enemy-info-panel");
const enemyList = document.getElementById("enemy-list");
const closeEnemyInfoBtn = document.getElementById("closeEnemyInfoBtn");

const previewBox = document.getElementById("tower-preview");
const nameBox = document.getElementById("preview-name");
const costBox = document.getElementById("preview-cost");
const statBox = document.getElementById("preview-stats");

const upgradePanel = document.getElementById("upgrade-panel");
const upgrade1Btn = document.getElementById("upgrade1Btn");
const upgrade2Btn = document.getElementById("upgrade2Btn");
const sellBtn = document.getElementById("sellBtn");
const cancelTowerBtn = document.getElementById("cancelTowerBtn");
const targetModeSelect = document.getElementById("targetModeSelect");

// Simple HUD helpers
function showMessage(text, duration = 2000) {
  clearTimeout(messageBox.clearTimeout);
  messageBox.textContent = text;
  messageBox.style.opacity = "1";
  messageBox.clearTimeout = setTimeout(() => (messageBox.style.opacity = "0"), duration);
}

function updateDisplays() {
  moneyDisplay.textContent = `💰 Money: ${money}`;
  livesDisplay.textContent = `❤️ Lives: ${lives}`;
  waveDisplay.textContent = `🌊 Wave: ${waveNumber}`;
  enemiesLeftDisplay.textContent = `🧟 Enemies Left: ${enemies.length + enemiesToSpawn}`;
}
