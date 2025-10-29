const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}));
app.use(express.json());

// MongoDB Connection with proper event handling
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Handle MongoDB connection events
mongoose.connection.on('connected', () => {
  console.log('✅ MongoDB connected successfully');
});

mongoose.connection.on('error', (err) => {
  console.log('❌ MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('❌ MongoDB disconnected');
});

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  googleId: { type: String },
  facebookId: { type: String },
  avatar: { type: String },
  provider: { type: String, default: 'email' },
  resetPasswordOTP: String,
  resetPasswordExpires: Date,
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret-key';

// Fix: Changed from createTransporter to createTransport
const emailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
// Email templates
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
            
            <p>You can now:</p>
            <ul>
              <li>Browse and enroll in art classes</li>
              <li>Purchase art supplies</li>
              <li>Manage your enrollments</li>
              <li>Track your artistic journey</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e5e5;">
            <p style="color: #666; font-size: 14px;">
              If you have any questions, feel free to contact us at support@primiyaart.com
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 20px;">
            <p style="color: #999; font-size: 12px;">
              Primiya's Art - Unleash Your Creativity
            </p>
          </div>
        </div>
      `
    };

    await emailTransporter.sendMail(mailOptions);
    console.log(`Welcome email sent to ${user.email}`);
  } catch (error) {
    console.error('Error sending welcome email:', error);
  }
};

const sendLoginNotificationEmail = async (user, loginMethod = 'email') => {
  try {
    const methodText = loginMethod === 'google' ? 'Google' : 
                      loginMethod === 'facebook' ? 'Facebook' : 'email';
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Login Notification - Primiya\'s Art',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h2 style="color: #9333ea; margin: 0;">Login Activity</h2>
          </div>
          
          <div style="background-color: #f8fafc; border-radius: 8px; padding: 20px;">
            <h3 style="color: #9333ea; margin-top: 0;">Hello ${user.name},</h3>
            <p>We noticed a recent login to your Primiya's Art account.</p>
            
            <div style="background-color: white; border: 1px solid #e5e5e5; border-radius: 6px; padding: 15px; margin: 15px 0;">
              <p style="margin: 0; font-weight: bold; color: #9333ea;">Login Details:</p>
              <p style="margin: 8px 0;"><strong>Time:</strong> ${new Date().toLocaleString()}</p>
              <p style="margin: 8px 0;"><strong>Login Method:</strong> ${methodText}</p>
              <p style="margin: 8px 0;"><strong>IP Address:</strong> ${req.ip || 'Unknown'}</p>
            </div>
            
            <p>If this was you, no action is needed.</p>
            <p style="color: #dc2626; font-weight: bold;">
              If you don't recognize this activity, please contact us immediately.
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 25px; padding-top: 20px; border-top: 1px solid #e5e5e5;">
            <p style="color: #666; font-size: 14px;">
              For security questions, contact: security@primiyaart.com
            </p>
          </div>
        </div>
      `
    };

    await emailTransporter.sendMail(mailOptions);
    console.log(`Login notification sent to ${user.email}`);
  } catch (error) {
    console.error('Error sending login notification email:', error);
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
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #9333ea; margin: 0;">Welcome to Primiya's Art!</h1>
            <p style="color: #666; font-size: 16px;">You've joined via ${providerText}</p>
          </div>
          
          <div style="background-color: #f8fafc; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <h3 style="color: #9333ea; margin-top: 0;">Hello ${user.name},</h3>
            <p>Welcome to our creative community! Your account has been created successfully using ${providerText}.</p>
            
            <div style="background-color: white; border-left: 4px solid #9333ea; padding: 15px; margin: 15px 0;">
              <p style="margin: 0; font-weight: bold;">Your Account:</p>
              <p style="margin: 5px 0;"><strong>Name:</strong> ${user.name}</p>
              <p style="margin: 5px 0;"><strong>Email:</strong> ${user.email}</p>
              <p style="margin: 5px 0;"><strong>Login Method:</strong> ${providerText}</p>
              <p style="margin: 5px 0;"><strong>Joined:</strong> ${new Date().toLocaleDateString()}</p>
            </div>
            
            <p>Get started with:</p>
            <ul>
              <li>Explore our art classes and workshops</li>
              <li>Browse premium art supplies</li>
              <li>Connect with fellow artists</li>
              <li>Track your creative progress</li>
            </ul>
            
            <div style="background-color: #fff7ed; border: 1px solid #fed7aa; border-radius: 6px; padding: 12px; margin: 15px 0;">
              <p style="margin: 0; color: #ea580c; font-size: 14px;">
                <strong>Tip:</strong> You can always link additional login methods in your account settings.
              </p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #666; font-size: 14px;">
              Need help? Contact us at support@primiyaart.com
            </p>
          </div>
        </div>
      `
    };

    await emailTransporter.sendMail(mailOptions);
    console.log(`Social welcome email sent to ${user.email} for ${provider}`);
  } catch (error) {
    console.error('Error sending social welcome email:', error);
  }
};
// Send OTP for password reset
app.post('/api/auth/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ success: false, error: 'Email is required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      // For security, don't reveal if email exists or not
      return res.json({ 
        success: true, 
        message: 'If an account with that email exists, an OTP has been sent.' 
      });
    }

    // Generate 6-digit OTP
    const otp = generateOTP();
    const otpExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes

    // Save OTP to user
    user.resetPasswordOTP = otp;
    user.resetPasswordExpires = otpExpiry;
    await user.save();

    // Send email with OTP
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Password Reset OTP - Primiya\'s Art',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #9333ea;">Password Reset OTP</h2>
          <p>Hello ${user.name},</p>
          <p>You requested to reset your password for your Primiya's Art account.</p>
          <p>Use the following OTP to reset your password:</p>
          <div style="text-align: center; margin: 30px 0;">
            <div style="background-color: #f3f4f6; border: 2px dashed #9333ea; 
                        padding: 20px; border-radius: 8px; display: inline-block;">
              <span style="font-size: 32px; font-weight: bold; color: #9333ea; letter-spacing: 8px;">
                ${otp}
              </span>
            </div>
          </div>
          <p>This OTP will expire in 15 minutes.</p>
          <p>If you didn't request this, please ignore this email.</p>
          <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">
            Primiya's Art - Art Classes & Enrollments
          </p>
        </div>
      `
    };

    await emailTransporter.sendMail(mailOptions);

    res.json({ 
      success: true, 
      message: 'If an account with that email exists, an OTP has been sent.' 
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ success: false, error: 'Error sending OTP email' });
  }
});

