window.OasisLoadingScene = class OasisLoadingScene extends Phaser.Scene {
  constructor() { super("LoadingScene"); }
  create() {
    this.cameras.main.setBackgroundColor("#dba33f");
    const w = this.scale.width, h = this.scale.height;
    this.add.text(w / 2, h / 2, "ОАЗИС", {
      fontFamily: "Georgia, serif", fontSize: Math.min(58, w * 0.12) + "px",
      fontStyle: "bold", color: "#fff5d7", stroke: "#8b5b26", strokeThickness: 5
    }).setOrigin(0.5);
    this.time.delayedCall(250, () => this.scene.start("MainScene"));
  }
};
