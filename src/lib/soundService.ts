import { useSoundStore } from '@s/sound.store';

type OscillatorType = 'sine' | 'square' | 'triangle' | 'sawtooth';

interface NoteConfig {
  frequency: number;
  startTime: number;
  duration: number;
  type?: OscillatorType;
  gain?: number;
}

class SoundService {
  private static ctx: AudioContext | null = null;
  private static getContext(): AudioContext {
    if (!this.ctx || this.ctx.state === 'closed') {
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }
    return this.ctx;
  }

  private static get enabled(): boolean {
    return useSoundStore.getState().isSoundEnabled;
  }

  private static playNote(cfg: NoteConfig): void {
    const ctx = this.getContext();
    const { frequency, startTime, duration, type = 'sine', gain = 0.25 } = cfg;

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(frequency, startTime);

    // Envelope: quick attack → sustain → smooth release
    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(gain, startTime + 0.02);
    gainNode.gain.setValueAtTime(gain, startTime + duration - 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration);
  }

  private static playChord(
    frequencies: number[],
    startTime: number,
    duration: number,
    type: OscillatorType = 'sine',
    gain = 0.15,
  ): void {
    for (const freq of frequencies) {
      this.playNote({ frequency: freq, startTime, duration, type, gain });
    }
  }

  public static playCorrect(): void {
    if (!this.enabled) {
      return;
    }
    const t = this.getContext().currentTime;

    // C-major: C4 (261.63), E4 (329.63), G4 (392.00)
    this.playChord([261.63, 329.63, 392.0], t, 0.35, 'triangle', 0.18);
  }

  public static playIncorrect(): void {
    if (!this.enabled) {
      return;
    }
    const t = this.getContext().currentTime;

    // Dissonant cluster: E3 + F3 (semitone clash)
    this.playChord([164.81, 174.61], t, 0.4, 'sawtooth', 0.1);
  }

  //  Test finished - fanfare whose mood depends on the score percentage.

  //   < 50 %  → descending minor phrase (sad)
  //   50–80 % → neutral ascending 4th
  //   > 80 %  → triumphant ascending arpeggio

  public static playFinish(percentage: number): void {
    if (!this.enabled) {
      return;
    }
    const t = this.getContext().currentTime;

    if (percentage > 80) {
      // Triumphant: C4 → E4 → G4 → C5 ascending arpeggio
      const notes = [261.63, 329.63, 392.0, 523.25];
      notes.forEach((freq, i) => {
        this.playNote({
          frequency: freq,
          startTime: t + i * 0.15,
          duration: 0.3,
          type: 'triangle',
          gain: 0.2,
        });
      });
      // Final chord
      this.playChord([261.63, 329.63, 392.0, 523.25], t + 0.6, 0.5, 'triangle', 0.12);
    } else if (percentage >= 50) {
      // Neutral: C4 → F4 (perfect 4th)
      this.playNote({ frequency: 261.63, startTime: t, duration: 0.3, type: 'triangle', gain: 0.18 });
      this.playNote({ frequency: 349.23, startTime: t + 0.2, duration: 0.4, type: 'triangle', gain: 0.18 });
    } else {
      // Sad: E4 → Eb4 → D4 descending minor
      const notes = [329.63, 311.13, 293.66];
      notes.forEach((freq, i) => {
        this.playNote({
          frequency: freq,
          startTime: t + i * 0.25,
          duration: 0.35,
          type: 'sine',
          gain: 0.15,
        });
      });
    }
  }

  // Achievement unlocked - ascending arpeggio "level up" jingle.
  public static playAchievement(): void {
    if (!this.enabled) {
      return;
    }
    const t = this.getContext().currentTime;

    // Fast ascending arpeggio: C5 → E5 → G5 → C6
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, i) => {
      this.playNote({
        frequency: freq,
        startTime: t + i * 0.1,
        duration: 0.2,
        type: 'sine',
        gain: 0.15,
      });
    });

    // Shimmering final chord
    this.playChord([523.25, 659.25, 783.99, 1046.5], t + 0.45, 0.6, 'triangle', 0.1);
  }

  // Toast notification sounds - different timbre per type.
  public static playToastSuccess(): void {
    if (!this.enabled) {
      return;
    }
    const t = this.getContext().currentTime;

    // Two quick ascending notes: G5 → C6
    this.playNote({ frequency: 783.99, startTime: t, duration: 0.12, type: 'sine', gain: 0.15 });
    this.playNote({ frequency: 1046.5, startTime: t + 0.1, duration: 0.18, type: 'sine', gain: 0.18 });
  }

  public static playToastError(): void {
    if (!this.enabled) {
      return;
    }
    const t = this.getContext().currentTime;

    // Low buzz: two quick pulses
    this.playNote({ frequency: 200, startTime: t, duration: 0.1, type: 'square', gain: 0.08 });
    this.playNote({ frequency: 180, startTime: t + 0.15, duration: 0.1, type: 'square', gain: 0.08 });
  }

  public static playToastInfo(): void {
    if (!this.enabled) {
      return;
    }
    const t = this.getContext().currentTime;

    // Single soft ding
    this.playNote({ frequency: 880, startTime: t, duration: 0.15, type: 'sine', gain: 0.12 });
  }
}

export { SoundService };
