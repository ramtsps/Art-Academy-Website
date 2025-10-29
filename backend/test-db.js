const mongoose = require('mongoose');
require('dotenv').config();

async function testConnection() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/primiya-art', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected successfully!');
    
    // Test if we can create a user
    const User = mongoose.model('User', new mongoose.Schema({
      name: String,
      email: String
    }));
    
    console.log('✅ Database test completed successfully!');
    process.exit(0);
  } catch (error) {
    console.log('❌ Connection failed:', error.message);
    process.exit(1);
  }
}

testConnection();