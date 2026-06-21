# Onboarding Email Automation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Trigger an immediate thank-you email and a 24-hour founder follow-up for each Effect3 onboarding submission.

**Architecture:** Keep the existing onboarding submission path intact, forward onboarding payloads from Apps Script to an n8n webhook, and let n8n call a Hostinger PHP endpoint that sends domain email from `ibrahim@theeffect3.com`.

**Tech Stack:** React, TypeScript, Vitest, Google Apps Script, n8n, PHP mail()

---

### Task 1: Stabilize onboarding payload handling

**Files:**
- Create: `src/lib/onboardingSubmission.ts`
- Create: `src/lib/onboardingSubmission.test.ts`
- Modify: `src/components/OnboardingModal.tsx`

- [ ] **Step 1: Write the failing test**

```ts
expect(validateOnboardingSubmission(createFormState({ name: " ", email: " " }))).toEqual({
  step: 0,
  error: "Add your name and email before submitting.",
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/lib/onboardingSubmission.test.ts`
Expected: FAIL because `@/lib/onboardingSubmission` does not exist yet.

- [ ] **Step 3: Write minimal implementation**

```ts
export function validateOnboardingSubmission(data: FormState) {
  if (!data.name.trim() || !data.email.trim()) {
    return { step: 0, error: "Add your name and email before submitting." };
  }
  return null;
}
```

- [ ] **Step 4: Expand the helper to cover the full payload**

```ts
export function buildOnboardingPayload(data: FormState, mode: OnboardingMode) {
  return {
    mode,
    name: data.name.trim(),
    email: data.email.trim(),
    ...
  };
}
```

- [ ] **Step 5: Wire the component to the helper**

```ts
const validationError = validateOnboardingSubmission(data);
if (validationError) {
  setStep(validationError.step);
  setError(validationError.error);
  return;
}

const payload = buildOnboardingPayload(data, mode);
```

- [ ] **Step 6: Run test to verify it passes**

Run: `npm test -- src/lib/onboardingSubmission.test.ts`
Expected: PASS

### Task 2: Add the customer-email automation artifacts

**Files:**
- Create: `effect3_workflows/effect3_onboarding_customer_emails.json`
- Create: `public/onboarding-email.php`
- Create: `upload-ready/onboarding-email.php`
- Modify: `GOOGLE_SHEETS_SETUP.md`

- [ ] **Step 1: Add the n8n workflow export**

```json
{
  "name": "Effect3 onboarding EMails system",
  "nodes": [
    { "type": "n8n-nodes-base.webhook" },
    { "type": "n8n-nodes-base.code" },
    { "type": "n8n-nodes-base.httpRequest" },
    { "type": "n8n-nodes-base.wait" },
    { "type": "n8n-nodes-base.httpRequest" }
  ]
}
```

- [ ] **Step 2: Add the Hostinger email sender endpoint**

```php
if ($stage === 'thank_you') {
    $email = renderThankYouEmail($name);
} elseif ($stage === 'founder_followup') {
    $email = renderFounderFollowupEmail($name, $problem);
}
```

- [ ] **Step 3: Update the Apps Script setup instructions**

```js
const N8N_ONBOARDING_WEBHOOK_URL = "https://n8n.srv1045058.hstgr.cloud/webhook/effect3-onboarding-customer-emails";
const N8N_SHARED_SECRET = "CHANGE_ME_EFFECT3_SHARED_SECRET";
```

- [ ] **Step 4: Document import and deployment steps**

```md
Import `effect3_workflows/effect3_onboarding_customer_emails.json`
Deploy `public/onboarding-email.php`
Replace both placeholder secrets before activation
```

### Task 3: Verify the repo-side changes

**Files:**
- Verify only

- [ ] **Step 1: Run targeted tests**

Run: `npm test -- src/lib/onboardingSubmission.test.ts`
Expected: PASS

- [ ] **Step 2: Run the full test suite**

Run: `npm test`
Expected: PASS

- [ ] **Step 3: Run the production build**

Run: `npm run build`
Expected: exit code 0 and prerender completes
