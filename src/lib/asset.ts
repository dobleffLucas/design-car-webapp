import type { MediaRef } from "@/data/types";

/**
 * Prefixes a public asset path with the app base URL so images keep working
 * when the site is served from a sub-path.
 */
export const asset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;

/** Returns the real photo URL, or `null` when the photo is still pending. */
export const resolveMedia = (media: MediaRef | undefined) =>
  media?.src ? asset(media.src) : null;
