const { products } = require("../data/products.js"); // This is how we import the exported array in the product file.

const Product = require("../models/productModel.js");
const errorModel = require("../models/error-model");

const getProducts = async (req, res, next) => {
  // res.json({products}); // {products : products}
  let products;
  try {
    products = await Product.find({});
  } catch (err) {
    const error = new Error(
      "Fetching products failed, please try again later."
    );
    error.code = 500;
    return next(error);
  }
  res.json({
    products: products.map((product) => product.toObject({ getters: true })),
  });
};

const getProductById = async (req, res, next) => {
  // const product = products.find((p)=>p._id === req.params.pid);
  // res.json(product); // {products : []}
  const productID = req.params.pid; // { pid: 'p1' }
  // console.log(`From backend product controller getProdcutById, checking productId from the param: ${productID}`);
  let product;

  try {
    product = await Product.findById(productID);
  } catch (err) {
    const error = new Error("Something went wrong, could not find a product."); // Error handling
    error.code = 500;
    return next(error);
  }
  if (!product) {
    const error = new Error(
      "Could not find a product for the provided product id."
    ); // Error handling
    error.code = 404;
    return next(error); // so that it will reach to the next middleware handling the error handling.
  }

  res.json({ product: product.toObject({ getters: true }) }); // => { product } => { product: product }
};

const createProduct = async (req, res, next) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
};

const updateProduct = async (req, res, next) => {
  const { name, price, description, image, brand, category, countInStock } = req.body;

  const product = await Product.findById(req.params.pid);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    const error = new Error("Product not found."); // Error handling
    error.code = 404;
    return next(error); // so that it will reach to the next middleware handling the error handling.
  }
};

const deleteProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.pid);
  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.json({ message: 'Product removed' });
  } else {
    const error = new Error("Product not found."); // Error handling
    error.code = 404;
    return next(error); // so that it will reach to the next middleware handling the error handling.
  }
};

const createProductReview = async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    return next(errorModel(404, "Product not found"));
  }
};

exports.getProducts = getProducts;
exports.getProductById = getProductById;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
exports.createProductReview = createProductReview;