/** Shared motion constants — single source of truth for site-wide timing. */

/** easeOutExpo-ish curve used for every major transition. */
export const EASE = [0.22, 1, 0.36, 1] as const;

/** Total duration of the case-study portal transition (ms). */
export const PORTAL_TOTAL = 2200;
/** Point inside the portal transition where content swaps (ms). */
export const PORTAL_SWAP = 1100;

/** Hero opening flourish (ms). */
export const HERO_SPARK_DURATION = 5000;
/** Delay before the corner logos lift into place (s). */
export const HERO_LOGO_DELAY = 1.3;
