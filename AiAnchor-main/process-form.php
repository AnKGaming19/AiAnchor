<?php
/*
 * AIAnchor Booking Form Processor
 * 
 * DNS Configuration Required:
 * - SPF Record: "v=spf1 include:_spf.google.com ~all" (if using Google Workspace)
 * - DKIM Record: Configure through your email provider
 * - MX Record: Point to your email server
 * 
 * If PHP mail() is disabled by host:
 * - Contact hosting provider to enable mail() function
 * - Or switch to SMTP using PHPMailer (see below)
 * 
 * To switch to PHPMailer SMTP later:
 * 1. Install PHPMailer: composer require phpmailer/phpmailer
 * 2. Replace mail() calls with PHPMailer SMTP configuration
 * 3. Use SMTP credentials from your email provider
 */

// Configuration
$ownerEmail = "info@aianchor.online";
$fromDomain = "www.aianchor.online";
$noReplyEmail = "no-reply@aianchor.online";

// Security: Check for honeypot
if (!empty($_POST['website'])) {
    // Spam detected - return 200 to avoid revealing the honeypot
    http_response_code(200);
    echo "OK";
    exit;
}

// Validate required fields
$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$company = trim($_POST['company'] ?? '');
$phone = trim($_POST['phone'] ?? '');
$message = trim($_POST['message'] ?? '');

// Validation
if (empty($name) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo "Invalid form data";
    exit;
}

// Escape output for security
$name = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$email = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
$company = htmlspecialchars($company, ENT_QUOTES, 'UTF-8');
$phone = htmlspecialchars($phone, ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');

// Prepare email headers
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "From: AIAnchor <$noReplyEmail>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// 1. Send internal notification to owner
$ownerSubject = "New Booking Request - $name from $company";
$ownerBody = "New booking request received:\n\n";
$ownerBody .= "Name: $name\n";
$ownerBody .= "Email: $email\n";
$ownerBody .= "Company: $company\n";
$ownerBody .= "Phone: " . ($phone ?: 'Not provided') . "\n\n";
$ownerBody .= "Message:\n$message\n\n";
$ownerBody .= "---\n";
$ownerBody .= "Sent from AIAnchor website form";

$ownerHeaders = $headers;
$ownerHeaders = str_replace("Reply-To: $email", "Reply-To: $email", $ownerHeaders);

mail($ownerEmail, $ownerSubject, $ownerBody, $ownerHeaders);

// 2. Send autoresponder to lead
$leadSubject = "We received your booking request — AiAnchor";
$leadBody = "Hi $name,\n\n";
$leadBody .= "Thanks for requesting an AI Strategy Call with AiAnchor. 🎯\n";
$leadBody .= "We'll review your note and email you within 24 hours to confirm a time.\n\n";
$leadBody .= "What happens next:\n";
$leadBody .= "1) We'll propose 2–3 time slots.\n";
$leadBody .= "2) You'll receive a calendar invite.\n";
$leadBody .= "3) On the call, we map quick-win automations for your business.\n\n";
$leadBody .= "If it's urgent, reply to this email and add \"URGENT\" to the subject.\n\n";
$leadBody .= "— Team AiAnchor\n";
$leadBody .= "info@aianchor.online";

$leadHeaders = $headers;
$leadHeaders = str_replace("Reply-To: $email", "Reply-To: $ownerEmail", $leadHeaders);

mail($email, $leadSubject, $leadBody, $leadHeaders);

// Return success
http_response_code(200);
echo "OK";
?>

