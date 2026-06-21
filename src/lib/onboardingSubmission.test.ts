import { describe, expect, it } from "vitest";

import {
  buildOnboardingPayload,
  validateOnboardingSubmission,
  type FormState,
} from "@/lib/onboardingSubmission";

function createFormState(overrides: Partial<FormState> = {}): FormState {
  return {
    name: "  Ibrahim Nooruddin  ",
    email: "  ibrahim@theeffect3.com  ",
    phone: "  +92 300 0000000  ",
    brandName: "  Effect3  ",
    category: "Enterprise",
    website: "  https://theeffect3.com  ",
    businessDesc: "  AI deployment partner for enterprise teams  ",
    mrr: "12,500",
    customers: "240",
    deadCustomers: "18",
    problem: "  Slow follow-up across inbound leads  ",
    agents: ["lead-reviver", "inbound-handler"],
    leadReviverSub: "Text Agent",
    ...overrides,
  };
}

describe("validateOnboardingSubmission", () => {
  it("requires name and email before submission", () => {
    expect(
      validateOnboardingSubmission(createFormState({ name: " ", email: " " })),
    ).toEqual({
      step: 0,
      error: "Add your name and email before submitting.",
    });
  });

  it("requires brand name before submission", () => {
    expect(
      validateOnboardingSubmission(createFormState({ brandName: " " })),
    ).toEqual({
      step: 1,
      error: "Add your brand name before submitting.",
    });
  });

  it("requires problem description before submission", () => {
    expect(
      validateOnboardingSubmission(createFormState({ problem: " " })),
    ).toEqual({
      step: 4,
      error: "Describe the main challenge before submitting.",
    });
  });

  it("returns null when the form is valid", () => {
    expect(validateOnboardingSubmission(createFormState())).toBeNull();
  });
});

describe("buildOnboardingPayload", () => {
  it("trims strings and parses numeric fields", () => {
    expect(buildOnboardingPayload(createFormState(), "implement")).toEqual({
      mode: "implement",
      name: "Ibrahim Nooruddin",
      email: "ibrahim@theeffect3.com",
      phone: "+92 300 0000000",
      brandName: "Effect3",
      category: "Enterprise",
      website: "https://theeffect3.com",
      businessDesc: "AI deployment partner for enterprise teams",
      mrr: 12500,
      customers: 240,
      deadCustomers: 18,
      problem: "Slow follow-up across inbound leads",
      agents: ["lead-reviver", "inbound-handler"],
      leadReviverSub: "Text Agent",
    });
  });

  it("returns null for empty numeric inputs", () => {
    expect(
      buildOnboardingPayload(
        createFormState({
          phone: " ",
          website: " ",
          businessDesc: " ",
          mrr: "",
          customers: "",
          deadCustomers: "",
          leadReviverSub: "",
        }),
        "audit",
      ),
    ).toMatchObject({
      mode: "audit",
      phone: "",
      website: "",
      businessDesc: "",
      mrr: null,
      customers: null,
      deadCustomers: null,
      leadReviverSub: "",
    });
  });
});
