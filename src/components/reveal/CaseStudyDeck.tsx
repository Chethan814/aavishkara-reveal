import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Filter,
  Grid3X3,
  Layers,
  Search,
  X,
} from "lucide-react";

import { CaseStudyGridCard, CaseStudyPanel } from "./CaseStudySection";
import { MagneticButton } from "./MagneticButton";
import { PortalTransition } from "./PortalTransition";
import { EASE, PORTAL_SWAP, PORTAL_TOTAL } from "@/lib/motion";
import { playSound } from "@/lib/sound";
import type { CaseStudy } from "@/data/caseStudies";

export function CaseStudyDeck({ studies }: { studies: CaseStudy[] }) {
  // Navigation & View state
  const [index, setIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"deck" | "grid">("deck");
  const [transitioning, setTransitioning] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("All");

  const sectionRef = useRef<HTMLElement>(null);
  const activeChipRef = useRef<HTMLButtonElement>(null);
  const chipsContainerRef = useRef<HTMLDivElement>(null);
  const busyRef = useRef(false);
  const timersRef = useRef<number[]>([]);

  // Clear timers on unmount
  const trackTimer = useCallback((id: number) => {
    timersRef.current.push(id);
  }, []);

  useEffect(
    () => () => {
      timersRef.current.forEach((id) => window.clearTimeout(id));
      timersRef.current = [];
    },
    [],
  );

  // Available language tracks
  const languageTracks = useMemo(() => {
    const tracks = ["All"];
    studies.forEach((s) => {
      if (s.language && !tracks.includes(s.language)) {
        tracks.push(s.language);
      }
    });
    return tracks;
  }, [studies]);

  // Filtered studies
  const filteredStudies = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return studies.filter((study) => {
      const matchesLang =
        selectedLanguage === "All" || study.language === selectedLanguage;
      if (!matchesLang) return false;

      if (!query) return true;

      const codeMatch = study.code?.toLowerCase().includes(query);
      const titleMatch = study.title.toLowerCase().includes(query);
      const categoryMatch = study.category.toLowerCase().includes(query);
      const problemMatch = study.problem.toLowerCase().includes(query);
      const briefMatch = (study.brief || study.context)
        ?.toLowerCase()
        .includes(query);
      const toolsMatch = (study.tools || []).some((t) =>
        t.toLowerCase().includes(query),
      );
      const featuresMatch = (study.keyFeatures || []).some((k) =>
        k.toLowerCase().includes(query),
      );

      return (
        codeMatch ||
        titleMatch ||
        categoryMatch ||
        problemMatch ||
        briefMatch ||
        toolsMatch ||
        featuresMatch
      );
    });
  }, [studies, searchQuery, selectedLanguage]);

  // Safe active study index within filtered list
  const currentStudy = filteredStudies[index] || filteredStudies[0] || studies[0];
  const currentIndex = Math.min(index, Math.max(0, filteredStudies.length - 1));

  // Auto-scroll active chip into view
  useEffect(() => {
    if (activeChipRef.current && chipsContainerRef.current) {
      activeChipRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [currentIndex, viewMode]);

  // Navigate to previous/next in filtered list
  const go = useCallback(
    (dir: 1 | -1) => {
      if (busyRef.current) return;
      const next = currentIndex + dir;
      if (next < 0 || next >= filteredStudies.length) return;

      busyRef.current = true;
      playSound("portal");
      setTransitioning(true);

      trackTimer(
        window.setTimeout(() => {
          setIndex(next);
        }, PORTAL_SWAP),
      );

      trackTimer(
        window.setTimeout(() => {
          setTransitioning(false);
          busyRef.current = false;
          timersRef.current = [];
        }, PORTAL_TOTAL),
      );
    },
    [currentIndex, filteredStudies.length, trackTimer],
  );

  // Jump to specific index in filtered list
  const jumpTo = useCallback(
    (target: number) => {
      if (busyRef.current || target === currentIndex) return;
      if (target < 0 || target >= filteredStudies.length) return;

      busyRef.current = true;
      playSound("portal");
      setTransitioning(true);

      trackTimer(
        window.setTimeout(() => {
          setIndex(target);
        }, PORTAL_SWAP),
      );

      trackTimer(
        window.setTimeout(() => {
          setTransitioning(false);
          busyRef.current = false;
          timersRef.current = [];
        }, PORTAL_TOTAL),
      );
    },
    [currentIndex, filteredStudies.length, trackTimer],
  );

  // Jump to problem from grid card
  const selectFromGrid = useCallback(
    (study: CaseStudy) => {
      const idx = filteredStudies.findIndex((s) => s.code === study.code);
      if (idx !== -1) {
        setIndex(idx);
      }
      setViewMode("deck");
      // Smooth scroll to top of section
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [filteredStudies],
  );

  // Keyboard navigation when in Deck mode
  useEffect(() => {
    if (viewMode !== "deck") return;
    const onKey = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in search input
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }
      if (e.key === "ArrowRight" || e.key === "PageDown") {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        go(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, viewMode]);

  // Touch swipe support on deck container (horizontal only)
  const touchStart = useRef({ x: 0, y: 0 });
  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = {
      x: e.touches[0]?.clientX ?? 0,
      y: e.touches[0]?.clientY ?? 0,
    };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (viewMode !== "deck" || busyRef.current) return;
    const t = e.changedTouches[0];
    if (!t) return;
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;
    // Only trigger if horizontal swipe is dominant and significant (> 50px)
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      go(dx < 0 ? 1 : -1);
    }
  };

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === filteredStudies.length - 1;

  return (
    <section
      ref={sectionRef}
      id="case-deck"
      className="relative z-10 w-full min-h-screen py-10 px-3 sm:px-6 lg:px-12 bg-background/90"
    >
      <PortalTransition active={transitioning} />

      {/* SECTION HEADER & CONTROLS */}
      <div className="mx-auto max-w-6xl">
        {/* Top title & View Toggle */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border/40">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_var(--gold)]" />
              <span className="font-mono text-xs font-semibold tracking-widest text-primary uppercase">
                Official Hackathon Round 2
              </span>
            </div>
            <h2 className="display text-2xl sm:text-4xl font-bold tracking-tight text-foreground mt-1">
              Problem Statements
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              Explore 20 comprehensive real-world challenges presented by IBM.
            </p>
          </div>

          {/* View Mode Toggle: Deck vs Grid */}
          <div className="flex items-center gap-1.5 self-start md:self-auto rounded-xl border border-primary/30 bg-card/70 p-1 backdrop-blur-sm">
            <button
              type="button"
              onClick={() => setViewMode("deck")}
              className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 font-mono text-xs font-semibold transition-all cursor-pointer ${
                viewMode === "deck"
                  ? "bg-primary text-primary-foreground shadow-[0_0_15px_-3px_var(--gold)]"
                  : "text-muted-foreground hover:text-foreground hover:bg-card/50"
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              <span>Deck View</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 font-mono text-xs font-semibold transition-all cursor-pointer ${
                viewMode === "grid"
                  ? "bg-primary text-primary-foreground shadow-[0_0_15px_-3px_var(--gold)]"
                  : "text-muted-foreground hover:text-foreground hover:bg-card/50"
              }`}
            >
              <Grid3X3 className="h-3.5 w-3.5" />
              <span>Grid View (20)</span>
            </button>
          </div>
        </div>

        {/* SEARCH & FILTER TOOLBAR */}
        <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 rounded-xl border border-border/40 bg-card/40 p-2.5 backdrop-blur-sm">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIndex(0);
              }}
              placeholder="Search by code (e.g. J-001), keywords, technology, or title..."
              className="w-full rounded-lg border border-border/50 bg-background/80 py-1.5 pl-9 pr-8 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setIndex(0);
                }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer p-0.5"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Track Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <Filter className="h-3.5 w-3.5 text-muted-foreground shrink-0 hidden sm:inline" />
            {languageTracks.map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => {
                  setSelectedLanguage(lang);
                  setIndex(0);
                }}
                className={`shrink-0 rounded-md px-2.5 py-1 font-mono text-[0.72rem] transition-all cursor-pointer ${
                  selectedLanguage === lang
                    ? "bg-accent/25 border border-accent/60 text-accent font-semibold"
                    : "border border-border/40 bg-background/50 text-muted-foreground hover:text-foreground"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* ACTIVE PROBLEM CHIPS STRIP (Shown in Deck View) */}
        {viewMode === "deck" && filteredStudies.length > 0 && (
          <div className="mt-3 flex items-center justify-between gap-2">
            <div
              ref={chipsContainerRef}
              className="flex flex-1 items-center gap-1.5 overflow-x-auto py-1 scrollbar-none"
            >
              {filteredStudies.map((s, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={s.code || idx}
                    ref={isActive ? activeChipRef : null}
                    type="button"
                    onClick={() => jumpTo(idx)}
                    disabled={transitioning}
                    title={`${s.code}: ${s.title}`}
                    className={`shrink-0 rounded-lg px-2.5 py-1 font-mono text-xs transition-all cursor-pointer ${
                      isActive
                        ? "bg-primary font-bold text-primary-foreground shadow-[0_0_12px_var(--gold)] scale-105"
                        : "border border-border/40 bg-card/60 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                    }`}
                  >
                    {s.code || String(idx + 1).padStart(2, "0")}
                  </button>
                );
              })}
            </div>

            <span className="font-mono text-xs text-muted-foreground shrink-0 pl-2">
              {currentIndex + 1} of {filteredStudies.length}
            </span>
          </div>
        )}
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="mx-auto max-w-6xl mt-6">
        {filteredStudies.length === 0 ? (
          /* Empty search state */
          <div className="rounded-2xl border border-dashed border-border/60 bg-card/40 p-12 text-center">
            <Search className="mx-auto h-10 w-10 text-muted-foreground/50" />
            <h3 className="display mt-4 text-xl font-bold text-foreground">
              No matching problem statements found
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              No challenges match "{searchQuery}" with the selected track filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedLanguage("All");
              }}
              className="mt-5 rounded-lg border border-primary/50 bg-primary/20 px-4 py-2 text-xs font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : viewMode === "deck" ? (
          /* DECK VIEW: Single problem statement with transitions */
          <div
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            className="flex flex-col items-center"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStudy.code || currentIndex}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="w-full"
              >
                <CaseStudyPanel
                  study={currentStudy}
                  index={currentIndex}
                  total={filteredStudies.length}
                />
              </motion.div>
            </AnimatePresence>

            {/* Floating / Sticky Deck Navigation Controls */}
            <div className="sticky bottom-4 z-30 mt-6 flex w-full max-w-3xl items-center justify-between gap-3 rounded-2xl border border-primary/40 bg-card/90 p-2.5 sm:p-3 shadow-[0_10px_35px_-10px_rgba(0,0,0,0.8),0_0_25px_-5px_var(--gold)] backdrop-blur-md">
              <MagneticButton
                variant="ghost"
                onClick={() => go(-1)}
                disabled={isFirst || transitioning}
                ariaLabel="Previous problem statement"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Previous Problem</span>
                <span className="sm:hidden">Prev</span>
              </MagneticButton>

              <div className="flex flex-col items-center">
                <span className="font-mono text-xs font-bold text-primary">
                  {currentStudy.code}
                </span>
                <span className="display text-[0.65rem] tracking-widest text-muted-foreground">
                  {currentIndex + 1} / {filteredStudies.length}
                </span>
              </div>

              <MagneticButton
                onClick={() => go(1)}
                disabled={isLast || transitioning}
                ariaLabel="Next problem statement"
              >
                <span className="hidden sm:inline">
                  {isLast ? "Completed" : "Next Problem"}
                </span>
                <span className="sm:hidden">{isLast ? "End" : "Next"}</span>
                <ArrowRight className="h-4 w-4" />
              </MagneticButton>
            </div>
          </div>
        ) : (
          /* GRID CATALOG VIEW: All problems displayed in responsive cards */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredStudies.map((study, idx) => (
              <CaseStudyGridCard
                key={study.code || idx}
                study={study}
                index={idx}
                onSelect={() => selectFromGrid(study)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
