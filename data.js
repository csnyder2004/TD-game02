/* =========================================================
 * FILE: data.js
 * SECTION: Core game data (costs, upgrades, labels)
 * Notes: Logic unchanged. Added region labels for clarity.
 * =======================================================*/

// DATA

//#region Tower Costs
const towerCosts = {
  basic: 50,
  sniper: 120,
  cannon: 150,
  flame: 200,
  ice: 200,
  tesla: 300,
  missile: 350,
  sniperelite: 400,
  obsidian: 500,
  nova: 650,
  poison: 250,
  railgun: 800,
  hyperlaser: 4000,
  omegacannon: 15000,
};
//#endregion

//#region Upgrade Costs (Path 1, Path 2)
const upgradeCosts = {
  basic: [30, 50],
  sniper: [60, 100],
  cannon: [70, 120],
  flame: [60, 100],
  ice: [70, 120],
  tesla: [100, 150],
  missile: [120, 180],
  sniperelite: [150, 220],
  obsidian: [200, 300],
  nova: [300, 400],
  poison: [70, 90],
  railgun: [400, 500],
  hyperlaser: [1200, 1800],
  omegacannon: [2000, 3000],
};
//#endregion

//#region Upgrade Effects (function-based per tower, [path1, path2])
const upgradeEffects = {
  basic: [
    tower => { tower.reloadSpeed = Math.max(3, tower.reloadSpeed - 4); tower.projectileCount = 2; }, // double shot
    tower => { tower.damage += 10; tower.range += 10; } // damage + slight range
  ],
  sniper: [
    tower => { tower.range += 60; tower.pierce = (tower.pierce || 1) + 2; }, // hits more enemies
    tower => { tower.damage *= 2; } // double damage
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
    tower => { tower.damage += 50; tower.explosionStun = 1.5; }, // small stun
    tower => { tower.reloadSpeed = Math.max(12, tower.reloadSpeed - 10); }
  ],
  sniperelite: [
    tower => { tower.range += 100; tower.armorPiercing = true; },
    tower => { tower.damage += 50; tower.critChance = 0.25; } // crit hit
  ],
  obsidian: [
    tower => { tower.reloadSpeed = Math.max(3, tower.reloadSpeed - 3); tower.burn = { damagePerSecond: 10, duration: 100 }; },
    tower => { tower.damage += 30; tower.blastRadius = 40; }
  ],
  nova: [
    tower => { tower.range += 40; tower.splash = true; },
    tower => { tower.reloadSpeed = Math.max(8, tower.reloadSpeed - 6); tower.damage += 5; }
  ],
  poison: [
    tower => { tower.range += 40; tower.poison = { damagePerSecond: 4, duration: 120 }; },
    tower => { tower.poison = { damagePerSecond: 8, duration: 180 }; }
  ],
  railgun: [
    tower => { tower.damage += 200; tower.pierce = 999; }, // hits all in line
    tower => { tower.reloadSpeed = Math.max(8, tower.reloadSpeed - 6); }
  ],
  hyperlaser: [
    tower => { tower.reloadSpeed = Math.max(0.5, tower.reloadSpeed - 1); tower.pierce = 4; },
    tower => { tower.damage += 50; tower.burn = { damagePerSecond: 12, duration: 60 }; }
  ],
  omegacannon: [
    tower => { tower.damage += 500; tower.range += 100; tower.explosionStun = 2; },
    tower => { tower.reloadSpeed = Math.max(5, tower.reloadSpeed - 8); tower.splashRadius = 100; }
  ]
};
//#endregion

//#region Upgrade Path Icons (UI hints)
const upgradePaths = {
  basic: { path1: ["+fireRate", "🔁"], path2: ["+damage", "💥"] },
  sniper: { path1: ["+range", "🎯"], path2: ["+damage", "🔥"] },
  cannon: { path1: ["+damage", "💣"], path2: ["+range", "📏"] },
  flame: { path1: ["+damage", "🔥"], path2: ["+range", "🌡️"] },
  ice: { path1: ["+fireRate", "❄️"], path2: ["+damage", "🧊"] },
  tesla: { path1: ["+range", "⚡"], path2: ["+fireRate", "🔋"] },
  missile: { path1: ["+damage", "🚀"], path2: ["+fireRate", "🧨"] },
  sniperelite: { path1: ["+range", "🧿"], path2: ["+damage", "🔫"] },
  obsidian: { path1: ["+fireRate", "🔥"], path2: ["+damage", "🌋"] },
  nova: { path1: ["+range", "🌟"], path2: ["+fireRate", "☀️"] },
  poison: { path1: ["+range", "☠️"], path2: ["+poison", "🧪"] },
  railgun: { path1: ["+damage", "📡"], path2: ["+fireRate", "⚙️"] },
  hyperlaser: { path1: ["+fireRate", "🌞"], path2: ["+damage", "⚡"] },
  omegacannon: { path1: ["+damage/range", "💥"], path2: ["+fireRate", "⚡"] },
};
//#endregion

//#region Enemy Descriptions (for info panel)
const enemyDescriptions = {
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
//#endregion

/* ========================== END data.js ========================== */
