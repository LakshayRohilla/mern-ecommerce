const Order = require("../models/orderModel");

const addOrderItems = async (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  if (orderItems && orderItems.length === 0) {
    const error = new Error("No order items.");
    error.code = 400;
    return next(error);
  } else {
    const order = new Order({
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined,
      })),
      user: req.user._id, 
      // As we have used protect in the route file from there we can use the req.user that we have in the potect function.
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
  // res.json({"message":'add order items'});
  //   res.send("add order items");
};

const getMyOrders = async (req, res, next) => {
  // res.json({"message":'add order items'});
  //   res.send("get my order");
  let orders;
  try {
    orders = await Order.find({ user: req.user._id });
  } catch (err) {
    const error = new Error("Fetching orders failed, please try again later.");
    error.code = 500;
    return next(error);
  }
  res.status(200).json({orders: orders.map((product) => order.toObject({ getters: true })),}); // just to have the id field as well.
  // We can also do.
  // res.json(orders)
};

const getOrderById = async (req, res, next) => {
  // res.json({"message":'add order items'});
  //   res.send("get order by id !!");
  const orderID = req.params.id;
  let order;

  try {
    // const order = await Order.findById(req.params.id).populate( 
    const order = await Order.findById(req.params.id).populate("user", "name email"); 
    // populate() in Mongoose replaces a referenced object ID (like user in the Order model) with the 
    // actual document data from the related collection (e.g., the User model).

    // Here, it fetches the user associated with the Order by its ID and includes only the name and email 
    // fields in the response.
    } catch {
        const error = new Error("Something went wrong, could not find a order."); // Error handling 
        error.code = 500;
        return next(error);
    }

    if (!order) {
        const error = new Error("Could not find a order for the provided order id."); // Error handling
        error.code = 404;
        return next(error); // so that it will reach to the next middleware handling the error handling.
    }

    res.json({ order: order.toObject({ getters: true }) }); // => { order } => { order: order } with extra id field.
    // res.json(order);
};

const updateOrderToPaid = async (req, res, next) => {
  // res.json({"message":'add order items'});
  res.send("update order to paid");
};

const updateOrderToDelivered = async (req, res, next) => {
  // res.json({"message":'add order items'});
  res.send("update order to delivered");
};

const getOrders = async (req, res, next) => {
  // res.json({"message":'add order items'});
  res.send("get all orders");
};

module.exports = {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};
