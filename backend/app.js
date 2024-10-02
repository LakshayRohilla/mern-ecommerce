const express = require('express');
const routers = require('./routes/route');

const app = express();

// Routers : 
app.use(routers);

app.listen(5000);