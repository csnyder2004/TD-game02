// Utility functions for the game

export function distance(x1, y1, x2, y2) {
  return Math.hypot(x2 - x1, y2 - y1);
}

export function showMessage(messageBox, text, duration = 2000) {
  clearTimeout(messageBox.clearTimeout);
  messageBox.textContent = text;
  messageBox.style.opacity = "1";
  messageBox.clearTimeout = setTimeout(
    () => (messageBox.style.opacity = "0"),
    duration
  );
}

export function roundRect(ctx, x, y, w, h, r) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
