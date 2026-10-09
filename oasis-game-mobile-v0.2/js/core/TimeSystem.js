window.OASIS_TIME = {
  offlineSeconds(lastSavedAt) { return lastSavedAt ? Math.max(0, Math.floor((Date.now() - lastSavedAt) / 1000)) : 0; },
  getPhase(timestamp = Date.now()) {
    const cycle = window.OASIS_CONFIG.time.cycleMinutes * 60000;
    const day = window.OASIS_CONFIG.time.dayMinutes * 60000;
    return (timestamp % cycle) < day ? "day" : "night";
  }
};
