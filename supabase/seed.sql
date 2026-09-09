-- Demo Submissions Seed Data
-- Run this in your Supabase SQL Editor if you want to insert or re-seed sample team submissions

insert into public.submissions (team_name, case_study_code, case_study_title, github_link, ppt_file_url, submitted_at)
values
  (
    'Team 10 - Ace',
    'JP-001',
    'Log Security Analyzer & Dynamic Risk Profiler',
    'https://github.com/team-ace/aavishkara-log-analyzer',
    'https://wotingreicdjvcebpvew.supabase.co/storage/v1/object/public/team-submissions/uploads/team_10_ace_demo.pdf',
    now() - interval '5 hours'
  ),
  (
    'Team 01 - Predators',
    'JP-020',
    'Enterprise Document Question-Answering with RAG',
    'https://github.com/predators-ai/rag-enterprise-engine',
    'https://wotingreicdjvcebpvew.supabase.co/storage/v1/object/public/team-submissions/uploads/team_01_predators_demo.pdf',
    now() - interval '2 hours'
  ),
  (
    'Team 07 - TechMinds',
    'JP-011',
    'Employee Skill Gap Analyzer & Learning Path Recommender',
    'https://github.com/techminds-org/skill-gap-recommender',
    'https://wotingreicdjvcebpvew.supabase.co/storage/v1/object/public/team-submissions/uploads/team_07_techminds_demo.pdf',
    now() - interval '1 hour'
  ),
  (
    'Team 15 - Vortex',
    'JP-012',
    'Customer Arrival Queue Simulation & Resource Allocation Optimizer',
    'https://github.com/vortex-dev/queue-simulation-opt',
    'https://wotingreicdjvcebpvew.supabase.co/storage/v1/object/public/team-submissions/uploads/team_15_vortex_demo.pdf',
    now() - interval '3 hours'
  )
on conflict do nothing;
