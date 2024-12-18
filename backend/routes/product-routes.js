const express = require('express');
const productController = require('../controllers/product-controller');
const { protect, admin } = require('../middleware/auth-middleware');

const router = express.Router();

router.route('/').get(productController.getProducts).post(protect, admin, productController.createProduct);
// to implement get & post HTTP methods we have to use the router as used above,so that we could provide authMiddleware methods too.

// router.get("/:pid", productController.getProductById);
router.route('/:pid').get(productController.getProductById).put(protect, admin, productController.updateProduct);


module.exports = router;