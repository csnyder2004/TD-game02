// PATH
const enemyPath = [
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
function drawRiver() {
      // Jungle border (outer path)
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 36;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(enemyPath[0].x, enemyPath[0].y);
      enemyPath.forEach((p) => ctx.lineTo(p.x, p.y));
      ctx.stroke();

      // Dirt core (inner)
      ctx.strokeStyle = "#33322F";
      ctx.lineWidth = 26;
      ctx.beginPath();
      ctx.moveTo(enemyPath[0].x, enemyPath[0].y);
      enemyPath.forEach((p) => ctx.lineTo(p.x, p.y));
      ctx.stroke();

      // Center line for clarity
      ctx.strokeStyle = "#F5B20C";
      ctx.lineWidth = 4;
      ctx.setLineDash([10, 8]);
      ctx.beginPath();
      ctx.moveTo(enemyPath[0].x, enemyPath[0].y);
      enemyPath.forEach((p) => ctx.lineTo(p.x, p.y));
      ctx.stroke();
      ctx.setLineDash([]);
    }

function drawEnemyPath() {
      ctx.strokeStyle = "#F5B20C";
      ctx.lineWidth = 4;
      ctx.setLineDash([8, 4]);
      ctx.beginPath();
      ctx.moveTo(enemyPath[0].x, enemyPath[0].y);
      enemyPath.slice(1).forEach((p) => ctx.lineTo(p.x, p.y));
      ctx.stroke();
      ctx.setLineDash([]);
    }
