const express = require('express');
// import {
//   addOrderItems,
//   getMyOrders,
//   getOrderById,
//   updateOrderToPaid,
//   updateOrderToDelivered,
//   getOrders,
// } from '../controllers/orderController.js';
const orderController = require('../controllers/orderController');
const {protect, admin} = require('../middleware/auth-middleware');

const router = express.Router();

router.route('/').post(protect, orderController.addOrderItems).get(protect, admin, orderController.getOrders);
router.route('/mine').get(protect, orderController.getMyOrders);
router.route('/:id').get(protect, orderController.getOrderById);
router.route('/:id/pay').put(protect, orderController.updateOrderToPaid);
router.route('/:id/deliver').put(protect, admin, orderController.updateOrderToDelivered);

module.exports = router;