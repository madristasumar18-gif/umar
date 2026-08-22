import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

// Configure your email service here
// For production, use environment variables
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

export default async (req: VercelRequest, res: VercelResponse) => {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, phone, product, orderSize, message, timestamp } = req.body;

    // Validation
    if (!name || !phone || !product || !orderSize) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Email to KHALS
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.KHALS_EMAIL || 'madristasumar18@gmail.com',
      subject: `New Enquiry from ${name} - KHALS Safety Solutions`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #F5C518;">New Enquiry Received</h2>
          <p><strong>Timestamp:</strong> ${new Date(timestamp).toLocaleString()}</p>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #0D0D0D; margin-top: 0;">Customer Details</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
            <p><strong>Product Needed:</strong> ${product}</p>
            <p><strong>Order Size:</strong> ${orderSize}</p>
            ${message ? `<p><strong>Message:</strong><br>${message.replace(/\n/g, '<br>')}</p>` : ''}
          </div>

          <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #F5C518;">
            <p style="margin: 0; color: #333;"><strong>Action Required:</strong> Please contact the customer at <a href="tel:${phone}">${phone}</a> within 2 hours during business hours.</p>
          </div>

          <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
          <p style="font-size: 12px; color: #777;">This is an automated message from KHALS Safety Solutions website. Do not reply to this email.</p>
        </div>
      `
    };

    // Send email to KHALS
    await transporter.sendMail(mailOptions);

    // Optional: Send confirmation email to customer
    const confirmationEmail = {
      from: process.env.EMAIL_USER,
      to: phone, // Note: In production, you'd need customer email, not phone
      subject: 'We Received Your Enquiry - KHALS Safety Solutions',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #F5C518;">Thank You for Your Enquiry!</h2>
          <p>Hi ${name},</p>
          <p>We've received your enquiry for <strong>${product}</strong> (${orderSize}).</p>
          <p>Our team will contact you at <strong>${phone}</strong> within 2 hours during business hours to discuss your requirements and provide the best pricing.</p>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #0D0D0D; margin-top: 0;">Quick Contact</h3>
            <p><strong>Phone:</strong> <a href="tel:+919884081509">+91 98840 81509</a></p>
            <p><strong>Website:</strong> <a href="http://www.khalssafety.com">www.khalssafety.com</a></p>
            <p><strong>Address:</strong> Plot No. 52, SPH Road, Sree Venkateshwara Nagar, Polivakkam, Thiruvallur – 602002, Tamil Nadu, India</p>
          </div>

          <p>If you need immediate assistance, you can also reach us on WhatsApp: <a href="https://wa.me/919884081509">Chat with us</a></p>
          
          <p>Best regards,<br><strong>KHALS Safety Solutions Team</strong></p>
        </div>
      `
    };

    // Note: SMS confirmation would require Twilio or similar service
    // For now, we'll just log the enquiry

    // Log enquiry to console (in production, save to database)
    console.log('New Enquiry:', {
      name,
      phone,
      product,
      orderSize,
      message,
      timestamp
    });

    return res.status(200).json({
      success: true,
      message: 'Enquiry received successfully! We\'ll contact you within 2 hours.',
      enquiryId: `ENQ-${Date.now()}`
    });

  } catch (error) {
    console.error('Error processing enquiry:', error);
    return res.status(500).json({
      error: 'Failed to process enquiry. Please try again or contact us directly at +91 98840 81509.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
