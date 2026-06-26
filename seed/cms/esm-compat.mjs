/**
 * Normalize imports from ambiguous `.js` modules when seed scripts run outside Next.js.
 * Works with both native ESM named exports and CommonJS default-export interop.
 */
export function unwrapModule(mod) {
  if (!mod || typeof mod !== "object") {
    return mod;
  }

  const { default: nested, ...rest } = mod;

  if (nested && typeof nested === "object" && !Array.isArray(nested)) {
    return { ...nested, ...rest };
  }

  return rest;
}
