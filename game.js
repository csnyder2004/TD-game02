/* =========================================================
 * FILE: game.js
 * SECTION: Game loop, input wiring, UI, wave logic
 * Notes: Logic unchanged. Added region labels for clarity.
 * =======================================================*/

// ========================================
// ============== GAME LOOP =================
// ========================================

//#region Game state
let money = 500, lives = 10, waveNumber = 0;
let enemiesToSpawn = 0, spawning = false, spawnTimer = 0;
let gamePaused = false, autoStart = true, gameSpeed = 1;
let enemyTypes = ["normal", "fast"];
//#endregion

//#region Entities
let towers = [], enemies = [], bullets = [], effects = [];
//#endregion

//#region Placement / selection
let selectedTowerType = null, placingTower = false, selectedTower = null, hoveredTower = null;
let placementX = 0, placementY = 0;
//#endregion

//#region Cancel placement
cancelTowerBtn?.addEventListener("click", () => {
  placingTower = false; selectedTowerType = null;
  document.querySelectorAll('#tower-menu button').forEach(b => b.classList.remove('selected'));
  showMessage("Placement canceled", 800);
});
//#endregion

//#region Targeting mode
targetModeSelect?.addEventListener("change", (e) => {
  if (selectedTower) {
    selectedTower.targetMode = e.target.value;
    showMessage(`Targeting set to ${e.target.value}`, 800);
  }
});
//#endregion

//#region Start wave
function startWave() {
  if (spawning) return;
  waveNumber++;

  if (waveNumber === 25) enemyTypes.push("specter", "inferno");
  if (waveNumber >= 25 && waveNumber % 5 === 0) {
    const titanCount = Math.floor((waveNumber - 25) / 5) + 2;
    for (let i = 0; i < titanCount; i++) enemies.push(new Enemy(enemyPath, "titan", waveNumber));
    if (enemiesToSpawn > 0) { enemiesToSpawn -= titanCount; if (enemiesToSpawn < 0) enemiesToSpawn = 0; }
    showMessage(`⚠️ ${titanCount} Titan${titanCount > 1 ? "s" : ""} incoming!`, 2500);
  }

  if (!enemyTypes.includes("normal")) enemyTypes = ["normal","fast","armoredBoss","shielded","regenerator","flying"];

  if (waveNumber % 10 === 0) {
    enemiesToSpawn = 0;
    enemies.push(new BossEnemy(enemyPath, waveNumber));
    showMessage(`👑 BOSS WAVE ${waveNumber}! Prepare for battle!`, 3000);
  } else {
    enemiesToSpawn = 5 + waveNumber * 4;
  }

  if (waveNumber >= 25 && waveNumber % 5 === 0) {
    enemies.push(new Enemy(enemyPath, "titan", waveNumber));
    if (enemiesToSpawn > 0) enemiesToSpawn--;
    showMessage("⚠️ Titan incoming!", 2500);
  }

  spawning = true; spawnTimer = 0; showMessage(`Wave ${waveNumber} started!`, 1200);
  updateDisplays();
}
//#endregion

