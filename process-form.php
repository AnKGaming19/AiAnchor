<?php
// AIAnchor Contact Form Handler
// This file processes form submissions and sends emails

// Set headers to prevent CORS issues
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Get form data
$input = json_decode(file_get_contents('php://input'), true);

// Validate required fields
$required_fields = ['name', 'email', 'company', 'message'];
foreach ($required_fields as $field) {
    if (empty($input[$field])) {
        http_response_code(400);
        echo json_encode(['error' => "Missing required field: $field"]);
        exit;
    }
}

// Validate email
if (!filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email address']);
    exit;
}

// Sanitize inputs
$name = htmlspecialchars(trim($input['name']));
$email = filter_var(trim($input['email']), FILTER_SANITIZE_EMAIL);
$company = htmlspecialchars(trim($input['company']));
$phone = isset($input['phone']) ? htmlspecialchars(trim($input['phone'])) : 'Not provided';
$message = htmlspecialchars(trim($input['message']));

// Email configuration
$to = 'hello@aianchor.com'; // Replace with your email
$subject = 'New AI Strategy Call Request - AIAnchor';

// Build email body
$email_body = "
New AI Strategy Call Request

Name: $name
Email: $email
Company: $company
Phone: $phone

Message:
$message

---
This message was sent from the AIAnchor website contact form.
";

// Email headers
$headers = [
    'From: noreply@aianchor.com',
    'Reply-To: ' . $email,
    'X-Mailer: AIAnchor Website',
    'Content-Type: text/plain; charset=UTF-8'
];

// Send email
$mail_sent = mail($to, $subject, $email_body, implode("\r\n", $headers));

if ($mail_sent) {
    // Success response
    echo json_encode([
        'success' => true,
        'message' => 'Thank you! We will contact you within 24 hours.'
    ]);
    
    // Optional: Send confirmation email to user
    $user_subject = 'Thank you for contacting AIAnchor';
    $user_body = "
Dear $name,

Thank you for reaching out to AIAnchor! We have received your request for a free AI strategy call.

We will review your information and contact you within 24 hours to schedule your consultation.

In the meantime, if you have any urgent questions, feel free to reply to this email.

Best regards,
The AIAnchor Team

---
AIAnchor - Your Business, Anchored in AI
hello@aianchor.com
    ";
    
    $user_headers = [
        'From: hello@aianchor.com',
        'X-Mailer: AIAnchor Website',
        'Content-Type: text/plain; charset=UTF-8'
    ];
    
    mail($email, $user_subject, $user_body, implode("\r\n", $user_headers));
    
} else {
    // Error response
    http_response_code(500);
    echo json_encode([
        'error' => 'Failed to send email. Please try again or contact us directly.'
    ]);
}
?>
