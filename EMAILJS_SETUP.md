# EmailJS Setup Guide

To enable the contact form to send emails to your Gmail, follow these steps:

## 1. Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## 2. Create Email Service
1. Go to Email Services in your dashboard
2. Click "Add New Service"
3. Select "Gmail" as the service type
4. Connect your Gmail account (felixkumafutsa@gmail.com)
5. Give it a name like "service_gmail"

## 3. Create Email Template
1. Go to Email Templates in your dashboard
2. Click "Create New Template"
3. Use this template:

**Template Name:** portfolio_contact

**Subject:** New message from {{from_name}} via Portfolio

**Content:**
```
Hello Felix,

You have received a new message from your portfolio website:

Name: {{from_name}}
Email: {{from_email}}
Message: {{message}}

Best regards,
Portfolio Contact Form
```

## 4. Get Your Public Key
1. Go to Account -> API Keys in your dashboard
2. Copy your Public Key

## 5. Update the Contact Component
Replace the placeholder values in `src/sections/Contact.jsx`:

```javascript
await emailjs.send(
  'service_gmail', // Your service ID
  'portfolio_contact', // Your template ID
  templateParams,
  'YOUR_PUBLIC_KEY' // Your actual public key
);
```

## 6. Test the Form
1. Deploy your portfolio
2. Test the contact form
3. Check your Gmail for the message

## Alternative: Use Netlify Forms
If you prefer not to use EmailJS, you can deploy on Netlify and use their built-in form handling:

1. Add `data-netlify="true"` to your form
2. Add `name="form"` to your form
3. Deploy to Netlify
4. Forms will be handled automatically

## Notes
- EmailJS free plan includes 200 emails/month
- Messages will be sent to felixkumafutsa@gmail.com
- No server-side code required
- GDPR compliant