//#region Canvas interactions (click to place/select)
canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left, my = e.clientY - rect.top;

  // placing?
  if (placingTower && selectedTowerType) {
    let onPath = false;
    for (let i = 0; i < enemyPath.length - 1; i++) {
      const p = enemyPath[i], q = enemyPath[i + 1];
      const dx = q.x - p.x, dy = q.y - p.y;
      const t = ((mx - p.x) * dx + (my - p.y) * dy) / (dx * dx + dy * dy);
      if (t > 0 && t < 1) { const cx = p.x + t * dx, cy = p.y + t * dy; if (distance(mx, my, cx, cy) < 40) onPath = true; }
    }
    if (onPath) return showMessage("Cannot place on the path!", 1000);
    if (towers.some(t => distance(t.x, t.y, mx, my) < 40)) return showMessage("Too close to another tower!", 1000);

    const cost = towerCosts[selectedTowerType]; if (money < cost) return showMessage("Not enough money!", 1000);
    money -= cost; towers.push(new Tower(mx, my, selectedTowerType));
    placingTower = false; selectedTowerType = null; updateDisplays();
    document.querySelectorAll('#tower-menu button').forEach(b => b.classList.remove('selected'));
    return;
  }

  // selecting a tower
  selectedTower = towers.find(t => distance(mx, my, t.x, t.y) < 20) || null;
  upgradePanel.style.display = selectedTower ? "block" : "none";

  if (selectedTower) {
    const type = selectedTower.type;
    upgrade1Btn.textContent = `Path 1: ${upgradeDescriptions[type][0]} ($${upgradeCosts[type][0]})`;
    upgrade2Btn.textContent = `Path 2: ${upgradeDescriptions[type][1]} ($${upgradeCosts[type][1]})`;
    const icons = []; const up = selectedTower.upgrades;
    if (up.path1 > 0) icons.push(upgradePaths[type].path1[1]);
    if (up.path2 > 0) icons.push(upgradePaths[type].path2[1]);
    document.getElementById("upgrade-icons").innerHTML = icons.join(" ");
    if (up.path1 > 0) { upgrade2Btn.disabled = true; upgrade2Btn.textContent = `Path 2: ${upgradeDescriptions[type][1]} (Locked)`; }
    else if (up.path2 > 0) { upgrade1Btn.disabled = true; upgrade1Btn.textContent = `Path 1: ${upgradeDescriptions[type][0]} (Locked)`; }
    else { upgrade1Btn.disabled = false; upgrade2Btn.disabled = false; }
    targetModeSelect.value = selectedTower.targetMode;
    sellBtn.textContent = `Sell Tower ($${Math.floor(towerCosts[type] / 2)})`;
  }
});
//#endregion

//#region Canvas hover (range preview while placing)
canvas.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left, my = e.clientY - rect.top;
  hoveredTower = towers.find(t => distance(mx, my, t.x, t.y) < 20) || null;
  if (placingTower) { placementX = mx; placementY = my; }
});
//#endregion

//#region Tower menu (select tower to place)
towerMenu.addEventListener("click", (e) => {
  const button = e.target.closest("button"); if (!button || !button.dataset.tower) return;
  const type = button.dataset.tower;
  if (towerCosts[type]) {
    selectedTowerType = type; placingTower = true; selectedTower = null; upgradePanel.style.display = "none";
    showMessage(`Placing ${type} tower`, 1000);
    document.querySelectorAll('#tower-menu button').forEach(b => b.classList.remove('selected'));
    button.classList.add('selected');
  }
});
//#endregion

//#region Tower menu preview (hover)
towerMenu.addEventListener("mouseover", (e) => {
  if (!e.target.closest("button")) return;
  const button = e.target.closest("button");
  const towerType = button.dataset.tower; const cost = towerCosts[towerType];
  const desc = upgradeDescriptions[towerType] || ["",""];
  nameBox.textContent = towerType.charAt(0).toUpperCase() + towerType.slice(1) + " Tower";
  costBox.textContent = `Cost: $${cost}`;
  statBox.innerHTML = `<li>🛠 Path 1: ${desc[0]}</li><li>🧪 Path 2: ${desc[1]}</li>`;
  previewBox.style.display = "block";
});
towerMenu.addEventListener("mouseout", (e) => {
  if (!e.target.closest("button")) return;
  previewBox.style.display = "none";
});
//#endregion

//#region Enemy info panel
enemyInfoBtn?.addEventListener("click", () => {
  enemyList.innerHTML = "";
  Object.keys(enemySprites).forEach(type => {
    const card = document.createElement("div"); card.className = "enemy-card";
    const img = enemySprites[type].cloneNode(); const name = document.createElement("strong");
    name.textContent = type.charAt(0).toUpperCase() + type.slice(1);
    const desc = document.createElement("p"); desc.textContent = enemyDescriptions[type] || "No description.";
    card.appendChild(img); card.appendChild(name); card.appendChild(desc); enemyList.appendChild(card);
  });
  enemyInfoPanel.style.display = "block";
});
closeEnemyInfoBtn?.addEventListener("click", () => { enemyInfoPanel.style.display = "none"; });
//#endregion

