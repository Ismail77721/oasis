(function () {
  if (!window.Phaser) {
    document.getElementById("game-container").innerHTML =
      '<div style="padding:24px;color:#fff8df;font:18px Arial">Не удалось загрузить Phaser.js. Проверь подключение к интернету и обнови страницу.</div>';
    return;
  }
  window.OASIS_GAME = new Phaser.Game({
    type: Phaser.AUTO,
    parent: "game-container",
    backgroundColor: "#dba33f",
    scale: {
      mode: Phaser.Scale.RESIZE,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: window.innerWidth,
      height: window.innerHeight
    },
    input: { activePointers: 3 },
    render: { antialias: true, pixelArt: false },
    scene: [window.OasisBootScene, window.OasisLoadingScene, window.OasisMainScene]
  });
})();
