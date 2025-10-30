const express = require('express');
const cors = require('cors');
const { swaggerUi, specs, swaggerOptions } = require('./docs/swagger');
const { CORS_ORIGINS } = require('./config/constants');

// Route imports
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');

const app = express();

// Middleware
app.use(cors({
  origin: CORS_ORIGINS,
  credentials: true
}));
app.use(express.json());

// FIX: Swagger Documentation with proper setup
app.use('/api-docs', swaggerUi.serve, (req, res, next) => {
  // Serve Swagger UI with custom options
  const swaggerHtml = swaggerUi.generateHTML(specs, swaggerOptions);
  res.send(swaggerHtml);
});

console.log('✅ Swagger UI available at /api-docs');

// Alternative JSON endpoint for Swagger spec
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(specs);
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', productRoutes);

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    const mongoose = require('mongoose');
    await mongoose.connection.db.admin().ping();
    res.json({ 
      success: true, 
      message: 'Server is healthy',
      database: 'Connected',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development'
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

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Route ${req.method} ${req.originalUrl} not found`
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({
    success: false,
    error: process.env.NODE_ENV === 'production' ? 'Internal server error' : error.message
  });
});

module.exports = app;