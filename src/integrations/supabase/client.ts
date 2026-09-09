import { createClient } from "@supabase/supabase-js";
import type { Database, SubmissionInsert, SubmissionRow } from "./types";

const supabaseUrl = (import.meta.env["VITE_SUPABASE_URL"] as string) || "";
const supabaseAnonKey =
  (import.meta.env["VITE_SUPABASE_ANON_KEY"] as string) ||
  (import.meta.env["VITE_SUPABASE_PUBLISHABLE_KEY"] as string) ||
  "";

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.startsWith("http") &&
    !supabaseUrl.includes("your-project-url") &&
    !supabaseUrl.includes("placeholder")
);

// Instantiate Supabase client (using fallback dummy values if not configured yet to prevent crash)
export const supabase = createClient<Database>(
  isSupabaseConfigured ? supabaseUrl : "https://placeholder-project.supabase.co",
  isSupabaseConfigured ? supabaseAnonKey : "placeholder-anon-key"
);

const LOCAL_STORAGE_KEY = "aavishkara_submissions_cache";

function getLocalSubmissions(): SubmissionRow[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalSubmission(sub: SubmissionRow) {
  try {
    const existing = getLocalSubmissions();
    const updated = [sub, ...existing.filter((s) => s.team_name !== sub.team_name)];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error("Local storage error:", err);
  }
}

/**
 * Check if a team has already submitted
 */
export async function checkExistingSubmission(
  teamName: string
): Promise<{ exists: boolean; submission?: SubmissionRow }> {
  if (!teamName) return { exists: false };

  const raw = teamName.trim().toLowerCase();
  const cleaned = raw.replace(/^team\s*\d+\s*[-–]\s*/i, "").trim();

  // First check local storage cache if available
  const localList = getLocalSubmissions();
  const localMatch = localList.find((s) => {
    const sName = s.team_name.trim().toLowerCase();
    const sCleaned = sName.replace(/^team\s*\d+\s*[-–]\s*/i, "").trim();
    return (
      sName === raw ||
      sCleaned === cleaned ||
      sName.includes(cleaned) ||
      cleaned.includes(sCleaned)
    );
  });

  if (isSupabaseConfigured) {
    try {
      // 1. Try exact match
      const { data, error } = await (supabase
        .from("submissions") as any)
        .select("*")
        .or(`team_name.eq.${teamName},team_name.ilike.%${cleaned}%`)
        .order("submitted_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.warn("Supabase query error, falling back to local cache:", error);
        return { exists: Boolean(localMatch), ...(localMatch ? { submission: localMatch } : {}) };
      }

      if (data) {
        saveLocalSubmission(data as SubmissionRow);
        return { exists: true, submission: data as SubmissionRow };
      }
    } catch (err) {
      console.warn("Supabase connection issue:", err);
    }
  }

  return { exists: Boolean(localMatch), ...(localMatch ? { submission: localMatch } : {}) };
}

/**
 * Upload presentation file to Supabase Storage bucket `team-submissions`
 */
export async function uploadPresentationFile(
  file: File,
  teamName: string
): Promise<{ url: string; error?: string }> {
  if (!file) return { url: "", error: "No file provided" };

  const sanitizeName = (str: string) => str.replace(/[^a-zA-Z0-9_-]/g, "_").toLowerCase();
  const ext = file.name.split(".").pop() || "pdf";
  const fileName = `${sanitizeName(teamName)}_${Date.now()}.${ext}`;
  const filePath = `presentations/${fileName}`;

  if (!isSupabaseConfigured) {
    // Demo fallback URL
    const demoUrl = URL.createObjectURL(file);
    return { url: demoUrl };
  }

  try {
    const { error } = await supabase.storage
      .from("team-submissions")
      .upload(filePath, file, { upsert: true, contentType: file.type });

    if (error) {
      console.error("Storage upload error:", error);
      return { url: "", error: error.message };
    }

    const { data: publicUrlData } = supabase.storage
      .from("team-submissions")
      .getPublicUrl(filePath);

    return { url: publicUrlData.publicUrl };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Upload error";
    return { url: "", error: msg };
  }
}

/**
 * Submit or update project submission
 */
export async function submitProject(payload: {
  team_name: string;
  case_study_code: string;
  case_study_title: string;
  github_link: string;
  ppt_file_url: string;
  submitted_at?: string;
}): Promise<{ success: boolean; data?: SubmissionRow; error?: string }> {
  const newRow: SubmissionRow = {
    id: `sub_${Date.now()}`,
    team_name: payload.team_name,
    case_study_code: payload.case_study_code,
    case_study_title: payload.case_study_title,
    github_link: payload.github_link,
    ppt_file_url: payload.ppt_file_url,
    submitted_at: payload.submitted_at || new Date().toISOString(),
  };

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await (supabase
        .from("submissions") as any)
        .insert({
          team_name: payload.team_name,
          case_study_code: payload.case_study_code,
          case_study_title: payload.case_study_title,
          github_link: payload.github_link,
          ppt_file_url: payload.ppt_file_url,
        })
        .select()
        .single();

      if (error) {
        console.error("Database submission error:", error);
        return { success: false, error: error.message };
      }

      saveLocalSubmission(data as SubmissionRow);
      return { success: true, data: data as SubmissionRow };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Database error";
      return { success: false, error: msg };
    }
  }

  // Demo fallback
  saveLocalSubmission(newRow);
  return { success: true, data: newRow };
}
