const express = require('express');
const productController = require('../controllers/product-controller');

const router = express.Router();

router.get('/', productController.getProducts);

router.get("/:pid", productController.getProductById)


module.exports = router;