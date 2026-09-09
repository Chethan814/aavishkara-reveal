import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Calendar,
  Clock,
  ExternalLink,
  Filter,
  MapPin,
  Search,
  Sparkles,
  Users,
} from "lucide-react";
import { ALL_TEAMS, type TeamAssignment } from "@/data/teamAssignments";
import { playSound } from "@/lib/sound";
import { EASE } from "@/lib/motion";

export function ScheduleSection() {
  const [selectedHallFilter, setSelectedHallFilter] = useState<"all" | "g1" | "g2">("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter teams based on selected venue tab and search query
  const group1Teams = useMemo(() => {
    return ALL_TEAMS.filter((t) => t.group === 1);
  }, []);

  const group2Teams = useMemo(() => {
    return ALL_TEAMS.filter((t) => t.group === 2);
  }, []);

  const filterList = (list: TeamAssignment[]) => {
    if (!searchQuery.trim()) return list;
    const q = searchQuery.toLowerCase().trim();
    return list.filter(
      (t) =>
        t.teamName.toLowerCase().includes(q) ||
        t.caseStudyCode.toLowerCase().includes(q) ||
        t.caseStudyTitle.toLowerCase().includes(q) ||
        t.presentationTime.toLowerCase().includes(q)
    );
  };

  const filteredG1 = useMemo(() => filterList(group1Teams), [group1Teams, searchQuery]);
  const filteredG2 = useMemo(() => filterList(group2Teams), [group2Teams, searchQuery]);

  return (
    <section
      id="presentation-schedule"
      className="relative z-10 w-full px-4 py-24 sm:px-6 lg:px-10 overflow-hidden bg-background"
    >
      {/* Background ambient lighting */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/4 h-96 w-96 bg-radial from-purple-900/15 via-transparent to-transparent blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-1/4 h-96 w-96 bg-radial from-emerald-900/15 via-transparent to-transparent blur-3xl"
      />

      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-mono uppercase tracking-widest text-primary shadow-[0_0_15px_-4px_var(--gold)]"
          >
            <Clock className="h-3.5 w-3.5" />
            <span>Jury Pitch Timeline &bull; 10 Mins Per Team</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.2, delay: 0.1, ease: EASE }}
            className="display text-glow-gold mt-6 text-3xl sm:text-5xl md:text-6xl text-primary uppercase"
          >
            Presentation Schedule
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1, delay: 0.25 }}
            className="mt-4 max-w-2xl text-sm sm:text-base text-muted-foreground"
          >
            Following final project uploads, all 26 teams will present live to the
            jury panels across two designated halls. Review your team's allocated time
            window and report 10 minutes prior to your slot.
          </motion.p>

          {/* Hall Filter Tabs & Search Bar */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full max-w-2xl justify-center">
            {/* Filter Tabs */}
            <div className="flex rounded-full border border-border/80 bg-card/80 p-1 backdrop-blur-md">
              <button
                type="button"
                onClick={() => {
                  playSound("click");
                  setSelectedHallFilter("all");
                }}
                className={`rounded-full px-4 py-1.5 font-mono text-xs font-semibold transition-all cursor-pointer ${
                  selectedHallFilter === "all"
                    ? "bg-primary text-primary-foreground shadow-[0_0_15px_var(--gold)]"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Both Halls (26)
              </button>

              <button
                type="button"
                onClick={() => {
                  playSound("click");
                  setSelectedHallFilter("g1");
                }}
                className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 font-mono text-xs font-semibold transition-all cursor-pointer ${
                  selectedHallFilter === "g1"
                    ? "bg-purple-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.6)]"
                    : "text-purple-300 hover:text-purple-200"
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                Ratan Tata Hall
              </button>

              <button
                type="button"
                onClick={() => {
                  playSound("click");
                  setSelectedHallFilter("g2");
                }}
                className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 font-mono text-xs font-semibold transition-all cursor-pointer ${
                  selectedHallFilter === "g2"
                    ? "bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.6)]"
                    : "text-emerald-300 hover:text-emerald-200"
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                MBA Room 107
              </button>
            </div>

            {/* Quick Search */}
            <div className="flex items-center gap-2 rounded-full border border-border/80 bg-card/80 px-3.5 py-1.5 w-full sm:w-64 backdrop-blur-md">
              <Search className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search team or time..."
                className="w-full bg-transparent text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none font-mono"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-xs text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  &times;
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Schedule Grid: Dual-Column Timeline for Parallel Halls */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* ========================================================================= */}
          {/* GROUP 1: SRI RATAN TATA HALL                                              */}
          {/* ========================================================================= */}
          {(selectedHallFilter === "all" || selectedHallFilter === "g1") && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: EASE }}
              className={`space-y-4 ${
                selectedHallFilter === "g1" ? "lg:col-span-2 max-w-4xl mx-auto w-full" : ""
              }`}
            >
              {/* Group 1 Header Card */}
              <div className="rounded-2xl border border-purple-500/40 bg-purple-950/20 p-5 backdrop-blur-md shadow-[0_0_30px_-10px_rgba(147,51,234,0.3)]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-500/20 border border-purple-500/50 text-purple-300 font-mono font-bold text-xs">
                      G1
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-bold text-purple-200">
                        Group 1 &bull; Sri Ratan Tata Hall
                      </h3>
                      <p className="font-mono text-xs text-purple-300/70 flex items-center gap-1.5 mt-0.5">
                        <MapPin className="h-3 w-3" />
                        Main Auditorium Floor &bull; 9:00 AM – 11:22 AM
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full bg-purple-500/20 border border-purple-500/40 px-3 py-1 font-mono text-xs font-semibold text-purple-300">
                    {filteredG1.length} {filteredG1.length === 1 ? "Slot" : "Slots"}
                  </span>
                </div>
              </div>

              {/* Slots List */}
              <div className="space-y-3">
                {filteredG1.map((team, idx) => (
                  <motion.div
                    key={team.teamName}
                    whileHover={{ scale: 1.015 }}
                    onMouseEnter={() => playSound("hover")}
                    className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-border/70 bg-card/60 p-4 transition-all duration-200 hover:border-purple-500/60 hover:bg-card/90 hover:shadow-[0_0_20px_-5px_rgba(147,51,234,0.3)]"
                  >
                    {/* Time Slot Badge & Slot Number */}
                    <div className="flex items-center gap-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-muted-foreground font-mono text-xs font-semibold shrink-0">
                        {idx + 1}
                      </span>

                      <div className="flex items-center gap-2 rounded-lg border border-purple-500/30 bg-purple-500/10 px-3 py-1.5 shrink-0">
                        <Clock className="h-3.5 w-3.5 text-purple-400" />
                        <span className="font-mono text-xs font-bold text-purple-200">
                          {team.presentationTime}
                        </span>
                      </div>
                    </div>

                    {/* Team & Case Study Info */}
                    <div className="flex-1 sm:px-3">
                      <div className="flex items-center gap-2">
                        <h4 className="font-mono text-sm font-bold text-foreground group-hover:text-purple-200 transition-colors">
                          {team.teamName}
                        </h4>
                        <span className="rounded bg-primary/20 border border-primary/40 px-1.5 py-0.2 text-[0.65rem] font-mono font-bold text-primary">
                          {team.caseStudyCode}
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
                        {team.caseStudyTitle}
                      </p>
                    </div>

                    {/* Hall tag */}
                    <div className="shrink-0 self-start sm:self-center">
                      <span className="inline-flex items-center gap-1 rounded bg-purple-950/40 border border-purple-800/40 px-2 py-0.5 font-mono text-[0.65rem] text-purple-300">
                        Sri Ratan Tata Hall
                      </span>
                    </div>
                  </motion.div>
                ))}

                {filteredG1.length === 0 && (
                  <div className="rounded-xl border border-dashed border-border/60 bg-card/30 p-8 text-center font-mono text-xs text-muted-foreground">
                    No teams found matching "{searchQuery}" in Group 1.
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* GROUP 2: MBA ROOM 107                                                     */}
          {/* ========================================================================= */}
          {(selectedHallFilter === "all" || selectedHallFilter === "g2") && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
              className={`space-y-4 ${
                selectedHallFilter === "g2" ? "lg:col-span-2 max-w-4xl mx-auto w-full" : ""
              }`}
            >
              {/* Group 2 Header Card */}
              <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/20 p-5 backdrop-blur-md shadow-[0_0_30px_-10px_rgba(16,185,129,0.3)]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 font-mono font-bold text-xs">
                      G2
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-bold text-emerald-200">
                        Group 2 &bull; MBA Room 107
                      </h3>
                      <p className="font-mono text-xs text-emerald-300/70 flex items-center gap-1.5 mt-0.5">
                        <MapPin className="h-3 w-3" />
                        MBA Department Block &bull; 9:00 AM – 11:22 AM
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full bg-emerald-500/20 border border-emerald-500/40 px-3 py-1 font-mono text-xs font-semibold text-emerald-300">
                    {filteredG2.length} {filteredG2.length === 1 ? "Slot" : "Slots"}
                  </span>
                </div>
              </div>

              {/* Slots List */}
              <div className="space-y-3">
                {filteredG2.map((team, idx) => (
                  <motion.div
                    key={team.teamName}
                    whileHover={{ scale: 1.015 }}
                    onMouseEnter={() => playSound("hover")}
                    className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-border/70 bg-card/60 p-4 transition-all duration-200 hover:border-emerald-500/60 hover:bg-card/90 hover:shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)]"
                  >
                    {/* Time Slot Badge & Slot Number */}
                    <div className="flex items-center gap-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-muted-foreground font-mono text-xs font-semibold shrink-0">
                        {idx + 1}
                      </span>

                      <div className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 shrink-0">
                        <Clock className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="font-mono text-xs font-bold text-emerald-200">
                          {team.presentationTime}
                        </span>
                      </div>
                    </div>

                    {/* Team & Case Study Info */}
                    <div className="flex-1 sm:px-3">
                      <div className="flex items-center gap-2">
                        <h4 className="font-mono text-sm font-bold text-foreground group-hover:text-emerald-200 transition-colors">
                          {team.teamName}
                        </h4>
                        <span className="rounded bg-primary/20 border border-primary/40 px-1.5 py-0.2 text-[0.65rem] font-mono font-bold text-primary">
                          {team.caseStudyCode}
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
                        {team.caseStudyTitle}
                      </p>
                    </div>

                    {/* Hall tag */}
                    <div className="shrink-0 self-start sm:self-center">
                      <span className="inline-flex items-center gap-1 rounded bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5 font-mono text-[0.65rem] text-emerald-300">
                        MBA Room 107
                      </span>
                    </div>
                  </motion.div>
                ))}

                {filteredG2.length === 0 && (
                  <div className="rounded-xl border border-dashed border-border/60 bg-card/30 p-8 text-center font-mono text-xs text-muted-foreground">
                    No teams found matching "{searchQuery}" in Group 2.
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
