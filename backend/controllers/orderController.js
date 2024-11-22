const addOrderItems = async (req, res, next) => {
  // res.json({"message":'add order items'});
  res.send("add order items");
};

const getMyOrders = async (req, res, next) => {
  // res.json({"message":'add order items'});
  res.send("get my order");
};

const getOrderById = async (req, res, next) => {
  // res.json({"message":'add order items'});
  res.send("get order by id !!");
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
