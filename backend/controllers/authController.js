const User = require('../models/User');
const { 
  generateToken, 
  hashPassword, 
  comparePassword, 
  generateOTP 
} = require('../services/authService');
const { 
  sendWelcomeEmail, 
  sendLoginNotificationEmail, 
  sendSocialLoginWelcomeEmail,
  sendPasswordResetEmail,
  sendPasswordResetSuccessEmail
} = require('../services/emailService');
const { OTP_EXPIRY } = require('../config/constants');

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, error: 'User already exists' });
    }
    
    const hashedPassword = await hashPassword(password);
    
    const user = new User({
      name,
      email,
      password: hashedPassword,
      provider: 'email'
    });
    
    await user.save();
    
    const token = generateToken({ userId: user._id, email: user.email });
    
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
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user || !user.password) {
      return res.status(400).json({ success: false, error: 'Invalid credentials' });
    }
    
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, error: 'Invalid credentials' });
    }
    
    const token = generateToken({ userId: user._id, email: user.email });
    
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
};

const googleLogin = async (req, res) => {
  try {
    const { profile } = req.body;
    
    if (!profile || !profile.email) {
      return res.status(400).json({ success: false, error: 'Profile data is required' });
    }

    let user = await User.findOne({ 
      $or: [
        { email: profile.email },
        { googleId: profile.id }
      ] 
    });

    const isNewUser = !user;

    if (!user) {
      user = new User({
        googleId: profile.id,
        name: profile.name,
        email: profile.email,
        avatar: profile.picture,
        provider: 'google'
      });
      await user.save();
      
      sendSocialLoginWelcomeEmail(user, 'google').catch(console.error);
    } else {
      if (!user.googleId) user.googleId = profile.id;
      if (user.name !== profile.name || user.avatar !== profile.picture) {
        user.name = profile.name;
        user.avatar = profile.picture;
        await user.save();
      }
      
      sendLoginNotificationEmail(user, 'google').catch(console.error);
    }

    const jwtToken = generateToken({ userId: user._id, email: user.email });

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
};

const facebookLogin = async (req, res) => {
  try {
    const { profile } = req.body;
    
    if (!profile || !profile.email) {
      return res.status(400).json({ success: false, error: 'Profile data is required' });
    }

    let user = await User.findOne({ 
      $or: [
        { email: profile.email },
        { facebookId: profile.id }
      ] 
    });

    const isNewUser = !user;

    if (!user) {
      user = new User({
        facebookId: profile.id,
        name: profile.name,
        email: profile.email,
        avatar: profile.picture?.data?.url || profile.picture,
        provider: 'facebook'
      });
      await user.save();
      
      sendSocialLoginWelcomeEmail(user, 'facebook').catch(console.error);
    } else {
      if (!user.facebookId) user.facebookId = profile.id;
      const facebookAvatar = profile.picture?.data?.url || profile.picture;
      if (user.name !== profile.name || user.avatar !== facebookAvatar) {
        user.name = profile.name;
        user.avatar = facebookAvatar;
        await user.save();
      }
      
      sendLoginNotificationEmail(user, 'facebook').catch(console.error);
    }

    const jwtToken = generateToken({ userId: user._id, email: user.email });

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
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ success: false, error: 'Email is required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ 
        success: true, 
        message: 'If an account with that email exists, an OTP has been sent.' 
      });
    }

    const otp = generateOTP();
    const otpExpiry = Date.now() + OTP_EXPIRY;

    user.resetPasswordOTP = otp;
    user.resetPasswordExpires = otpExpiry;
    await user.save();

    await sendPasswordResetEmail(user, otp);

    res.json({ 
      success: true, 
      message: 'If an account with that email exists, an OTP has been sent.' 
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ success: false, error: 'Error sending OTP email' });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    
    if (!email || !otp) {
      return res.status(400).json({ success: false, error: 'Email and OTP are required' });
    }

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
};

const resetPassword = async (req, res) => {
  try {
    const { email, otp, password } = req.body;
    
    if (!email || !otp || !password) {
      return res.status(400).json({ success: false, error: 'Email, OTP and password are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, error: 'Password must be at least 6 characters' });
    }

    const user = await User.findOne({
      email: email,
      resetPasswordOTP: otp,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ success: false, error: 'Invalid or expired OTP' });
    }

    const hashedPassword = await hashPassword(password);
    user.password = hashedPassword;
    user.resetPasswordOTP = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    await sendPasswordResetSuccessEmail(user);

    res.json({ 
      success: true, 
      message: 'Password has been reset successfully' 
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ success: false, error: 'Error resetting password' });
  }
};

const getProfile = async (req, res) => {
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
};

module.exports = {
  register,
  login,
  googleLogin,
  facebookLogin,
  forgotPassword,
  verifyOTP,
  resetPassword,
  getProfile
};