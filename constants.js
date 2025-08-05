
// constants.js
// Exports all static game data: costs, upgrades, paths, and descriptions for modular import.
// Used by all other modules in the Tower Defense project.
// All values are exported for ES module usage.
//
// To use: import { towerCosts, upgradeEffects, ... } from './constants.js';
//
// Do not put any logic or DOM code here.
//
// ---
//
// Game constants, costs, upgrades, paths, and descriptions

export const towerCosts = {
  basic: 50,
  sniper: 120,
  cannon: 150,
  flame: 200,
  ice: 200,
  tesla: 300,
  missile: 350,
  sniperElite: 400,
  Obsidian: 500,
  Nova: 650,
  poison: 250,
  railgun: 800,
  hyperLaser: 4000,
  omegaCannon: 10000,
};

export const upgradeEffects = {
  basic: [
    tower => { tower.reloadSpeed = Math.max(3, tower.reloadSpeed - 4); tower.projectileCount = 2; },
    tower => { tower.damage += 10; tower.range += 10; }
  ],
  sniper: [
    tower => { tower.range += 60; tower.pierce = (tower.pierce || 1) + 2; },
    tower => { tower.damage *= 2; }
  ],
  cannon: [
    tower => { tower.damage += 20; tower.splashRadius = (tower.splashRadius || 30) + 20; },
    tower => { tower.range += 30; tower.reloadSpeed -= 10; }
  ],
  flame: [
    tower => { tower.damage += 5; tower.burn = { damagePerSecond: 6, duration: 90 }; },
    tower => { tower.range += 30; tower.reloadSpeed = Math.max(2, tower.reloadSpeed - 2); }
  ],
  ice: [
    tower => { tower.reloadSpeed = Math.max(4, tower.reloadSpeed - 6); tower.slowAmount = 0.5; },
    tower => { tower.damage += 10; tower.freezeChance = 0.2; }
  ],
  tesla: [
    tower => { tower.range += 40; tower.chainCount = 3; },
    tower => { tower.reloadSpeed = Math.max(3, tower.reloadSpeed - 4); }
  ],
  missile: [
    tower => { tower.damage += 50; tower.explosionStun = 1.5; },
    tower => { tower.reloadSpeed = Math.max(12, tower.reloadSpeed - 10); }
  ],
  sniperElite: [
    tower => { tower.range += 100; tower.armorPiercing = true; },
    tower => { tower.damage += 50; tower.critChance = 0.25; }
  ],
  Obsidian: [
    tower => { tower.reloadSpeed = Math.max(3, tower.reloadSpeed - 3); tower.burn = { damagePerSecond: 10, duration: 100 }; },
    tower => { tower.damage += 30; tower.blastRadius = 40; }
  ],
  Nova: [
    tower => { tower.range += 40; tower.splash = true; },
    tower => { tower.reloadSpeed = Math.max(8, tower.reloadSpeed - 6); tower.damage += 5; }
  ],
  poison: [
    tower => { tower.range += 40; tower.poison = { damagePerSecond: 4, duration: 120 }; },
    tower => { tower.poison = { damagePerSecond: 8, duration: 180 }; }
  ],
  railgun: [
    tower => { tower.damage += 200; tower.pierce = 999; },
    tower => { tower.reloadSpeed = Math.max(8, tower.reloadSpeed - 6); }
  ],
  hyperLaser: [
    tower => { tower.reloadSpeed = Math.max(0.5, tower.reloadSpeed - 1); tower.pierce = 4; },
    tower => { tower.damage += 50; tower.burn = { damagePerSecond: 12, duration: 60 }; }
  ],
  omegaCannon: [
    tower => { tower.damage += 500; tower.range += 100; tower.explosionStun = 2; },
    tower => { tower.reloadSpeed = Math.max(5, tower.reloadSpeed - 8); tower.splashRadius = 100; }
  ]
};