// Verify OTP
app.post('/api/auth/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    
    if (!email || !otp) {
      return res.status(400).json({ success: false, error: 'Email and OTP are required' });
    }

    // Find user with valid OTP
    const user = await User.findOne({
      email: email,
      resetPasswordOTP: otp,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ success: false, error: 'Invalid or expired OTP' });
    }

    res.json({ 
      success: true, 
      message: 'OTP verified successfully',
      verified: true
    });

  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({ success: false, error: 'Error verifying OTP' });
  }
});

// Reset Password with OTP
app.post('/api/auth/reset-password', async (req, res) => {
  try {
    const { email, otp, password } = req.body;
    
    if (!email || !otp || !password) {
      return res.status(400).json({ success: false, error: 'Email, OTP and password are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, error: 'Password must be at least 6 characters' });
    }

    // Find user with valid OTP
    const user = await User.findOne({
      email: email,
      resetPasswordOTP: otp,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ success: false, error: 'Invalid or expired OTP' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Update user password and clear OTP
    user.password = hashedPassword;
    user.resetPasswordOTP = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    // Send confirmation email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Password Reset Successful - Primiya\'s Art',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #10b981;">Password Reset Successful</h2>
          <p>Hello ${user.name},</p>
          <p>Your password has been successfully reset.</p>
          <p>If you did not make this change, please contact us immediately.</p>
          <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">
            Primiya's Art - Art Classes & Enrollments
          </p>
        </div>
      `
    };

    await emailTransporter.sendMail(mailOptions);

    res.json({ 
      success: true, 
      message: 'Password has been reset successfully' 
    });

  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ success: false, error: 'Error resetting password' });
  }
});

// ... rest of your existing routes (Google login, normal login, etc.) remain the same

// Google Login API - Updated to handle profile data directly
// Google Login API - Updated with email notifications
app.post('/api/auth/google', async (req, res) => {
  try {
    const { profile } = req.body;
    
    if (!profile || !profile.email) {
      return res.status(400).json({ success: false, error: 'Profile data is required' });
    }

    // Check if user already exists
    let user = await User.findOne({ 
      $or: [
        { email: profile.email },
        { googleId: profile.id }
      ] 
    });

    const isNewUser = !user;

    if (!user) {
      // Create new user
      user = new User({
        googleId: profile.id,
        name: profile.name,
        email: profile.email,
        avatar: profile.picture,
        provider: 'google'
      });
      await user.save();
      
      // Send welcome email for new Google user
      sendSocialLoginWelcomeEmail(user, 'google').catch(console.error);
    } else {
      // Update googleId if not present
      if (!user.googleId) {
        user.googleId = profile.id;
        await user.save();
      }
      
      // Update user info if changed
      if (user.name !== profile.name || user.avatar !== profile.picture) {
        user.name = profile.name;
        user.avatar = profile.picture;
        await user.save();
      }
      
      // Send login notification for existing user
      sendLoginNotificationEmail(user, 'google').catch(console.error);
    }

    // Generate JWT token
    const jwtToken = jwt.sign(
      { 
        userId: user._id, 
        email: user.email 
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      token: jwtToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      },
      isNewUser
    });

  } catch (error) {
    console.error('Google login error:', error);
    res.status(500).json({ success: false, error: 'Internal server error: ' + error.message });
  }
});

app.post('/api/auth/facebook', async (req, res) => {
  try {
    const { profile } = req.body;
    
    if (!profile || !profile.email) {
      return res.status(400).json({ success: false, error: 'Profile data is required' });
    }

    // Check if user already exists
    let user = await User.findOne({ 
      $or: [
        { email: profile.email },
        { facebookId: profile.id }
      ] 
    });

    const isNewUser = !user;

    if (!user) {
      // Create new user
      user = new User({
        facebookId: profile.id,
        name: profile.name,
        email: profile.email,
        avatar: profile.picture?.data?.url || profile.picture,
        provider: 'facebook'
      });
      await user.save();
      
      // Send welcome email for new Facebook user
      sendSocialLoginWelcomeEmail(user, 'facebook').catch(console.error);
    } else {
      // Update facebookId if not present
      if (!user.facebookId) {
        user.facebookId = profile.id;
        await user.save();
      }
      
      // Update user info if changed
      const facebookAvatar = profile.picture?.data?.url || profile.picture;
      if (user.name !== profile.name || user.avatar !== facebookAvatar) {
        user.name = profile.name;
        user.avatar = facebookAvatar;
        await user.save();
      }
      
      // Send login notification for existing user
      sendLoginNotificationEmail(user, 'facebook').catch(console.error);
    }

    // Generate JWT token
    const jwtToken = jwt.sign(
      { 
        userId: user._id, 
        email: user.email 
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      token: jwtToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      },
      isNewUser
    });

  } catch (error) {
    console.error('Facebook login error:', error);
    res.status(500).json({ success: false, error: 'Internal server error: ' + error.message });
  }
});

// Facebook callback route
app.get('/api/auth/facebook/callback', async (req, res) => {
  try {
    const { code } = req.query;
    
    if (!code) {
      return res.redirect(`${process.env.FRONTEND_URL}/login?error=facebook_auth_failed`);
    }

    // Exchange code for access token
    const tokenResponse = await fetch(`https://graph.facebook.com/v18.0/oauth/access_token?client_id=${process.env.FACEBOOK_APP_ID}&client_secret=${process.env.FACEBOOK_APP_SECRET}&code=${code}&redirect_uri=${process.env.FRONTEND_URL}/auth/facebook/callback`);
    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      return res.redirect(`${process.env.FRONTEND_URL}/login?error=facebook_token_failed`);
    }

    // Get user info
    const userResponse = await fetch(`https://graph.facebook.com/me?fields=id,name,email,picture.type(large)&access_token=${tokenData.access_token}`);
    const userData = await userResponse.json();

    // Find or create user (same logic as your existing Facebook route)
    let user = await User.findOne({ 
      $or: [
        { email: userData.email },
        { facebookId: userData.id }
      ] 
    });

    if (!user) {
      user = new User({
        facebookId: userData.id,
        name: userData.name,
        email: userData.email,
        avatar: userData.picture?.data?.url,
        provider: 'facebook'
      });
      await user.save();
    }

    // Generate JWT token
    const jwtToken = jwt.sign(
      { 
        userId: user._id, 
        email: user.email 
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Redirect to frontend with token
    res.redirect(`${process.env.FRONTEND_URL}/auth/success?token=${jwtToken}`);

  } catch (error) {
    console.error('Facebook callback error:', error);
    res.redirect(`${process.env.FRONTEND_URL}/login?error=facebook_auth_failed`);
  }
});

// Normal Registration - Updated with email
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, error: 'User already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      provider: 'email'
    });
    
    await user.save();
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    // Send welcome email (don't await to avoid delaying response)
    sendWelcomeEmail(user).catch(console.error);
    
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Normal Login
// Normal Login - Updated with email notification
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user || !user.password) {
      return res.status(400).json({ success: false, error: 'Invalid credentials' });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, error: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    // Send login notification email
    sendLoginNotificationEmail(user, 'email').catch(console.error);
    
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Verify Token Middleware
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ success: false, error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ success: false, error: 'Invalid token' });
  }
};

// Get User Profile
app.get('/api/auth/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    
    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Health check endpoint to test DB connection
app.get('/api/health', async (req, res) => {
  try {
    // Try to ping the database
    await mongoose.connection.db.admin().ping();
    res.json({ 
      success: true, 
      message: 'Server is healthy',
      database: 'Connected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(503).json({ 
      success: false, 
      message: 'Database connection failed',
      database: 'Disconnected',
      error: error.message 
    });
  }
});

const PORT = process.env.PORT || 5000;

// Start server only after checking initial connection
const startServer = async () => {
  try {
    // Wait a moment for MongoDB to connect
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📊 MongoDB status: ${mongoose.connection.readyState === 1 ? 'Connected ✅' : 'Connecting...'}`);
      console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();