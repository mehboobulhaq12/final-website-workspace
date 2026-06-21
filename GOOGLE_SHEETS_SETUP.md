# Google Sheets Setup (Onboarding + Careers)

This project now sends both forms to a Google Sheets webhook URL:

- `onboarding` form (`OnboardingModal`)
- `careers` form (`Careers` page)

On top of that, onboarding submissions can now trigger the customer-email automation in n8n:

- immediate thank-you email
- founder follow-up email after 1 day

## 1) Create Apps Script Webhook in your sheet

1. Open your sheet:  
   `https://docs.google.com/spreadsheets/d/1ZVTEiXft3cigE9DqshrefMpwx7IgfsFu1nHBCoyhGvU/edit?gid=0#gid=0`
2. Go to `Extensions -> Apps Script`.
3. Replace the default script with this code:

```javascript
const SHEET_ID = "1ZVTEiXft3cigE9DqshrefMpwx7IgfsFu1nHBCoyhGvU";
const ONBOARDING_TAB = "Onboarding";
const CAREERS_TAB = "Careers";
const N8N_ONBOARDING_WEBHOOK_URL = "https://n8n.srv1045058.hstgr.cloud/webhook/effect3-onboarding-customer-emails";
const N8N_SHARED_SECRET = "CHANGE_ME_EFFECT3_SHARED_SECRET";

const ONBOARDING_HEADERS = [
  "submittedAt",
  "pagePath",
  "mode",
  "name",
  "email",
  "phone",
  "brandName",
  "category",
  "website",
  "businessDesc",
  "mrr",
  "customers",
  "deadCustomers",
  "problem",
  "agents",
  "leadReviverSub",
];

const CAREERS_HEADERS = [
  "submittedAt",
  "pagePath",
  "name",
  "email",
  "role",
  "message",
  "source",
];

function doPost(e) {
  try {
    const raw = e && e.postData && e.postData.contents ? e.postData.contents : "{}";
    const body = JSON.parse(raw);
    const formType = body.formType;
    const payload = body.payload || {};

    const ss = SpreadsheetApp.openById(SHEET_ID);

    if (formType === "onboarding") {
      const sheet = getOrCreateSheet(ss, ONBOARDING_TAB);
      ensureHeaders(sheet, ONBOARDING_HEADERS);
      sheet.appendRow([
        body.submittedAt || new Date().toISOString(),
        body.pagePath || "",
        payload.mode || "",
        payload.name || "",
        payload.email || "",
        payload.phone || "",
        payload.brandName || "",
        payload.category || "",
        payload.website || "",
        payload.businessDesc || "",
        payload.mrr ?? "",
        payload.customers ?? "",
        payload.deadCustomers ?? "",
        payload.problem || "",
        Array.isArray(payload.agents) ? payload.agents.join(", ") : "",
        payload.leadReviverSub || "",
      ]);
      forwardOnboardingToN8n(body);
      return json({ ok: true, tab: ONBOARDING_TAB });
    }

    if (formType === "careers") {
      const sheet = getOrCreateSheet(ss, CAREERS_TAB);
      ensureHeaders(sheet, CAREERS_HEADERS);
      sheet.appendRow([
        body.submittedAt || new Date().toISOString(),
        body.pagePath || "",
        payload.name || "",
        payload.email || "",
        payload.role || "",
        payload.message || "",
        payload.source || "website",
      ]);
      return json({ ok: true, tab: CAREERS_TAB });
    }

    return json({ ok: false, error: "Unsupported formType" });
  } catch (error) {
    return json({ ok: false, error: String(error) });
  }
}

function getOrCreateSheet(ss, name) {
  return ss.getSheetByName(name) || ss.insertSheet(name);
}

function ensureHeaders(sheet, headers) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
  }
}

function forwardOnboardingToN8n(body) {
  if (!N8N_ONBOARDING_WEBHOOK_URL || !N8N_SHARED_SECRET) return;

  try {
    UrlFetchApp.fetch(N8N_ONBOARDING_WEBHOOK_URL, {
      method: "post",
      contentType: "application/json",
      headers: {
        "x-effect3-webhook-secret": N8N_SHARED_SECRET,
      },
      payload: JSON.stringify(body),
      muteHttpExceptions: true,
    });
  } catch (error) {
    Logger.log("Effect3 n8n forward failed: " + error);
  }
}

function json(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON
  );
}
```

## 2) Deploy webhook

1. Click `Deploy -> New deployment`.
2. Type: `Web app`.
3. Execute as: `Me`.
4. Who has access: `Anyone`.
5. Click `Deploy`.
6. Copy the `Web app URL` (ends with `/exec`).

## 3) Add env variable to website

In your frontend env (local + hosting):

```bash
VITE_GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/XXXXXXXXXXXX/exec
```

Keep existing Supabase vars too:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

## 4) Redeploy and test

1. Submit onboarding form once.
2. Submit careers form once.
3. Confirm rows are added in:
- `Onboarding` tab
- `Careers` tab

## 5) Import the onboarding email workflow into n8n

Import:

- `effect3_workflows/effect3_onboarding_customer_emails.json`

Then update:

1. In the `Normalize Onboarding Submission` code node:
- replace `CHANGE_ME_EFFECT3_SHARED_SECRET`

2. In both HTTP Request nodes:
- replace `CHANGE_ME_EFFECT3_MAIL_TOKEN`

3. Activate the workflow after testing the webhook once.

## 6) Deploy the Hostinger mail endpoint

Deploy this file to your site root:

- `public/onboarding-email.php`

It should be live at:

- `https://theeffect3.com/onboarding-email.php`

Update inside the PHP file:

- `CHANGE_ME_EFFECT3_MAIL_TOKEN`

This endpoint sends both approved emails from:

- `Ibrahim <ibrahim@theeffect3.com>`
