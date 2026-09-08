import { r as __toESM } from "../_runtime.mjs";
import { n as registerBootPreload, r as warmBootPreload, t as doorway_default } from "./boot-preload-C8ZZF973.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { a as AnimatePresence, n as useMotionValue, r as useScroll, t as useSpring } from "../_libs/framer-motion+[...].mjs";
import { t as motion } from "../_libs/motion.mjs";
import { a as Play, c as ArrowRight, i as ShieldCheck, l as ArrowLeft, n as Volume2, o as Lock, r as SkipForward, s as ChevronDown, t as VolumeX } from "../_libs/lucide-react.mjs";
import { t as Lenis } from "../_libs/lenis.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DJuc5MNP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SmoothScroll() {
	(0, import_react.useEffect)(() => {
		const lenis = new Lenis({
			duration: 1.4,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			smoothWheel: true,
			touchMultiplier: 1.4
		});
		window.__lenis = lenis;
		let frame = 0;
		const raf = (time) => {
			lenis.raf(time);
			frame = requestAnimationFrame(raf);
		};
		frame = requestAnimationFrame(raf);
		return () => {
			cancelAnimationFrame(frame);
			lenis.destroy();
			delete window.__lenis;
		};
	}, []);
	return null;
}
/** Faint circuit grid + drifting particles. Purely decorative, low opacity. */
function Ambience() {
	const particles = (0, import_react.useMemo)(() => Array.from({ length: 34 }, (_, i) => ({
		id: i,
		left: i * 37 % 100,
		top: i * 53 % 100,
		size: 1 + i * 7 % 3,
		delay: i % 12 * .9,
		duration: 9 + i * 3 % 9,
		gold: i % 3 === 0
	})), []);
	(0, import_react.useEffect)(() => {
		if (!window.matchMedia("(pointer: fine)").matches) return;
		const root = document.documentElement;
		const onMove = (event) => {
			root.style.setProperty("--pointer-x", `${(event.clientX / window.innerWidth - .5) * 18}px`);
			root.style.setProperty("--pointer-y", `${(event.clientY / window.innerHeight - .5) * 18}px`);
		};
		window.addEventListener("pointermove", onMove, { passive: true });
		return () => window.removeEventListener("pointermove", onMove);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"aria-hidden": true,
		className: "pointer-events-none fixed inset-0 z-0 overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "circuit-grid ambient-grid absolute inset-0" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "ambient-glow absolute left-1/2 top-0 h-[60vh] w-[70vw] -translate-x-1/2 rounded-full bg-accent/8 blur-[140px]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "ambient-glow-delayed absolute bottom-0 right-0 h-[50vh] w-[50vw] rounded-full bg-primary/6 blur-[160px]" }),
			particles.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `ambient-particle absolute rounded-full ${p.gold ? "bg-primary/50" : "bg-accent/50"}`,
				style: {
					left: `${p.left}%`,
					top: `${p.top}%`,
					width: p.size,
					height: p.size,
					animation: `float-particle ${p.duration}s ease-in-out ${p.delay}s infinite`
				}
			}, p.id))
		]
	});
}
/** Shared motion constants — single source of truth for site-wide timing. */
/** easeOutExpo-ish curve used for every major transition. */
var EASE$1 = [
	.22,
	1,
	.36,
	1
];
/** Total duration of the case-study portal transition (ms). */
var PORTAL_TOTAL = 2200;
/** Point inside the portal transition where content swaps (ms). */
var PORTAL_SWAP = 1100;
/** Hero opening flourish (ms). */
var HERO_SPARK_DURATION = 5e3;
/** Delay before the corner logos lift into place (s). */
var HERO_LOGO_DELAY = 1.3;
/** Mouse click-and-hold fallback trigger (ms). */
var HOLD_FALLBACK_DURATION = 1e3;
/** Session flag so the boot screen only plays once. */
var BOOT_SESSION_KEY = "aavishkara-booted";
/**
* One-time opening flourish: gold streaks fly in from both edges past the
* centre, then fade out individually. Unmounts itself after the burst.
*/
function SparkBurst() {
	const [done, setDone] = (0, import_react.useState)(false);
	const sparks = (0, import_react.useMemo)(() => Array.from({ length: 26 }, (_, i) => {
		return {
			id: i,
			fromLeft: i % 2 === 0,
			top: 6 + i * 17 % 88,
			length: 90 + i * 23 % 180,
			duration: 1.1 + i * 7 % 13 / 10,
			delay: i * 11 % 22 / 10,
			thin: i % 3 === 0
		};
	}), []);
	(0, import_react.useEffect)(() => {
		const t = window.setTimeout(() => setDone(true), HERO_SPARK_DURATION);
		return () => window.clearTimeout(t);
	}, []);
	if (done) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"aria-hidden": true,
		className: "pointer-events-none fixed inset-0 z-[5] overflow-hidden",
		children: sparks.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "absolute rounded-full",
			style: {
				top: `${s.top}%`,
				left: s.fromLeft ? 0 : "auto",
				right: s.fromLeft ? "auto" : 0,
				width: s.length,
				height: s.thin ? 2 : 3,
				background: s.fromLeft ? "linear-gradient(90deg, transparent, var(--gold))" : "linear-gradient(270deg, transparent, var(--gold))",
				boxShadow: "0 0 16px 2px oklch(0.82 0.16 85 / 0.7)",
				opacity: 0,
				animation: `${s.fromLeft ? "spark-right" : "spark-left"} ${s.duration}s cubic-bezier(0.22,1,0.36,1) ${s.delay}s both`
			}
		}, s.id))
	});
}
function ScrollProgress() {
	const { scrollYProgress } = useScroll();
	const scaleY = useSpring(scrollYProgress, {
		stiffness: 90,
		damping: 24,
		mass: .4
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"aria-hidden": true,
		className: "fixed right-5 top-1/2 z-50 hidden h-40 w-px -translate-y-1/2 bg-border md:block",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			style: {
				scaleY,
				transformOrigin: "top"
			},
			className: "h-full w-px bg-primary shadow-[0_0_12px_var(--gold)]"
		})
	});
}
var ctx = null;
var master = null;
var muted = false;
var unlocked = false;
var droneStop = null;
var listeners = /* @__PURE__ */ new Set();
var MUTE_KEY = "aavishkara-muted";
function ensure() {
	if (typeof window === "undefined") return null;
	if (!unlocked) return null;
	if (!ctx) {
		const AC = window.AudioContext ?? window.webkitAudioContext;
		if (!AC) return null;
		ctx = new AC();
		master = ctx.createGain();
		master.gain.value = muted ? 0 : .9;
		master.connect(ctx.destination);
	}
	if (ctx.state === "suspended") ctx.resume();
	return ctx;
}
/** Call from a real user gesture before any sound can play. */
function unlockAudio() {
	unlocked = true;
	ensure();
}
function noiseBuffer(c, seconds) {
	const len = Math.floor(c.sampleRate * seconds);
	const buf = c.createBuffer(1, len, c.sampleRate);
	const data = buf.getChannelData(0);
	for (let i = 0; i < len; i += 1) data[i] = Math.random() * 2 - 1;
	return buf;
}
function tone(freq, dur, gain, type = "sine", slideTo, delay = 0) {
	const c = ensure();
	if (!c || !master) return;
	const t = c.currentTime + delay;
	const osc = c.createOscillator();
	const g = c.createGain();
	osc.type = type;
	osc.frequency.setValueAtTime(freq, t);
	if (slideTo) osc.frequency.exponentialRampToValueAtTime(Math.max(slideTo, 1), t + dur);
	g.gain.setValueAtTime(1e-4, t);
	g.gain.exponentialRampToValueAtTime(gain, t + Math.min(.03, dur * .2));
	g.gain.exponentialRampToValueAtTime(1e-4, t + dur);
	osc.connect(g).connect(master);
	osc.start(t);
	osc.stop(t + dur + .05);
}
function whoosh(dur, gain, from, to, delay = 0) {
	const c = ensure();
	if (!c || !master) return;
	const t = c.currentTime + delay;
	const src = c.createBufferSource();
	src.buffer = noiseBuffer(c, dur + .1);
	const filter = c.createBiquadFilter();
	filter.type = "bandpass";
	filter.Q.value = 1.1;
	filter.frequency.setValueAtTime(from, t);
	filter.frequency.exponentialRampToValueAtTime(to, t + dur);
	const g = c.createGain();
	g.gain.setValueAtTime(1e-4, t);
	g.gain.exponentialRampToValueAtTime(gain, t + dur * .45);
	g.gain.exponentialRampToValueAtTime(1e-4, t + dur);
	src.connect(filter).connect(g).connect(master);
	src.start(t);
	src.stop(t + dur + .1);
}
function playSound(name) {
	if (muted) return;
	if (!ensure()) return;
	switch (name) {
		case "hover":
			tone(1750, .07, .035, "sine");
			break;
		case "click":
			tone(880, .09, .07, "triangle", 1400);
			whoosh(.18, .05, 1800, 400);
			break;
		case "type":
			tone(2100 + Math.random() * 300, .03, .018, "square");
			break;
		case "portal":
			tone(60, .5, .16, "sine", 38);
			whoosh(.75, .18, 260, 5200, .12);
			tone(196, .7, .05, "sawtooth", 784, .2);
			whoosh(1, .12, 6e3, 300, .85);
			tone(110, 1.1, .13, "sine", 55, .9);
			tone(1568, .9, .045, "sine", 784, .95);
			break;
		case "reveal":
			tone(261.6, 1.6, .07, "sine");
			tone(392, 1.6, .055, "sine", void 0, .08);
			tone(523.3, 1.8, .05, "triangle", void 0, .16);
			whoosh(1.4, .09, 400, 4800);
			break;
		case "powerup":
			tone(220, .9, .07, "sawtooth", 880);
			whoosh(.9, .07, 300, 3600);
			break;
		case "lock": tone(140, .35, .09, "square", 90);
	}
}
function startAmbience() {
	if (droneStop || muted) return;
	const c = ensure();
	if (!c || !master) return;
	const bed = c.createGain();
	bed.gain.value = 1e-4;
	bed.gain.exponentialRampToValueAtTime(.05, c.currentTime + 4);
	bed.connect(master);
	const oscs = [
		55,
		82.5,
		110.3
	].map((f, i) => {
		const o = c.createOscillator();
		o.type = i === 2 ? "triangle" : "sine";
		o.frequency.value = f;
		const g = c.createGain();
		g.gain.value = i === 0 ? .7 : .25;
		const lfo = c.createOscillator();
		lfo.frequency.value = .05 + i * .03;
		const lfoGain = c.createGain();
		lfoGain.gain.value = .12;
		lfo.connect(lfoGain).connect(g.gain);
		o.connect(g).connect(bed);
		o.start();
		lfo.start();
		return [o, lfo];
	});
	const air = c.createBufferSource();
	air.buffer = noiseBuffer(c, 4);
	air.loop = true;
	const airFilter = c.createBiquadFilter();
	airFilter.type = "lowpass";
	airFilter.frequency.value = 320;
	const airGain = c.createGain();
	airGain.gain.value = .05;
	air.connect(airFilter).connect(airGain).connect(bed);
	air.start();
	droneStop = () => {
		try {
			bed.gain.exponentialRampToValueAtTime(1e-4, c.currentTime + .6);
			oscs.flat().forEach((o) => o.stop(c.currentTime + .7));
			air.stop(c.currentTime + .7);
		} catch {}
		droneStop = null;
	};
}
function stopAmbience() {
	droneStop?.();
}
function isMuted() {
	return muted;
}
function initSound() {
	if (typeof window === "undefined") return;
	muted = window.localStorage.getItem(MUTE_KEY) === "1";
}
function setMuted(next) {
	muted = next;
	if (!next) unlockAudio();
	if (typeof window !== "undefined") window.localStorage.setItem(MUTE_KEY, next ? "1" : "0");
	if (master && ctx) master.gain.setTargetAtTime(next ? 0 : .9, ctx.currentTime, .1);
	if (next) stopAmbience();
	else startAmbience();
	listeners.forEach((l) => l(next));
}
function subscribeMuted(fn) {
	listeners.add(fn);
	return () => listeners.delete(fn);
}
function Typewriter({ text, delay = 0, speed = 70, className = "" }) {
	const [count, setCount] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		let interval;
		const start = setTimeout(() => {
			interval = setInterval(() => {
				setCount((c) => {
					if (c >= text.length) {
						clearInterval(interval);
						return c;
					}
					playSound("type");
					return c + 1;
				});
			}, speed);
		}, delay);
		return () => {
			clearTimeout(start);
			clearInterval(interval);
		};
	}, [
		text,
		delay,
		speed
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className,
		children: [text.slice(0, count), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "ml-0.5 inline-block w-[0.5ch] text-primary",
			style: { animation: "caret-blink 1s steps(1) infinite" },
			children: "_"
		})]
	});
}
function pad(n) {
	return String(n).padStart(2, "0");
}
/** A single case study, animated in on mount (used by the button-driven deck). */
function CaseStudyPanel({ study, index }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-5xl px-1 sm:px-3 pb-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 14
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: {
					duration: .45,
					delay: .08,
					ease: EASE$1
				},
				className: "flex flex-wrap items-center gap-2 sm:gap-3",
				children: [
					study.code && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded border border-primary/60 bg-primary/20 px-2.5 py-0.5 font-mono text-[0.7rem] font-bold tracking-widest text-primary shadow-[0_0_15px_-4px_var(--gold)] sm:text-xs",
						children: study.code
					}),
					study.language && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded border border-accent/40 bg-accent/15 px-2.5 py-0.5 font-mono text-[0.7rem] tracking-wider text-accent sm:text-xs",
						children: study.language
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "display text-xs tracking-[0.3em] text-muted-foreground sm:text-sm",
						children: study.category
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.h2, {
				initial: {
					opacity: 0,
					y: 24,
					filter: "blur(10px)"
				},
				animate: {
					opacity: 1,
					y: 0,
					filter: "blur(0px)"
				},
				transition: {
					duration: .55,
					delay: .14,
					ease: EASE$1
				},
				className: "display text-glow-gold mt-2 text-xl leading-snug text-primary sm:text-3xl lg:text-4xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-gold-soft/70",
						children: pad(index + 1)
					}),
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: study.title })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 16
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: {
					duration: .45,
					delay: .18,
					ease: EASE$1
				},
				className: "mt-3 max-w-4xl sm:mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "display text-xs tracking-[0.35em] text-primary sm:text-sm",
					children: "Brief"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs leading-relaxed text-foreground/85 sm:text-sm md:text-base",
					children: study.brief || study.context
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 16
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: {
					duration: .45,
					delay: .24,
					ease: EASE$1
				},
				className: "mt-3 max-w-4xl border-l-2 border-primary bg-card/70 py-2.5 pl-3.5 pr-3.5 shadow-[0_0_50px_-25px_var(--gold)] sm:mt-4 sm:border-l-4 sm:py-3.5 sm:pl-5 sm:pr-5 rounded-r",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "display text-xs tracking-[0.35em] text-primary sm:text-sm",
					children: "Problem Statement"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm font-medium leading-relaxed text-foreground sm:text-base md:text-lg",
					children: study.problem
				})]
			}),
			study.keyFeatures && study.keyFeatures.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 sm:mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.h3, {
					initial: { opacity: 0 },
					animate: { opacity: 1 },
					transition: {
						duration: .35,
						delay: .26
					},
					className: "display text-xs tracking-[0.35em] text-primary sm:text-sm",
					children: "Key Features"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1.5 flex flex-wrap gap-1.5 sm:gap-2",
					children: study.keyFeatures.map((kf, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
						initial: {
							opacity: 0,
							scale: .9
						},
						animate: {
							opacity: 1,
							scale: 1
						},
						transition: {
							duration: .3,
							delay: .28 + i * .02,
							ease: EASE$1
						},
						className: "rounded border border-primary/40 bg-primary/10 px-2 py-0.5 text-xs text-foreground/90 shadow-[0_0_10px_-4px_var(--gold)]",
						children: kf
					}, kf))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 sm:mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.h3, {
					initial: { opacity: 0 },
					animate: { opacity: 1 },
					transition: {
						duration: .35,
						delay: .3
					},
					className: "display text-xs tracking-[0.35em] text-primary sm:text-sm",
					children: "Constraints"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-1.5 grid gap-2 grid-cols-1 md:grid-cols-2",
					children: (study.constraints || study.requirements).map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.li, {
						initial: {
							opacity: 0,
							x: -14
						},
						animate: {
							opacity: 1,
							x: 0
						},
						transition: {
							duration: .35,
							delay: .32 + i * .03,
							ease: EASE$1
						},
						className: "flex gap-2 text-xs leading-relaxed text-foreground/85 sm:text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item })]
					}, item))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 sm:mt-4 mb-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3 grid-cols-1 md:grid-cols-2",
					children: [["Outcome", study.outcome || study.impact], ["Tools & Technologies", study.tools || study.technical]].map(([title, points], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 18
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: .4,
							delay: .38 + i * .05,
							ease: EASE$1
						},
						className: "rounded-md border border-accent/40 bg-card/60 p-3 shadow-[0_0_50px_-25px_var(--neon)] sm:p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "display text-xs tracking-[0.25em] text-accent sm:text-sm",
							children: title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-1.5 space-y-1",
							children: points.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-2 text-xs leading-relaxed text-foreground/85 sm:text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: p })]
							}, p))
						})]
					}, title))
				})
			})
		]
	});
}
function MagneticButton({ children, onClick, disabled, variant = "primary", className = "", ariaLabel }) {
	const ref = (0, import_react.useRef)(null);
	const [offset, setOffset] = (0, import_react.useState)({
		x: 0,
		y: 0
	});
	const handleMove = (e) => {
		const el = ref.current;
		if (!el) return;
		const r = el.getBoundingClientRect();
		setOffset({
			x: (e.clientX - (r.left + r.width / 2)) * .25,
			y: (e.clientY - (r.top + r.height / 2)) * .35
		});
	};
	const base = variant === "primary" ? "display border border-primary/70 bg-primary/10 px-8 py-4 text-base tracking-[0.35em] text-primary sm:px-12 sm:py-5 sm:text-lg" : "display border border-border bg-transparent px-5 py-3 text-xs tracking-[0.3em] text-muted-foreground hover:text-foreground sm:text-sm";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
		ref,
		type: "button",
		"aria-label": ariaLabel,
		onClick: () => {
			if (disabled) return;
			playSound("click");
			onClick();
		},
		disabled,
		onMouseEnter: () => {
			if (!disabled) playSound("hover");
		},
		onMouseMove: handleMove,
		onMouseLeave: () => setOffset({
			x: 0,
			y: 0
		}),
		animate: {
			x: offset.x,
			y: offset.y
		},
		transition: {
			type: "spring",
			stiffness: 220,
			damping: 18
		},
		className: `portal-button relative inline-flex items-center gap-3 overflow-hidden rounded-full uppercase transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${base} ${className}`,
		style: { animation: variant === "primary" ? "btn-pulse 2.6s ease-in-out infinite" : "none" },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"aria-hidden": true,
			className: "button-light-sweep"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "relative z-10 inline-flex items-center gap-3",
			children
		})]
	});
}
function PortalTransition({ active }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: active && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		"aria-hidden": true,
		className: "pointer-events-none fixed inset-0 z-[60] flex items-center justify-center overflow-hidden",
		initial: { opacity: 1 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		transition: { duration: .35 },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				className: "absolute inset-0 bg-background",
				initial: { opacity: 0 },
				animate: { opacity: [
					0,
					.72,
					.9,
					.58,
					0
				] },
				transition: {
					duration: 2200 / 1e3,
					times: [
						0,
						.14,
						.5,
						.76,
						1
					],
					ease: EASE$1
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				className: "portal-impact relative h-[120vh]",
				initial: {
					width: "2px",
					opacity: 0,
					scaleY: .25
				},
				animate: {
					width: [
						"2px",
						"12px",
						"32vw",
						"130vw",
						"18vw",
						"2px"
					],
					opacity: [
						0,
						1,
						1,
						1,
						0
					],
					scaleY: [
						.25,
						1,
						1,
						1,
						1,
						.25
					]
				},
				transition: {
					duration: 2200 / 1e3,
					times: [
						0,
						.14,
						.36,
						.5,
						.78,
						1
					],
					ease: EASE$1
				},
				style: {
					background: "linear-gradient(90deg, transparent, oklch(0.82 0.16 85 / 0.72) 18%, oklch(0.98 0.01 90) 50%, oklch(0.82 0.16 85 / 0.72) 82%, transparent)",
					boxShadow: "0 0 90px 22px oklch(0.82 0.16 85 / 0.48)",
					filter: "blur(1px)"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				className: "absolute inset-0 bg-foreground",
				initial: { opacity: 0 },
				animate: { opacity: [
					0,
					0,
					.72,
					.08,
					0
				] },
				transition: {
					duration: 2200 / 1e3,
					times: [
						0,
						.42,
						.5,
						.64,
						1
					],
					ease: EASE$1
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				className: "absolute inset-y-0 left-1/2 w-5 -translate-x-1/2 bg-foreground blur-md",
				initial: {
					scaleY: 0,
					opacity: 0
				},
				animate: {
					scaleY: [
						0,
						1,
						1,
						0
					],
					opacity: [
						0,
						1,
						1,
						0
					]
				},
				transition: {
					duration: 2200 / 1e3,
					times: [
						0,
						.3,
						.7,
						1
					],
					ease: EASE$1
				}
			})
		]
	}) });
}
function CaseStudyDeck({ studies }) {
	const [index, setIndex] = (0, import_react.useState)(0);
	const [transitioning, setTransitioning] = (0, import_react.useState)(false);
	const [inView, setInView] = (0, import_react.useState)(false);
	const sectionRef = (0, import_react.useRef)(null);
	const fitAreaRef = (0, import_react.useRef)(null);
	const contentRef = (0, import_react.useRef)(null);
	const indexRef = (0, import_react.useRef)(0);
	const busyRef = (0, import_react.useRef)(false);
	const inViewRef = (0, import_react.useRef)(false);
	const timersRef = (0, import_react.useRef)([]);
	indexRef.current = index;
	inViewRef.current = inView;
	const track = (0, import_react.useCallback)((id) => {
		timersRef.current.push(id);
	}, []);
	(0, import_react.useEffect)(() => () => {
		timersRef.current.forEach(window.clearTimeout);
		timersRef.current = [];
	}, []);
	const go = (0, import_react.useCallback)((dir) => {
		if (busyRef.current) return;
		const next = indexRef.current + dir;
		if (next < 0 || next >= studies.length) return;
		busyRef.current = true;
		playSound("portal");
		setTransitioning(true);
		track(window.setTimeout(() => setIndex(next), PORTAL_SWAP));
		track(window.setTimeout(() => {
			setTransitioning(false);
			busyRef.current = false;
			timersRef.current = [];
		}, PORTAL_TOTAL));
	}, [studies.length, track]);
	const jumpTo = (0, import_react.useCallback)((target) => {
		if (busyRef.current || target === indexRef.current) return;
		if (target < 0 || target >= studies.length) return;
		busyRef.current = true;
		playSound("portal");
		setTransitioning(true);
		track(window.setTimeout(() => setIndex(target), PORTAL_SWAP));
		track(window.setTimeout(() => {
			setTransitioning(false);
			busyRef.current = false;
			timersRef.current = [];
		}, PORTAL_TOTAL));
	}, [studies.length, track]);
	(0, import_react.useEffect)(() => {
		const area = fitAreaRef.current;
		if (area) area.scrollTop = 0;
	}, [index]);
	(0, import_react.useEffect)(() => {
		const el = sectionRef.current;
		if (!el) return;
		const lenis = () => window.__lenis;
		let stopTimer = 0;
		const enter = () => {
			if (inViewRef.current) return;
			setInView(true);
			inViewRef.current = true;
			const l = lenis();
			if (l) {
				l.scrollTo(el, {
					duration: .8,
					lock: true
				});
				window.clearTimeout(stopTimer);
				stopTimer = window.setTimeout(() => l.stop(), 850);
			} else el.scrollIntoView({ behavior: "smooth" });
		};
		const release = () => {
			if (!inViewRef.current || busyRef.current) return;
			window.clearTimeout(stopTimer);
			setInView(false);
			inViewRef.current = false;
			lenis()?.start();
		};
		const onScroll = () => {
			if (inViewRef.current) return;
			const r = el.getBoundingClientRect();
			if (r.top <= window.innerHeight * .45 && r.bottom > window.innerHeight * .5) enter();
		};
		let released = 0;
		const onWheel = (e) => {
			if (!inViewRef.current) return;
			const down = e.deltaY > 0;
			const area = fitAreaRef.current;
			if (needsScrollRef.current && area) {
				const atTop = area.scrollTop <= 0;
				const atBottom = area.scrollTop + area.clientHeight >= area.scrollHeight - 1;
				if (down && !atBottom || !down && !atTop) {
					e.preventDefault();
					e.stopPropagation();
					area.scrollTop += e.deltaY;
					return;
				}
			}
			if ((down && indexRef.current === studies.length - 1 || !down && indexRef.current === 0) && Date.now() - released > 600) {
				released = Date.now();
				release();
			} else {
				e.preventDefault();
				e.stopPropagation();
			}
		};
		let startY = 0;
		const onTouchStart = (e) => {
			startY = e.touches[0]?.clientY ?? 0;
		};
		const onTouchMove = (e) => {
			if (!inViewRef.current) return;
			const y = e.touches[0]?.clientY ?? 0;
			const down = startY - y > 0;
			const area = fitAreaRef.current;
			if (needsScrollRef.current && area) {
				const atTop = area.scrollTop <= 0;
				const atBottom = area.scrollTop + area.clientHeight >= area.scrollHeight - 1;
				if (down && !atBottom || !down && !atTop) return;
			}
			if ((down && indexRef.current === studies.length - 1 || !down && indexRef.current === 0) && Math.abs(startY - y) > 80) release();
			else e.preventDefault();
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("wheel", onWheel, {
			passive: false,
			capture: true
		});
		window.addEventListener("touchstart", onTouchStart, {
			passive: true,
			capture: true
		});
		window.addEventListener("touchmove", onTouchMove, {
			passive: false,
			capture: true
		});
		onScroll();
		return () => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("wheel", onWheel, true);
			window.removeEventListener("touchstart", onTouchStart, true);
			window.removeEventListener("touchmove", onTouchMove, true);
			lenis()?.start();
		};
	}, [studies.length]);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if (!inViewRef.current || busyRef.current) return;
			if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
				e.preventDefault();
				go(1);
			} else if (e.key === "ArrowLeft" || e.key === "PageUp") {
				e.preventDefault();
				go(-1);
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [go]);
	const touch = (0, import_react.useRef)({
		x: 0,
		y: 0
	});
	const onTouchStart = (e) => {
		touch.current = {
			x: e.touches[0]?.clientX ?? 0,
			y: e.touches[0]?.clientY ?? 0
		};
	};
	const onTouchEnd = (e) => {
		if (busyRef.current) return;
		const t = e.changedTouches[0];
		if (!t) return;
		const dx = t.clientX - touch.current.x;
		const dy = t.clientY - touch.current.y;
		if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
	};
	const study = studies[index];
	if (!study) return null;
	const isFirst = index === 0;
	const isLast = index === studies.length - 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		ref: sectionRef,
		id: "case-deck",
		onTouchStart,
		onTouchEnd,
		className: "relative z-10 flex h-screen min-h-[100dvh] w-full flex-col justify-between overflow-hidden px-4 py-4 sm:px-8 sm:py-6 lg:px-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalTransition, { active: transitioning }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-none absolute right-4 top-4 z-40 flex items-center gap-2.5 rounded-full border border-primary/40 bg-card/80 px-3.5 py-1.5 backdrop-blur-sm sm:right-8 sm:top-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "display text-xs tracking-[0.3em] text-primary sm:text-sm",
						children: ["Case Study ", String(index + 1).padStart(2, "0")]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-3.5 w-px bg-border" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "display text-xs tracking-[0.3em] text-muted-foreground sm:text-sm",
						children: String(studies.length).padStart(2, "0")
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				ref: fitAreaRef,
				animate: transitioning ? {
					scale: .985,
					opacity: .25,
					filter: "blur(6px)",
					x: [
						0,
						-3,
						3,
						0
					]
				} : {
					scale: 1,
					opacity: 1,
					filter: "blur(0px)"
				},
				transition: {
					duration: transitioning ? .25 : .5,
					ease: EASE$1
				},
				className: "flex min-h-0 w-full flex-1 justify-center items-start overflow-y-auto overflow-x-hidden case-study-scrollbar px-1 sm:px-3 pt-8 sm:pt-4 pb-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
					mode: "wait",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						ref: contentRef,
						className: "w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CaseStudyPanel, {
							study,
							index
						})
					}, index)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto mt-2 flex w-full max-w-5xl shrink-0 flex-col items-center gap-2 sm:mt-3 sm:gap-2.5 z-30",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px w-full bg-gradient-to-r from-transparent via-primary/70 to-transparent shadow-[var(--glow-gold)]" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex w-full flex-wrap items-center justify-between gap-2.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MagneticButton, {
								variant: "ghost",
								onClick: () => go(-1),
								disabled: isFirst || transitioning,
								ariaLabel: "Previous case study",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden xs:inline",
									children: "Previous"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex max-w-[65vw] sm:max-w-md lg:max-w-xl items-center gap-1 overflow-x-auto py-1 px-1 scrollbar-none",
								children: studies.map((s, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => jumpTo(idx),
									disabled: transitioning,
									title: `${s.code}: ${s.title}`,
									className: `rounded shrink-0 px-2 py-0.5 font-mono text-[0.68rem] transition-all cursor-pointer ${idx === index ? "bg-primary font-bold text-primary-foreground shadow-[0_0_12px_var(--gold)] scale-105" : "border border-border/50 bg-card/60 text-muted-foreground hover:border-primary/50 hover:text-foreground"}`,
									children: s.code || String(idx + 1).padStart(2, "0")
								}, s.code || idx))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MagneticButton, {
								onClick: () => go(1),
								disabled: isLast || transitioning,
								ariaLabel: "Next case study",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "hidden xs:inline",
										children: isLast ? "All Twenty Revealed" : "Next Case Study"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "xs:hidden",
										children: isLast ? "Done" : "Next"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 sm:h-5 sm:w-5" })
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "display text-[0.6rem] tracking-[0.35em] text-muted-foreground sm:text-xs",
						children: isLast ? "Scroll down to continue" : "Use buttons, swipe, arrow keys or problem tags"
					})
				]
			})
		]
	});
}
var EASE = [
	.22,
	1,
	.36,
	1
];
var partners = [
	"HackCulture",
	"Instacks",
	"NICT Computer Education",
	"BeyondEducations",
	"Sri Tulasi Edtech"
];
function Sponsors() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative mt-20 flex w-full max-w-[1500px] flex-col items-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "sponsor-aurora absolute -top-32 left-1/2 h-72 w-[42rem] max-w-[90vw] -translate-x-1/2 rounded-full bg-primary/8 blur-[100px]"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
				initial: {
					opacity: 0,
					y: 12
				},
				whileInView: {
					opacity: 1,
					y: 0
				},
				viewport: {
					once: true,
					amount: .4
				},
				transition: {
					duration: .7,
					ease: EASE
				},
				className: "display text-[0.7rem] tracking-[0.55em] text-primary sm:text-sm",
				children: "Co-Sponsored By"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-5 lg:flex-nowrap lg:gap-x-8",
				children: partners.map((name, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: {
						opacity: 0,
						y: 18,
						scale: .9
					},
					whileInView: {
						opacity: 1,
						y: 0,
						scale: 1
					},
					viewport: {
						once: true,
						amount: .4
					},
					transition: {
						duration: .6,
						delay: .12 + i * .09,
						ease: EASE
					},
					className: "sponsor-card display flex h-14 shrink-0 items-center whitespace-nowrap rounded-md border border-border/70 px-5 text-sm tracking-[0.22em] text-foreground/70 brightness-90 transition duration-300 hover:border-primary/50 hover:text-foreground hover:brightness-125 sm:text-base",
					style: { animationDelay: `${i * -1.2}s` },
					children: name
				}, name))
			})
		]
	});
}
function CustomCursor() {
	const x = useMotionValue(-100);
	const y = useMotionValue(-100);
	const ringX = useSpring(x, {
		stiffness: 240,
		damping: 26,
		mass: .55
	});
	const ringY = useSpring(y, {
		stiffness: 240,
		damping: 26,
		mass: .55
	});
	const [visible, setVisible] = (0, import_react.useState)(false);
	const [interactive, setInteractive] = (0, import_react.useState)(false);
	const [ripples, setRipples] = (0, import_react.useState)([]);
	const rippleId = (0, import_react.useRef)(0);
	(0, import_react.useEffect)(() => {
		if (!window.matchMedia("(pointer: fine)").matches) return;
		const onMove = (event) => {
			x.set(event.clientX);
			y.set(event.clientY);
			setVisible(true);
			const target = event.target;
			setInteractive(target instanceof Element && Boolean(target.closest("button, a, [role='button'], input, select, textarea")));
		};
		const onLeave = () => setVisible(false);
		const onDown = (event) => {
			const id = ++rippleId.current;
			setRipples((current) => [...current, {
				id,
				x: event.clientX,
				y: event.clientY
			}]);
			window.setTimeout(() => {
				setRipples((current) => current.filter((ripple) => ripple.id !== id));
			}, 650);
		};
		window.addEventListener("pointermove", onMove);
		document.documentElement.addEventListener("mouseleave", onLeave);
		window.addEventListener("pointerdown", onDown);
		return () => {
			window.removeEventListener("pointermove", onMove);
			document.documentElement.removeEventListener("mouseleave", onLeave);
			window.removeEventListener("pointerdown", onDown);
		};
	}, [x, y]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"aria-hidden": true,
		className: "custom-cursor-layer",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
				className: "cursor-ring",
				style: {
					x: ringX,
					y: ringY
				},
				animate: {
					opacity: visible ? 1 : 0,
					scale: interactive ? 1.48 : 1
				},
				transition: {
					duration: .28,
					ease: [
						.22,
						1,
						.36,
						1
					]
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
				className: "cursor-dot",
				style: {
					x,
					y
				},
				animate: {
					opacity: visible ? 1 : 0,
					scale: interactive ? 1.25 : 1
				}
			}),
			ripples.map((ripple) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "cursor-ripple",
				style: {
					left: ripple.x,
					top: ripple.y
				}
			}, ripple.id))
		]
	});
}
function SoundToggle() {
	const [muted, setMutedState] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		initSound();
		setMutedState(isMuted());
		const unsub = subscribeMuted(setMutedState);
		const kick = () => {
			unlockAudio();
			if (!isMuted()) startAmbience();
		};
		window.addEventListener("pointerdown", kick, { once: true });
		window.addEventListener("keydown", kick, { once: true });
		window.addEventListener("wheel", kick, {
			once: true,
			passive: true
		});
		window.addEventListener("touchstart", kick, {
			once: true,
			passive: true
		});
		return () => {
			unsub();
			window.removeEventListener("pointerdown", kick);
			window.removeEventListener("keydown", kick);
			window.removeEventListener("wheel", kick);
			window.removeEventListener("touchstart", kick);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-label": muted ? "Unmute sound" : "Mute sound",
		onClick: () => setMuted(!muted),
		className: "fixed bottom-5 right-5 z-[60] inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary/40 bg-card/70 text-primary backdrop-blur-sm transition-colors hover:border-primary hover:bg-primary/10 sm:bottom-8 sm:right-8",
		children: muted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "h-5 w-5" })
	});
}
var caseStudies = [
	{
		id: "case-01",
		code: "J-001",
		language: "Java/Python",
		category: "Cyber Security / Log Analytics",
		title: "Log Security Analyzer & Dynamic Risk Profiler",
		brief: "Organizations generate large volumes of security and application logs. Security teams need to quickly identify abnormal login behavior, repeated failures, privilege misuse, unusual access patterns, and indicators of compromise. This solution should combine rule-based detection with AI/ML techniques where appropriate to convert raw logs into actionable security incidents.",
		problem: "Design and develop a Java/Python application to analyze authentication, application, and system logs, identify suspicious activities and attack patterns, assign a dynamic risk score, and provide recommended security actions.",
		outcome: [
			"Identify suspicious events from log files.",
			"Group related events into security incidents.",
			"Assign dynamic risk levels such as Critical, High, Medium, Low.",
			"Identify the rules/patterns contributing to the alert.",
			"Provide recommended remediation actions.",
			"Generate a human-readable security incident report."
		],
		tools: [
			"Python 3.x or Java 17+",
			"Pandas/NumPy or Java data-processing libraries",
			"Scikit-learn/Isolation Forest or equivalent",
			"FastAPI/Flask or Spring Boot",
			"SQLite/PostgreSQL"
		],
		constraints: [
			"Participants may create their own synthetic logs or use legally accessible public log datasets.",
			"No specialized security hardware is required.",
			"The system must provide evidence for each alert.",
			"No real attacks against live systems are permitted.",
			"The solution should process reasonably large log files efficiently."
		],
		keyFeatures: [
			"Log ingestion and normalization",
			"Anomaly detection",
			"User/entity risk scoring",
			"Incident correlation",
			"AI-assisted recommendations",
			"Security dashboard",
			"Audit and report generation"
		],
		dataInput: "Participants may create their own synthetic data, test cases, sample documents, logs, source code, API traffic, or other inputs. Where external data is useful, participants may use legally accessible sources such as Kaggle, UCI, government/open-data portals, GitHub, public APIs, or other permitted sources.",
		scope: "The expected solution is a working end-to-end MVP that can be implemented and demonstrated within 1–2 days. Teams are not expected to build a production-grade enterprise system. Advanced features and integrations are optional.",
		context: "Organizations generate large volumes of security and application logs. Security teams need to quickly identify abnormal login behavior, repeated failures, privilege misuse, unusual access patterns, and indicators of compromise. This solution should combine rule-based detection with AI/ML techniques where appropriate to convert raw logs into actionable security incidents.",
		requirements: [
			"Participants may create their own synthetic logs or use legally accessible public log datasets.",
			"No specialized security hardware is required.",
			"The system must provide evidence for each alert.",
			"No real attacks against live systems are permitted.",
			"The solution should process reasonably large log files efficiently."
		],
		impact: [
			"Identify suspicious events from log files.",
			"Group related events into security incidents.",
			"Assign dynamic risk levels such as Critical, High, Medium, Low.",
			"Identify the rules/patterns contributing to the alert.",
			"Provide recommended remediation actions.",
			"Generate a human-readable security incident report."
		],
		technical: [
			"Python 3.x or Java 17+",
			"Pandas/NumPy or Java data-processing libraries",
			"Scikit-learn/Isolation Forest or equivalent",
			"FastAPI/Flask or Spring Boot",
			"SQLite/PostgreSQL"
		]
	},
	{
		id: "case-02",
		code: "JP-002",
		language: "Java/Python",
		category: "Document Management / Text Similarity",
		title: "Content-Based Duplicate Document Detector & Categorizer",
		brief: "The aim is to build an intelligent document-management solution that reduces redundant files and improves enterprise document organization. The application should use content hashing, text similarity, embeddings, or AI-based semantic comparison to identify documents that are identical or substantially similar.",
		problem: "Design and develop a Java/Python application to identify duplicate and near-duplicate documents based on content rather than filename, file type, or timestamp, and automatically organize documents into predefined categories.",
		outcome: [
			"Identify exact duplicate documents.",
			"Identify near-duplicate documents with changed filenames or minor content changes.",
			"Categorize documents according to configurable rules.",
			"Display similarity scores and reasons.",
			"Allow users to review duplicates before removal.",
			"Generate an organized document inventory."
		],
		tools: [
			"Java 17+ or Python 3.x",
			"Apache Tika/PDF libraries or Python document libraries",
			"SHA-256/MD5 hashing",
			"TF-IDF/embeddings or optional AI model",
			"SQLite/PostgreSQL"
		],
		constraints: [
			"Participants may create their own sample documents; no external dataset is mandatory.",
			"Duplicate identification must be based primarily on content.",
			"Users must be able to review duplicates before deletion.",
			"The solution should support multiple common document formats.",
			"The application should handle different file sizes efficiently."
		],
		keyFeatures: [
			"Content-based duplicate detection",
			"Semantic similarity",
			"Rule-based categorization",
			"Duplicate review",
			"Document inventory",
			"Configuration management",
			"Logging and reporting"
		],
		dataInput: "Participants may create their own synthetic data, test cases, sample documents, logs, source code, API traffic, or other inputs. Where external data is useful, participants may use legally accessible sources such as Kaggle, UCI, government/open-data portals, GitHub, public APIs, or other permitted sources.",
		scope: "The expected solution is a working end-to-end MVP that can be implemented and demonstrated within 1–2 days. Teams are not expected to build a production-grade enterprise system. Advanced features and integrations are optional.",
		context: "The aim is to build an intelligent document-management solution that reduces redundant files and improves enterprise document organization. The application should use content hashing, text similarity, embeddings, or AI-based semantic comparison to identify documents that are identical or substantially similar.",
		requirements: [
			"Participants may create their own sample documents; no external dataset is mandatory.",
			"Duplicate identification must be based primarily on content.",
			"Users must be able to review duplicates before deletion.",
			"The solution should support multiple common document formats.",
			"The application should handle different file sizes efficiently."
		],
		impact: [
			"Identify exact duplicate documents.",
			"Identify near-duplicate documents with changed filenames or minor content changes.",
			"Categorize documents according to configurable rules.",
			"Display similarity scores and reasons.",
			"Allow users to review duplicates before removal.",
			"Generate an organized document inventory."
		],
		technical: [
			"Java 17+ or Python 3.x",
			"Apache Tika/PDF libraries or Python document libraries",
			"SHA-256/MD5 hashing",
			"TF-IDF/embeddings or optional AI model",
			"SQLite/PostgreSQL"
		]
	},
	{
		id: "case-03",
		code: "JP-003",
		language: "Java/Python with AI/ML",
		category: "Application Security / Code Quality",
		title: "Intelligent Source Code Security & Quality Review Assistant",
		brief: "Modern organizations increasingly use open-source and AI-assisted software development. Detecting security and quality problems before code reaches production is important. This solution should act as an intelligent code-review assistant for Java/Python source code and explain why a detected issue is important.",
		problem: "Design and develop a Java/Python application to analyze source code and identify potential security vulnerabilities, coding issues, inefficient code patterns, and maintainability problems, and provide actionable recommendations for fixing the detected issues.",
		outcome: [
			"Identify common security vulnerabilities in source code.",
			"Detect coding and maintainability issues.",
			"Assign severity levels such as Critical, High, Medium, Low.",
			"Explain the reason and location of each finding.",
			"Recommend remediation or corrected code.",
			"Generate a developer-friendly analysis report."
		],
		tools: [
			"Java or Python",
			"AST/source-code parsing libraries",
			"Static-analysis libraries",
			"Optional LLM/GenAI API",
			"FastAPI/Flask or Spring Boot"
		],
		constraints: [
			"No external dataset is required; participants can create their own vulnerable and safe source-code samples.",
			"The system must analyze source code rather than filenames or metadata.",
			"AI-generated recommendations must be reviewable.",
			"The solution should support multiple vulnerability categories.",
			"The demonstration should include before/after examples."
		],
		keyFeatures: [
			"Source-code parser",
			"Security vulnerability detection",
			"Code-quality analysis",
			"Severity/risk scoring",
			"AI-assisted explanation",
			"Fix recommendation",
			"Before/after report"
		],
		dataInput: "Participants may create their own synthetic data, test cases, sample documents, logs, source code, API traffic, or other inputs. Where external data is useful, participants may use legally accessible sources such as Kaggle, UCI, government/open-data portals, GitHub, public APIs, or other permitted sources.",
		scope: "The expected solution is a working end-to-end MVP that can be implemented and demonstrated within 1–2 days. Teams are not expected to build a production-grade enterprise system. Advanced features and integrations are optional.",
		context: "Modern organizations increasingly use open-source and AI-assisted software development. Detecting security and quality problems before code reaches production is important. This solution should act as an intelligent code-review assistant for Java/Python source code and explain why a detected issue is important.",
		requirements: [
			"No external dataset is required; participants can create their own vulnerable and safe source-code samples.",
			"The system must analyze source code rather than filenames or metadata.",
			"AI-generated recommendations must be reviewable.",
			"The solution should support multiple vulnerability categories.",
			"The demonstration should include before/after examples."
		],
		impact: [
			"Identify common security vulnerabilities in source code.",
			"Detect coding and maintainability issues.",
			"Assign severity levels such as Critical, High, Medium, Low.",
			"Explain the reason and location of each finding.",
			"Recommend remediation or corrected code.",
			"Generate a developer-friendly analysis report."
		],
		technical: [
			"Java or Python",
			"AST/source-code parsing libraries",
			"Static-analysis libraries",
			"Optional LLM/GenAI API",
			"FastAPI/Flask or Spring Boot"
		]
	},
	{
		id: "case-04",
		code: "JP-004",
		language: "Java/Python",
		category: "API Gateway / Traffic Management",
		title: "API Gateway Traffic Monitor, Rate Limiter & Anomaly Detector",
		brief: "Enterprise APIs must remain available while preventing excessive or abnormal usage. The solution should simulate an API protection layer capable of identifying traffic spikes, repeated failures, and suspicious consumer behavior while maintaining fair access for legitimate clients.",
		problem: "Design and develop a Java/Python API gateway or middleware layer that monitors API requests, applies configurable rate limits, detects abnormal client behavior, and provides API health analytics.",
		outcome: [
			"Track requests by client, endpoint, status, and time.",
			"Apply configurable rate limits.",
			"Detect abnormal request patterns.",
			"Throttle or reject requests according to policy.",
			"Display latency, error, and traffic trends.",
			"Maintain an audit log of decisions."
		],
		tools: [
			"Java/Spring Boot or Python/FastAPI/Flask",
			"Redis optional",
			"SQLite/PostgreSQL",
			"Pandas/Scikit-learn optional",
			"Docker optional"
		],
		constraints: [
			"No real attack traffic is required.",
			"Participants can create their own APIs and synthetic traffic.",
			"Rate limits must be configurable without source-code changes.",
			"Concurrent request simulation should be demonstrated.",
			"Testing must only target systems owned or authorized by the team."
		],
		keyFeatures: [
			"Rate limiting",
			"Traffic anomaly detection",
			"Client profiling",
			"Endpoint monitoring",
			"Policy configuration",
			"Audit logging",
			"API health dashboard"
		],
		dataInput: "Participants may create their own synthetic data, test cases, sample documents, logs, source code, API traffic, or other inputs. Where external data is useful, participants may use legally accessible sources such as Kaggle, UCI, government/open-data portals, GitHub, public APIs, or other permitted sources.",
		scope: "The expected solution is a working end-to-end MVP that can be implemented and demonstrated within 1–2 days. Teams are not expected to build a production-grade enterprise system. Advanced features and integrations are optional.",
		context: "Enterprise APIs must remain available while preventing excessive or abnormal usage. The solution should simulate an API protection layer capable of identifying traffic spikes, repeated failures, and suspicious consumer behavior while maintaining fair access for legitimate clients.",
		requirements: [
			"No real attack traffic is required.",
			"Participants can create their own APIs and synthetic traffic.",
			"Rate limits must be configurable without source-code changes.",
			"Concurrent request simulation should be demonstrated.",
			"Testing must only target systems owned or authorized by the team."
		],
		impact: [
			"Track requests by client, endpoint, status, and time.",
			"Apply configurable rate limits.",
			"Detect abnormal request patterns.",
			"Throttle or reject requests according to policy.",
			"Display latency, error, and traffic trends.",
			"Maintain an audit log of decisions."
		],
		technical: [
			"Java/Spring Boot or Python/FastAPI/Flask",
			"Redis optional",
			"SQLite/PostgreSQL",
			"Pandas/Scikit-learn optional",
			"Docker optional"
		]
	},
	{
		id: "case-05",
		code: "P-005",
		language: "Python with AI/ML",
		category: "Customer Support / NLP Ticketing",
		title: "Customer Complaint NLP Classifier & SLA Ticket Router",
		brief: "Customer-support teams need to route complaints quickly and prevent important cases from remaining unresolved. The solution should provide an intelligent ticketing workflow that combines natural-language understanding with configurable business rules and workload information.",
		problem: "Design and develop a Python application to accept customer complaints, understand their content using NLP/AI, automatically create tickets, assign severity and category, recommend the responsible team, and predict possible SLA breaches.",
		outcome: [
			"Create tickets from natural-language complaints.",
			"Automatically categorize complaints.",
			"Assign severity: Critical, High, Medium, Low.",
			"Recommend a team or agent based on category and workload.",
			"Predict SLA-breach risk.",
			"Provide ticket tracking and escalation."
		],
		tools: [
			"Python",
			"Pandas/Scikit-learn",
			"NLP/Transformers or optional LLM API",
			"FastAPI/Flask",
			"SQLite/PostgreSQL"
		],
		constraints: [
			"Participants may create synthetic complaints or use legally accessible public data.",
			"AI decisions must be reviewable and overridable.",
			"PII must not be exposed in the demonstration.",
			"SLA rules must be configurable.",
			"The system should explain priority and escalation decisions."
		],
		keyFeatures: [
			"NLP classification",
			"AI ticket generation",
			"Severity scoring",
			"Team assignment",
			"SLA prediction",
			"Escalation workflow",
			"Admin analytics dashboard"
		],
		dataInput: "Participants may create their own synthetic data, test cases, sample documents, logs, source code, API traffic, or other inputs. Where external data is useful, participants may use legally accessible sources such as Kaggle, UCI, government/open-data portals, GitHub, public APIs, or other permitted sources.",
		scope: "The expected solution is a working end-to-end MVP that can be implemented and demonstrated within 1–2 days. Teams are not expected to build a production-grade enterprise system. Advanced features and integrations are optional.",
		context: "Customer-support teams need to route complaints quickly and prevent important cases from remaining unresolved. The solution should provide an intelligent ticketing workflow that combines natural-language understanding with configurable business rules and workload information.",
		requirements: [
			"Participants may create synthetic complaints or use legally accessible public data.",
			"AI decisions must be reviewable and overridable.",
			"PII must not be exposed in the demonstration.",
			"SLA rules must be configurable.",
			"The system should explain priority and escalation decisions."
		],
		impact: [
			"Create tickets from natural-language complaints.",
			"Automatically categorize complaints.",
			"Assign severity: Critical, High, Medium, Low.",
			"Recommend a team or agent based on category and workload.",
			"Predict SLA-breach risk.",
			"Provide ticket tracking and escalation."
		],
		technical: [
			"Python",
			"Pandas/Scikit-learn",
			"NLP/Transformers or optional LLM API",
			"FastAPI/Flask",
			"SQLite/PostgreSQL"
		]
	},
	{
		id: "case-06",
		code: "P-006",
		language: "Java/Python",
		category: "Data Privacy / Information Security",
		title: "Sensitive Information Discovery, Classification & Masking",
		brief: "Organizations need to identify where sensitive information exists before applying security and privacy controls. The solution should combine configurable detection rules with contextual analysis or AI where appropriate.",
		problem: "Design and develop a Java/Python application to scan documents, CSV files, JSON files, logs, or database extracts and identify sensitive information, classify the data type, assign a risk level, and recommend masking or protection actions.",
		outcome: [
			"Detect configured PII/sensitive data types such as email, phone, identity-like values, financial identifiers, and addresses.",
			"Classify detected data.",
			"Assign risk levels.",
			"Mask sensitive values in displayed output.",
			"Generate a scan report.",
			"Allow administrators to configure detection rules."
		],
		tools: [
			"Python or Java",
			"Regex/NLP libraries",
			"Pandas/OpenCSV",
			"FastAPI/Flask or Spring Boot",
			"SQLite/PostgreSQL"
		],
		constraints: [
			"Use only public, synthetic, or self-created data.",
			"Complete sensitive values must not be exposed in the UI/report.",
			"Detection rules must be configurable.",
			"False positives should be reviewable.",
			"No confidential enterprise database access is required."
		],
		keyFeatures: [
			"PII discovery",
			"Context-aware classification",
			"Risk scoring",
			"Data masking",
			"Rule management",
			"Scan history",
			"Compliance-style report"
		],
		dataInput: "Participants may create their own synthetic data, test cases, sample documents, logs, source code, API traffic, or other inputs. Where external data is useful, participants may use legally accessible sources such as Kaggle, UCI, government/open-data portals, GitHub, public APIs, or other permitted sources.",
		scope: "The expected solution is a working end-to-end MVP that can be implemented and demonstrated within 1–2 days. Teams are not expected to build a production-grade enterprise system. Advanced features and integrations are optional.",
		context: "Organizations need to identify where sensitive information exists before applying security and privacy controls. The solution should combine configurable detection rules with contextual analysis or AI where appropriate.",
		requirements: [
			"Use only public, synthetic, or self-created data.",
			"Complete sensitive values must not be exposed in the UI/report.",
			"Detection rules must be configurable.",
			"False positives should be reviewable.",
			"No confidential enterprise database access is required."
		],
		impact: [
			"Detect configured PII/sensitive data types such as email, phone, identity-like values, financial identifiers, and addresses.",
			"Classify detected data.",
			"Assign risk levels.",
			"Mask sensitive values in displayed output.",
			"Generate a scan report.",
			"Allow administrators to configure detection rules."
		],
		technical: [
			"Python or Java",
			"Regex/NLP libraries",
			"Pandas/OpenCSV",
			"FastAPI/Flask or Spring Boot",
			"SQLite/PostgreSQL"
		]
	},
	{
		id: "case-07",
		code: "P-007",
		language: "Python with AI/ML",
		category: "Email Security / Phishing Detection",
		title: "Email Phishing Detection & Explainable Risk Scoring",
		brief: "Phishing remains a major enterprise security challenge. The solution should help security teams prioritize potentially malicious messages by combining rule-based indicators, natural-language analysis, URL characteristics, and AI/ML classification.",
		problem: "Design and develop a Python application that analyzes email text, headers, URLs, sender characteristics, and attachment metadata to identify suspicious messages and generate an explainable phishing risk score.",
		outcome: [
			"Classify emails as Safe, Suspicious, or High Risk.",
			"Calculate a risk score.",
			"Identify suspicious URLs and sender characteristics.",
			"Highlight important message indicators.",
			"Provide an analyst review screen.",
			"Generate an investigation summary."
		],
		tools: [
			"Python",
			"Pandas/Scikit-learn",
			"NLP libraries",
			"URL parsing libraries",
			"FastAPI/Flask/Streamlit"
		],
		constraints: [
			"Use only synthetic or legally accessible email samples.",
			"Do not open or execute suspicious attachments.",
			"Do not interact with malicious live websites.",
			"The model must provide explainable indicators.",
			"Evaluate performance using suitable metrics."
		],
		keyFeatures: [
			"Email parsing",
			"NLP classification",
			"URL analysis",
			"Risk scoring",
			"Explainable AI",
			"Analyst review",
			"Security report"
		],
		dataInput: "Participants may create their own synthetic data, test cases, sample documents, logs, source code, API traffic, or other inputs. Where external data is useful, participants may use legally accessible sources such as Kaggle, UCI, government/open-data portals, GitHub, public APIs, or other permitted sources.",
		scope: "The expected solution is a working end-to-end MVP that can be implemented and demonstrated within 1–2 days. Teams are not expected to build a production-grade enterprise system. Advanced features and integrations are optional.",
		context: "Phishing remains a major enterprise security challenge. The solution should help security teams prioritize potentially malicious messages by combining rule-based indicators, natural-language analysis, URL characteristics, and AI/ML classification.",
		requirements: [
			"Use only synthetic or legally accessible email samples.",
			"Do not open or execute suspicious attachments.",
			"Do not interact with malicious live websites.",
			"The model must provide explainable indicators.",
			"Evaluate performance using suitable metrics."
		],
		impact: [
			"Classify emails as Safe, Suspicious, or High Risk.",
			"Calculate a risk score.",
			"Identify suspicious URLs and sender characteristics.",
			"Highlight important message indicators.",
			"Provide an analyst review screen.",
			"Generate an investigation summary."
		],
		technical: [
			"Python",
			"Pandas/Scikit-learn",
			"NLP libraries",
			"URL parsing libraries",
			"FastAPI/Flask/Streamlit"
		]
	},
	{
		id: "case-08",
		code: "JP-008",
		language: "Java/Python with AI/ML",
		category: "Retail & Supply Chain / Inventory Analytics",
		title: "Demand Forecasting & Inventory Replenishment Assistant",
		brief: "Retail, distribution, and manufacturing organizations must maintain product availability while controlling inventory costs. The solution should provide a practical demand and replenishment assistant using forecasting, business rules, or AI/ML.",
		problem: "Design and develop a Java/Python application that analyzes historical sales, inventory levels, supplier lead times, and demand patterns to forecast near-term demand and recommend replenishment actions.",
		outcome: [
			"Forecast short-term product demand.",
			"Identify stockout and overstock risks.",
			"Calculate reorder points.",
			"Recommend reorder quantities.",
			"Consider supplier lead time where available.",
			"Provide SKU-level explanations and analytics."
		],
		tools: [
			"Python or Java",
			"Pandas/NumPy",
			"Scikit-learn/XGBoost or time-series libraries",
			"FastAPI/Flask or Spring Boot",
			"SQLite/PostgreSQL"
		],
		constraints: [
			"Participants may create synthetic sales records or use a simple public dataset.",
			"Forecasting scope should be limited to a manageable time horizon.",
			"Missing or irregular records must be handled.",
			"Recommendations must be explainable.",
			"No live ERP integration is required."
		],
		keyFeatures: [
			"Demand forecasting",
			"Safety-stock calculation",
			"Reorder recommendations",
			"Stockout alerts",
			"Lead-time analysis",
			"SKU dashboard",
			"Inventory report"
		],
		dataInput: "Participants may create their own synthetic data, test cases, sample documents, logs, source code, API traffic, or other inputs. Where external data is useful, participants may use legally accessible sources such as Kaggle, UCI, government/open-data portals, GitHub, public APIs, or other permitted sources.",
		scope: "The expected solution is a working end-to-end MVP that can be implemented and demonstrated within 1–2 days. Teams are not expected to build a production-grade enterprise system. Advanced features and integrations are optional.",
		context: "Retail, distribution, and manufacturing organizations must maintain product availability while controlling inventory costs. The solution should provide a practical demand and replenishment assistant using forecasting, business rules, or AI/ML.",
		requirements: [
			"Participants may create synthetic sales records or use a simple public dataset.",
			"Forecasting scope should be limited to a manageable time horizon.",
			"Missing or irregular records must be handled.",
			"Recommendations must be explainable.",
			"No live ERP integration is required."
		],
		impact: [
			"Forecast short-term product demand.",
			"Identify stockout and overstock risks.",
			"Calculate reorder points.",
			"Recommend reorder quantities.",
			"Consider supplier lead time where available.",
			"Provide SKU-level explanations and analytics."
		],
		technical: [
			"Python or Java",
			"Pandas/NumPy",
			"Scikit-learn/XGBoost or time-series libraries",
			"FastAPI/Flask or Spring Boot",
			"SQLite/PostgreSQL"
		]
	},
	{
		id: "case-09",
		code: "JP-009",
		language: "Java/Python",
		category: "Software Testing / API Automation",
		title: "Automated REST API Testing & Anomaly Diagnosis Tool",
		brief: "APIs are critical components of modern enterprise applications. Manual API testing becomes difficult as the number of endpoints increases. The solution should automate common functional checks and convert test results into actionable developer feedback.",
		problem: "Design and develop a Java/Python application that automatically tests REST APIs, identifies incorrect responses, missing validations, inconsistent behavior, and basic performance issues, and provides AI-assisted recommendations.",
		outcome: [
			"Execute configurable API test cases.",
			"Validate HTTP status codes and response structures.",
			"Detect abnormal or inconsistent responses.",
			"Measure response time and basic performance indicators.",
			"Identify recurring failure patterns.",
			"Generate recommendations for developers."
		],
		tools: [
			"Java/Spring Boot or Python/FastAPI/Flask",
			"REST/HTTP libraries",
			"JSON/XML parsers",
			"Optional OpenAPI/Postman collection support",
			"Optional AI/LLM API",
			"SQLite/PostgreSQL"
		],
		constraints: [
			"No external dataset is required; teams can create their own sample REST API.",
			"Testing must only target APIs owned or authorized by the team.",
			"AI recommendations must be based on actual test results.",
			"Test cases should be configurable.",
			"The demonstration should include both passing and failing APIs."
		],
		keyFeatures: [
			"API endpoint management",
			"Automated test execution",
			"Response validation",
			"Failure classification",
			"Performance measurement",
			"AI-assisted diagnosis",
			"Test-result dashboard"
		],
		dataInput: "Participants may create their own synthetic data, test cases, sample documents, logs, source code, API traffic, or other inputs. Where external data is useful, participants may use legally accessible sources such as Kaggle, UCI, government/open-data portals, GitHub, public APIs, or other permitted sources.",
		scope: "The expected solution is a working end-to-end MVP that can be implemented and demonstrated within 1–2 days. Teams are not expected to build a production-grade enterprise system. Advanced features and integrations are optional.",
		context: "APIs are critical components of modern enterprise applications. Manual API testing becomes difficult as the number of endpoints increases. The solution should automate common functional checks and convert test results into actionable developer feedback.",
		requirements: [
			"No external dataset is required; teams can create their own sample REST API.",
			"Testing must only target APIs owned or authorized by the team.",
			"AI recommendations must be based on actual test results.",
			"Test cases should be configurable.",
			"The demonstration should include both passing and failing APIs."
		],
		impact: [
			"Execute configurable API test cases.",
			"Validate HTTP status codes and response structures.",
			"Detect abnormal or inconsistent responses.",
			"Measure response time and basic performance indicators.",
			"Identify recurring failure patterns.",
			"Generate recommendations for developers."
		],
		technical: [
			"Java/Spring Boot or Python/FastAPI/Flask",
			"REST/HTTP libraries",
			"JSON/XML parsers",
			"Optional OpenAPI/Postman collection support",
			"Optional AI/LLM API",
			"SQLite/PostgreSQL"
		]
	},
	{
		id: "case-10",
		code: "JP-010",
		language: "Java/Python with AI/ML",
		category: "Cloud FinOps / Cost Optimization",
		title: "Cloud Usage & Billing Cost Anomaly Detector & Optimization Advisor",
		brief: "Cloud environments can contain idle resources, over-provisioned compute, excessive storage, or unexpected usage spikes. Organizations need a practical way to detect cost anomalies and prioritize optimization opportunities.",
		problem: "Design and develop a Java/Python application to analyze cloud billing and usage information, identify unusual cost increases, determine major cost drivers, and recommend practical optimization actions.",
		outcome: [
			"Detect unusual cost patterns.",
			"Identify services/resources driving cost increases.",
			"Forecast near-term spending.",
			"Compare spending with configurable budgets.",
			"Recommend actions such as rightsizing or idle-resource review.",
			"Generate a cost-optimization report."
		],
		tools: [
			"Python or Java",
			"Pandas/NumPy",
			"Scikit-learn optional",
			"FastAPI/Flask or Spring Boot",
			"SQLite/PostgreSQL"
		],
		constraints: [
			"No real cloud account is required.",
			"Participants may generate their own CSV/JSON usage and billing data.",
			"Recommendations must be supported by measurable evidence.",
			"Do not automatically delete or terminate real resources.",
			"Support configurable budgets and thresholds."
		],
		keyFeatures: [
			"Cost anomaly detection",
			"Budget monitoring",
			"Cost-driver analysis",
			"Forecasting",
			"Optimization recommendations",
			"Service dashboard",
			"Savings opportunity report"
		],
		dataInput: "Participants may create their own synthetic data, test cases, sample documents, logs, source code, API traffic, or other inputs. Where external data is useful, participants may use legally accessible sources such as Kaggle, UCI, government/open-data portals, GitHub, public APIs, or other permitted sources.",
		scope: "The expected solution is a working end-to-end MVP that can be implemented and demonstrated within 1–2 days. Teams are not expected to build a production-grade enterprise system. Advanced features and integrations are optional.",
		context: "Cloud environments can contain idle resources, over-provisioned compute, excessive storage, or unexpected usage spikes. Organizations need a practical way to detect cost anomalies and prioritize optimization opportunities.",
		requirements: [
			"No real cloud account is required.",
			"Participants may generate their own CSV/JSON usage and billing data.",
			"Recommendations must be supported by measurable evidence.",
			"Do not automatically delete or terminate real resources.",
			"Support configurable budgets and thresholds."
		],
		impact: [
			"Detect unusual cost patterns.",
			"Identify services/resources driving cost increases.",
			"Forecast near-term spending.",
			"Compare spending with configurable budgets.",
			"Recommend actions such as rightsizing or idle-resource review.",
			"Generate a cost-optimization report."
		],
		technical: [
			"Python or Java",
			"Pandas/NumPy",
			"Scikit-learn optional",
			"FastAPI/Flask or Spring Boot",
			"SQLite/PostgreSQL"
		]
	},
	{
		id: "case-11",
		code: "JP-011",
		language: "Java/Python with AI/ML",
		category: "HR Tech / Workforce Development",
		title: "Employee Skill Gap Analyzer & Learning Path Recommender",
		brief: "Organizations need to continuously reskill employees as technologies and business requirements change. The proposed solution should help HR/L&D teams identify skill gaps and recommend relevant training without requiring proprietary enterprise data.",
		problem: "Design and develop a Java/Python application that analyzes employee skills, job-role requirements, project requirements, and learning resources to identify skill gaps and recommend personalized learning paths.",
		outcome: [
			"Create employee skill profiles.",
			"Map skills against selected job roles.",
			"Identify missing or weak skills.",
			"Recommend learning resources or learning paths.",
			"Provide role-readiness scores.",
			"Generate individual and organizational skill-gap reports."
		],
		tools: [
			"Python or Java",
			"Pandas/Scikit-learn optional",
			"NLP/embeddings optional",
			"FastAPI/Flask or Spring Boot",
			"SQLite/PostgreSQL"
		],
		constraints: [
			"Participants can create synthetic employee/skill data; no sensitive employee data should be used.",
			"Skill and role taxonomies must be configurable.",
			"Recommendations must show the reason for the recommendation.",
			"No external HR system integration is required.",
			"The solution should work with a manageable number of roles and skills."
		],
		keyFeatures: [
			"Skill extraction",
			"Skill-gap analysis",
			"Role matching",
			"Recommendation engine",
			"Readiness scoring",
			"Learning-path generation",
			"HR dashboard"
		],
		dataInput: "Participants may create their own synthetic data, test cases, sample documents, logs, source code, API traffic, or other inputs. Where external data is useful, participants may use legally accessible sources such as Kaggle, UCI, government/open-data portals, GitHub, public APIs, or other permitted sources.",
		scope: "The expected solution is a working end-to-end MVP that can be implemented and demonstrated within 1–2 days. Teams are not expected to build a production-grade enterprise system. Advanced features and integrations are optional.",
		context: "Organizations need to continuously reskill employees as technologies and business requirements change. The proposed solution should help HR/L&D teams identify skill gaps and recommend relevant training without requiring proprietary enterprise data.",
		requirements: [
			"Participants can create synthetic employee/skill data; no sensitive employee data should be used.",
			"Skill and role taxonomies must be configurable.",
			"Recommendations must show the reason for the recommendation.",
			"No external HR system integration is required.",
			"The solution should work with a manageable number of roles and skills."
		],
		impact: [
			"Create employee skill profiles.",
			"Map skills against selected job roles.",
			"Identify missing or weak skills.",
			"Recommend learning resources or learning paths.",
			"Provide role-readiness scores.",
			"Generate individual and organizational skill-gap reports."
		],
		technical: [
			"Python or Java",
			"Pandas/Scikit-learn optional",
			"NLP/embeddings optional",
			"FastAPI/Flask or Spring Boot",
			"SQLite/PostgreSQL"
		]
	},
	{
		id: "case-12",
		code: "JP-012",
		language: "Java/Python",
		category: "Operations Research / Queue Management",
		title: "Customer Arrival Queue Simulation & Resource Allocation Optimizer",
		brief: "The system can support banks, government service centers, university offices, hospitals, or enterprise support centers. The solution should simulate multiple queues and recommend operational decisions during normal and peak periods.",
		problem: "Design and develop a Java/Python application that analyzes customer arrival patterns, appointment schedules, service times, and available resources to reduce waiting time and recommend optimal staff/resource allocation.",
		outcome: [
			"Manage multiple service queues.",
			"Estimate waiting time.",
			"Predict demand by time slot.",
			"Recommend staff/resource allocation.",
			"Identify overloaded periods.",
			"Compare the proposed approach with a basic allocation strategy."
		],
		tools: [
			"Java/Spring Boot or Python/FastAPI",
			"Pandas/NumPy",
			"Optional ML libraries",
			"SQLite/PostgreSQL",
			"Optional simulation libraries"
		],
		constraints: [
			"No physical queue hardware is required.",
			"Participants may generate their own arrival and service-time data.",
			"Resource limits must be respected.",
			"The solution should demonstrate peak-load scenarios.",
			"Recommendation logic must be explainable."
		],
		keyFeatures: [
			"Queue management",
			"Demand prediction",
			"Wait-time estimation",
			"Resource optimization",
			"Peak-load alerts",
			"Simulation",
			"Operations dashboard"
		],
		dataInput: "Participants may create their own synthetic data, test cases, sample documents, logs, source code, API traffic, or other inputs. Where external data is useful, participants may use legally accessible sources such as Kaggle, UCI, government/open-data portals, GitHub, public APIs, or other permitted sources.",
		scope: "The expected solution is a working end-to-end MVP that can be implemented and demonstrated within 1–2 days. Teams are not expected to build a production-grade enterprise system. Advanced features and integrations are optional.",
		context: "The system can support banks, government service centers, university offices, hospitals, or enterprise support centers. The solution should simulate multiple queues and recommend operational decisions during normal and peak periods.",
		requirements: [
			"No physical queue hardware is required.",
			"Participants may generate their own arrival and service-time data.",
			"Resource limits must be respected.",
			"The solution should demonstrate peak-load scenarios.",
			"Recommendation logic must be explainable."
		],
		impact: [
			"Manage multiple service queues.",
			"Estimate waiting time.",
			"Predict demand by time slot.",
			"Recommend staff/resource allocation.",
			"Identify overloaded periods.",
			"Compare the proposed approach with a basic allocation strategy."
		],
		technical: [
			"Java/Spring Boot or Python/FastAPI",
			"Pandas/NumPy",
			"Optional ML libraries",
			"SQLite/PostgreSQL",
			"Optional simulation libraries"
		]
	},
	{
		id: "case-13",
		code: "JP-013",
		language: "Python with AI/ML",
		category: "Procurement / Vendor Risk Analytics",
		title: "Supplier Performance Analytics & Late-Delivery Risk Predictor",
		brief: "Procurement teams need early visibility into suppliers or orders that may cause delays. The solution should combine historical supplier performance with AI/ML or rule-based analysis to support proactive procurement decisions.",
		problem: "Design and develop a Python application that analyzes supplier history, order quantities, delivery times, quality records, and lead times to predict late-delivery risk and generate supplier risk scores.",
		outcome: [
			"Generate supplier risk scores.",
			"Predict late-delivery probability.",
			"Rank suppliers/orders requiring attention.",
			"Identify important risk factors.",
			"Provide supplier performance trends.",
			"Generate procurement recommendations."
		],
		tools: [
			"Python",
			"Pandas/Scikit-learn",
			"XGBoost optional",
			"FastAPI/Flask",
			"SQLite/PostgreSQL"
		],
		constraints: [
			"Participants may generate synthetic procurement data or use a simple public dataset.",
			"Predictions must be explainable.",
			"The system must not automatically blacklist suppliers.",
			"Missing supplier history must be handled.",
			"Use suitable evaluation metrics where labeled outcomes exist."
		],
		keyFeatures: [
			"Supplier scorecard",
			"Delay prediction",
			"Risk scoring",
			"Factor explanation",
			"Order-level alerts",
			"Trend analytics",
			"Procurement report"
		],
		dataInput: "Participants may create their own synthetic data, test cases, sample documents, logs, source code, API traffic, or other inputs. Where external data is useful, participants may use legally accessible sources such as Kaggle, UCI, government/open-data portals, GitHub, public APIs, or other permitted sources.",
		scope: "The expected solution is a working end-to-end MVP that can be implemented and demonstrated within 1–2 days. Teams are not expected to build a production-grade enterprise system. Advanced features and integrations are optional.",
		context: "Procurement teams need early visibility into suppliers or orders that may cause delays. The solution should combine historical supplier performance with AI/ML or rule-based analysis to support proactive procurement decisions.",
		requirements: [
			"Participants may generate synthetic procurement data or use a simple public dataset.",
			"Predictions must be explainable.",
			"The system must not automatically blacklist suppliers.",
			"Missing supplier history must be handled.",
			"Use suitable evaluation metrics where labeled outcomes exist."
		],
		impact: [
			"Generate supplier risk scores.",
			"Predict late-delivery probability.",
			"Rank suppliers/orders requiring attention.",
			"Identify important risk factors.",
			"Provide supplier performance trends.",
			"Generate procurement recommendations."
		],
		technical: [
			"Python",
			"Pandas/Scikit-learn",
			"XGBoost optional",
			"FastAPI/Flask",
			"SQLite/PostgreSQL"
		]
	},
	{
		id: "case-14",
		code: "JP-014",
		language: "Java/Python",
		category: "Systems Architecture / Incident Response",
		title: "Service Dependency Graph & Failure Blast-Radius Analyzer",
		brief: "Enterprise applications often depend on multiple APIs, databases, services, and external components. During an incident, teams need to quickly understand the blast radius and prioritize critical services.",
		problem: "Design and develop a Java/Python application that creates a dependency graph from service/application configuration information and determines the potential impact when a service or component becomes unavailable.",
		outcome: [
			"Build a dependency graph.",
			"Display upstream and downstream dependencies.",
			"Simulate component failures.",
			"Calculate potential blast radius.",
			"Identify critical/high-impact components.",
			"Generate an impact report."
		],
		tools: [
			"Java or Python",
			"NetworkX or equivalent graph library",
			"FastAPI/Flask or Spring Boot",
			"SQLite/PostgreSQL",
			"Optional graph visualization"
		],
		constraints: [
			"No real enterprise infrastructure access is required.",
			"Participants can create their own service-dependency data.",
			"Circular dependencies must be handled safely.",
			"Impact scoring should be deterministic and explainable.",
			"Configuration must be editable."
		],
		keyFeatures: [
			"Dependency graph",
			"Blast-radius analysis",
			"Criticality scoring",
			"Failure simulation",
			"Impact ranking",
			"Search/filter",
			"Incident impact report"
		],
		dataInput: "Participants may create their own synthetic data, test cases, sample documents, logs, source code, API traffic, or other inputs. Where external data is useful, participants may use legally accessible sources such as Kaggle, UCI, government/open-data portals, GitHub, public APIs, or other permitted sources.",
		scope: "The expected solution is a working end-to-end MVP that can be implemented and demonstrated within 1–2 days. Teams are not expected to build a production-grade enterprise system. Advanced features and integrations are optional.",
		context: "Enterprise applications often depend on multiple APIs, databases, services, and external components. During an incident, teams need to quickly understand the blast radius and prioritize critical services.",
		requirements: [
			"No real enterprise infrastructure access is required.",
			"Participants can create their own service-dependency data.",
			"Circular dependencies must be handled safely.",
			"Impact scoring should be deterministic and explainable.",
			"Configuration must be editable."
		],
		impact: [
			"Build a dependency graph.",
			"Display upstream and downstream dependencies.",
			"Simulate component failures.",
			"Calculate potential blast radius.",
			"Identify critical/high-impact components.",
			"Generate an impact report."
		],
		technical: [
			"Java or Python",
			"NetworkX or equivalent graph library",
			"FastAPI/Flask or Spring Boot",
			"SQLite/PostgreSQL",
			"Optional graph visualization"
		]
	},
	{
		id: "case-15",
		code: "JP-015",
		language: "Python with AI/ML",
		category: "Smart Energy / Anomaly Detection",
		title: "Energy Consumption Anomaly Detector & Efficiency Advisor",
		brief: "Organizations need to identify unusual consumption caused by operating schedules, equipment behavior, or unexpected load. The solution should provide a data-driven energy monitoring assistant without requiring smart meters or physical IoT devices.",
		problem: "Design and develop a Python application to analyze electricity or equipment energy-consumption information, detect abnormal usage, identify likely causes, and recommend energy-efficiency actions.",
		outcome: [
			"Create an expected consumption baseline.",
			"Detect abnormal consumption periods.",
			"Identify affected time periods or equipment where data permits.",
			"Estimate avoidable consumption.",
			"Recommend corrective actions.",
			"Generate an energy-efficiency dashboard."
		],
		tools: [
			"Python",
			"Pandas/NumPy",
			"Scikit-learn/time-series libraries",
			"FastAPI/Flask/Streamlit",
			"Plotly/Matplotlib"
		],
		constraints: [
			"No smart meter, sensor, or IoT hardware is required.",
			"Participants may generate synthetic time-series data or use a manageable public dataset.",
			"Missing readings must be handled.",
			"Recommendations must explain the evidence.",
			"The solution should support time-based analysis."
		],
		keyFeatures: [
			"Baseline modeling",
			"Anomaly detection",
			"Consumption analysis",
			"Cause identification",
			"Savings estimation",
			"Alerts",
			"Energy report"
		],
		dataInput: "Participants may create their own synthetic data, test cases, sample documents, logs, source code, API traffic, or other inputs. Where external data is useful, participants may use legally accessible sources such as Kaggle, UCI, government/open-data portals, GitHub, public APIs, or other permitted sources.",
		scope: "The expected solution is a working end-to-end MVP that can be implemented and demonstrated within 1–2 days. Teams are not expected to build a production-grade enterprise system. Advanced features and integrations are optional.",
		context: "Organizations need to identify unusual consumption caused by operating schedules, equipment behavior, or unexpected load. The solution should provide a data-driven energy monitoring assistant without requiring smart meters or physical IoT devices.",
		requirements: [
			"No smart meter, sensor, or IoT hardware is required.",
			"Participants may generate synthetic time-series data or use a manageable public dataset.",
			"Missing readings must be handled.",
			"Recommendations must explain the evidence.",
			"The solution should support time-based analysis."
		],
		impact: [
			"Create an expected consumption baseline.",
			"Detect abnormal consumption periods.",
			"Identify affected time periods or equipment where data permits.",
			"Estimate avoidable consumption.",
			"Recommend corrective actions.",
			"Generate an energy-efficiency dashboard."
		],
		technical: [
			"Python",
			"Pandas/NumPy",
			"Scikit-learn/time-series libraries",
			"FastAPI/Flask/Streamlit",
			"Plotly/Matplotlib"
		]
	},
	{
		id: "case-16",
		code: "JP-016",
		language: "Java/Python",
		category: "Software Governance / License Compliance",
		title: "Software Dependency, License Conflict & Governance Tracker",
		brief: "Organizations use large numbers of open-source and third-party components. Tracking licenses, dependencies, versions, and duplication helps reduce compliance and software-governance risks.",
		problem: "Design and develop a Java/Python application that analyzes application dependencies, package metadata, and license information to identify unknown licenses, possible conflicts, outdated components, and software optimization opportunities.",
		outcome: [
			"Build a dependency inventory.",
			"Identify package and license information.",
			"Flag unknown or potentially conflicting licenses.",
			"Identify outdated or duplicated components where data permits.",
			"Assign a configurable risk score.",
			"Generate a compliance report."
		],
		tools: [
			"Java 17+ or Python 3.x",
			"Maven/Gradle/package metadata parsers",
			"Hashing/file-processing libraries",
			"SQLite/PostgreSQL",
			"FastAPI/Flask or Spring Boot"
		],
		constraints: [
			"Participants can create or use publicly accessible open-source projects.",
			"License findings are review flags, not legal conclusions.",
			"Rules must be configurable.",
			"Maintain an audit trail.",
			"No private enterprise repository access is required."
		],
		keyFeatures: [
			"Dependency inventory",
			"License detection",
			"Risk classification",
			"Duplicate detection",
			"Version analysis",
			"Configurable policies",
			"Compliance report"
		],
		dataInput: "Participants may create their own synthetic data, test cases, sample documents, logs, source code, API traffic, or other inputs. Where external data is useful, participants may use legally accessible sources such as Kaggle, UCI, government/open-data portals, GitHub, public APIs, or other permitted sources.",
		scope: "The expected solution is a working end-to-end MVP that can be implemented and demonstrated within 1–2 days. Teams are not expected to build a production-grade enterprise system. Advanced features and integrations are optional.",
		context: "Organizations use large numbers of open-source and third-party components. Tracking licenses, dependencies, versions, and duplication helps reduce compliance and software-governance risks.",
		requirements: [
			"Participants can create or use publicly accessible open-source projects.",
			"License findings are review flags, not legal conclusions.",
			"Rules must be configurable.",
			"Maintain an audit trail.",
			"No private enterprise repository access is required."
		],
		impact: [
			"Build a dependency inventory.",
			"Identify package and license information.",
			"Flag unknown or potentially conflicting licenses.",
			"Identify outdated or duplicated components where data permits.",
			"Assign a configurable risk score.",
			"Generate a compliance report."
		],
		technical: [
			"Java 17+ or Python 3.x",
			"Maven/Gradle/package metadata parsers",
			"Hashing/file-processing libraries",
			"SQLite/PostgreSQL",
			"FastAPI/Flask or Spring Boot"
		]
	},
	{
		id: "case-17",
		code: "JP-017",
		language: "Python with AI/ML",
		category: "Sales Operations / Lead Scoring",
		title: "CRM Lead Scoring & Next-Best-Action Recommendation Engine",
		brief: "Sales teams cannot manually evaluate every lead with equal depth. An intelligent prioritization system should help sales representatives focus on opportunities with stronger signals while explaining the basis of each recommendation.",
		problem: "Design and develop a Python application that analyzes CRM lead information, customer interactions, engagement history, and opportunity attributes to rank leads and recommend the next best sales action.",
		outcome: [
			"Calculate lead-quality scores.",
			"Rank leads for follow-up.",
			"Recommend actions such as call, email, demo, or nurture.",
			"Explain the factors behind each recommendation.",
			"Provide pipeline analytics.",
			"Allow sales users to override recommendations."
		],
		tools: [
			"Python",
			"Pandas/Scikit-learn",
			"FastAPI/Flask",
			"SQLite/PostgreSQL",
			"Optional LLM for natural-language recommendations"
		],
		constraints: [
			"Participants may generate synthetic CRM records or use a simple public dataset.",
			"Do not use sensitive/protected attributes for decision-making.",
			"Recommendations must be explainable.",
			"Human override must be supported.",
			"Evaluate predictions where labeled outcomes are available."
		],
		keyFeatures: [
			"Lead scoring",
			"Engagement analysis",
			"Next-best-action recommendation",
			"Pipeline ranking",
			"Explainable AI",
			"Sales dashboard",
			"Feedback capture"
		],
		dataInput: "Participants may create their own synthetic data, test cases, sample documents, logs, source code, API traffic, or other inputs. Where external data is useful, participants may use legally accessible sources such as Kaggle, UCI, government/open-data portals, GitHub, public APIs, or other permitted sources.",
		scope: "The expected solution is a working end-to-end MVP that can be implemented and demonstrated within 1–2 days. Teams are not expected to build a production-grade enterprise system. Advanced features and integrations are optional.",
		context: "Sales teams cannot manually evaluate every lead with equal depth. An intelligent prioritization system should help sales representatives focus on opportunities with stronger signals while explaining the basis of each recommendation.",
		requirements: [
			"Participants may generate synthetic CRM records or use a simple public dataset.",
			"Do not use sensitive/protected attributes for decision-making.",
			"Recommendations must be explainable.",
			"Human override must be supported.",
			"Evaluate predictions where labeled outcomes are available."
		],
		impact: [
			"Calculate lead-quality scores.",
			"Rank leads for follow-up.",
			"Recommend actions such as call, email, demo, or nurture.",
			"Explain the factors behind each recommendation.",
			"Provide pipeline analytics.",
			"Allow sales users to override recommendations."
		],
		technical: [
			"Python",
			"Pandas/Scikit-learn",
			"FastAPI/Flask",
			"SQLite/PostgreSQL",
			"Optional LLM for natural-language recommendations"
		]
	},
	{
		id: "case-18",
		code: "JP-018",
		language: "Java/Python",
		category: "System Integrity / Security Auditing",
		title: "Cryptographic File Integrity Monitor & Change Investigator",
		brief: "Organizations depend on configuration files, scripts, reports, and other digital assets. Unauthorized or accidental modifications can cause operational and security problems. The solution should provide lightweight file-integrity monitoring.",
		problem: "Design and develop a Java/Python application that maintains cryptographic integrity records for critical files, detects unauthorized or unexpected changes, and produces an investigation report.",
		outcome: [
			"Create an integrity baseline.",
			"Detect file additions, deletions, and modifications.",
			"Identify affected files.",
			"Assign severity based on configurable file criticality.",
			"Maintain an audit history.",
			"Generate an investigation report."
		],
		tools: [
			"Java 17+ or Python 3.x",
			"SHA-256/hash libraries",
			"SQLite/PostgreSQL",
			"Spring Boot/FastAPI",
			"Optional filesystem monitoring libraries"
		],
		constraints: [
			"No specialized hardware is required.",
			"Participants can create their own sample file repository.",
			"Do not store sensitive file contents unnecessarily.",
			"Monitoring locations must be configurable.",
			"Hash verification must be central to integrity checking."
		],
		keyFeatures: [
			"Integrity baseline",
			"Hash verification",
			"Change detection",
			"Criticality scoring",
			"Audit logging",
			"Alerts",
			"Investigation report"
		],
		dataInput: "Participants may create their own synthetic data, test cases, sample documents, logs, source code, API traffic, or other inputs. Where external data is useful, participants may use legally accessible sources such as Kaggle, UCI, government/open-data portals, GitHub, public APIs, or other permitted sources.",
		scope: "The expected solution is a working end-to-end MVP that can be implemented and demonstrated within 1–2 days. Teams are not expected to build a production-grade enterprise system. Advanced features and integrations are optional.",
		context: "Organizations depend on configuration files, scripts, reports, and other digital assets. Unauthorized or accidental modifications can cause operational and security problems. The solution should provide lightweight file-integrity monitoring.",
		requirements: [
			"No specialized hardware is required.",
			"Participants can create their own sample file repository.",
			"Do not store sensitive file contents unnecessarily.",
			"Monitoring locations must be configurable.",
			"Hash verification must be central to integrity checking."
		],
		impact: [
			"Create an integrity baseline.",
			"Detect file additions, deletions, and modifications.",
			"Identify affected files.",
			"Assign severity based on configurable file criticality.",
			"Maintain an audit history.",
			"Generate an investigation report."
		],
		technical: [
			"Java 17+ or Python 3.x",
			"SHA-256/hash libraries",
			"SQLite/PostgreSQL",
			"Spring Boot/FastAPI",
			"Optional filesystem monitoring libraries"
		]
	},
	{
		id: "case-19",
		code: "JP-019",
		language: "Python with AI/ML",
		category: "Logistics / Last-Mile Route Optimization",
		title: "Last-Mile Delivery Route Optimizer & Late-Delivery Risk Predictor",
		brief: "The solution should model a practical last-mile logistics problem without requiring GPS devices or live-map hardware. The focus is on route planning, operational constraints, and intelligent exception handling.",
		problem: "Design and develop a Python application that analyzes delivery orders, vehicle capacity, time windows, distance/travel-time information, and historical delivery performance to recommend feasible assignments and identify likely late deliveries.",
		outcome: [
			"Assign orders to available vehicles.",
			"Generate feasible delivery sequences.",
			"Respect capacity and time-window constraints.",
			"Identify likely late deliveries.",
			"Prioritize critical deliveries.",
			"Compare results with a simple baseline."
		],
		tools: [
			"Python",
			"Pandas/NumPy",
			"OR-Tools/NetworkX or equivalent",
			"Scikit-learn optional",
			"FastAPI/Flask/Streamlit"
		],
		constraints: [
			"No GPS hardware or live-map subscription is required.",
			"Participants may generate a manageable delivery scenario or use public data.",
			"Hard constraints must not be overridden by AI recommendations.",
			"Provide a fallback when a fully feasible solution is unavailable.",
			"Demonstrate measurable improvement over a baseline."
		],
		keyFeatures: [
			"Route optimization",
			"Capacity constraints",
			"Time-window handling",
			"Late-delivery prediction",
			"Exception management",
			"Visualization",
			"Performance comparison"
		],
		dataInput: "Participants may create their own synthetic data, test cases, sample documents, logs, source code, API traffic, or other inputs. Where external data is useful, participants may use legally accessible sources such as Kaggle, UCI, government/open-data portals, GitHub, public APIs, or other permitted sources.",
		scope: "The expected solution is a working end-to-end MVP that can be implemented and demonstrated within 1–2 days. Teams are not expected to build a production-grade enterprise system. Advanced features and integrations are optional.",
		context: "The solution should model a practical last-mile logistics problem without requiring GPS devices or live-map hardware. The focus is on route planning, operational constraints, and intelligent exception handling.",
		requirements: [
			"No GPS hardware or live-map subscription is required.",
			"Participants may generate a manageable delivery scenario or use public data.",
			"Hard constraints must not be overridden by AI recommendations.",
			"Provide a fallback when a fully feasible solution is unavailable.",
			"Demonstrate measurable improvement over a baseline."
		],
		impact: [
			"Assign orders to available vehicles.",
			"Generate feasible delivery sequences.",
			"Respect capacity and time-window constraints.",
			"Identify likely late deliveries.",
			"Prioritize critical deliveries.",
			"Compare results with a simple baseline."
		],
		technical: [
			"Python",
			"Pandas/NumPy",
			"OR-Tools/NetworkX or equivalent",
			"Scikit-learn optional",
			"FastAPI/Flask/Streamlit"
		]
	},
	{
		id: "case-20",
		code: "JP-020",
		language: "Java/Python with AI/ML",
		category: "Generative AI / Enterprise RAG",
		title: "Enterprise Document Question-Answering Assistant with RAG",
		brief: "Employees spend significant time searching policies, SOPs, manuals, product documentation, and process guides. A retrieval-augmented AI assistant should provide fast answers while reducing unsupported responses by grounding answers in approved documents.",
		problem: "Design and develop a Java/Python application that allows users to ask natural-language questions about a controlled collection of enterprise documents and returns concise, document-grounded answers with references to the relevant source sections.",
		outcome: [
			"Ingest and index documents.",
			"Accept natural-language questions.",
			"Retrieve relevant document sections.",
			"Generate concise AI-assisted answers.",
			"Display supporting source references.",
			"Handle questions that cannot be answered from the knowledge base."
		],
		tools: [
			"Python/FastAPI or Java/Spring Boot",
			"Vector database/library such as FAISS/Chroma or equivalent",
			"Embedding model",
			"Optional LLM API/local LLM",
			"SQLite/PostgreSQL"
		],
		constraints: [
			"Participants can create their own small document collection or use legally accessible public documents.",
			"Answers must be grounded in indexed documents.",
			"Source references must be displayed.",
			"The system must not knowingly fabricate unsupported answers.",
			"Document updates/re-indexing should be supported."
		],
		keyFeatures: [
			"Document ingestion",
			"Semantic search",
			"RAG",
			"Source-grounded answers",
			"Unsupported-answer handling",
			"Admin document management",
			"Evaluation dashboard"
		],
		dataInput: "Participants may create their own synthetic data, test cases, sample documents, logs, source code, API traffic, or other inputs. Where external data is useful, participants may use legally accessible sources such as Kaggle, UCI, government/open-data portals, GitHub, public APIs, or other permitted sources.",
		scope: "The expected solution is a working end-to-end MVP that can be implemented and demonstrated within 1–2 days. Teams are not expected to build a production-grade enterprise system. Advanced features and integrations are optional.",
		context: "Employees spend significant time searching policies, SOPs, manuals, product documentation, and process guides. A retrieval-augmented AI assistant should provide fast answers while reducing unsupported responses by grounding answers in approved documents.",
		requirements: [
			"Participants can create their own small document collection or use legally accessible public documents.",
			"Answers must be grounded in indexed documents.",
			"Source references must be displayed.",
			"The system must not knowingly fabricate unsupported answers.",
			"Document updates/re-indexing should be supported."
		],
		impact: [
			"Ingest and index documents.",
			"Accept natural-language questions.",
			"Retrieve relevant document sections.",
			"Generate concise AI-assisted answers.",
			"Display supporting source references.",
			"Handle questions that cannot be answered from the knowledge base."
		],
		technical: [
			"Python/FastAPI or Java/Spring Boot",
			"Vector database/library such as FAISS/Chroma or equivalent",
			"Embedding model",
			"Optional LLM API/local LLM",
			"SQLite/PostgreSQL"
		]
	}
];
var FINGER_NAMES = [
	{
		id: 0,
		label: "THUMB",
		code: "TMB"
	},
	{
		id: 1,
		label: "INDEX",
		code: "IDX"
	},
	{
		id: 2,
		label: "MIDDLE",
		code: "MID"
	},
	{
		id: 3,
		label: "RING",
		code: "RNG"
	},
	{
		id: 4,
		label: "PINKY",
		code: "PNK"
	}
];
function BootSequence({ onDone }) {
	const [visible, setVisible] = (0, import_react.useState)(true);
	const [active, setActive] = (0, import_react.useState)(false);
	const [progress, setProgress] = (0, import_react.useState)(0);
	const [phase, setPhase] = (0, import_react.useState)(0);
	const [status, setStatus] = (0, import_react.useState)("STANDBY");
	const [lines, setLines] = (0, import_react.useState)([]);
	const [glitch, setGlitch] = (0, import_react.useState)(false);
	const [wipe, setWipe] = (0, import_react.useState)(false);
	const [ripples, setRipples] = (0, import_react.useState)([]);
	const [charge, setCharge] = (0, import_react.useState)(0);
	const [activeTouches, setActiveTouches] = (0, import_react.useState)([]);
	const [lockedFingers, setLockedFingers] = (0, import_react.useState)([
		false,
		false,
		false,
		false,
		false
	]);
	const rippleId = (0, import_react.useRef)(0);
	const activeRef = (0, import_react.useRef)(false);
	const holdTimer = (0, import_react.useRef)(null);
	const holdStart = (0, import_react.useRef)(0);
	const chargeRaf = (0, import_react.useRef)(0);
	const timers = (0, import_react.useRef)([]);
	const rafRef = (0, import_react.useRef)(0);
	const doneRef = (0, import_react.useRef)(onDone);
	doneRef.current = onDone;
	const addRipple = (0, import_react.useCallback)((x, y, big) => {
		const id = rippleId.current += 1;
		setRipples((r) => [...r, {
			id,
			x,
			y,
			big
		}]);
		setTimeout(() => setRipples((r) => r.filter((p) => p.id !== id)), big ? 1100 : 700);
	}, []);
	(0, import_react.useEffect)(() => {
		if (sessionStorage.getItem("aavishkara-booted") === "1") {
			setVisible(false);
			doneRef.current(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		if (!visible) return;
		warmBootPreload();
	}, [visible]);
	const videoRef = (0, import_react.useRef)(null);
	const [muted, setMuted] = (0, import_react.useState)(false);
	const [videoDuration, setVideoDuration] = (0, import_react.useState)(20);
	const [currentTime, setCurrentTime] = (0, import_react.useState)(0);
	const finishBoot = (0, import_react.useCallback)(() => {
		setWipe(true);
		setTimeout(() => {
			sessionStorage.setItem(BOOT_SESSION_KEY, "1");
			setVisible(false);
			doneRef.current(true);
		}, 900);
	}, []);
	const handleTimeUpdate = () => {
		const v = videoRef.current;
		if (!v) return;
		const cur = v.currentTime;
		const dur = v.duration || 20;
		setCurrentTime(cur);
		setVideoDuration(dur);
		const p = Math.min(100, Math.round(cur / dur * 100));
		setProgress(p);
		if (p < 20) setStatus("BIOMETRIC ACCESS GRANTED // INITIALIZING CORE");
		else if (p < 50) setStatus("DECRYPTING 20 HACKATHON CHALLENGES...");
		else if (p < 75) setStatus("CALIBRATING JAVA & PYTHON BENCHMARKS...");
		else if (p < 95) setStatus("SYNCHRONIZING CASE STUDY MATRIX...");
		else setStatus("REVEAL ENGINE OPERATIONAL");
	};
	const toggleMute = (e) => {
		e?.stopPropagation();
		const v = videoRef.current;
		if (!v) return;
		v.muted = !v.muted;
		setMuted(v.muted);
	};
	const formatTime = (secs) => {
		const m = Math.floor(secs / 60);
		const s = Math.floor(secs % 60);
		return `${m}:${String(s).padStart(2, "0")}`;
	};
	const activate = (0, import_react.useCallback)((points) => {
		if (activeRef.current) return;
		activeRef.current = true;
		setActive(true);
		setPhase(1);
		setLockedFingers([
			true,
			true,
			true,
			true,
			true
		]);
		points.forEach((p) => addRipple(p.x, p.y, true));
		setStatus("BIOMETRIC ACCESS GRANTED // INITIALIZING");
		setTimeout(() => {
			const v = videoRef.current;
			if (v) {
				v.muted = false;
				v.play().catch(() => {
					v.muted = true;
					setMuted(true);
					v.play().catch(() => {});
				});
			}
		}, 50);
	}, [addRipple]);
	const updateFingerStates = (0, import_react.useCallback)((touchesCount, currentCharge) => {
		const chargeLocked = Math.min(5, Math.floor(currentCharge * 5.5));
		const count = Math.max(touchesCount, chargeLocked);
		setLockedFingers([
			count >= 1,
			count >= 2,
			count >= 3,
			count >= 4,
			count >= 5
		]);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!visible) return;
		const startCharge = (points, durationMs) => {
			holdStart.current = performance.now();
			const tick = () => {
				const elapsed = performance.now() - holdStart.current;
				const t = Math.min(1, elapsed / durationMs);
				setCharge(t);
				updateFingerStates(points.length, t);
				if (t < 1 && !activeRef.current) chargeRaf.current = requestAnimationFrame(tick);
			};
			chargeRaf.current = requestAnimationFrame(tick);
			holdTimer.current = setTimeout(() => {
				activate(points);
			}, durationMs);
		};
		const cancelCharge = () => {
			if (holdTimer.current) clearTimeout(holdTimer.current);
			holdTimer.current = null;
			cancelAnimationFrame(chargeRaf.current);
			setCharge(0);
			holdStart.current = 0;
		};
		const onTouchStart = (e) => {
			if (activeRef.current) return;
			const touches = Array.from(e.touches).map((t) => ({
				id: t.identifier,
				x: t.clientX,
				y: t.clientY
			}));
			setActiveTouches(touches);
			touches.forEach((t) => addRipple(t.x, t.y, false));
			const fingerCount = touches.length;
			updateFingerStates(fingerCount, 0);
			if (fingerCount >= 5) {
				cancelCharge();
				activate(touches);
				return;
			}
			if (fingerCount >= 3) {
				cancelCharge();
				startCharge(touches, 600);
				return;
			}
			cancelCharge();
			startCharge(touches, HOLD_FALLBACK_DURATION);
		};
		const onTouchMove = (e) => {
			if (activeRef.current) return;
			const touches = Array.from(e.touches).map((t) => ({
				id: t.identifier,
				x: t.clientX,
				y: t.clientY
			}));
			setActiveTouches(touches);
			const fingerCount = touches.length;
			updateFingerStates(fingerCount, charge);
			if (fingerCount >= 5) {
				cancelCharge();
				activate(touches);
			}
		};
		const onTouchEnd = (e) => {
			const remainingTouches = Array.from(e.touches).map((t) => ({
				id: t.identifier,
				x: t.clientX,
				y: t.clientY
			}));
			setActiveTouches(remainingTouches);
			if (remainingTouches.length === 0) {
				cancelCharge();
				setLockedFingers([
					false,
					false,
					false,
					false,
					false
				]);
			} else updateFingerStates(remainingTouches.length, charge);
		};
		const onMouseDown = (e) => {
			if (activeRef.current) return;
			const pt = {
				id: 999,
				x: e.clientX,
				y: e.clientY
			};
			setActiveTouches([pt]);
			addRipple(e.clientX, e.clientY, false);
			cancelCharge();
			startCharge([pt], HOLD_FALLBACK_DURATION);
		};
		const onMouseMove = (e) => {
			if (activeRef.current || holdTimer.current === null) return;
			setActiveTouches([{
				id: 999,
				x: e.clientX,
				y: e.clientY
			}]);
		};
		const onMouseUp = () => {
			if (activeRef.current) return;
			setActiveTouches([]);
			cancelCharge();
			setLockedFingers([
				false,
				false,
				false,
				false,
				false
			]);
		};
		window.addEventListener("touchstart", onTouchStart, { passive: true });
		window.addEventListener("touchmove", onTouchMove, { passive: true });
		window.addEventListener("touchend", onTouchEnd);
		window.addEventListener("touchcancel", onTouchEnd);
		window.addEventListener("mousedown", onMouseDown);
		window.addEventListener("mousemove", onMouseMove);
		window.addEventListener("mouseup", onMouseUp);
		window.addEventListener("mouseleave", onMouseUp);
		return () => {
			window.removeEventListener("touchstart", onTouchStart);
			window.removeEventListener("touchmove", onTouchMove);
			window.removeEventListener("touchend", onTouchEnd);
			window.removeEventListener("touchcancel", onTouchEnd);
			window.removeEventListener("mousedown", onMouseDown);
			window.removeEventListener("mousemove", onMouseMove);
			window.removeEventListener("mouseup", onMouseUp);
			window.removeEventListener("mouseleave", onMouseUp);
			cancelCharge();
		};
	}, [
		visible,
		activate,
		addRipple,
		charge,
		updateFingerStates
	]);
	(0, import_react.useEffect)(() => () => {
		timers.current.forEach(clearTimeout);
		cancelAnimationFrame(rafRef.current);
		cancelAnimationFrame(chargeRaf.current);
	}, []);
	if (!visible) return null;
	const finale = active && progress > 86;
	const activeCount = lockedFingers.filter(Boolean).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "boot-root fixed inset-0 z-[90] flex select-none items-center justify-center overflow-hidden bg-background",
		style: { animation: wipe ? `boot-wipe 900ms var(--ease-cinematic) forwards` : void 0 },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `boot-grid absolute inset-0 ${active ? "boot-grid-hot" : ""}` }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `boot-scan absolute inset-0 ${active ? "boot-scan-hot" : ""}` }),
			activeTouches.map((touch, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none fixed z-[100] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75",
				style: {
					left: touch.x,
					top: touch.y
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex h-24 w-24 items-center justify-center sm:h-28 sm:w-28",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "finger-reticle-spin absolute inset-0 rounded-full border border-dashed border-primary/80" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "finger-reticle-spin-fast absolute inset-2 rounded-full border border-dotted border-accent/60" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "finger-pulse-ring absolute inset-3 rounded-full border-2 border-primary" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-4 rounded-full border border-accent bg-accent/30 shadow-[0_0_20px_var(--neon)]" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1.5 w-1.5 rounded-full bg-primary shadow-[var(--glow-gold)]" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -left-1 -top-1 h-3.5 w-3.5 border-l-2 border-t-2 border-primary shadow-[var(--glow-gold)]" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -right-1 -top-1 h-3.5 w-3.5 border-r-2 border-t-2 border-primary shadow-[var(--glow-gold)]" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -bottom-1 -left-1 h-3.5 w-3.5 border-b-2 border-l-2 border-primary shadow-[var(--glow-gold)]" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -bottom-1 -right-1 h-3.5 w-3.5 border-b-2 border-r-2 border-primary shadow-[var(--glow-gold)]" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "display absolute -bottom-7 whitespace-nowrap rounded border border-primary/60 bg-card/95 px-2.5 py-0.5 text-[0.65rem] font-semibold tracking-[0.25em] text-primary shadow-[0_0_15px_rgba(245,184,0,0.35)] backdrop-blur-md",
							children: [
								"FINGER 0",
								i + 1,
								" :: LOCKED"
							]
						})
					]
				})
			}, touch.id)),
			activeTouches.length >= 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
				className: "pointer-events-none fixed inset-0 z-[95] h-full w-full",
				children: activeTouches.slice(0, -1).map((p1, idx) => {
					const p2 = activeTouches[idx + 1];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
						x1: p1.x,
						y1: p1.y,
						x2: p2.x,
						y2: p2.y,
						stroke: "oklch(0.82 0.16 85 / 85%)",
						strokeWidth: "2.5",
						strokeDasharray: "6 4",
						style: { filter: "drop-shadow(0 0 8px oklch(0.82 0.16 85 / 90%))" }
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: (p1.x + p2.x) / 2,
						cy: (p1.y + p2.y) / 2,
						r: "3.5",
						fill: "oklch(0.82 0.16 85)",
						style: { filter: "drop-shadow(0 0 10px oklch(0.82 0.16 85))" }
					})] }, `${p1.id}-${p2.id}`);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `boot-frame relative z-10 ${active ? "w-[min(96vw,58rem)] p-3.5 sm:p-5" : "w-[min(94vw,56rem)] p-5 sm:p-9"} rounded-lg border border-primary/30 bg-card/40 backdrop-blur-md ${glitch ? "boot-glitch" : ""}`,
				style: {
					boxShadow: `0 0 ${20 + progress * .9}px oklch(0.82 0.16 85 / ${.12 + progress * .0035})`,
					transform: finale ? `scale(${1 + (progress - 86) * .004})` : void 0,
					transition: "transform 200ms linear"
				},
				children: !active ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "boot-idle-content flex flex-col items-center gap-5 py-4 text-center sm:gap-6 sm:py-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-primary animate-ping" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "display text-xs tracking-[0.4em] text-primary sm:text-sm",
									children: "BIOMETRIC TOUCH MATRIX // 5-FINGER RECOGNITION"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-primary animate-ping" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative flex items-center justify-center p-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute h-64 w-64 rounded-full border border-primary/25 boot-hand-ring" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute h-64 w-64 rounded-full border border-accent/20 boot-hand-ring",
									style: { animationDelay: "0.8s" }
								}),
								charge > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
									className: "absolute h-72 w-72 pointer-events-none",
									viewBox: "0 0 100 100",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										cx: "50",
										cy: "50",
										r: "47",
										fill: "none",
										stroke: "oklch(0.82 0.16 85 / 80%)",
										strokeWidth: "2",
										strokeLinecap: "round",
										strokeDasharray: `${charge * 295} 295`,
										transform: "rotate(-90 50 50)",
										style: { filter: "drop-shadow(0 0 8px oklch(0.82 0.16 85 / 75%))" }
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
									viewBox: "0 0 240 280",
									className: "h-56 w-56 sm:h-64 sm:w-64 select-none drop-shadow-[0_0_20px_rgba(245,184,0,0.15)]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pattern", {
											id: "bio-grid",
											width: "10",
											height: "10",
											patternUnits: "userSpaceOnUse",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
												d: "M 10 0 L 0 0 0 10",
												fill: "none",
												stroke: "oklch(0.82 0.16 85 / 15%)",
												strokeWidth: "0.5"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", {
											id: "core-glow",
											cx: "50%",
											cy: "50%",
											r: "50%",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
													offset: "0%",
													stopColor: "oklch(0.82 0.16 85 / 50%)"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
													offset: "70%",
													stopColor: "oklch(0.82 0.16 85 / 10%)"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
													offset: "100%",
													stopColor: "transparent"
												})
											]
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
											d: "M 66 175 C 56 215 72 250 120 255 C 168 250 184 215 174 175 L 166 160 L 140 152 L 120 152 L 100 152 L 74 160 Z",
											className: `bio-finger-path ${activeCount >= 3 ? "bio-finger-active" : "bio-finger-inactive"}`,
											strokeWidth: "2"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
											id: "finger-thumb",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
													d: "M 76 182 L 48 162 C 34 148 24 134 32 118 C 40 104 56 108 68 124 L 84 152 Z",
													className: `bio-finger-path ${lockedFingers[0] ? "bio-finger-active" : "bio-finger-inactive"}`,
													strokeWidth: "2"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
													x1: "44",
													y1: "138",
													x2: "58",
													y2: "148",
													stroke: "currentColor",
													strokeWidth: "1",
													opacity: "0.5"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
													cx: "44",
													cy: "120",
													r: lockedFingers[0] ? "6" : "4",
													className: `bio-finger-path ${lockedFingers[0] ? "fill-primary" : "fill-none stroke-primary/50"}`,
													strokeWidth: "1.5"
												}),
												lockedFingers[0] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
													cx: "44",
													cy: "120",
													r: "10",
													fill: "none",
													stroke: "oklch(0.82 0.16 85)",
													strokeWidth: "1",
													strokeDasharray: "3 2",
													className: "animate-spin"
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
											id: "finger-index",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
													d: "M 68 152 L 68 76 C 68 56 90 56 90 76 L 90 152 Z",
													className: `bio-finger-path ${lockedFingers[1] ? "bio-finger-active" : "bio-finger-inactive"}`,
													strokeWidth: "2"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
													x1: "68",
													y1: "118",
													x2: "90",
													y2: "118",
													stroke: "currentColor",
													strokeWidth: "1",
													opacity: "0.5"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
													x1: "68",
													y1: "90",
													x2: "90",
													y2: "90",
													stroke: "currentColor",
													strokeWidth: "1",
													opacity: "0.5"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
													cx: "79",
													cy: "68",
													r: lockedFingers[1] ? "6" : "4",
													className: `bio-finger-path ${lockedFingers[1] ? "fill-primary" : "fill-none stroke-primary/50"}`,
													strokeWidth: "1.5"
												}),
												lockedFingers[1] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
													cx: "79",
													cy: "68",
													r: "10",
													fill: "none",
													stroke: "oklch(0.82 0.16 85)",
													strokeWidth: "1",
													strokeDasharray: "3 2",
													className: "animate-spin"
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
											id: "finger-middle",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
													d: "M 103 152 L 103 46 C 103 26 127 26 127 46 L 127 152 Z",
													className: `bio-finger-path ${lockedFingers[2] ? "bio-finger-active" : "bio-finger-inactive"}`,
													strokeWidth: "2"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
													x1: "103",
													y1: "114",
													x2: "127",
													y2: "114",
													stroke: "currentColor",
													strokeWidth: "1",
													opacity: "0.5"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
													x1: "103",
													y1: "80",
													x2: "127",
													y2: "80",
													stroke: "currentColor",
													strokeWidth: "1",
													opacity: "0.5"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
													cx: "115",
													cy: "38",
													r: lockedFingers[2] ? "6" : "4",
													className: `bio-finger-path ${lockedFingers[2] ? "fill-primary" : "fill-none stroke-primary/50"}`,
													strokeWidth: "1.5"
												}),
												lockedFingers[2] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
													cx: "115",
													cy: "38",
													r: "10",
													fill: "none",
													stroke: "oklch(0.82 0.16 85)",
													strokeWidth: "1",
													strokeDasharray: "3 2",
													className: "animate-spin"
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
											id: "finger-ring",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
													d: "M 140 152 L 140 76 C 140 56 162 56 162 76 L 162 152 Z",
													className: `bio-finger-path ${lockedFingers[3] ? "bio-finger-active" : "bio-finger-inactive"}`,
													strokeWidth: "2"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
													x1: "140",
													y1: "118",
													x2: "162",
													y2: "118",
													stroke: "currentColor",
													strokeWidth: "1",
													opacity: "0.5"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
													x1: "140",
													y1: "90",
													x2: "162",
													y2: "90",
													stroke: "currentColor",
													strokeWidth: "1",
													opacity: "0.5"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
													cx: "151",
													cy: "68",
													r: lockedFingers[3] ? "6" : "4",
													className: `bio-finger-path ${lockedFingers[3] ? "fill-primary" : "fill-none stroke-primary/50"}`,
													strokeWidth: "1.5"
												}),
												lockedFingers[3] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
													cx: "151",
													cy: "68",
													r: "10",
													fill: "none",
													stroke: "oklch(0.82 0.16 85)",
													strokeWidth: "1",
													strokeDasharray: "3 2",
													className: "animate-spin"
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
											id: "finger-pinky",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
													d: "M 172 160 L 172 108 C 172 90 192 90 192 108 L 192 170 Z",
													className: `bio-finger-path ${lockedFingers[4] ? "bio-finger-active" : "bio-finger-inactive"}`,
													strokeWidth: "2"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
													x1: "172",
													y1: "134",
													x2: "192",
													y2: "134",
													stroke: "currentColor",
													strokeWidth: "1",
													opacity: "0.5"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
													cx: "182",
													cy: "100",
													r: lockedFingers[4] ? "6" : "4",
													className: `bio-finger-path ${lockedFingers[4] ? "fill-primary" : "fill-none stroke-primary/50"}`,
													strokeWidth: "1.5"
												}),
												lockedFingers[4] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
													cx: "182",
													cy: "100",
													r: "10",
													fill: "none",
													stroke: "oklch(0.82 0.16 85)",
													strokeWidth: "1",
													strokeDasharray: "3 2",
													className: "animate-spin"
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
											id: "palm-sensor",
											transform: "translate(115, 202)",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
													r: "26",
													fill: "url(#core-glow)"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
													r: "24",
													fill: "none",
													stroke: "oklch(0.82 0.16 85 / 40%)",
													strokeWidth: "1.5",
													strokeDasharray: "4 2"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
													r: "16",
													fill: "none",
													stroke: "oklch(0.82 0.16 85 / 60%)",
													strokeWidth: "1"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
													r: "8",
													fill: "none",
													stroke: "oklch(0.82 0.16 85 / 80%)",
													strokeWidth: "1.5"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
													r: "3",
													fill: "oklch(0.82 0.16 85)"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
													x1: "0",
													y1: "0",
													x2: "24",
													y2: "0",
													stroke: "oklch(0.82 0.16 85)",
													strokeWidth: "1.5",
													className: "palm-radar-sweep"
												})
											]
										})
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap items-center justify-center gap-2 sm:gap-3",
							children: FINGER_NAMES.map((f) => {
								const isLocked = lockedFingers[f.id];
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.62rem] font-mono tracking-[0.2em] transition-all duration-300 sm:px-3 sm:text-xs ${isLocked ? "border-primary bg-primary/20 text-primary shadow-[0_0_12px_rgba(245,184,0,0.4)] scale-105" : "border-border/60 bg-card/40 text-muted-foreground"}`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-1.5 w-1.5 rounded-full transition-all duration-300 ${isLocked ? "bg-primary shadow-[var(--glow-gold)] animate-ping" : "bg-muted-foreground/40"}` }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: f.label }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-bold",
											children: isLocked ? "✓" : "○"
										})
									]
								}, f.id);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "display boot-hand-shimmer text-xs tracking-[0.38em] text-foreground/90 sm:text-base",
								children: activeCount === 0 ? "TOUCH SCREEN WITH ALL 5 FINGERS OR HOLD PALM" : activeCount === 5 ? "ALL 5 BIOMETRIC NODES LOCKED — ACCESS GRANTED" : `${activeCount} / 5 FINGERS DETECTED — PLACE REMAINING FINGERS`
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-[0.65rem] tracking-[0.25em] text-primary/80",
								children: activeCount > 0 ? `[ SENSING TOUCH POINTS: ${activeTouches.length || activeCount} / 5 NODES ]` : "[ MULTI-TOUCH BIOMETRIC SCANNER READY ]"
							})]
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col w-full text-left",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between border-b border-primary/30 pb-3 gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-primary animate-ping" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "display text-xs tracking-[0.25em] text-primary sm:text-sm",
									children: status
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: toggleMute,
									className: "flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-primary transition-colors cursor-pointer",
									children: [muted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "h-3.5 w-3.5 text-accent" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "h-3.5 w-3.5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "hidden sm:inline",
										children: muted ? "MUTED" : "UNMUTE"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: finishBoot,
									className: "flex items-center gap-1.5 rounded-full border border-primary/50 bg-primary/20 px-3 py-1 font-mono text-[0.7rem] text-primary hover:bg-primary hover:text-black transition-all cursor-pointer shadow-[0_0_12px_var(--gold)]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "SKIP LOADING" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkipForward, { className: "h-3 w-3" })]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative mt-3 aspect-video w-full overflow-hidden rounded-lg border border-primary/40 bg-black shadow-[0_0_40px_rgba(218,165,32,0.2)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
								ref: videoRef,
								src: "/aavishkara-short.mp4",
								playsInline: true,
								autoPlay: true,
								onTimeUpdate: handleTimeUpdate,
								onEnded: finishBoot,
								className: "h-full w-full object-contain"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 opacity-15 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:100%_4px]" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3.5 flex items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-2 flex-1 overflow-hidden rounded-full bg-border/60 border border-primary/20",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full rounded-full bg-gradient-to-r from-primary via-gold-soft to-primary shadow-[var(--glow-gold)]",
									style: {
										width: `${progress}%`,
										transition: "width 120ms linear"
									}
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-mono text-xs text-primary font-bold tracking-wider",
								children: [progress, "%"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex items-center justify-between font-mono text-[0.65rem] tracking-[0.25em] text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								formatTime(currentTime),
								" / ",
								formatTime(videoDuration)
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "AAVISHKARA '26 // CASE STUDY REVEAL" })]
						})
					]
				})
			}),
			ripples.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": true,
				className: r.big ? "boot-ripple boot-ripple-big" : "boot-ripple",
				style: {
					left: r.x,
					top: r.y
				}
			}, r.id))
		]
	});
}
function CinematicTeaser({ onDone, videoSrc = "/aavishkara-short.mp4" }) {
	const videoRef = (0, import_react.useRef)(null);
	const [muted, setMuted] = (0, import_react.useState)(false);
	const [progress, setProgress] = (0, import_react.useState)(0);
	const [currentTime, setCurrentTime] = (0, import_react.useState)(0);
	const [duration, setDuration] = (0, import_react.useState)(20);
	const [isPlaying, setIsPlaying] = (0, import_react.useState)(true);
	const [showUnmuteHint, setShowUnmuteHint] = (0, import_react.useState)(false);
	const [isClosing, setIsClosing] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const v = videoRef.current;
		if (!v) return;
		v.muted = false;
		const playPromise = v.play();
		if (playPromise !== void 0) playPromise.then(() => {
			setIsPlaying(true);
			setShowUnmuteHint(false);
		}).catch(() => {
			v.muted = true;
			setMuted(true);
			setShowUnmuteHint(true);
			v.play().catch(() => setIsPlaying(false));
		});
	}, []);
	const handleTimeUpdate = () => {
		const v = videoRef.current;
		if (!v) return;
		const cur = v.currentTime;
		const dur = v.duration || 20;
		setCurrentTime(cur);
		setDuration(dur);
		setProgress(cur / dur * 100);
	};
	const handleEnd = () => {
		if (isClosing) return;
		setIsClosing(true);
		setTimeout(() => {
			onDone();
		}, 400);
	};
	const toggleMute = () => {
		const v = videoRef.current;
		if (!v) return;
		v.muted = !v.muted;
		setMuted(v.muted);
		setShowUnmuteHint(false);
	};
	const togglePlay = () => {
		const v = videoRef.current;
		if (!v) return;
		if (v.paused) {
			v.play();
			setIsPlaying(true);
		} else {
			v.pause();
			setIsPlaying(false);
		}
	};
	const formatTime = (secs) => {
		const m = Math.floor(secs / 60);
		const s = Math.floor(secs % 60);
		return `${m}:${String(s).padStart(2, "0")}`;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: !isClosing && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: {
			opacity: 0,
			filter: "blur(12px)"
		},
		transition: {
			duration: .6,
			ease: EASE$1
		},
		className: "fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black select-none overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(218,165,32,0.12)_0%,rgba(0,0,0,0.95)_75%)]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:100%_4px]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute top-0 inset-x-0 z-30 flex items-center justify-between p-4 sm:p-6 bg-gradient-to-b from-black/90 via-black/40 to-transparent",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex h-2.5 w-2.5 relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-xs font-bold tracking-[0.25em] text-primary",
							children: "AAVISHKARA '26 // TRANSMISSION"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[0.65rem] tracking-wider text-muted-foreground",
							children: "AUTHENTICATED BIOMETRIC FEED"
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [showUnmuteHint && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: toggleMute,
						className: "flex items-center gap-1.5 rounded border border-primary/60 bg-primary/20 px-3 py-1 text-xs font-mono text-primary shadow-[0_0_15px_-3px_var(--gold)] hover:bg-primary/30 transition-colors animate-pulse",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "TAP TO UNMUTE" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleEnd,
						className: "group flex items-center gap-1.5 rounded-full border border-primary/40 bg-black/60 px-4 py-1.5 text-xs font-mono tracking-widest text-primary/90 backdrop-blur-md transition-all hover:border-primary hover:bg-primary hover:text-black hover:shadow-[0_0_20px_var(--gold)]",
						"aria-label": "Skip video",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "SKIP INTRO" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkipForward, { className: "h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" })]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative w-full h-full max-w-6xl max-h-[85vh] flex items-center justify-center p-2 sm:p-6 cursor-pointer",
				onClick: togglePlay,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
					ref: videoRef,
					src: videoSrc,
					playsInline: true,
					autoPlay: true,
					onTimeUpdate: handleTimeUpdate,
					onEnded: handleEnd,
					className: "w-full h-full object-contain rounded-lg shadow-[0_0_80px_rgba(218,165,32,0.25)] border border-primary/30 bg-black"
				}), !isPlaying && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm pointer-events-none",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-16 w-16 items-center justify-center rounded-full border border-primary bg-primary/20 text-primary shadow-[0_0_30px_var(--gold)]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-8 w-8 translate-x-0.5 fill-primary" })
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute bottom-0 inset-x-0 z-30 flex flex-col gap-2 p-4 sm:p-6 bg-gradient-to-t from-black/95 via-black/60 to-transparent",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative w-full h-1.5 bg-card/60 rounded-full overflow-hidden border border-primary/20",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						className: "h-full bg-gradient-to-r from-primary via-gold-soft to-primary shadow-[0_0_12px_var(--gold)]",
						style: { width: `${progress}%` }
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between font-mono text-xs text-muted-foreground mt-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: (e) => {
								e.stopPropagation();
								toggleMute();
							},
							className: "rounded p-1.5 hover:text-primary transition-colors border border-transparent hover:border-primary/30",
							"aria-label": muted ? "Unmute audio" : "Mute audio",
							children: muted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "h-4 w-4 text-accent" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "h-4 w-4 text-primary" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-foreground tracking-wider",
							children: [
								formatTime(currentTime),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground/60",
									children: "/"
								}),
								" ",
								formatTime(duration)
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3.5 w-3.5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[0.7rem] tracking-widest text-primary/80",
							children: "ROUND-2 CASE STUDY REVEAL"
						})]
					})]
				})]
			})
		]
	}, "teaser-overlay") });
}
var titleCard = { url: "/aavishkara-title-card.png" };
var akMark = { url: "/aavishkara-ak-mark.png" };
var trustLogo = { url: "/soundarya-trust.png" };
var iicLogo = { url: "/iic-logo.png" };
registerBootPreload([
	titleCard.url,
	akMark.url,
	trustLogo.url,
	iicLogo.url,
	doorway_default
]);
function Section({ children, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: `relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-6 py-24 text-center ${className}`,
		children
	});
}
function IBMWordmark() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-col items-center gap-[3px]",
		"aria-label": "IBM",
		children: [
			0,
			1,
			2,
			3,
			4,
			5,
			6
		].map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex gap-[6px]",
			children: [
				0,
				1,
				2
			].map((col) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block h-[5px] bg-foreground/90",
				style: {
					width: col === 0 ? 34 : col === 1 ? 62 : 68,
					opacity: row % 2 === 0 ? 1 : .86
				}
			}, col))
		}, row))
	});
}
function Reveal() {
	const [booting, setBooting] = (0, import_react.useState)(true);
	const [playingVideo, setPlayingVideo] = (0, import_react.useState)(false);
	const beginStudies = () => {
		const deck = document.getElementById("case-deck");
		if (!deck) return;
		const lenis = window.__lenis;
		if (lenis) lenis.scrollTo(deck, { duration: 1.1 });
		else deck.scrollIntoView({ behavior: "smooth" });
	};
	const handleBootDone = () => {
		setBooting(false);
	};
	if (booting) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BootSequence, { onDone: handleBootDone });
	if (playingVideo) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CinematicTeaser, { onDone: () => setPlayingVideo(false) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative w-full overflow-x-hidden bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmoothScroll, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ambience, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SparkBurst, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollProgress, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomCursor, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SoundToggle, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: {
						opacity: 0,
						y: 26
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: {
						delay: HERO_LOGO_DELAY,
						duration: 1.1,
						ease: EASE$1
					},
					className: "absolute left-5 top-5 sm:left-10 sm:top-10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: trustLogo.url,
						alt: "Soundarya Educational Trust",
						className: "hero-logo h-14 w-auto sm:h-20 lg:h-24"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: {
						opacity: 0,
						y: 26
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: {
						delay: HERO_LOGO_DELAY + .15,
						duration: 1.1,
						ease: EASE$1
					},
					className: "absolute right-5 top-5 sm:right-10 sm:top-10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: iicLogo.url,
						alt: "Institution's Innovation Council",
						className: "hero-logo h-10 w-auto mix-blend-screen sm:h-14 lg:h-16"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
					initial: { opacity: 0 },
					animate: { opacity: 1 },
					transition: {
						delay: .4,
						duration: 1.4,
						ease: EASE$1
					},
					className: "display mb-8 text-[0.65rem] tracking-[0.55em] text-muted-foreground sm:text-xs",
					children: "Soundarya Institute of Management and Science"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						filter: "blur(18px)",
						scale: .96
					},
					animate: {
						opacity: 1,
						filter: "blur(0px)",
						scale: 1
					},
					transition: {
						delay: .9,
						duration: 2.2,
						ease: EASE$1
					},
					className: "mouse-depth",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "sr-only",
						children: "Aavishkara ’26"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: titleCard.url,
						alt: "Aavishkara '26",
						className: "w-[min(90vw,40rem)] sm:w-[min(85vw,52rem)] lg:w-[min(78vw,62rem)]",
						style: { filter: "drop-shadow(0 0 40px rgba(245,184,0,0.22))" }
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: {
						opacity: 0,
						scaleX: 0
					},
					animate: {
						opacity: 1,
						scaleX: 1
					},
					transition: {
						delay: 2.2,
						duration: 1.2,
						ease: EASE$1
					},
					className: "mt-8 h-px w-52 bg-gradient-to-r from-transparent via-accent to-transparent shadow-[var(--glow-neon)] sm:w-72"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "display mt-8 min-h-[1.6em] text-sm tracking-[0.4em] text-foreground/80 sm:text-lg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typewriter, {
						text: "Ideate. Innovate. Impact.",
						delay: 2600,
						speed: 65
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: {
						opacity: 0,
						y: 14
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: {
						delay: 3.4,
						duration: .9,
						ease: EASE$1
					},
					className: "mt-6 flex items-center justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setPlayingVideo(true),
						className: "group flex items-center gap-2.5 rounded-full border border-primary/50 bg-card/70 px-4 py-2 font-mono text-xs text-primary shadow-[0_0_20px_-5px_var(--gold)] backdrop-blur-md transition-all hover:border-primary hover:bg-primary/20 hover:scale-105 cursor-pointer",
						"aria-label": "Play Aavishkara Teaser Video",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-3.5 w-3.5 fill-primary transition-transform group-hover:scale-110" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tracking-widest font-semibold",
							children: "PLAY TEASER TRANSMISSION (0:20)"
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: { opacity: 0 },
					animate: { opacity: 1 },
					transition: {
						delay: 5,
						duration: 1.4
					},
					className: "absolute bottom-10 flex flex-col items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "display text-[0.6rem] tracking-[0.35em] text-muted-foreground sm:text-xs",
						children: "Scroll to reveal the case study"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						animate: { y: [
							0,
							9,
							0
						] },
						transition: {
							duration: 1.9,
							repeat: Infinity,
							ease: "easeInOut"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-5 w-5 text-primary" })
					})]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: {
					opacity: 0,
					y: 24,
					filter: "blur(14px)",
					scale: .96
				},
				whileInView: {
					opacity: 1,
					y: 0,
					filter: "blur(0px)",
					scale: 1
				},
				viewport: {
					once: true,
					amount: .6
				},
				transition: {
					duration: 1.6,
					ease: EASE$1
				},
				className: "flex flex-col items-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: akMark.url,
					alt: "Aavishkara AK monogram",
					className: "w-28 sm:w-36 lg:w-44",
					style: { filter: "drop-shadow(0 0 40px rgba(245,184,0,0.35))" }
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sponsors, {})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				className: "overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.img, {
						src: doorway_default,
						alt: "",
						"aria-hidden": true,
						loading: "lazy",
						width: 1536,
						height: 1024,
						initial: {
							opacity: 0,
							scale: 1.08
						},
						whileInView: {
							opacity: .16,
							scale: 1
						},
						viewport: {
							once: true,
							amount: .4
						},
						transition: {
							duration: 2,
							ease: EASE$1
						},
						className: "pointer-events-none absolute inset-0 h-full w-full object-cover [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_72%)]"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							scale: .9
						},
						whileInView: {
							opacity: 1,
							scale: 1
						},
						viewport: {
							once: true,
							amount: .5
						},
						transition: {
							duration: 1.4,
							ease: EASE$1
						},
						className: "relative flex h-44 w-44 items-center justify-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute inset-0 rounded-full border border-accent/50",
								style: { animation: "pulse-ring 3s ease-out infinite" }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute inset-0 rounded-full border border-primary/40",
								style: { animation: "pulse-ring 3s ease-out 1.5s infinite" }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
								animate: { boxShadow: [
									"0 0 30px oklch(0.65 0.21 295 / 25%)",
									"0 0 80px oklch(0.82 0.16 85 / 45%)",
									"0 0 30px oklch(0.65 0.21 295 / 25%)"
								] },
								transition: {
									duration: 2.8,
									repeat: Infinity,
									ease: "easeInOut"
								},
								className: "flex h-24 w-24 items-center justify-center rounded-full border border-primary/50 bg-card",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-9 w-9 text-primary" })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.h2, {
						initial: {
							opacity: 0,
							y: 20
						},
						whileInView: {
							opacity: 1,
							y: 0
						},
						viewport: {
							once: true,
							amount: .5
						},
						transition: {
							duration: 1.4,
							delay: .3,
							ease: EASE$1
						},
						className: "display mt-14 text-3xl text-foreground sm:text-5xl",
						children: "The Challenge Awaits"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
						initial: { opacity: 0 },
						whileInView: { opacity: 1 },
						viewport: {
							once: true,
							amount: .5
						},
						transition: {
							duration: 1.6,
							delay: .8
						},
						className: "mt-5 max-w-md text-sm text-muted-foreground sm:text-base",
						children: "Sealed until this moment. Keep scrolling."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				className: "overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
					initial: { opacity: 0 },
					whileInView: { opacity: 1 },
					viewport: {
						once: true,
						amount: .6
					},
					transition: {
						duration: 1,
						ease: EASE$1
					},
					className: "display mb-10 text-[0.6rem] tracking-[0.5em] text-accent sm:text-xs",
					children: "The Case Studies"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mouse-depth relative w-full max-w-5xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"aria-hidden": true,
							className: "title-grid-scan absolute -inset-32"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							"aria-hidden": true,
							initial: {
								x: "-60%",
								opacity: 0
							},
							whileInView: {
								x: "120%",
								opacity: [
									0,
									1,
									1,
									0
								]
							},
							viewport: {
								once: true,
								amount: .6
							},
							transition: {
								duration: 1.7,
								delay: .25,
								ease: EASE$1
							},
							className: "absolute inset-y-0 left-0 z-20 w-40 bg-gradient-to-r from-transparent via-primary to-transparent blur-md"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "display text-glow-gold text-4xl leading-[0.95] text-primary sm:text-6xl md:text-7xl",
							"aria-label": "Twenty Problems",
							children: "Twenty Problems.".split("").map((letter, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
								initial: {
									opacity: 0,
									filter: "brightness(3) blur(8px)"
								},
								whileInView: {
									opacity: [
										0,
										1,
										.45,
										1
									],
									filter: "brightness(1) blur(0px)"
								},
								viewport: { once: true },
								transition: {
									duration: .45,
									delay: .25 + index * .045,
									ease: EASE$1
								},
								children: letter === " " ? "\xA0" : letter
							}, `${letter}-${index}`))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.h3, {
							initial: {
								opacity: 0,
								y: 14,
								filter: "blur(10px)"
							},
							whileInView: {
								opacity: 1,
								y: 0,
								filter: "blur(0px)"
							},
							viewport: {
								once: true,
								amount: .2
							},
							transition: {
								duration: 1.2,
								delay: .9,
								ease: EASE$1
							},
							className: "display mt-6 text-xl leading-tight text-foreground/85 sm:text-3xl",
							children: "One Weekend to Answer Them."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							initial: { scaleX: 0 },
							whileInView: { scaleX: 1 },
							viewport: {
								once: true,
								amount: .6
							},
							transition: {
								duration: 1.4,
								delay: 1.3,
								ease: EASE$1
							},
							className: "title-divider mx-auto mt-10 h-px w-full max-w-xl bg-gradient-to-r from-transparent via-primary to-transparent shadow-[var(--glow-gold)]"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 16
							},
							whileInView: {
								opacity: 1,
								y: 0
							},
							viewport: {
								once: true,
								amount: .6
							},
							transition: {
								duration: .6,
								delay: 1.55,
								ease: EASE$1
							},
							className: "mt-9 flex flex-col items-center gap-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5 sm:gap-2.5",
								"aria-label": `${caseStudies.length} challenges ahead`,
								children: [Array.from({ length: caseStudies.length }, (_, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
									initial: {
										scaleY: 0,
										opacity: 0
									},
									whileInView: {
										scaleY: 1,
										opacity: index % 3 === 0 ? 1 : .45
									},
									viewport: { once: true },
									transition: {
										duration: .35,
										delay: 1.4 + index * .025,
										ease: EASE$1
									},
									className: "h-4 w-px origin-bottom bg-primary sm:h-5"
								}, index)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "display ml-2 text-xs tracking-[0.38em] text-foreground/70 sm:ml-3 sm:text-sm",
									children: [caseStudies.length, " Challenges Ahead"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MagneticButton, {
								onClick: beginStudies,
								ariaLabel: "Begin the case studies",
								children: ["Begin", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-5 w-5" })]
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CaseStudyDeck, { studies: caseStudies }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.h2, {
				initial: {
					opacity: 0,
					filter: "blur(14px)"
				},
				whileInView: {
					opacity: 1,
					filter: "blur(0px)"
				},
				viewport: {
					once: true,
					amount: .5
				},
				transition: {
					duration: 1.8,
					ease: EASE$1
				},
				className: "display text-glow-gold text-4xl text-primary sm:text-6xl md:text-7xl",
				children: "Now Build the Future."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: { opacity: 0 },
				whileInView: { opacity: 1 },
				viewport: {
					once: true,
					amount: .5
				},
				transition: {
					duration: 1.6,
					delay: .7
				},
				className: "mt-16 flex flex-col items-center gap-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px w-40 bg-gradient-to-r from-transparent via-accent to-transparent" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "display text-[0.6rem] tracking-[0.45em] text-muted-foreground sm:text-xs",
						children: "Aavishkara ’26 \xA0·\xA0 Soundarya Institute of Management and Science"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-8 opacity-70",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "scale-[0.45] origin-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IBMWordmark, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-8 w-px bg-border" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "display text-sm tracking-[0.3em] text-foreground/80",
								children: "HackCulture"
							})
						]
					})
				]
			})] })
		]
	});
}
//#endregion
export { Reveal as component };
