const {products} = require('../data/products.js'); // This is how we import the exported array in the product file.

const getProducts = async (req, res, next) => {
    res.json({products}); // {products : products}
}

const getProductById = async (req, res, next) => {
    const product = products.find((p)=>p._id === req.params.pid);
    res.json(product); // {products : []}
}


exports.getProducts = getProducts;
exports.getProductById = getProductById;