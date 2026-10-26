// Web Audio API Synthesizer for Visualizer Feedback
// Clean, low-latency, zero-dependency sound effects

class SoundManager {
  constructor() {
    this.ctx = null;
    this.enabled = false; // default disabled or user-toggled
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  playTone(freq, type = 'sine', duration = 0.08, volume = 0.05) {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio autoplay or permissions fail gracefully
    }
  }

  playCompare(val = 50) {
    // Frequency mapped from value (200Hz to 800Hz)
    const freq = 200 + (val * 6);
    this.playTone(freq, 'sine', 0.05, 0.03);
  }

  playSwap(val = 50) {
    const freq = 300 + (val * 8);
    this.playTone(freq, 'triangle', 0.09, 0.06);
  }

  playSuccess() {
    this.playTone(523.25, 'sine', 0.1, 0.05); // C5
    setTimeout(() => this.playTone(659.25, 'sine', 0.1, 0.05), 100); // E5
    setTimeout(() => this.playTone(783.99, 'sine', 0.15, 0.06), 200); // G5
  }

  playVisit() {
    this.playTone(350, 'sine', 0.04, 0.02);
  }
}

export const soundManager = new SoundManager();
