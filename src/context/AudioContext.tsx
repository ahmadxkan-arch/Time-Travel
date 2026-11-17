'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

interface AudioContextType {
  isPlaying: boolean;
  toggleAudio: () => void;
  playWarpSound: () => void;
  playClickSound: () => void;
  playSuccessSound: () => void;
  setSoundscapeTheme: (theme: string) => void;
  currentSoundscape: string;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentSoundscape, setCurrentSoundscape] = useState<string>('desert-wind-flute');
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorNodesRef = useRef<OscillatorNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Initialize or resume AudioContext
  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  const stopSoundscape = () => {
    oscillatorNodesRef.current.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // ignore
      }
    });
    oscillatorNodesRef.current = [];
  };

  const startSoundscape = (theme: string) => {
    const ctx = getAudioContext();
    if (!ctx) return;

    stopSoundscape();

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.06, ctx.currentTime);
    masterGain.connect(ctx.destination);
    gainNodeRef.current = masterGain;

    // Define harmonic chord frequencies based on civilization theme
    let freqs: number[] = [110, 164.8, 220, 329.6]; // Desert minor / Phrygian
    if (theme.includes('roman') || theme.includes('imperial')) {
      freqs = [98, 146.8, 196, 293.6]; // Roman epic fifths
    } else if (theme.includes('greece') || theme.includes('aegean')) {
      freqs = [130.8, 164.8, 196, 261.6]; // Dorian celestial
    } else if (theme.includes('mughal') || theme.includes('sitar')) {
      freqs = [110, 138.6, 164.8, 207.6, 277.2]; // Bhairav raga drone
    } else if (theme.includes('ottoman')) {
      freqs = [110, 146.8, 174.6, 220]; // Hijaz maqam
    } else if (theme.includes('renaissance')) {
      freqs = [130.8, 164.8, 196, 246.9, 329.6]; // Polyphonic lute
    } else if (theme.includes('retro') || theme.includes('1990')) {
      freqs = [65.4, 130.8, 196, 246.9, 392]; // Synthwave chill
    }

    const oscs: OscillatorNode[] = [];
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();

      // Warm organic shapes
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Subtle frequency vibrato / drift
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.2 + idx * 0.08, ctx.currentTime);
      lfoGain.gain.setValueAtTime(1.5, ctx.currentTime);
      lfo.connect(osc.frequency);
      lfo.start();

      oscGain.gain.setValueAtTime(0.18 / (idx + 1), ctx.currentTime);
      osc.connect(oscGain);
      oscGain.connect(masterGain);
      osc.start();

      oscs.push(osc);
    });

    oscillatorNodesRef.current = oscs;
  };

  const toggleAudio = () => {
    if (isPlaying) {
      stopSoundscape();
      setIsPlaying(false);
    } else {
      startSoundscape(currentSoundscape);
      setIsPlaying(true);
    }
  };

  const setSoundscapeTheme = (theme: string) => {
    setCurrentSoundscape(theme);
    if (isPlaying) {
      startSoundscape(theme);
    }
  };

  const playWarpSound = () => {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.4);
    osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.8);
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.8);
  };

  const playClickSound = () => {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.05);
    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.05);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  };

  const playSuccessSound = () => {
    const ctx = getAudioContext();
    if (!ctx) return;
    const chord = [440, 554.37, 659.25, 880];
    chord.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
      gain.gain.setValueAtTime(0.08, ctx.currentTime + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.6);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.08);
      osc.stop(ctx.currentTime + idx * 0.08 + 0.6);
    });
  };

  useEffect(() => {
    return () => {
      stopSoundscape();
    };
  }, []);

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        toggleAudio,
        playWarpSound,
        playClickSound,
        playSuccessSound,
        setSoundscapeTheme,
        currentSoundscape,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}

