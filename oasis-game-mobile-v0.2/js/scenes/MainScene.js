window.OasisMainScene = class OasisMainScene extends Phaser.Scene {
  constructor() { super("MainScene"); }
  create() {
    this.state = this.registry.get("gameState");
    this.graphics = this.add.graphics();
    this.ui = this.add.container(0, 0);
    this.drawScene();
    this.scale.on("resize", this.drawScene, this);
    this.time.addEvent({ delay: 15000, loop: true, callback: () => {
      window.OASIS_SAVE.save(this.state); this.drawScene();
    }});
    this.events.once("shutdown", () => this.scale.off("resize", this.drawScene, this));
    window.addEventListener("beforeunload", () => window.OASIS_SAVE.save(this.state), { once: true });
  }

  drawScene() {
    if (!this.graphics || !this.ui) return;
    const w = this.scale.width, h = this.scale.height;
    const isPortrait = h >= w;
    const night = window.OASIS_TIME.getPhase() === "night";
    this.cameras.main.setBackgroundColor(night ? "#3b4055" : "#dba33f");
    this.graphics.clear();
    this.ui.removeAll(true);

    // Безопасные отступы и панели рассчитаны относительно текущего размера экрана.
    const pad = Math.max(12, Math.min(22, w * 0.035));
    const titleY = isPortrait ? Math.max(78, h * 0.11) : h * 0.10;
    const titleSize = Math.max(28, Math.min(isPortrait ? 42 : 52, w * 0.09));
    const mainText = night ? "#f7e9b0" : "#fff5d7";
    const panel = (x, y, width, height, color = 0x6f4b25, alpha = 0.94) => {
      const r = this.add.rectangle(x, y, width, height, color, alpha).setOrigin(0, 0);
      r.setStrokeStyle(1, 0xf2d89a, 0.75); this.ui.add(r); return r;
    };
    const label = (txt, x, y, size, color = "#fff8df", originX = 0, originY = 0.5) => {
      const t = this.add.text(x, y, txt, { fontFamily: "Arial, sans-serif", fontSize: size + "px", color,
        fontStyle: "bold", padding: { x: 1, y: 2 } }).setOrigin(originX, originY);
      this.ui.add(t); return t;
    };

    // Верхняя панель ресурсов — перестраивается под узкие экраны.
    const topY = Math.max(8, (isPortrait ? 8 : h * 0.035));
    const topH = isPortrait ? 42 : 38;
    const topW = Math.min(w - pad * 2, isPortrait ? 310 : 360);
    panel(pad, topY, topW, topH);
    const resourceFont = Math.max(12, Math.min(16, w * 0.038));
    label("🪙 " + this.state.resources.coins, pad + 10, topY + topH / 2, resourceFont);
    label("💧 " + this.state.resources.water, pad + topW * 0.53, topY + topH / 2, resourceFont);

    label("ОАЗИС", w / 2, titleY, titleSize, mainText, 0.5, 0.5);
    label("Фаза: " + (night ? "ночь" : "день"), w / 2, titleY + titleSize * 0.78, Math.max(14, Math.min(18, w * 0.04)), mainText, 0.5, 0.5);

    // Карта занимает большую центральную область. На портрете сетка компактнее и выше.
    const footerReserve = isPortrait ? 74 : 48;
    const mapTop = isPortrait ? titleY + titleSize * 1.55 : h * 0.26;
    const mapBottom = h - footerReserve - 12;
    const availableH = Math.max(120, mapBottom - mapTop);
    const cols = isPortrait ? 7 : 8;
    const rows = isPortrait ? 7 : 6;
    const tileW = Math.min((w - pad * 2) / (cols + rows) * 2, availableH / (cols + rows) * 2, isPortrait ? 54 : 74);
    const tileH = tileW * 0.5;
    const mapCenterX = w / 2;
    const mapCenterY = mapTop + availableH * 0.48;
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const px = mapCenterX + (x - y) * tileW / 2;
        const py = mapCenterY + (x + y - (cols + rows - 2) / 2) * tileH / 2;
        const color = ((x + y) % 2 === 0) ? (night ? 0x8c794f : 0xeac36c) : (night ? 0x9a8454 : 0xf0cf7f);
        this.graphics.fillStyle(color, 1);
        this.graphics.lineStyle(1, night ? 0x6c6149 : 0xc89942, 0.9);
        this.graphics.beginPath();
        this.graphics.moveTo(px, py - tileH / 2);
        this.graphics.lineTo(px + tileW / 2, py);
        this.graphics.lineTo(px, py + tileH / 2);
        this.graphics.lineTo(px - tileW / 2, py);
        this.graphics.closePath();
        this.graphics.fillPath(); this.graphics.strokePath();
      }
    }

    // Колодец в центре карты — геометрическая заглушка до подключения художественных ассетов.
    const wellX = mapCenterX;
    const wellY = mapCenterY;
    this.graphics.fillStyle(0x80613a, 1);
    this.graphics.lineStyle(3, 0xf6e4ad, 1);
    this.graphics.fillEllipse(wellX, wellY, tileW * 1.05, tileH * 0.72);
    this.graphics.strokeEllipse(wellX, wellY, tileW * 1.05, tileH * 0.72);
    this.graphics.fillStyle(0x55b9d1, 1);
    this.graphics.fillEllipse(wellX, wellY - 2, tileW * 0.72, tileH * 0.45);
    this.graphics.lineStyle(2, 0xf6e4ad, 1);
    this.graphics.strokeEllipse(wellX, wellY - 2, tileW * 0.72, tileH * 0.45);

    // Нижняя панель действий пока демонстрационная, но уже занимает мобильную зону управления.
    const barH = isPortrait ? 54 : 40;
    const barY = h - barH - Math.max(8, pad * 0.55);
    panel(pad, barY, w - pad * 2, barH, 0x6f4b25, 0.96);
    const footerFont = Math.max(11, Math.min(14, w * 0.033));
    label(isPortrait ? "ЗЕМЛЯ  •  ВОДА  •  СКЛАД" : "Стартовый прототип • адаптивная карта", w / 2, barY + barH / 2, footerFont, "#fff8df", 0.5, 0.5);
  }
};
