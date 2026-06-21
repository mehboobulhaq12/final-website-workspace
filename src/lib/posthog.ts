import posthog from "posthog-js";

const posthogKey = import.meta.env.VITE_POSTHOG_KEY?.trim();
const posthogHost = import.meta.env.VITE_POSTHOG_HOST?.trim() || "https://us.i.posthog.com";

let initialized = false;

export const isPostHogEnabled = Boolean(posthogKey);

export function initializePostHog() {
  if (!isPostHogEnabled || initialized || typeof window === "undefined") return;

  posthog.init(posthogKey!, {
    api_host: posthogHost,
    capture_pageview: false,
    capture_pageleave: true,
    person_profiles: "identified_only",
  });

  initialized = true;
}

export { posthog };
