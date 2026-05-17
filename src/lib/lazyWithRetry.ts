import { lazy, ComponentType } from "react";

/**
 * lazy() wrapper that recovers from stale chunk errors after a new deploy.
 * If a dynamic import fails (e.g. the hashed chunk filename changed),
 * we force a one-time hard reload to fetch the new index.html + chunks.
 */
export function lazyWithRetry<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>
) {
  return lazy(async () => {
    const RELOAD_KEY = "lovable:chunk-reloaded";
    try {
      const mod = await factory();
      // success — clear the guard so future failures can reload again
      try { window.sessionStorage.removeItem(RELOAD_KEY); } catch {}
      return mod;
    } catch (err) {
      const alreadyReloaded =
        typeof window !== "undefined" &&
        window.sessionStorage?.getItem(RELOAD_KEY) === "1";

      if (!alreadyReloaded && typeof window !== "undefined") {
        try { window.sessionStorage.setItem(RELOAD_KEY, "1"); } catch {}
        window.location.reload();
        // Return a never-resolving promise so Suspense holds until reload
        return new Promise<{ default: T }>(() => {});
      }
      throw err;
    }
  });
}
