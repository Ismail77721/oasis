window.OasisBootScene = class OasisBootScene extends Phaser.Scene {
  constructor() { super("BootScene"); }
  create() {
    this.registry.set("gameState", window.OASIS_SAVE.getOrCreate());
    this.scene.start("LoadingScene");
  }
};
