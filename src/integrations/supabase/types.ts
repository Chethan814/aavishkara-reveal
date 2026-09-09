export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      submissions: {
        Row: {
          id: string;
          team_name: string;
          case_study_code: string;
          case_study_title: string;
          github_link: string;
          ppt_file_url: string;
          submitted_at: string;
        };
        Insert: {
          id?: string;
          team_name: string;
          case_study_code: string;
          case_study_title: string;
          github_link: string;
          ppt_file_url: string;
          submitted_at?: string;
        };
        Update: {
          id?: string;
          team_name?: string;
          case_study_code?: string;
          case_study_title?: string;
          github_link?: string;
          ppt_file_url?: string;
          submitted_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type SubmissionRow = Database["public"]["Tables"]["submissions"]["Row"];
export type SubmissionInsert = Database["public"]["Tables"]["submissions"]["Insert"];
