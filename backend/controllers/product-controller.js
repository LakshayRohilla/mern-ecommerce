const {products} = require('../data/products.js'); // This is how we import the exported array in the product file.

const Product = require('../models/productModel.js')
const getProducts = async (req, res, next) => {
    // res.json({products}); // {products : products}
    let products;
    try {
        products = await Product.find({});
    } catch (err) {
    
        const error = new Error('Fetching products failed, please try again later.');
        error.code = 500;
        return next(error);
    }
    res.json({products: products.map(product => product.toObject({ getters: true }))});
}

const getProductById = async (req, res, next) => {
    // const product = products.find((p)=>p._id === req.params.pid);
    // res.json(product); // {products : []}
    const productID = req.params.pid; // { pid: 'p1' }
    let product;

    try {
        product = await Product.findById(productID);
    } catch (err) {
        const error = new Error("Something went wrong, could not find a product.");
        error.code = 404;
        return next(error);
    }
    if (!product) {
        const error = new Error("Could not find a product for the provided product id.");
        error.code = 404;
        return next(error); // so that it will reach to the next middleware handling the error handling.
    }

    res.json({ product: product.toObject({ getters: true }) }); // => { product } => { product: product }
}


exports.getProducts = getProducts;
exports.getProductById = getProductById;