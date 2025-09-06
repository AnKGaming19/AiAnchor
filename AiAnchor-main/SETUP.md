# AIAnchor Landing Page - Setup Guide

## 🚀 Enhanced Features Added

Your AIAnchor landing page now includes:

### ✅ **Fully Functional Contact Form**
- **Fields**: Name, Email, Company, Phone (optional), Message
- **Validation**: Client-side and server-side validation
- **Email Integration**: PHP backend with fallback to mailto
- **Success Message**: "Thanks! We will contact you within 24 hours."

### ✅ **Enhanced CTA Buttons**
- All "Book Free AI Strategy Call" buttons now scroll to the contact form
- Smooth scrolling navigation
- Mobile-responsive functionality

### ✅ **Professional Logo Integration**
- Replaced hero animation with your AIAnchor logo
- Maintains small anchor icon in navigation
- Responsive design for all screen sizes

### ✅ **Social Links**
- Instagram, LinkedIn, and Email links are now clickable
- Opens in new tabs for better UX

## 📁 **File Structure**

```
AiAnchor/
├── index.html          # Main landing page with form
├── styles.css          # Updated styles with logo and form
├── script.js           # Enhanced JavaScript with form handling
├── process-form.php    # PHP backend for email sending
├── SETUP.md            # This setup guide
└── README.md           # Original documentation
```

## 🔧 **Setup Instructions**

### **Option 1: PHP Backend (Recommended)**

1. **Upload to Web Server**
   - Upload all files to your web hosting server
   - Ensure PHP is enabled on your server

2. **Configure Email Settings**
   - Edit `process-form.php` line 35:
   ```php
   $to = 'your-email@domain.com'; // Replace with your email
   ```

3. **Test the Form**
   - Visit your website and test the contact form
   - Check that emails are received

### **Option 2: EmailJS Integration**

1. **Sign up for EmailJS**
   - Go to [emailjs.com](https://emailjs.com)
   - Create an account and set up email service

2. **Add EmailJS Script**
   - Add this to your `index.html` before closing `</body>`:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
   <script>
       emailjs.init('YOUR_USER_ID');
   </script>
   ```

3. **Update JavaScript**
   - Replace the fetch call in `script.js` with EmailJS code
   - Update service ID, template ID, and user ID

### **Option 3: Simple Mailto (Fallback)**

The form automatically falls back to mailto links if the backend fails, so it will always work.

## 🎨 **Customization Options**

### **Update Logo**
- Replace the SVG in the hero section with your actual logo image
- Update the logo text and tagline as needed

### **Change Colors**
- Edit CSS variables in `styles.css`:
```css
:root {
    --primary-blue: #2563eb;     /* Main blue */
    --primary-blue-dark: #1d4ed8; /* Darker blue */
    --primary-blue-light: #3b82f6; /* Lighter blue */
    /* ... other colors */
}
```

### **Update Contact Information**
- Change email addresses in `process-form.php`
- Update social media links in `index.html`
- Modify form fields as needed

## 📧 **Email Configuration**

### **PHP Mail Function**
The `process-form.php` file uses PHP's built-in `mail()` function. For better deliverability:

1. **Configure SPF/DKIM records** for your domain
2. **Use a reliable email service** like SendGrid or Mailgun
3. **Test email delivery** to spam folders

### **Alternative Email Services**
- **SendGrid**: Replace mail() with SendGrid API
- **Mailgun**: Use Mailgun's PHP SDK
- **AWS SES**: Use AWS Simple Email Service

## 🔒 **Security Considerations**

### **Form Protection**
- ✅ Input sanitization implemented
- ✅ Email validation
- ✅ CORS headers set
- ✅ JSON response handling

### **Additional Security (Optional)**
- Add reCAPTCHA to prevent spam
- Implement rate limiting
- Add CSRF protection
- Use HTTPS for all communications

## 📱 **Mobile Testing**

### **Test on Multiple Devices**
- ✅ iPhone/Safari
- ✅ Android/Chrome
- ✅ iPad/Tablet browsers
- ✅ Desktop browsers

### **Form Functionality**
- ✅ Touch-friendly buttons
- ✅ Responsive form layout
- ✅ Mobile keyboard compatibility
- ✅ Smooth scrolling on mobile

## 🚀 **Deployment Checklist**

- [ ] Upload all files to web server
- [ ] Configure email settings in `process-form.php`
- [ ] Test form submission
- [ ] Verify email delivery
- [ ] Test on mobile devices
- [ ] Update social media links
- [ ] Configure domain email (SPF/DKIM)
- [ ] Set up SSL certificate (HTTPS)
- [ ] Test all CTA buttons
- [ ] Verify responsive design

## 🛠️ **Troubleshooting**

### **Form Not Sending Emails**
1. Check PHP is enabled on server
2. Verify email configuration in `process-form.php`
3. Check server error logs
4. Test with fallback mailto link

### **Styling Issues**
1. Clear browser cache
2. Check CSS file paths
3. Verify font loading
4. Test in different browsers

### **Mobile Issues**
1. Check viewport meta tag
2. Test touch interactions
3. Verify responsive breakpoints
4. Check mobile keyboard behavior

## 📞 **Support**

If you need help with setup or customization:
- Check the browser console for JavaScript errors
- Review server error logs for PHP issues
- Test form functionality step by step
- Verify all file paths and permissions

---

**Your AIAnchor landing page is now fully functional and ready to capture leads!** 🎉
