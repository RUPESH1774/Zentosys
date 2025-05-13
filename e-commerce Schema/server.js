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
