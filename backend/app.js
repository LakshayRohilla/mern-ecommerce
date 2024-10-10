const express = require('express');
const routers = require('./routes/route');
const productRoutes = require('./routes/product-routes');
const dotenv = require('dotenv');
dotenv.config();


const app = express();

// Serve static files from the 'assets' folder
// app.use('/images', express.static('../frontend/src/assets/images'));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    res.setHeader("Access-Control-Allow-Credentials", "true");
  
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200); // Handle preflight requests by sending HTTP 200
    }
    next();
  });


// Routers : 
app.use(routers);
app.use('/api/products', productRoutes); 

app.listen(process.env.PORT || 5000);