//#region Control buttons (start/pause/auto/speed)
startBtn?.addEventListener("click", startWave);
stopBtn?.addEventListener("click", () => {
  gamePaused = !gamePaused; stopBtn.textContent = gamePaused ? "Resume" : "Pause";
  showMessage(gamePaused ? "Game Paused" : "Game Resumed", 800);
});
autoBtn?.addEventListener("click", () => { autoStart = !autoStart; autoBtn.textContent = `Auto Start: ${autoStart ? "ON" : "OFF"}`; });
speedBtn?.addEventListener("click", () => { gameSpeed = gameSpeed >= 10 ? 1 : gameSpeed + 1; speedBtn.textContent = `Speed: ${gameSpeed}x`; });
//#endregion

//#region Upgrade description labels (UI-only)
const upgradeDescriptions = {
  basic: ["Double shot", "Damage boost"],
  sniper: ["Range + pierce", "Double damage"],
  cannon: ["Damage + splash", "Range + reload"],
  flame: ["Burn DoT", "Range + faster"],
  ice: ["Faster + slow", "Damage + freeze chance"],
  tesla: ["Range + chain", "Faster reload"],
  missile: ["Damage + stun", "Faster reload"],
  sniperElite: ["Range + AP", "Damage + crit"],
  Obsidian: ["Faster + burn", "Damage + blast"],
  Nova: ["Range + splash", "Faster + dmg"],
  poison: ["Longer poison", "Stronger poison"],
  railgun: ["Huge damage + pierce", "Faster reload"],
  hyperLaser: ["Faster + pierce", "Damage + burn"],
  omegaCannon: ["Damage + range + stun", "Faster + big splash"]
};
//#endregion

//#region Main game loop
function gameLoop() {
  if (lives <= 0) { gamePaused = true; showMessage("Game Over!", 2000); }
  if (!gamePaused) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrassBackground(); drawRiver();

    // placement preview
    if (placingTower && selectedTowerType) {
      ctx.save();
      const towerRange = ({
        sniper:200,cannon:120,flame:80,ice:90,tesla:110,missile:160,sniperElite:250,Obsidian:160,Nova:100,poison:100,railgun:400,hyperLaser:280,omegaCannon:280
      })[selectedTowerType] ?? 100;
      let valid = true;
      for (let i = 0; i < enemyPath.length - 1; i++) {
        const p = enemyPath[i], q = enemyPath[i + 1];
        const dx = q.x - p.x, dy = q.y - p.y;
        const t = ((placementX - p.x) * dx + (placementY - p.y) * dy) / (dx * dx + dy * dy);
        if (t > 0 && t < 1) { const cx = p.x + t * dx, cy = p.y + t * dy; if (distance(placementX, placementY, cx, cy) < 40) valid = false; }
      }
      if (towers.some(t => distance(t.x, t.y, placementX, placementY) < 40)) valid = false;
      ctx.strokeStyle = valid ? "#0f0" : "#f00"; ctx.globalAlpha = 0.3;
      ctx.beginPath(); ctx.arc(placementX, placementY, towerRange, 0, Math.PI*2);
      ctx.fillStyle = valid ? "#0f04" : "#f004"; ctx.fill(); ctx.stroke();
      ctx.restore();
    }

    // Spawning
    if (spawning && enemiesToSpawn > 0) {
      spawnTimer--;
      if (spawnTimer <= 0) {
        if (waveNumber > 5 && enemyTypes.length < 6) enemyTypes = ["normal","fast","armoredBoss","shielded","regenerator","flying"];
        const type = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
        enemies.push(new Enemy(enemyPath, type, waveNumber));
        enemiesToSpawn--;
        spawnTimer = Math.max(10, 40 - waveNumber * 2);
      }
    }

    // Autostart next wave
    if (spawning && enemiesToSpawn === 0 && enemies.length === 0) {
      spawning = false; if (autoStart) startWave();
    }

    towers.forEach(t => t.update());
    bullets.forEach(b => b.update());
    enemies.forEach(e => e.update());
    effects.forEach(e => e.update());

    effects = effects.filter(e => !e.finished);
    bullets = bullets.filter(b => !b.dead);
    enemies = enemies.filter(e => !e.dead || e.health > 0);

    towers.forEach(t => t.draw());
    enemies.forEach(e => e.draw());
    bullets.forEach(b => b.draw());
    effects.forEach(e => e.draw());

    updateDisplays();
  }
  requestAnimationFrame(gameLoop);
}
//#endregion

