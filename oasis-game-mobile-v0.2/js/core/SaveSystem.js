window.OASIS_SAVE = {
  save(state) {
    try {
      state.lastSavedAt = Date.now();
      localStorage.setItem(window.OASIS_CONFIG.storageKey, JSON.stringify(state));
      return true;
    } catch (error) { console.error("Ошибка сохранения:", error); return false; }
  },
  load() {
    try {
      const raw = localStorage.getItem(window.OASIS_CONFIG.storageKey);
      if (!raw) return null;
      const value = JSON.parse(raw);
      return value && typeof value === "object" ? value : null;
    } catch (error) { console.warn("Сохранение повреждено; начнём новую игру.", error); return null; }
  },
  getOrCreate() { return this.load() || window.createDefaultGameState(); }
};
