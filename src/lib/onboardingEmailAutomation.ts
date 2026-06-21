import type { OnboardingPayload } from "@/lib/onboardingSubmission";

const ONBOARDING_EMAIL_WEBHOOK_URL =
  "https://n8n.srv1045058.hstgr.cloud/webhook/effect3-onboarding-emails-5217f9c37b9e958bc4949f85780aaf49";

type OnboardingAutomationSubmission = {
  submittedAt: string;
  pagePath: string;
  payload: OnboardingPayload;
};

export function buildOnboardingAutomationBody(
  submission: OnboardingAutomationSubmission,
) {
  const params = new URLSearchParams();

  params.set("formType", "onboarding");
  params.set("submittedAt", submission.submittedAt);
  params.set("pagePath", submission.pagePath);
  params.set("mode", submission.payload.mode);
  params.set("name", submission.payload.name);
  params.set("email", submission.payload.email);
  params.set("phone", submission.payload.phone);
  params.set("brandName", submission.payload.brandName);
  params.set("category", submission.payload.category);
  params.set("website", submission.payload.website);
  params.set("businessDesc", submission.payload.businessDesc);
  params.set("mrr", submission.payload.mrr === null ? "" : String(submission.payload.mrr));
  params.set(
    "customers",
    submission.payload.customers === null ? "" : String(submission.payload.customers),
  );
  params.set(
    "deadCustomers",
    submission.payload.deadCustomers === null
      ? ""
      : String(submission.payload.deadCustomers),
  );
  params.set("problem", submission.payload.problem);
  params.set("agents", submission.payload.agents.join(", "));
  params.set("leadReviverSub", submission.payload.leadReviverSub);

  return params.toString();
}

export async function triggerOnboardingEmailAutomation(
  submission: OnboardingAutomationSubmission,
) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 8000);

  try {
    await fetch(ONBOARDING_EMAIL_WEBHOOK_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: buildOnboardingAutomationBody(submission),
      signal: controller.signal,
    });
  } finally {
    window.clearTimeout(timeout);
  }
}