//#region Upgrade buttons (Path 1 generic via upgradeEffects; Path 2 bespoke)
upgrade1Btn?.addEventListener("click", () => {
  if (!selectedTower) return;
  const type = selectedTower.type; const cost = upgradeCosts[type][0];
  if (selectedTower.upgrades.path2 > 0) return showMessage("❌ You already upgraded Path 2!", 1000);
  if (money < cost) return showMessage("Not enough money!", 1000);
  money -= cost; selectedTower.level++; selectedTower.upgrades.path1++; upgradeEffects[type][0](selectedTower);
  updateDisplays(); showMessage(`✅ ${type} Path 1 Upgraded!`, 1000);
});

upgrade2Btn?.addEventListener("click", () => {
  if (!selectedTower) return;
  const type = selectedTower.type; const cost = upgradeCosts[type][1];
  if (selectedTower.upgrades.path1 > 0) return showMessage("❌ You already upgraded Path 1!", 1000);
  if (money < cost) return showMessage("Not enough money!", 1000);
  money -= cost; selectedTower.level++; selectedTower.upgrades.path2++;
  switch (type) {
    case "basic": selectedTower.damage += 15; break;
    case "sniper": selectedTower.reloadSpeed = Math.max(5, selectedTower.reloadSpeed - 10); break;
    case "cannon": selectedTower.range += 25; break;
    case "flame": selectedTower.range += 25; selectedTower.damage += 3; break;
    case "ice": selectedTower.damage += 12; break;
    case "tesla": selectedTower.reloadSpeed = Math.max(6, selectedTower.reloadSpeed - 6); break;
    case "missile": selectedTower.reloadSpeed = Math.max(25, selectedTower.reloadSpeed - 20); break;
    case "sniperElite": selectedTower.damage += 40; break;
    case "Obsidian": selectedTower.damage += 25; break;
    case "Nova": selectedTower.reloadSpeed = Math.max(10, selectedTower.reloadSpeed - 8); break;
    case "poison": selectedTower.damage += 12; break;
    case "railgun": selectedTower.reloadSpeed = Math.max(8, selectedTower.reloadSpeed - 10); break;
    case "hyperLaser": selectedTower.damage += 50; break;
    case "omegaCannon": selectedTower.reloadSpeed = Math.max(5, selectedTower.reloadSpeed - 8); break;
  }
  updateDisplays(); showMessage(`✅ ${type} Path 2 Upgraded!`, 1000);
});

sellBtn?.addEventListener("click", () => {
  if (!selectedTower) return;
  const refund = Math.floor(towerCosts[selectedTower.type] / 2);
  money += refund; towers = towers.filter(t => t !== selectedTower);
  selectedTower = null; upgradePanel.style.display = "none"; updateDisplays(); showMessage(`Sold for $${refund}`, 1000);
});
//#endregion

//#region Boot
updateDisplays();
requestAnimationFrame(gameLoop);
//#endregion

/* ========================== END game.js ========================== */
