<?php
date_default_timezone_set('Asia/Karachi');

$expectedToken = '1df76492707130597c6c77f87f0d0b7d118d839a';

function respondJson(int $status, array $payload): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($payload);
    exit;
}

function readRequestData(): array
{
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        respondJson(405, ['ok' => false, 'error' => 'method_not_allowed']);
    }

    $contentType = $_SERVER['CONTENT_TYPE'] ?? '';
    if (stripos($contentType, 'application/json') !== false) {
        $rawBody = file_get_contents('php://input');
        $decoded = json_decode($rawBody ?: '{}', true);
        if (is_array($decoded)) {
            return $decoded;
        }
    }

    return $_POST;
}

function cleanLine($value): string
{
    return trim(preg_replace('/\s+/', ' ', (string) $value));
}

function firstName(string $fullName): string
{
    $name = cleanLine($fullName);
    if ($name === '') {
        return 'there';
    }

    $parts = preg_split('/\s+/', $name);
    return $parts[0] ?: 'there';
}

function problemBlock(string $problem): string
{
    $cleanProblem = cleanLine($problem);
    if ($cleanProblem === '') {
        return "We built Effect3 to help teams close the operational gaps that slow growth, response time, and execution.\n\n";
    }

    return "From what you shared, it looks like one of the problems you're facing is:\n\"{$cleanProblem}\"\n\nThat is exactly the kind of gap we focus on solving.\n\n";
}

function renderThankYouEmail(string $name): array
{
    $firstName = firstName($name);

    return [
        'subject' => 'Thanks for reaching out to Effect3',
        'body' => "Hi {$firstName},\n\nThank you for reaching out to Effect3.\n\nWe've received your onboarding request and our team is now reviewing the details you shared.\n\nFrom here, we'll look at your business context, the workflows you want to improve, and the problem you're trying to solve so we can come back with the right next step.\n\nIf there's anything urgent you want us to know before we reply, just respond to this email.\n\nBest,\nEffect3 Team",
    ];
}

function renderFounderFollowupEmail(string $name, string $problem): array
{
    $firstName = firstName($name);
    $problemSection = problemBlock($problem);

    return [
        'subject' => 'A note from Ibrahim, founder of Effect3',
        'body' => "Hi {$firstName},\n\nI'm Ibrahim, founder of Effect3.\n\nI wanted to personally follow up after your onboarding request.\n\nEffect3 exists because most companies do not need more software. They need the right systems deployed properly, connected to the real workflows that drive revenue, operations, and customer experience.\n\nThat is how we think about our role. We are not just another vendor. We work as a deployment partner.\n\nOur job is to understand the real problem inside the business, design the right automation or AI workflow around it, connect it with the tools your team already uses, and make sure it works in practice.\n\n{$problemSection}If there is a serious opportunity to help, we'll tell you clearly.\nIf there is a better path, we'll tell you that too.\n\nIf you want, just reply to this email with the single biggest bottleneck your team is dealing with right now, and I'll make sure we look at it directly.\n\nBest,\nIbrahim\nFounder, Effect3\nibrahim@theeffect3.com",
    ];
}

$request = readRequestData();
if (($request['token'] ?? '') !== $expectedToken) {
    respondJson(403, ['ok' => false, 'error' => 'forbidden']);
}

$stage = cleanLine($request['stage'] ?? '');
$recipient = cleanLine($request['email'] ?? '');
$name = cleanLine($request['name'] ?? '');
$problem = (string) ($request['problem'] ?? '');

if ($recipient === '') {
    respondJson(400, ['ok' => false, 'error' => 'missing_email']);
}

if ($stage === 'thank_you') {
    $email = renderThankYouEmail($name);
} elseif ($stage === 'founder_followup') {
    $email = renderFounderFollowupEmail($name, $problem);
} else {
    respondJson(400, ['ok' => false, 'error' => 'invalid_stage']);
}

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'From: Ibrahim <ibrahim@theeffect3.com>',
    'Reply-To: ibrahim@theeffect3.com',
];

$sent = mail($recipient, $email['subject'], $email['body'], implode("\r\n", $headers));
respondJson($sent ? 200 : 500, ['ok' => $sent, 'stage' => $stage]);
?>
