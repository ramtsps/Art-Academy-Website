module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || 'your-jwt-secret-key',
  STRAPI_URL: process.env.STRAPI_URL || 'http://localhost:1337',
  CORS_ORIGINS: [
    process.env.FRONTEND_URL,
    "https://primiyas-art.vercel.app",
    "http://localhost:5173"
  ].filter(Boolean),
  OTP_EXPIRY: 15 * 60 * 1000, // 15 minutes
  TOKEN_EXPIRY: '7d'
};