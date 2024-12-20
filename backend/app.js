const express = require('express');
const routers = require('./routes/route');
const productRoutes = require('./routes/product-routes');
const userRoutes = require('./routes/user-routes');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const orderRoutes = require('./routes/orderRoutes');
const path = require('path');
const uploadRoutes = require('./routes/uploadRoutes');

dotenv.config();
connectDB(); // connect to MongoDB;


const app = express();
app.use(bodyParser.json()); // this will parse any incoming request body.

// Cookie parser middleware
app.use(cookieParser());

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
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res, next) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

// Middleware for handling errors that we are adding in the controllers.
app.use((error, req, res, next) => { 
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500)
  res.json({message: error.message || 'An unknown error occurred!'});
});

// We would like to make the upload folder as an static folder
const __dirName = path.resolve(); // Set __dirname to the current directory
app.use('/uploads', express.static(path.join(__dirName, '/uploads')));

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '/frontend/build')));
//   app.get('*', (req, res) =>
//     res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
//   );
// }

app.listen(process.env.PORT || 5000);