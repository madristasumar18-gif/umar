# KHALS Safety Solutions - Deployment Guide

## 🚀 Quick Start with Vercel

Your website is now ready to deploy on Vercel! Follow these steps:

### Step 1: Connect Your Repository to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"New Project"**
3. Import your GitHub repository (`madristasumar18-gif/umar`)
4. Click **"Import"**

### Step 2: Configure Environment Variables

After importing, go to **Settings** → **Environment Variables** and add:

```
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASSWORD=your-app-password
KHALS_EMAIL=khalssafety@gmail.com
```

**Important:** For Gmail, you need to:
1. Enable 2-Factor Authentication on your Gmail account
2. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Select "Mail" and "Windows Computer"
4. Copy the generated 16-character password
5. Use this as `EMAIL_PASSWORD` in Vercel

### Step 3: Deploy

Click **"Deploy"** - Vercel will automatically:
- ✅ Build your static HTML site
- ✅ Deploy the serverless API function
- ✅ Provide you with a live URL

### Step 4: Verify

Once deployed, test the form:
1. Visit your Vercel URL
2. Scroll to "Contact" section
3. Fill out the enquiry form
4. Check the KHALS email inbox for the enquiry notification

---

## 📁 Project Structure

```
umar/
├── index.html              # Main website (static HTML)
├── api/
│   └── enquiry.ts         # Serverless function for form handling
├── vercel.json            # Vercel configuration
├── package.json           # Dependencies
├── .env.example           # Environment template
└── README.md              # This file
```

---

## 🔧 How It Works

### Form Flow

1. **User submits form** on the website
2. **JavaScript sends POST request** to `/api/enquiry` endpoint
3. **Serverless function** processes the data:
   - Validates inputs
   - Sends email to KHALS inbox
   - Returns success response
4. **User sees confirmation** with toast notification
5. **Fallback to WhatsApp** if email fails

### Email Notifications

- **To KHALS:** Complete enquiry details with customer info
- **To Customer:** Confirmation message with contact details (optional, currently disabled)

---

## 🛠️ Local Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup

```bash
# Clone the repo
git clone https://github.com/madristasumar18-gif/umar.git
cd umar

# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local

# Edit .env.local with your email credentials
nano .env.local

# Run local development server
npm run dev
```

Then visit `http://localhost:3000`

---

## 📧 Email Troubleshooting

### Issue: "Invalid login" error

**Solution:**
- Check you're using an App Password, not your Gmail password
- App passwords are 16 characters with spaces

### Issue: Emails not sending

**Solutions:**
1. Verify `EMAIL_USER` and `EMAIL_PASSWORD` are correct
2. Check Gmail security settings allow "Less secure apps"
3. Check Vercel logs: **Deployments** → **Click deployment** → **Logs**

### Issue: Emails going to spam

**Solution:**
- Set up SPF and DKIM records for your domain (optional)
- For now, enquiries go to Gmail - check spam folder

---

## 🔗 Custom Domain (Optional)

1. In Vercel dashboard, go to **Settings** → **Domains**
2. Add your custom domain
3. Follow DNS configuration instructions

For KHALS, you can use: `www.khalssafety.in`

### DNS Setup for khalssafety.in

After adding the domain in Vercel, update your domain registrar's DNS settings:

**Common DNS Records to Add:**
- Type: `CNAME`
- Name: `www`
- Value: `cname.vercel.sh`

Once verified, your site will be live at `www.khalssafety.in`

---

## 📱 What's Included

✅ **Fully responsive design** - Mobile, tablet, desktop
✅ **Production-ready form** - With validation & error handling
✅ **Automatic email notifications** - Enquiries sent to KHALS inbox
✅ **WhatsApp fallback** - If email fails, offer WhatsApp option
✅ **Toast notifications** - User feedback for form submission
✅ **Google Maps embed** - Location display
✅ **SEO optimized** - Meta tags, structured headings
✅ **Fast loading** - Static HTML + CDN

---

## 🚨 Common Issues & Solutions

### Form not submitting
- Check browser console for errors (F12)
- Verify email credentials in Vercel Environment Variables
- Check `/api/enquiry` endpoint is deployed

### Styling looks broken
- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh page (Ctrl+Shift+R)

### Images not loading
- Website uses emoji for icons (built-in)
- If custom images needed, add to repo and reference in HTML

---

## 📊 Monitoring

Monitor your site's performance:

1. **Vercel Analytics:** Dashboard → **Analytics**
2. **Emails received:** Check KHALS Gmail inbox
3. **Errors:** Dashboard → **Logs**

---

## 🔐 Security Best Practices

✅ **Environment variables** - Never commit `.env.local`
✅ **CORS enabled** - Form accepts requests from anywhere
✅ **Input validation** - Server-side checks all fields
✅ **Rate limiting** - Consider adding if high traffic (Vercel Pro feature)

---

## 🆘 Support

For issues:
1. Check Vercel Docs: https://vercel.com/docs
2. Check error logs in Vercel dashboard
3. Review `.env.example` for required variables
4. Restart deployment if needed

---

## 📝 Next Steps

After deployment:

1. **Test everything** - Visit site, fill out form, check emails
2. **Add analytics** - Install Google Analytics
3. **Monitor performance** - Use Vercel Analytics
4. **Update content** - Edit `index.html` as needed
5. **Scale up** - Add database for storing enquiries (optional)

---

## 🎯 Optional Enhancements

Consider adding:
- Database integration (Supabase, Firebase) for enquiry storage
- SMS notifications (Twilio)
- Customer enquiry history dashboard
- Analytics dashboard
- Admin panel for managing enquiries

---

## 📞 Contact

**KHALS Safety Solutions**
- Phone: +91 98840 81509
- Email: khalssafety@gmail.com
- Website: www.khalssafety.in
- Address: Plot No. 52, SPH Road, Polivakkam, Thiruvallur – 602002

---

**Deployed with ❤️ on Vercel**
