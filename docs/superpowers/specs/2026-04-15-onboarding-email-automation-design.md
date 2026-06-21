# Onboarding Email Automation Design

**Goal**

Add two customer emails for Effect3 onboarding submissions:

1. Immediate thank-you email after form submission
2. Founder follow-up email 24 hours later

**Approved Email Direction**

- Email 1: version 1 thank-you copy
- Email 2: version 1 founder perspective copy from Ibrahim
- Sender identity: `ibrahim@theeffect3.com`
- Tone: enterprise-safe, clear, personal, no hype

**Architecture**

- The website keeps the current onboarding flow: form submission goes to Google Apps Script and Supabase backup.
- Google Apps Script appends the onboarding row to the Google Sheet, then forwards the same payload to an n8n webhook.
- n8n validates a shared secret, triggers the immediate thank-you email, waits 1 day, then triggers the founder follow-up.
- Email delivery happens through a Hostinger PHP endpoint on `theeffect3.com` so the sender stays on the Effect3 domain.

**Key Files**

- `src/components/OnboardingModal.tsx`
- `src/lib/onboardingSubmission.ts`
- `effect3_workflows/effect3_onboarding_customer_emails.json`
- `public/onboarding-email.php`
- `upload-ready/onboarding-email.php`
- `GOOGLE_SHEETS_SETUP.md`

**Operational Notes**

- The existing internal alert workflow remains separate.
- Two shared secrets are required:
  - n8n shared secret between Apps Script and n8n webhook
  - mail token between n8n and Hostinger PHP endpoint
- Deployment includes importing the n8n workflow and uploading the PHP endpoint to Hostinger.
