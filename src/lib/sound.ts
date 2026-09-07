/* Procedural cinematic sound design — Web Audio, no asset downloads. */

type Ctx = AudioContext & { __drone?: () => void };

let ctx: Ctx | null = null;
let master: GainNode | null = null;
let muted = false;
let unlocked = false;
let droneStop: (() => void) | null = null;
const listeners = new Set<(m: boolean) => void>();

const MUTE_KEY = "aavishkara-muted";

function ensure(): Ctx | null {
  if (typeof window === "undefined") return null;
  /* browsers block audio before a gesture — stay silent instead of warning */
  if (!unlocked) return null;
  if (!ctx) {
    const AC =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC() as Ctx;
    master = ctx.createGain();
    master.gain.value = muted ? 0 : 0.9;
    master.connect(ctx.destination);
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

/** Call from a real user gesture before any sound can play. */
export function unlockAudio() {
  unlocked = true;
  ensure();
}


function noiseBuffer(c: AudioContext, seconds: number) {
  const len = Math.floor(c.sampleRate * seconds);
  const buf = c.createBuffer(1, len, c.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i += 1) data[i] = Math.random() * 2 - 1;
  return buf;
}

function tone(
  freq: number,
  dur: number,
  gain: number,
  type: OscillatorType = "sine",
  slideTo?: number,
  delay = 0,
) {
  const c = ensure();
  if (!c || !master) return;
  const t = c.currentTime + delay;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  if (slideTo) osc.frequency.exponentialRampToValueAtTime(Math.max(slideTo, 1), t + dur);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(gain, t + Math.min(0.03, dur * 0.2));
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(g).connect(master);
  osc.start(t);
  osc.stop(t + dur + 0.05);
}

function whoosh(dur: number, gain: number, from: number, to: number, delay = 0) {
  const c = ensure();
  if (!c || !master) return;
  const t = c.currentTime + delay;
  const src = c.createBufferSource();
  src.buffer = noiseBuffer(c, dur + 0.1);
  const filter = c.createBiquadFilter();
  filter.type = "bandpass";
  filter.Q.value = 1.1;
  filter.frequency.setValueAtTime(from, t);
  filter.frequency.exponentialRampToValueAtTime(to, t + dur);
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(gain, t + dur * 0.45);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  src.connect(filter).connect(g).connect(master);
  src.start(t);
  src.stop(t + dur + 0.1);
}

export type SoundName =
  | "hover"
  | "click"
  | "type"
  | "portal"
  | "reveal"
  | "powerup"
  | "lock";

export function playSound(name: SoundName) {
  if (muted) return;
  if (!ensure()) return;

  switch (name) {
    case "hover":
      tone(1750, 0.07, 0.035, "sine");
      break;
    case "click":
      tone(880, 0.09, 0.07, "triangle", 1400);
      whoosh(0.18, 0.05, 1800, 400);
      break;
    case "type":
      tone(2100 + Math.random() * 300, 0.03, 0.018, "square");
      break;
    case "portal":
      /* darken → rising light bar → impact bloom */
      tone(60, 0.5, 0.16, "sine", 38);
      whoosh(0.75, 0.18, 260, 5200, 0.12);
      tone(196, 0.7, 0.05, "sawtooth", 784, 0.2);
      whoosh(1.0, 0.12, 6000, 300, 0.85);
      tone(110, 1.1, 0.13, "sine", 55, 0.9);
      tone(1568, 0.9, 0.045, "sine", 784, 0.95);
      break;
    case "reveal":
      tone(261.6, 1.6, 0.07, "sine");
      tone(392, 1.6, 0.055, "sine", undefined, 0.08);
      tone(523.3, 1.8, 0.05, "triangle", undefined, 0.16);
      whoosh(1.4, 0.09, 400, 4800);
      break;
    case "powerup":
      tone(220, 0.9, 0.07, "sawtooth", 880);
      whoosh(0.9, 0.07, 300, 3600);
      break;
    case "lock":
      tone(140, 0.35, 0.09, "square", 90);
      break;
    default:
      break;
  }
}

/* low ambient sci-fi bed */
export function startAmbience() {
  if (droneStop || muted) return;
  const c = ensure();
  if (!c || !master) return;
  const bed = c.createGain();
  bed.gain.value = 0.0001;
  bed.gain.exponentialRampToValueAtTime(0.05, c.currentTime + 4);
  bed.connect(master);

  const oscs = [55, 82.5, 110.3].map((f, i) => {
    const o = c.createOscillator();
    o.type = i === 2 ? "triangle" : "sine";
    o.frequency.value = f;
    const g = c.createGain();
    g.gain.value = i === 0 ? 0.7 : 0.25;
    const lfo = c.createOscillator();
    lfo.frequency.value = 0.05 + i * 0.03;
    const lfoGain = c.createGain();
    lfoGain.gain.value = 0.12;
    lfo.connect(lfoGain).connect(g.gain);
    o.connect(g).connect(bed);
    o.start();
    lfo.start();
    return [o, lfo] as const;
  });

  const air = c.createBufferSource();
  air.buffer = noiseBuffer(c, 4);
  air.loop = true;
  const airFilter = c.createBiquadFilter();
  airFilter.type = "lowpass";
  airFilter.frequency.value = 320;
  const airGain = c.createGain();
  airGain.gain.value = 0.05;
  air.connect(airFilter).connect(airGain).connect(bed);
  air.start();

  droneStop = () => {
    try {
      bed.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.6);
      oscs.flat().forEach((o) => o.stop(c.currentTime + 0.7));
      air.stop(c.currentTime + 0.7);
    } catch {
      /* already stopped */
    }
    droneStop = null;
  };
}

export function stopAmbience() {
  droneStop?.();
}

export function isMuted() {
  return muted;
}

export function initSound() {
  if (typeof window === "undefined") return;
  muted = window.localStorage.getItem(MUTE_KEY) === "1";
}

export function setMuted(next: boolean) {
  muted = next;
  if (typeof window !== "undefined") window.localStorage.setItem(MUTE_KEY, next ? "1" : "0");
  if (master && ctx) {
    master.gain.setTargetAtTime(next ? 0 : 0.9, ctx.currentTime, 0.1);
  }
  if (next) stopAmbience();
  else startAmbience();
  listeners.forEach((l) => l(next));
}

export function subscribeMuted(fn: (m: boolean) => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
