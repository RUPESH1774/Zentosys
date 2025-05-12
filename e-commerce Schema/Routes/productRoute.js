const express = require('express');
const router = express.Router();
const Product = require('../models/Product');  // Adjust path if necessary

// GET /products/vendor/:vendorId
router.get('/vendor/:vendorId', async (req, res) => {
  try {
    const { vendorId } = req.params;
    const products = await Product.find({ vendorId });

    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found for this vendor' });
    }

    res.status(200).json(products);  // Send the products as JSON response
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vendor products', error });
  }
});

module.exports = router;


// http://localhost:3000/api/products/vendor/6614b5ef2e3a7c29bd324fa2