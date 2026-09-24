/**
 * Web Audio API procedural cinematic sound engine
 * Completely self-contained, no external mp3/wav files required
 */

class CinemaAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private ambientGain: GainNode | null = null;
  private isDroneActive: boolean = false;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.ambientGain && this.ctx) {
      this.ambientGain.gain.setTargetAtTime(this.isMuted ? 0 : 0.08, this.ctx.currentTime, 0.2);
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Deep cinematic explosion & mechanical disassembly sound
   */
  public playDisassemble() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;

    // 1. Deep Sub-Bass impact
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(110, t);
    subOsc.frequency.exponentialRampToValueAtTime(32, t + 0.9);

    subGain.gain.setValueAtTime(0.35, t);
    subGain.gain.exponentialRampToValueAtTime(0.001, t + 1.2);

    subOsc.connect(subGain);
    subGain.connect(this.ctx.destination);
    subOsc.start(t);
    subOsc.stop(t + 1.25);

    // 2. Air release / whoosh noise
    const bufferSize = this.ctx.sampleRate * 1.0;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800, t);
    filter.frequency.exponentialRampToValueAtTime(240, t + 0.8);
    filter.Q.setValueAtTime(3.5, t);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.18, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.85);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.ctx.destination);
    noise.start(t);
    noise.stop(t + 0.9);

    // 3. High-tech servo release
    const servo = this.ctx.createOscillator();
    const servoGain = this.ctx.createGain();
    servo.type = 'triangle';
    servo.frequency.setValueAtTime(520, t + 0.05);
    servo.frequency.exponentialRampToValueAtTime(180, t + 0.5);

    servoGain.gain.setValueAtTime(0.08, t + 0.05);
    servoGain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);

    servo.connect(servoGain);
    servoGain.connect(this.ctx.destination);
    servo.start(t + 0.05);
    servo.stop(t + 0.55);
  }

  /**
   * Crisp mechanical lock & magnetic snap reassembly sound
   */
  public playReassemble() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;

    // 1. Sliding incoming reverse whoosh
    const revOsc = this.ctx.createOscillator();
    const revGain = this.ctx.createGain();
    revOsc.type = 'sine';
    revOsc.frequency.setValueAtTime(80, t);
    revOsc.frequency.exponentialRampToValueAtTime(340, t + 0.5);

    revGain.gain.setValueAtTime(0.02, t);
    revGain.gain.linearRampToValueAtTime(0.15, t + 0.45);
    revGain.gain.exponentialRampToValueAtTime(0.001, t + 0.55);

    revOsc.connect(revGain);
    revGain.connect(this.ctx.destination);
    revOsc.start(t);
    revOsc.stop(t + 0.6);

    // 2. Mechanical magnetic click at t + 0.48s
    const clickT = t + 0.48;
    const clickOsc = this.ctx.createOscillator();
    const clickGain = this.ctx.createGain();
    clickOsc.type = 'square';
    clickOsc.frequency.setValueAtTime(1400, clickT);
    clickOsc.frequency.exponentialRampToValueAtTime(80, clickT + 0.08);

    clickGain.gain.setValueAtTime(0.25, clickT);
    clickGain.gain.exponentialRampToValueAtTime(0.001, clickT + 0.12);

    clickOsc.connect(clickGain);
    clickGain.connect(this.ctx.destination);
    clickOsc.start(clickT);
    clickOsc.stop(clickT + 0.15);

    // 3. Bass lock resonance
    const lockOsc = this.ctx.createOscillator();
    const lockGain = this.ctx.createGain();
    lockOsc.type = 'sine';
    lockOsc.frequency.setValueAtTime(130, clickT);
    lockOsc.frequency.exponentialRampToValueAtTime(45, clickT + 0.4);

    lockGain.gain.setValueAtTime(0.22, clickT);
    lockGain.gain.exponentialRampToValueAtTime(0.001, clickT + 0.45);

    lockOsc.connect(lockGain);
    lockGain.connect(this.ctx.destination);
    lockOsc.start(clickT);
    lockOsc.stop(clickT + 0.5);
  }

  /**
   * Hover tick on components or chapter nodes
   */
  public playHover() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, t);
    osc.frequency.exponentialRampToValueAtTime(440, t + 0.04);

    gain.gain.setValueAtTime(0.04, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.06);
  }

  /**
   * Chapter selection switch
   */
  public playChapterSelect() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, t);
    osc.frequency.exponentialRampToValueAtTime(640, t + 0.09);

    gain.gain.setValueAtTime(0.08, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.15);
  }
}

export const cinemaAudio = new CinemaAudioEngine();