export const upgradeCosts = {
  basic: [30, 50],
  sniper: [60, 100],
  cannon: [70, 120],
  flame: [60, 100],
  ice: [70, 120],
  tesla: [100, 150],
  missile: [120, 180],
  sniperElite: [150, 220],
  Obsidian: [200, 300],
  Nova: [300, 400],
  poison: [70, 90],
  railgun: [400, 500],
  hyperLaser: [1200, 1800],
  omegaCannon: [2000, 3000],
};

export const upgradePaths = {
  basic: { path1: ["+fireRate", "🔁"], path2: ["+damage", "💥"] },
  sniper: { path1: ["+range", "🎯"], path2: ["+damage", "🔥"] },
  cannon: { path1: ["+damage", "💣"], path2: ["+range", "📏"] },
  flame: { path1: ["+damage", "🔥"], path2: ["+range", "🌡️"] },
  ice: { path1: ["+fireRate", "❄️"], path2: ["+damage", "🧊"] },
  tesla: { path1: ["+range", "⚡"], path2: ["+fireRate", "🔋"] },
  missile: { path1: ["+damage", "🚀"], path2: ["+fireRate", "🧨"] },
  sniperElite: { path1: ["+range", "🧿"], path2: ["+damage", "🔫"] },
  Obsidian: { path1: ["+fireRate", "🔥"], path2: ["+damage", "🌋"] },
  Nova: { path1: ["+range", "🌟"], path2: ["+fireRate", "☀️"] },
  poison: { path1: ["+range", "☠️"], path2: ["+poison", "🧪"] },
  railgun: { path1: ["+damage", "📡"], path2: ["+fireRate", "⚙️"] },
  hyperLaser: { path1: ["+fireRate", "🌞"], path2: ["+damage", "⚡"] },
  omegaCannon: { path1: ["+damage/range", "💥"], path2: ["+fireRate", "⚡"] },
};

export const upgradeDescriptions = {
  basic: [
    "Fires two shots per attack",
    "Boosts damage and adds extra range"
  ],
  sniper: [
    "Can hit multiple enemies at long range",
    "Critical hits and high-caliber ammo"
  ],
  cannon: [
    "Increased blast damage and radius",
    "Faster reload and longer reach"
  ],
  flame: [
    "Adds burning damage over time",
    "Extends flamethrower range"
  ],
  ice: [
    "Deep freeze slows enemies more",
    "Chance to freeze enemies solid"
  ],
  tesla: [
    "Electricity chains to nearby enemies",
    "Zaps faster with stronger arcs"
  ],
  missile: [
    "Stronger blast that stuns enemies",
    "Faster missile launches"
  ],
  sniperElite: [
    "Extreme range and armor-piercing rounds",
    "Can critically strike enemies"
  ],
  Obsidian: [
    "Faster burning and fire damage",
    "Lava eruptions deal AOE"
  ],
  Nova: [
    "Pulse hits in an area",
    "Faster pulses with increased power"
  ],
  poison: [
    "Lingers longer and spreads poison",
    "Toxic gas deals higher damage"
  ],
  railgun: [
    "Hits all enemies in a line",
    "Faster recharge rate"
  ],
  hyperLaser: [
    "Fires extremely fast and pierces enemies",
    "Adds burn damage to laser"
  ],
  omegaCannon: [
    "Massive explosive damage and stun",
    "Faster reload with massive splash radius"
  ]
};

export const enemyPath = [
  { x: 0, y: 100 },
  { x: 850, y: 100 },
  { x: 850, y: 200 },
  { x: 100, y: 200 },
  { x: 100, y: 300 },
  { x: 850, y: 300 },
  { x: 850, y: 400 },
  { x: 100, y: 400 },
  { x: 100, y: 500 },
  { x: 850, y: 500 },
  { x: 850, y: 800 },
];

export const enemyDescriptions = {
  normal: "Standard tank — balanced health & speed.",
  fast: "Fast-moving jeep — low health, quick.",
  armoredBoss: "Heavy tank with strong armor.",
  shielded: "Tank with a protective forcefield.",
  regenerator: "APC that regenerates health over time.",
  flying: "Jet that flies over obstacles.",
  titan: "Massive dropship — huge health pool.",
  specter: "Stealth drone that evades bullets.",
  inferno: "Flame mech with burn aura."
};
