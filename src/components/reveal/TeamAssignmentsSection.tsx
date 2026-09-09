import { useEffect, useId, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronDown,
  Layers,
  Search,
  Sparkles,
  Users,
  Shield,
  ArrowRight,
  Filter,
} from "lucide-react";
import {
  ALL_TEAMS,
  CASE_STUDY_ASSIGNMENTS,
  type AssignedCaseStudy,
  type TeamAssignment,
} from "@/data/teamAssignments";
import { playSound } from "@/lib/sound";
import { EASE } from "@/lib/motion";

interface Point {
  x: number;
  y: number;
}

interface ConnectorLine {
  id: string;
  teamName: string;
  caseStudyCode: string;
  start: Point; // Team connection point (right column)
  end: Point; // Case study connection point (left column)
  pathD: string;
}

export function TeamAssignmentsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  const [hoveredTeam, setHoveredTeam] = useState<string | null>(null);
  const [hoveredCaseStudy, setHoveredCaseStudy] = useState<string | null>(null);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<string | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [lines, setLines] = useState<ConnectorLine[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [expandedMobileCase, setExpandedMobileCase] = useState<string | null>("JP-020");

  const filterId = useId();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Filtered case studies and teams based on search query
  const filteredCaseStudies = useMemo(() => {
    if (!searchQuery.trim()) return CASE_STUDY_ASSIGNMENTS;
    const q = searchQuery.toLowerCase().trim();
    return CASE_STUDY_ASSIGNMENTS.filter(
      (cs) =>
        cs.code.toLowerCase().includes(q) ||
        cs.title.toLowerCase().includes(q) ||
        cs.category.toLowerCase().includes(q) ||
        cs.teams.some((t) => t.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const filteredTeams = useMemo(() => {
    if (!searchQuery.trim()) return ALL_TEAMS;
    const q = searchQuery.toLowerCase().trim();
    return ALL_TEAMS.filter(
      (t) =>
        t.teamName.toLowerCase().includes(q) ||
        t.caseStudyCode.toLowerCase().includes(q) ||
        t.caseStudyTitle.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Determine active highlights
  const activeCaseStudyCode = useMemo(() => {
    if (hoveredCaseStudy) return hoveredCaseStudy;
    if (selectedCaseStudy) return selectedCaseStudy;
    if (hoveredTeam) {
      const match = ALL_TEAMS.find((t) => t.teamName === hoveredTeam);
      return match ? match.caseStudyCode : null;
    }
    if (selectedTeam) {
      const match = ALL_TEAMS.find((t) => t.teamName === selectedTeam);
      return match ? match.caseStudyCode : null;
    }
    return null;
  }, [hoveredCaseStudy, selectedCaseStudy, hoveredTeam, selectedTeam]);

  const activeTeamNames = useMemo(() => {
    if (hoveredTeam) return [hoveredTeam];
    if (selectedTeam) return [selectedTeam];
    if (activeCaseStudyCode) {
      const match = CASE_STUDY_ASSIGNMENTS.find(
        (cs) => cs.code === activeCaseStudyCode
      );
      return match ? match.teams : [];
    }
    return [];
  }, [hoveredTeam, selectedTeam, activeCaseStudyCode]);

  const isAnythingActive = Boolean(activeCaseStudyCode || activeTeamNames.length > 0);

  // Recalculate SVG connector line coordinates between columns on desktop
  useEffect(() => {
    if (!isMounted) return;

    let rafId: number | null = null;

    const recalculateLines = () => {
      if (!containerRef.current || window.innerWidth < 1024) {
        setLines([]);
        return;
      }

      const containerRect = containerRef.current.getBoundingClientRect();
      const newLines: ConnectorLine[] = [];

      ALL_TEAMS.forEach((team) => {
        const teamEl = containerRef.current?.querySelector(
          `[data-team-id="${encodeURIComponent(team.teamName)}"]`
        ) as HTMLElement | null;

        const csEl = containerRef.current?.querySelector(
          `[data-cs-id="${team.caseStudyCode}"]`
        ) as HTMLElement | null;

        if (teamEl && csEl) {
          const teamRect = teamEl.getBoundingClientRect();
          const csRect = csEl.getBoundingClientRect();

          const startX = teamRect.left - containerRect.left;
          const startY = teamRect.top + teamRect.height / 2 - containerRect.top;

          const endX = csRect.right - containerRect.left;
          const endY = csRect.top + csRect.height / 2 - containerRect.top;

          const dx = startX - endX;
          const cpx1 = startX - dx * 0.45;
          const cpx2 = endX + dx * 0.45;
          const pathD = `M ${startX} ${startY} C ${cpx1} ${startY}, ${cpx2} ${endY}, ${endX} ${endY}`;

          newLines.push({
            id: `${team.teamName}->${team.caseStudyCode}`,
            teamName: team.teamName,
            caseStudyCode: team.caseStudyCode,
            start: { x: startX, y: startY },
            end: { x: endX, y: endY },
            pathD,
          });
        }
      });

      setLines(newLines);
    };

    const scheduleRecalculation = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(recalculateLines);
    };

    scheduleRecalculation();
    const timer = setTimeout(scheduleRecalculation, 150);
    const timer2 = setTimeout(scheduleRecalculation, 500);

    window.addEventListener("resize", scheduleRecalculation, { passive: true });

    const resizeObserver = new ResizeObserver(() => {
      scheduleRecalculation();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      clearTimeout(timer);
      clearTimeout(timer2);
      window.removeEventListener("resize", scheduleRecalculation);
      resizeObserver.disconnect();
    };
  }, [isMounted, filteredCaseStudies.length, filteredTeams.length]);

  return (
    <section
      id="team-assignments"
      className="relative z-10 w-full px-4 py-24 sm:px-6 lg:px-10 overflow-hidden bg-background"
    >
      {/* Background ambient accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-96 w-[80rem] bg-radial from-primary/10 via-accent/5 to-transparent blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-10 left-1/3 h-72 w-72 bg-radial from-accent/15 to-transparent blur-3xl"
      />

      <div className="mx-auto max-w-7xl">
        {/* Header Title */}
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-mono uppercase tracking-widest text-primary shadow-[0_0_15px_-4px_var(--gold)]"
          >
            <Users className="h-3.5 w-3.5" />
            <span>Official Allocations &bull; 26 Teams</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.2, delay: 0.1, ease: EASE }}
            className="display text-glow-gold mt-6 text-3xl sm:text-5xl md:text-6xl text-primary"
          >
            Team Assignments Reveal
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1, delay: 0.25 }}
            className="mt-4 max-w-2xl text-sm sm:text-base text-muted-foreground"
          >
            Explore which team tackles which enterprise challenge. Hover over any
            team to illuminate its connected problem, or select a case study to reveal
            all competing squads.
          </motion.p>

          {/* Quick Search / Filter Bar */}
          <div className="mt-8 flex w-full max-w-md items-center gap-2 rounded-full border border-primary/30 bg-card/70 px-4 py-2 shadow-[0_0_20px_-10px_var(--gold)] backdrop-blur-md">
            <Search className="h-4 w-4 text-primary/70 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Find your team or problem code (e.g., Predators, JP-011)..."
              className="w-full bg-transparent text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-xs text-muted-foreground hover:text-foreground cursor-pointer px-1"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Legend / Helper Info */}
        <div className="mt-8 hidden lg:flex items-center justify-between px-4 text-xs font-mono text-muted-foreground/80">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>CASE STUDIES (12 Problems)</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/40 bg-purple-500/10 px-2.5 py-0.5 text-[0.7rem] text-purple-300">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
              Group 1: Sri Ratan Tata Hall
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-0.5 text-[0.7rem] text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Group 2: MBA Room 107
            </span>
            <span className="flex items-center gap-2 text-foreground/70">
              <span>TEAM SQUADS (26 Teams)</span>
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* DESKTOP VIEW: Two Columns with Interactive Curved SVG Connectors (lg+)     */}
        {/* ========================================================================= */}
        <div
          ref={containerRef}
          className="relative mt-8 hidden lg:block w-full min-h-[920px]"
        >
          {/* SVG Connector Layer */}
          <svg
            className="pointer-events-none absolute inset-0 z-10 h-full w-full"
            aria-hidden
          >
            <defs>
              {/* Glow filter for active illuminated connectors */}
              <filter id="gold-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Gradient for rest state */}
              <linearGradient id="rest-line-gradient" x1="100%" y1="0%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="oklch(0.82 0.16 85)" stopOpacity="0.4" />
                <stop offset="100%" stopColor="oklch(0.82 0.16 85)" stopOpacity="0.75" />
              </linearGradient>

              {/* Gradient for active state */}
              <linearGradient id="active-line-gradient" x1="100%" y1="0%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="40%" stopColor="oklch(0.9 0.1 90)" stopOpacity="1" />
                <stop offset="100%" stopColor="oklch(0.82 0.16 85)" stopOpacity="1" />
              </linearGradient>
            </defs>

            {/* Render connector lines */}
            {lines.map((line, idx) => {
              const isConnected =
                (activeCaseStudyCode === line.caseStudyCode) ||
                activeTeamNames.includes(line.teamName);

              const isDimmed = isAnythingActive && !isConnected;

              return (
                <g key={line.id} className="transition-opacity duration-300">
                  {/* Base Curved Path */}
                  <motion.path
                    d={line.pathD}
                    fill="none"
                    stroke={isConnected ? "url(#active-line-gradient)" : "url(#rest-line-gradient)"}
                    strokeWidth={isConnected ? 3 : 1.5}
                    strokeOpacity={isDimmed ? 0.08 : isConnected ? 1 : 0.3}
                    filter={isConnected ? "url(#gold-glow)" : undefined}
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: isDimmed ? 0.08 : isConnected ? 1 : 0.3 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.9,
                      delay: Math.min(1.2, idx * 0.035),
                      ease: EASE,
                    }}
                  />

                  {/* Terminal Dot at the Case Study end */}
                  <circle
                    cx={line.end.x}
                    cy={line.end.y}
                    r={isConnected ? 4.5 : 2.5}
                    fill={isConnected ? "#ffffff" : "oklch(0.82 0.16 85)"}
                    fillOpacity={isDimmed ? 0.1 : isConnected ? 1 : 0.65}
                    filter={isConnected ? "url(#gold-glow)" : undefined}
                  />

                  {/* Active Light Pulse: Travels along the curve from Team (start) to Case Study (end) */}
                  {isConnected && (
                    <motion.path
                      d={line.pathD}
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth={4}
                      strokeLinecap="round"
                      strokeDasharray="24 160"
                      initial={{ strokeDashoffset: 0 }}
                      animate={{ strokeDashoffset: -368 }}
                      transition={{
                        duration: 1.4,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      filter="url(#gold-glow)"
                    />
                  )}
                </g>
              );
            })}
          </svg>

          {/* Desktop Grid Layout: Left Column (Case Studies) vs Right Column (Teams) */}
          <div className="relative z-20 grid grid-cols-12 gap-8 items-start">
            {/* LEFT COLUMN: Case Study Titles */}
            <div ref={leftColRef} className="col-span-6 space-y-4">
              {CASE_STUDY_ASSIGNMENTS.map((cs) => {
                const isSelected = activeCaseStudyCode === cs.code;
                const isDimmed = isAnythingActive && !isSelected;

                return (
                  <motion.div
                    key={cs.code}
                    data-cs-id={cs.code}
                    onMouseEnter={() => {
                      playSound("hover");
                      setHoveredCaseStudy(cs.code);
                    }}
                    onMouseLeave={() => setHoveredCaseStudy(null)}
                    onClick={() => {
                      playSound("click");
                      setSelectedCaseStudy((prev) => (prev === cs.code ? null : cs.code));
                      setSelectedTeam(null);
                    }}
                    whileHover={{ scale: 1.015 }}
                    transition={{ duration: 0.2 }}
                    className={`group relative rounded-xl border p-4 transition-all duration-300 cursor-pointer select-none ${
                      isSelected
                        ? "border-primary bg-card/95 shadow-[0_0_30px_-5px_var(--gold),inset_0_0_20px_rgba(245,184,0,0.15)] ring-1 ring-primary"
                        : "border-border/60 bg-card/40 hover:border-primary/60 hover:bg-card/70"
                    } ${isDimmed ? "opacity-20 blur-[0.4px]" : "opacity-100"}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                            isSelected
                              ? "bg-primary text-primary-foreground shadow-[0_0_10px_var(--gold)]"
                              : "bg-primary/15 text-primary border border-primary/30"
                          }`}
                        >
                          {cs.code}
                        </span>
                        <span className="text-[0.65rem] font-mono uppercase tracking-widest text-muted-foreground">
                          {cs.category}
                        </span>
                      </div>

                      {/* Team Counter Badge */}
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-mono font-semibold transition-colors ${
                          isSelected
                            ? "bg-accent/30 text-foreground border border-accent"
                            : "bg-secondary text-muted-foreground border border-border/80"
                        }`}
                      >
                        <Users className="h-3 w-3" />
                        {cs.teams.length} {cs.teams.length === 1 ? "team" : "teams"}
                      </span>
                    </div>

                    <h3
                      className={`mt-2 font-display text-base font-semibold tracking-wide transition-colors ${
                        isSelected ? "text-primary text-glow-gold" : "text-foreground/90 group-hover:text-primary"
                      }`}
                    >
                      {cs.title}
                    </h3>

                    {/* Active assigned team pills preview */}
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-3 pt-2.5 border-t border-primary/25 flex flex-wrap gap-2"
                      >
                        <span className="text-[0.65rem] font-mono text-muted-foreground mr-1 self-center">
                          Assigned:
                        </span>
                        {cs.teams.map((t) => {
                          const tObj = ALL_TEAMS.find((team) => team.teamName === t);
                          return (
                            <span
                              key={t}
                              className="inline-flex items-center gap-1.5 rounded bg-primary/20 border border-primary/40 px-2.5 py-1 text-[0.72rem] font-mono text-primary font-medium"
                            >
                              <span>{t}</span>
                              {tObj && (
                                <span className="text-[0.62rem] opacity-75 font-normal">
                                  ({tObj.group === 1 ? "G1" : "G2"} • {tObj.presentationTime})
                                </span>
                              )}
                            </span>
                          );
                        })}
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* RIGHT COLUMN: Team Squads (26 Teams) */}
            <div ref={rightColRef} className="col-span-6 space-y-2.5">
              <div className="grid grid-cols-2 gap-2.5">
                {ALL_TEAMS.map((team) => {
                  const isTeamActive = activeTeamNames.includes(team.teamName);
                  const isDimmed = isAnythingActive && !isTeamActive;

                  return (
                    <motion.div
                      key={team.teamName}
                      data-team-id={encodeURIComponent(team.teamName)}
                      onMouseEnter={() => {
                        playSound("hover");
                        setHoveredTeam(team.teamName);
                      }}
                      onMouseLeave={() => setHoveredTeam(null)}
                      onClick={() => {
                        playSound("click");
                        setSelectedTeam((prev) => (prev === team.teamName ? null : team.teamName));
                        setSelectedCaseStudy(null);
                      }}
                      whileHover={{ scale: 1.025 }}
                      transition={{ duration: 0.18 }}
                      className={`group relative flex flex-col justify-between rounded-lg border p-2.5 text-xs transition-all duration-300 cursor-pointer select-none ${
                        isTeamActive
                          ? "border-primary bg-primary/20 shadow-[0_0_20px_-3px_var(--gold)] ring-1 ring-primary text-foreground font-semibold"
                          : "border-border/60 bg-card/45 hover:border-primary/50 hover:bg-card/80 text-foreground/85"
                      } ${isDimmed ? "opacity-20 blur-[0.4px]" : "opacity-100"}`}
                    >
                      <div className="flex items-center justify-between gap-1.5">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span
                            className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                              isTeamActive ? "bg-primary shadow-[0_0_8px_var(--gold)]" : "bg-muted-foreground/40"
                            }`}
                          />
                          <span className="truncate font-mono font-medium">{team.teamName}</span>
                        </div>

                        <span
                          className={`shrink-0 rounded px-1.5 py-0.5 text-[0.62rem] font-mono font-bold ${
                            isTeamActive
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-primary/90 border border-primary/20"
                          }`}
                        >
                          {team.caseStudyCode}
                        </span>
                      </div>

                      <div className="mt-2 flex items-center justify-between gap-1.5 pt-1.5 border-t border-border/40">
                        <span
                          className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[0.6rem] font-mono border ${
                            team.group === 1
                              ? "border-purple-500/40 bg-purple-500/15 text-purple-300"
                              : "border-emerald-500/40 bg-emerald-500/15 text-emerald-300"
                          }`}
                        >
                          <span
                            className={`h-1 w-1 rounded-full ${
                              team.group === 1 ? "bg-purple-400" : "bg-emerald-400"
                            }`}
                          />
                          {team.group === 1 ? "G1: Ratan Tata" : "G2: MBA 107"}
                        </span>

                        <span className="text-[0.65rem] font-mono text-muted-foreground tracking-tight">
                          {team.presentationTime}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MOBILE VIEW: Accordion / List View (< 1024px)                             */}
        {/* ========================================================================= */}
        <div className="mt-8 space-y-3 lg:hidden">
          <div className="rounded-lg border border-primary/30 bg-card/60 p-3 text-center text-xs font-mono text-muted-foreground">
            Tap any case study to view its assigned squads
          </div>

          {filteredCaseStudies.map((cs) => {
            const isExpanded = expandedMobileCase === cs.code;

            return (
              <div
                key={cs.code}
                className="overflow-hidden rounded-xl border border-border/70 bg-card/70 backdrop-blur-sm transition-colors"
              >
                <button
                  type="button"
                  onClick={() => {
                    playSound("click");
                    setExpandedMobileCase(isExpanded ? null : cs.code);
                  }}
                  className="flex w-full items-center justify-between p-4 text-left cursor-pointer"
                >
                  <div className="space-y-1 pr-2">
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-primary/20 border border-primary/40 px-2 py-0.5 font-mono text-xs font-bold text-primary">
                        {cs.code}
                      </span>
                      <span className="rounded-full bg-secondary px-2 py-0.5 font-mono text-[0.7rem] text-muted-foreground">
                        {cs.teams.length} {cs.teams.length === 1 ? "team" : "teams"}
                      </span>
                    </div>
                    <h3 className="font-display text-sm font-semibold text-foreground">
                      {cs.title}
                    </h3>
                  </div>

                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 text-primary"
                  >
                    <ChevronDown className="h-5 w-5" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: EASE }}
                      className="border-t border-border/50 bg-background/60 p-4"
                    >
                      <span className="block text-[0.65rem] font-mono uppercase tracking-widest text-muted-foreground mb-2">
                        Assigned Teams ({cs.teams.length}):
                      </span>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {cs.teams.map((teamName) => {
                          const tObj = ALL_TEAMS.find((team) => team.teamName === teamName);
                          return (
                            <div
                              key={teamName}
                              className="flex flex-col gap-1.5 rounded-lg border border-primary/30 bg-card p-3 font-mono text-xs text-foreground shadow-[0_0_15px_-8px_var(--gold)]"
                            >
                              <div className="flex items-center justify-between gap-1">
                                <div className="flex items-center gap-2 min-w-0">
                                  <span className="h-2 w-2 rounded-full bg-primary shrink-0" />
                                  <span className="font-semibold truncate">{teamName}</span>
                                </div>
                                {tObj && (
                                  <span
                                    className={`shrink-0 rounded px-1.5 py-0.5 text-[0.62rem] border ${
                                      tObj.group === 1
                                        ? "border-purple-500/40 bg-purple-500/15 text-purple-300"
                                        : "border-emerald-500/40 bg-emerald-500/15 text-emerald-300"
                                    }`}
                                  >
                                    {tObj.group === 1 ? "G1: Ratan Tata" : "G2: MBA 107"}
                                  </span>
                                )}
                              </div>
                              {tObj && (
                                <div className="flex items-center justify-between text-[0.68rem] text-muted-foreground pt-1 border-t border-border/40">
                                  <span>Slot:</span>
                                  <span className="text-foreground font-medium">{tObj.presentationTime}</span>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
