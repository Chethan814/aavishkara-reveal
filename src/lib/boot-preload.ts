/** Assets the hero and later sections need, warmed while the boot screen plays. */
const PRELOAD: string[] = [];

export function registerBootPreload(urls: string[]) {
  for (const url of urls) if (!PRELOAD.includes(url)) PRELOAD.push(url);
}

export function warmBootPreload() {
  if (typeof window === "undefined") return;
  for (const src of PRELOAD) {
    const img = new Image();
    img.decoding = "async";
    img.src = src;
  }
}
