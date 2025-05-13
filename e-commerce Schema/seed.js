const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Product = require('./models/Product');  

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ MongoDB connected');
  importData();  
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
});

// Function to import data from the JSON file
const importData = async () => {
  try {
    const data = JSON.parse(fs.readFileSync('./testing/product.json', 'utf-8'));
    await Product.insertMany(data);
    console.log('✅ Data imported successfully!');
    process.exit();
  } catch (err) {
    console.error('❌ Error importing data:', err.message);
    console.error(err.stack);
    process.exit(1);
  }
};






















// http://localhost:3000/api/products/vendor/6614b5ef2e3a7c29bd324fa2
// 
