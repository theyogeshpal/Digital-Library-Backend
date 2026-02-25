const mongoose = require('mongoose');
const Admin = require('./src/Models/admin.model');
require('dotenv').config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: 'admin' });
    if (existingAdmin) {
      console.log('Admin already exists!');
      process.exit(0);
    }

    // Create new admin
    const admin = new Admin({
      username: 'admin',
      password: 'admin123', // Change this to a secure password
      email: 'admin@digitallibrary.com',
      role: 'admin'
    });

    await admin.save();
    console.log('Admin created successfully!');
    console.log('Username: admin');
    console.log('Password: admin123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();
