//#region node_modules/.nitro/vite/services/ssr/assets/boot-preload-C8ZZF973.js
var doorway_default = "/assets/doorway-TS2YtYIC.jpg";
/** Assets the hero and later sections need, warmed while the boot screen plays. */
var PRELOAD = [];
function registerBootPreload(urls) {
	for (const url of urls) if (!PRELOAD.includes(url)) PRELOAD.push(url);
}
function warmBootPreload() {
	if (typeof window === "undefined") return;
	for (const src of PRELOAD) {
		const img = new Image();
		img.decoding = "async";
		img.src = src;
	}
}
//#endregion
export { registerBootPreload as n, warmBootPreload as r, doorway_default as t };
