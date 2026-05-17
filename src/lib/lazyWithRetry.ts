import { lazy, ComponentType } from "react";

/**
 * lazy() wrapper that recovers from stale chunk errors after a new deploy.
 *
 * Strategy:
 * 1. First failure → retry the import once (handles transient network blips).
 * 2. Still failing → show a friendly fixed overlay ("Updating to the latest
 *    version…") and hard-reload after a short delay so users understand why
 *    the page is about to refresh.
 * 3. A sessionStorage guard prevents reload loops if the reloaded page also
 *    fails (e.g. real bug, not a stale chunk).
 */

const RELOAD_KEY = "lovable:chunk-reloaded";
const OVERLAY_ID = "lovable-chunk-reload-overlay";

function showReloadOverlay(message: string) {
  if (typeof document === "undefined") return;
  if (document.getElementById(OVERLAY_ID)) return;

  const overlay = document.createElement("div");
  overlay.id = OVERLAY_ID;
  overlay.setAttribute("role", "status");
  overlay.setAttribute("aria-live", "polite");
  overlay.style.cssText = [
    "position:fixed",
    "inset:0",
    "z-index:2147483647",
    "display:flex",
    "align-items:center",
    "justify-content:center",
    "background:rgba(15,23,42,0.85)",
    "backdrop-filter:blur(6px)",
    "-webkit-backdrop-filter:blur(6px)",
    "color:#fff",
    "font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,sans-serif",
    "font-size:15px",
    "text-align:center",
    "padding:24px",
  ].join(";");

  overlay.innerHTML = `
    <div style="max-width:340px;display:flex;flex-direction:column;align-items:center;gap:16px">
      <div style="width:36px;height:36px;border:3px solid rgba(255,255,255,0.25);border-top-color:#fff;border-radius:50%;animation:lov-spin 0.9s linear infinite"></div>
      <div style="font-weight:600;font-size:16px">${message}</div>
      <div style="opacity:0.75;font-size:13px">Refreshing in a moment…</div>
    </div>
    <style>@keyframes lov-spin{to{transform:rotate(360deg)}}</style>
  `;

  document.body.appendChild(overlay);
}

function isAlreadyReloaded() {
  try {
    return window.sessionStorage?.getItem(RELOAD_KEY) === "1";
  } catch {
    return false;
  }
}

function markReloaded() {
  try { window.sessionStorage.setItem(RELOAD_KEY, "1"); } catch {}
}

function clearReloadMark() {
  try { window.sessionStorage.removeItem(RELOAD_KEY); } catch {}
}

export function lazyWithRetry<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>
) {
  return lazy(async () => {
    try {
      const mod = await factory();
      clearReloadMark();
      return mod;
    } catch (firstErr) {
      // Retry once for transient network issues
      try {
        const mod = await factory();
        clearReloadMark();
        return mod;
      } catch (err) {
        if (typeof window === "undefined" || isAlreadyReloaded()) {
          throw err;
        }

        markReloaded();
        showReloadOverlay("A new version is available");

        // Hold Suspense open; reload after the user sees the message
        return new Promise<{ default: T }>((_resolve) => {
          window.setTimeout(() => {
            window.location.reload();
          }, 1400);
        });
      }
    }
  });
}
