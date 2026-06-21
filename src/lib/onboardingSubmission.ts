export type OnboardingMode = "audit" | "implement" | "demo";

export interface FormState {
  name: string;
  email: string;
  phone: string;
  brandName: string;
  category: string;
  website: string;
  businessDesc: string;
  mrr: string;
  customers: string;
  deadCustomers: string;
  problem: string;
  agents: string[];
  leadReviverSub: string;
}

export interface OnboardingPayload {
  mode: OnboardingMode;
  name: string;
  email: string;
  phone: string;
  brandName: string;
  category: string;
  website: string;
  businessDesc: string;
  mrr: number | null;
  customers: number | null;
  deadCustomers: number | null;
  problem: string;
  agents: string[];
  leadReviverSub: string;
}

export interface OnboardingValidationError {
  step: number;
  error: string;
}

function parseNumeric(value: string) {
  const normalized = value.replace(/,/g, "").trim();
  if (!normalized) return null;
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

function parseInteger(value: string) {
  const normalized = value.replace(/,/g, "").trim();
  if (!normalized) return null;
  const parsed = Number.parseInt(normalized, 10);
  return Number.isFinite(parsed) ? parsed : null;
}

export function validateOnboardingSubmission(
  data: FormState,
): OnboardingValidationError | null {
  if (!data.name.trim() || !data.email.trim()) {
    return {
      step: 0,
      error: "Add your name and email before submitting.",
    };
  }

  if (!data.brandName.trim()) {
    return {
      step: 1,
      error: "Add your brand name before submitting.",
    };
  }

  if (!data.problem.trim()) {
    return {
      step: 4,
      error: "Describe the main challenge before submitting.",
    };
  }

  return null;
}

export function buildOnboardingPayload(
  data: FormState,
  mode: OnboardingMode,
): OnboardingPayload {
  return {
    mode,
    name: data.name.trim(),
    email: data.email.trim(),
    phone: data.phone.trim(),
    brandName: data.brandName.trim(),
    category: data.category,
    website: data.website.trim(),
    businessDesc: data.businessDesc.trim(),
    mrr: parseNumeric(data.mrr),
    customers: parseInteger(data.customers),
    deadCustomers: parseInteger(data.deadCustomers),
    problem: data.problem.trim(),
    agents: data.agents,
    leadReviverSub: data.leadReviverSub,
  };
}
