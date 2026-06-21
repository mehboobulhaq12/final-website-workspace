import { describe, expect, it } from "vitest";

import { buildOnboardingAutomationBody } from "@/lib/onboardingEmailAutomation";
import type { OnboardingPayload } from "@/lib/onboardingSubmission";

const payload: OnboardingPayload = {
  mode: "implement",
  name: "Ibrahim Nooruddin",
  email: "ibrahim@theeffect3.com",
  phone: "+92 300 0000000",
  brandName: "Effect3",
  category: "Enterprise",
  website: "https://theeffect3.com",
  businessDesc: "Deployment partner",
  mrr: 12500,
  customers: 240,
  deadCustomers: 18,
  problem: "Slow follow-up across inbound leads",
  agents: ["lead-reviver", "inbound-handler"],
  leadReviverSub: "Text Agent",
};

describe("buildOnboardingAutomationBody", () => {
  it("serializes the onboarding payload for the n8n webhook", () => {
    const body = buildOnboardingAutomationBody({
      submittedAt: "2026-04-15T00:00:00.000Z",
      pagePath: "/",
      payload,
    });

    const params = new URLSearchParams(body);

    expect(params.get("formType")).toBe("onboarding");
    expect(params.get("submittedAt")).toBe("2026-04-15T00:00:00.000Z");
    expect(params.get("mode")).toBe("implement");
    expect(params.get("email")).toBe("ibrahim@theeffect3.com");
    expect(params.get("problem")).toBe("Slow follow-up across inbound leads");
    expect(params.get("agents")).toBe("lead-reviver, inbound-handler");
  });
});
