import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  FileCode,
  FileSpreadsheet,
  FileText,
  FileUp,
  Github,
  Lock,
  RefreshCw,
  Send,
  Shield,
  Sparkles,
  UploadCloud,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { ALL_TEAMS, getTeamAssignment, type TeamAssignment } from "@/data/teamAssignments";
import {
  checkExistingSubmission,
  isSupabaseConfigured,
  submitProject,
  uploadPresentationFile,
} from "@/integrations/supabase/client";
import type { SubmissionRow } from "@/integrations/supabase/types";
import { MagneticButton } from "./MagneticButton";
import { playSound } from "@/lib/sound";
import { EASE } from "@/lib/motion";

export function SubmissionSection() {
  const [selectedTeamName, setSelectedTeamName] = useState<string>("");
  const [githubLink, setGithubLink] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);

  const [securityCode, setSecurityCode] = useState<string>("");
  const [projectName, setProjectName] = useState<string>("");
  const [projectDescription, setProjectDescription] = useState<string>("");

  const [checkingExisting, setCheckingExisting] = useState<boolean>(false);
  const [existingSubmission, setExistingSubmission] = useState<SubmissionRow | null>(null);

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<SubmissionRow | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Selected team assignment details
  const teamAssignment = selectedTeamName ? getTeamAssignment(selectedTeamName) : undefined;
  const expectedSecurityCode = teamAssignment ? String(teamAssignment.teamNumber).padStart(2, "0") : "";

  // Check duplicate submission whenever a team is chosen
  useEffect(() => {
    let isCancelled = false;

    if (!selectedTeamName) {
      setExistingSubmission(null);
      return;
    }

    async function check() {
      setCheckingExisting(true);
      setErrorMessage(null);
      const res = await checkExistingSubmission(selectedTeamName);
      if (!isCancelled) {
        if (res.exists && res.submission) {
          setExistingSubmission(res.submission);
          if (res.submission.project_name) setProjectName(res.submission.project_name);
          if (res.submission.project_description) setProjectDescription(res.submission.project_description);
          if (res.submission.github_link) setGithubLink(res.submission.github_link);
        } else {
          setExistingSubmission(null);
        }
        setCheckingExisting(false);
      }
    }

    check();

    return () => {
      isCancelled = true;
    };
  }, [selectedTeamName]);

  // Handle Drag & Drop
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateAndSetFile = (selectedFile: File) => {
    const allowed = ["ppt", "pptx", "pdf"];
    const ext = selectedFile.name.split(".").pop()?.toLowerCase() || "";

    if (!allowed.includes(ext)) {
      const err = "Invalid file type. Only .ppt, .pptx, and .pdf presentations are accepted.";
      setErrorMessage(err);
      toast.error(err);
      return;
    }

    if (selectedFile.size > 50 * 1024 * 1024) {
      const err = `File exceeds 50MB limit (${(selectedFile.size / (1024 * 1024)).toFixed(1)}MB). Please compress your presentation.`;
      setErrorMessage(err);
      toast.error(err);
      return;
    }

    setErrorMessage(null);
    setFile(selectedFile);
    playSound("click");
    toast.success(`Presentation attached: ${selectedFile.name}`);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // 1. Validation
    if (!selectedTeamName || !teamAssignment) {
      const err = "Please select your assigned Team Name.";
      setErrorMessage(err);
      toast.error(err);
      return;
    }

    const trimmedCode = securityCode.trim();
    if (!trimmedCode) {
      const err = "Please enter your 2-digit Security Code.";
      setErrorMessage(err);
      toast.error(err);
      return;
    }

    if (trimmedCode !== expectedSecurityCode) {
      const err = "Invalid Security Code for the selected team.";
      setErrorMessage(err);
      toast.error(err);
      return;
    }

    const trimmedProjectName = projectName.trim();
    if (!trimmedProjectName) {
      const err = "Project Name is required.";
      setErrorMessage(err);
      toast.error(err);
      return;
    }

    const trimmedGit = githubLink.trim();
    if (!trimmedGit) {
      const err = "GitHub repository URL is required.";
      setErrorMessage(err);
      toast.error(err);
      return;
    }

    if (!trimmedGit.startsWith("https://github.com/")) {
      const err = "GitHub link must start with https://github.com/";
      setErrorMessage(err);
      toast.error(err);
      return;
    }

    if (!file) {
      const err = "Please upload your presentation file (.ppt, .pptx, or .pdf).";
      setErrorMessage(err);
      toast.error(err);
      return;
    }

    // 2. Submission in progress
    setSubmitting(true);
    playSound("click");

    try {
      // Step A: Upload presentation file to storage bucket
      const uploadRes = await uploadPresentationFile(file, selectedTeamName);
      if (uploadRes.error || !uploadRes.url) {
        throw new Error(uploadRes.error || "Failed to upload presentation file.");
      }

      // Step B: Insert row into submissions table
      const subRes = await submitProject({
        team_name: selectedTeamName,
        case_study_code: teamAssignment.caseStudyCode,
        case_study_title: teamAssignment.caseStudyTitle,
        project_name: trimmedProjectName,
        project_description: projectDescription.trim(),
        github_link: trimmedGit,
        ppt_file_url: uploadRes.url,
      });

      if (!subRes.success || !subRes.data) {
        throw new Error(subRes.error || "Failed to record submission in database.");
      }

      // Success
      setSubmissionSuccess(subRes.data);
      setExistingSubmission(subRes.data);
      toast.success(
        `Submission received for ${selectedTeamName} — ${teamAssignment.caseStudyCode}!`
      );
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setSelectedTeamName("");
    setSecurityCode("");
    setProjectName("");
    setProjectDescription("");
    setGithubLink("");
    setFile(null);
    setSubmissionSuccess(null);
    setExistingSubmission(null);
    setErrorMessage(null);
  };

  return (
    <section
      id="submit-project"
      className="relative z-10 w-full px-4 py-24 sm:px-6 lg:px-10 overflow-hidden bg-background"
    >
      {/* Background ambient lighting */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 left-1/2 -translate-x-1/2 h-96 w-[60rem] bg-radial from-primary/10 via-neon/5 to-transparent blur-3xl"
      />

      <div className="mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-mono uppercase tracking-widest text-primary shadow-[0_0_15px_-4px_var(--gold)]"
          >
            <Send className="h-3.5 w-3.5" />
            <span>Final Deliverable Submission</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.2, delay: 0.1, ease: EASE }}
            className="display text-glow-gold mt-6 text-3xl sm:text-5xl md:text-6xl text-primary uppercase"
          >
            Submit Your Project
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1, delay: 0.25 }}
            className="mt-4 max-w-xl text-sm sm:text-base text-muted-foreground"
          >
            Submit your team's code repository and presentation deck for final jury
            evaluation. All uploads are securely stored and timestamped.
          </motion.p>
        </div>

        {/* Main Content Area */}
        <div className="mt-12">
          {/* =============================================================== */}
          {/* SUCCESS STATE                                                   */}
          {/* =============================================================== */}
          {submissionSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="rounded-2xl border border-primary/70 bg-card/90 p-8 sm:p-12 text-center shadow-[0_0_50px_-10px_var(--gold)] backdrop-blur-md"
            >
              {/* Checkmark with glow pulse */}
              <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
                <motion.span
                  className="absolute inset-0 rounded-full border-2 border-primary/60"
                  animate={{ scale: [1, 1.4, 1], opacity: [0.8, 0, 0.8] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                />
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/20 border border-primary text-primary shadow-[0_0_30px_var(--gold)]">
                  <CheckCircle2 className="h-10 w-10 text-primary" />
                </div>
              </div>

              <h3 className="display text-glow-gold mt-6 text-2xl sm:text-3xl text-primary font-bold">
                Submission Received!
              </h3>

              <div className="mt-3 inline-block rounded-full bg-primary/15 border border-primary/30 px-4 py-1 font-mono text-sm text-foreground font-semibold">
                {submissionSuccess.team_name} &bull; {submissionSuccess.case_study_code}
              </div>

              <p className="mt-3 text-sm text-muted-foreground max-w-md mx-auto">
                Your project submission has been recorded and safely preserved in the
                Aavishkara '26 cloud registry.
              </p>

              {/* Submission summary card */}
              <div className="mx-auto mt-8 max-w-lg rounded-xl border border-border/80 bg-secondary/40 p-4 text-left font-mono text-xs space-y-2">
                {submissionSuccess.project_name && (
                  <div className="flex justify-between border-b border-border/50 pb-2">
                    <span className="text-muted-foreground">Project Name:</span>
                    <span className="font-bold text-primary truncate max-w-[240px]">
                      {submissionSuccess.project_name}
                    </span>
                  </div>
                )}
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">Case Study:</span>
                  <span className="font-semibold text-foreground truncate max-w-[240px]">
                    {submissionSuccess.case_study_title}
                  </span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">GitHub Repo:</span>
                  <a
                    href={submissionSuccess.github_link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary hover:underline flex items-center gap-1 truncate max-w-[240px]"
                  >
                    {submissionSuccess.github_link}
                    <ExternalLink className="h-3 w-3 shrink-0" />
                  </a>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">Presentation:</span>
                  <a
                    href={submissionSuccess.ppt_file_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary hover:underline flex items-center gap-1"
                  >
                    View File
                    <ExternalLink className="h-3 w-3 shrink-0" />
                  </a>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-muted-foreground">Submitted At:</span>
                  <span className="text-foreground">
                    {new Date(submissionSuccess.submitted_at).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="rounded-full border border-primary/50 bg-primary/10 px-6 py-2.5 font-mono text-xs font-semibold uppercase tracking-widest text-primary hover:bg-primary/20 transition-colors cursor-pointer"
                >
                  Submit Another Project
                </button>
              </div>
            </motion.div>
          ) : (
            /* =============================================================== */
            /* SUBMISSION FORM                                                 */
            /* =============================================================== */
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-primary/35 bg-card/75 p-6 sm:p-10 shadow-[0_0_40px_-15px_rgba(0,0,0,0.8)] backdrop-blur-md space-y-8"
            >

              {/* Error Message Box */}
              {errorMessage && (
                <div className="flex items-start gap-3 rounded-xl border border-destructive/60 bg-destructive/10 p-4 text-xs font-mono text-destructive">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <div className="flex-1">{errorMessage}</div>
                  <button
                    type="button"
                    onClick={() => setErrorMessage(null)}
                    className="cursor-pointer text-destructive hover:opacity-70"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}

              {/* 1. Team Selector Dropdown */}
              <div className="space-y-2">
                <label
                  htmlFor="team-select"
                  className="block font-mono text-xs uppercase tracking-widest text-primary font-bold"
                >
                  1. Select Your Team <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <select
                    id="team-select"
                    value={selectedTeamName}
                    onChange={(e) => {
                      setSelectedTeamName(e.target.value);
                      playSound("click");
                    }}
                    className="w-full rounded-xl border border-border/80 bg-secondary/60 px-4 py-3.5 font-mono text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer transition-colors"
                  >
                    <option value="" disabled>
                      -- Choose from 26 assigned teams --
                    </option>
                    {ALL_TEAMS.map((team) => (
                      <option key={team.teamName} value={team.teamName}>
                        {team.teamName} — {team.caseStudyCode} (Group {team.group}: {team.presentationHall} • {team.presentationTime})
                      </option>
                    ))}
                  </select>
                </div>
                <p className="text-[0.7rem] font-mono text-muted-foreground">
                  Your assigned challenge will be automatically locked and verified upon selection.
                </p>
              </div>

              {/* 2. Security Code Field */}
              <div className="space-y-2">
                <label
                  htmlFor="security-code"
                  className="block font-mono text-xs uppercase tracking-widest text-primary font-bold"
                >
                  2. Security Code <span className="text-destructive">*</span>
                </label>
                <div className="relative flex items-center">
                  <div className="pointer-events-none absolute left-3.5 text-muted-foreground">
                    <Shield className="h-4 w-4 text-primary" />
                  </div>
                  <input
                    id="security-code"
                    type="password"
                    maxLength={2}
                    value={securityCode}
                    onChange={(e) => setSecurityCode(e.target.value)}
                    placeholder="Enter 2-digit security code"
                    required
                    className="w-full rounded-xl border border-border/80 bg-secondary/60 py-3.5 pl-10 pr-4 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                  />
                </div>
                <p className="text-[0.7rem] font-mono text-muted-foreground">
                  Enter your team's assigned 2-digit authorization code to submit or update project deliverables.
                </p>
              </div>

              {/* 3. Project Name & Description Fields */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="project-name"
                    className="block font-mono text-xs uppercase tracking-widest text-primary font-bold"
                  >
                    3. Project Name <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="project-name"
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="Enter your official project / solution name"
                    required
                    className="w-full rounded-xl border border-border/80 bg-secondary/60 px-4 py-3.5 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="project-description"
                    className="block font-mono text-xs uppercase tracking-widest text-muted-foreground font-bold"
                  >
                    Project Summary / Description
                  </label>
                  <textarea
                    id="project-description"
                    rows={3}
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    placeholder="Briefly describe your team's solution, core tech stack, and key features..."
                    className="w-full rounded-xl border border-border/80 bg-secondary/60 px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors resize-none"
                  />
                </div>
              </div>

              {/* 4. Auto-Displayed Read-Only Assigned Case Study Field */}
              <div className="space-y-2">
                <label className="block font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  4. Assigned Case Study (Auto-Verified)
                </label>
                {teamAssignment ? (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl border border-primary/60 bg-primary/10 p-4 sm:p-5 text-foreground shadow-[inset_0_0_20px_rgba(245,184,0,0.08)] space-y-3"
                  >
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2">
                        <Lock className="h-4 w-4 text-primary" />
                        <span className="font-mono text-xs font-bold text-primary px-2 py-0.5 rounded bg-primary/20 border border-primary/40">
                          {teamAssignment.caseStudyCode}
                        </span>
                        <span className="flex items-center gap-1 text-[0.72rem] font-mono text-primary font-semibold">
                          <Sparkles className="h-3 w-3" />
                          Locked to {teamAssignment.teamName}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-[0.68rem] font-mono border ${
                            teamAssignment.group === 1
                              ? "border-purple-500/40 bg-purple-500/15 text-purple-300"
                              : "border-emerald-500/40 bg-emerald-500/15 text-emerald-300"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              teamAssignment.group === 1 ? "bg-purple-400" : "bg-emerald-400"
                            }`}
                          />
                          Group {teamAssignment.group} • {teamAssignment.presentationHall}
                        </span>
                        <span className="rounded bg-secondary/80 px-2 py-0.5 text-[0.68rem] font-mono text-muted-foreground border border-border/50">
                          {teamAssignment.presentationTime}
                        </span>
                      </div>
                    </div>

                    <h4 className="font-display text-base sm:text-lg font-bold text-foreground">
                      {teamAssignment.caseStudyTitle}
                    </h4>
                  </motion.div>
                ) : (
                  <div className="rounded-xl border border-dashed border-border/70 bg-card/40 p-4 text-center font-mono text-xs text-muted-foreground">
                    Please select a team above to view your confirmed problem statement.
                  </div>
                )}
              </div>

              {/* 5. GitHub Link Input */}
              <div className="space-y-2">
                <label
                  htmlFor="github-link"
                  className="block font-mono text-xs uppercase tracking-widest text-primary font-bold"
                >
                  5. GitHub Repository Link <span className="text-destructive">*</span>
                </label>
                <div className="relative flex items-center">
                  <div className="pointer-events-none absolute left-3.5 text-muted-foreground">
                    <Github className="h-4 w-4" />
                  </div>
                  <input
                    id="github-link"
                    type="url"
                    value={githubLink}
                    onChange={(e) => setGithubLink(e.target.value)}
                    placeholder="https://github.com/your-team/aavishkara-project"
                    required
                    className="w-full rounded-xl border border-border/80 bg-secondary/60 py-3.5 pl-10 pr-4 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                  />
                </div>
                <p className="text-[0.7rem] font-mono text-muted-foreground">
                  Must start with <code className="text-primary font-semibold">https://github.com/</code> and be publicly accessible.
                </p>
              </div>

              {/* 6. PPT Presentation File Upload Zone */}
              <div className="space-y-2">
                <label className="block font-mono text-xs uppercase tracking-widest text-primary font-bold">
                  6. Presentation Deck (.ppt, .pptx, .pdf) <span className="text-destructive">*</span>
                </label>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".ppt,.pptx,.pdf,application/pdf,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                  onChange={handleFileChange}
                  className="hidden"
                  id="ppt-file-upload"
                />

                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`group relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition-all duration-300 cursor-pointer ${
                    dragActive
                      ? "border-primary bg-primary/20 shadow-[0_0_30px_var(--gold)] scale-[1.01]"
                      : file
                      ? "border-primary/80 bg-primary/10 shadow-[0_0_20px_-5px_var(--gold)]"
                      : "border-border/80 bg-secondary/40 hover:border-primary/60 hover:bg-secondary/60"
                  }`}
                >
                  {file ? (
                    <div className="flex flex-col items-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/20 text-primary border border-primary/50 shadow-[0_0_15px_var(--gold)]">
                        <FileText className="h-7 w-7" />
                      </div>
                      <span className="mt-3 font-mono text-sm font-bold text-foreground">
                        {file.name}
                      </span>
                      <span className="mt-1 font-mono text-xs text-muted-foreground">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB &bull; Ready for upload
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFile(null);
                        }}
                        className="mt-4 rounded-full border border-destructive/50 bg-destructive/15 px-3 py-1 font-mono text-xs text-destructive hover:bg-destructive/30 transition-colors cursor-pointer"
                      >
                        Remove / Replace File
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary border border-primary/30 group-hover:scale-110 group-hover:border-primary transition-transform">
                        <UploadCloud className="h-6 w-6" />
                      </div>
                      <span className="mt-3 font-display text-sm tracking-wider uppercase text-foreground">
                        Drag & Drop Presentation Deck Here
                      </span>
                      <span className="mt-1 font-mono text-xs text-muted-foreground">
                        or click to browse from device (Max 50MB)
                      </span>
                      <span className="mt-2 rounded bg-secondary px-2 py-0.5 font-mono text-[0.65rem] text-primary/80 border border-border">
                        Supported formats: .pptx, .ppt, .pdf
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 flex flex-col items-center">
                <MagneticButton
                  type="submit"
                  disabled={submitting || checkingExisting}
                  className="w-full sm:w-auto min-w-[280px] justify-center"
                >
                  {submitting ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <span>Uploading & Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Submit Project Final</span>
                    </>
                  )}
                </MagneticButton>

                <p className="mt-4 text-center font-mono text-[0.7rem] text-muted-foreground">
                  By submitting, you confirm this work is original and complies with hackathon rules.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
