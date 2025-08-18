// ========================================
// ============ SPRITES / ART ==============
// ========================================

// Global sprite registries
const backgroundImg = new Image();
const towerSprites = {};
const enemySprites = {};
const bossSprite = new Image();

// --- Background ---
backgroundImg.src = 'backgroundimage/sprite.png';

function drawGrassBackground() {
  if (backgroundImg.complete && backgroundImg.naturalWidth) {
    ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
  } else {
    backgroundImg.onload = () => {
      ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
    };
    // If it fails, silently fallback — game still runs
    backgroundImg.onerror = () => {};
  }
}

// --- Tower sprites ---
// Requires towerCosts from data.js to be loaded first
function loadTowerSprites() {
  const types = Object.keys(towerCosts || {});
  types.forEach(type => {
    const img = new Image();
    // Folder convention: towerimages/<type>tower/sprite.png
    img.src = `towerimages/${type}tower/sprite.png`;
    img.onload = () => console.log(`✅ Loaded tower sprite: ${img.src}`);
    img.onerror = () => console.warn(`⚠️ Tower sprite missing: ${img.src}`);
    towerSprites[type] = img;
  });
}

// --- Enemy sprites ---
function generateEnemySprites() {
  const types = [
    "normal",
    "fast",
    "armoredBoss",
    "shielded",
    "regenerator",
    "flying",
    "titan",
    "specter",
    "inferno"
  ];
  types.forEach(type => {
    const img = new Image();
    img.src = `enemyimages/${type}.png`;
    img.onerror = () => console.warn(`⚠️ Enemy sprite missing: ${img.src}`);
    enemySprites[type] = img;
  });
}

// --- Procedural boss sprite (fallback) ---
function generateBossSprite() {
  const c = document.createElement("canvas");
  c.width = 128; c.height = 128;
  const cx = c.getContext("2d");
  cx.translate(64, 64);

  cx.fillStyle = "#3a3a3a";
  cx.beginPath();
  cx.ellipse(0, 0, 48, 28, 0, 0, Math.PI * 2);
  cx.fill();

  cx.fillStyle = "#ccaa00";
  cx.beginPath();
  cx.arc(0, -20, 10, 0, Math.PI * 2);
  cx.fill();

  cx.fillStyle = "#555";
  cx.fillRect(-60, -4, 20, 8);
  cx.fillRect(40, -4, 20, 8);

  cx.fillStyle = "#222";
  cx.beginPath();
  cx.arc(-48, 12, 6, 0, Math.PI * 2);
  cx.arc(48, 12, 6, 0, Math.PI * 2);
  cx.fill();

  cx.fillStyle = "#777";
  cx.fillRect(-6, 28, 12, 8);
  cx.fillRect(-3, 36, 6, 10);

  cx.fillStyle = "#ff2222";
  cx.beginPath();
  cx.arc(0, 0, 3, 0, Math.PI * 2);
  cx.fill();

  bossSprite.src = c.toDataURL();
}

// --- Initialize ---
generateEnemySprites();
generateBossSprite();
loadTowerSprites();
