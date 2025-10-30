const nodemailer = require('nodemailer');

const emailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendWelcomeEmail = async (user) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Welcome to Primiya\'s Art! 🎨',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #9333ea; margin: 0;">Welcome to Primiya's Art!</h1>
            <p style="color: #666; font-size: 16px;">We're excited to have you join our creative community</p>
          </div>
          
          <div style="background-color: #f8fafc; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <h3 style="color: #9333ea; margin-top: 0;">Hello ${user.name},</h3>
            <p>Your account has been successfully created. Welcome to our community of artists and creators!</p>
            
            <div style="background-color: white; border-left: 4px solid #9333ea; padding: 15px; margin: 15px 0;">
              <p style="margin: 0; font-weight: bold;">Account Details:</p>
              <p style="margin: 5px 0;"><strong>Name:</strong> ${user.name}</p>
              <p style="margin: 5px 0;"><strong>Email:</strong> ${user.email}</p>
              <p style="margin: 5px 0;"><strong>Joined:</strong> ${new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      `
    };

    await emailTransporter.sendMail(mailOptions);
    console.log(`✅ Welcome email sent to ${user.email}`);
  } catch (error) {
    console.error('❌ Error sending welcome email:', error);
  }
};

const sendLoginNotificationEmail = async (user, loginMethod = 'email') => {
  try {
    const methodText = loginMethod === 'google' ? 'Google' : 
                      loginMethod === 'facebook' ? 'Facebook' : 'email';
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Login Confirmation - Primiya\'s Art',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #9333ea;">Login Confirmed</h2>
          <p>Hello ${user.name},</p>
          <p>You have successfully logged into your Primiya's Art account using ${methodText}.</p>
        </div>
      `
    };

    await emailTransporter.sendMail(mailOptions);
    console.log(`✅ Login confirmation sent to ${user.email}`);
  } catch (error) {
    console.error('❌ Error sending login confirmation email:', error);
  }
};

const sendSocialLoginWelcomeEmail = async (user, provider) => {
  try {
    const providerText = provider === 'google' ? 'Google' : 'Facebook';
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: `Welcome to Primiya's Art via ${providerText}! 🎨`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #9333ea;">Welcome to Primiya's Art!</h2>
          <p>Hello ${user.name},</p>
          <p>Welcome to our creative community! Your account has been created successfully using ${providerText}.</p>
        </div>
      `
    };

    await emailTransporter.sendMail(mailOptions);
    console.log(`✅ Social welcome email sent to ${user.email} for ${provider}`);
  } catch (error) {
    console.error('❌ Error sending social welcome email:', error);
  }
};

const sendPasswordResetEmail = async (user, otp) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Password Reset OTP - Primiya\'s Art',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #9333ea;">Password Reset OTP</h2>
          <p>Hello ${user.name},</p>
          <p>Use the following OTP to reset your password:</p>
          <div style="text-align: center; margin: 30px 0;">
            <div style="background-color: #f3f4f6; border: 2px dashed #9333ea; padding: 20px; border-radius: 8px; display: inline-block;">
              <span style="font-size: 32px; font-weight: bold; color: #9333ea; letter-spacing: 8px;">${otp}</span>
            </div>
          </div>
          <p>This OTP will expire in 15 minutes.</p>
        </div>
      `
    };

    await emailTransporter.sendMail(mailOptions);
  } catch (error) {
    console.error('❌ Error sending password reset email:', error);
  }
};

const sendPasswordResetSuccessEmail = async (user) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Password Reset Successful - Primiya\'s Art',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #10b981;">Password Reset Successful</h2>
          <p>Hello ${user.name},</p>
          <p>Your password has been successfully reset.</p>
        </div>
      `
    };

    await emailTransporter.sendMail(mailOptions);
  } catch (error) {
    console.error('❌ Error sending password reset success email:', error);
  }
};

module.exports = {
  sendWelcomeEmail,
  sendLoginNotificationEmail,
  sendSocialLoginWelcomeEmail,
  sendPasswordResetEmail,
  sendPasswordResetSuccessEmail
};