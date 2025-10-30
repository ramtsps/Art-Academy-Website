const express = require('express');
const cors = require('cors');
const { swaggerUi, specs } = require('./docs/swagger');
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

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }'
}));
console.log('✅ Swagger UI available at /api-docs');

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

// FIXED: 404 handler - Use app.use without path instead of app.all('*')
app.use((req, res, next) => {
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
    error: 'Internal server error'
  });
});

module.exports = app;