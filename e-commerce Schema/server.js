require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
require('./config/db');

const productRoutes = require('./Routes/productRoute');

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);

app.get('/',(req,res)=>{
    res.send('Welcome to E-commerce API')
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));



// const express = require('express');
// const dotenv = require('dotenv');
// const mongoose = require('mongoose');
// const productRoutes = require('./Routes/productRoute');  // Adjust path if necessary

// dotenv.config();

// // Initialize Express app
// const app = express();

// // Middleware
// app.use(express.json());

// // Use product routes
// app.use('/api/products', productRoutes);

// // MongoDB connection and server start
// mongoose.connect(process.env.MONGO_URI || process.env.MONGO_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => {
//     console.log('✅ MongoDB connected');
//     const PORT = process.env.PORT || 3000;
//     app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
//   })
//   .catch(err => {
//     console.error('❌ MongoDB connection error:', err);
//   });
