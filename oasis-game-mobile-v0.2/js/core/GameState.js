window.createDefaultGameState = function () {
  return {
    version: window.OASIS_CONFIG.version, lastSavedAt: Date.now(),
    player: { gender: null },
    resources: { coins: 100, energy: 20, water: 10 },
    inventory: { watermelon: 0, clover: 0, dates: 0, wool: 0, camelMilk: 0 },
    farm: { width: 10, height: 10, tiles: [] },
    buildings: { well: { level: 1, x: 5, y: 5 } },
    animals: { sheep: { count: 0 }, camels: { count: 0 } },
    tools: { scythe: 1, shears: 1, milkJugs: 1, wateringCan: 1 },
    barakat: { multiplier: 1 }, sadaka: { hiddenTotal: 0 },
    settings: { soundEnabled: true },
    parentalControl: { enabled: false, pin: null, dailyLimitHours: 2 },
    prayerTimer: { enabled: false, city: null, schedule: [] },
    decorations: []
  };
};
