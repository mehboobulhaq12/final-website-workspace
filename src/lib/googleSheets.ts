type FormType = "onboarding" | "careers";

type GoogleSheetsSubmission = {
  formType: FormType;
  submittedAt: string;
  pagePath: string;
  payload: Record<string, unknown>;
};

const WEBHOOK_URL = import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL;
const IS_GOOGLE_APPS_SCRIPT = /^https:\/\/script\.google\.com\/macros\/s\//i.test(
  WEBHOOK_URL || ""
);

export async function submitToGoogleSheets(submission: GoogleSheetsSubmission) {
  if (!WEBHOOK_URL) {
    throw new Error("Google Sheets webhook URL is missing.");
  }

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 12000);

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      mode: IS_GOOGLE_APPS_SCRIPT ? "no-cors" : "cors",
      headers: {
        // Keep this as a simple request to avoid CORS preflight issues.
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(submission),
      signal: controller.signal,
    });

    // Google Apps Script web app URLs usually don't return CORS headers.
    // In no-cors mode, the browser returns an opaque response that can't be inspected.
    if (IS_GOOGLE_APPS_SCRIPT) {
      return;
    }

    if (!response.ok) {
      throw new Error(`Google Sheets request failed with ${response.status}`);
    }
  } finally {
    window.clearTimeout(timeout);
  }
}
