const express = require('express');
const routers = require('./routes/route');
const productRoutes = require('./routes/product-routes');
const dotenv = require('dotenv');
dotenv.config();


const app = express();

// Serve static files from the 'assets' folder
// app.use('/images', express.static('../frontend/src/assets/images'));

// Routers : 
app.use(routers);
app.use('/api/products', productRoutes); 

app.listen(process.env.PORT || 5000);