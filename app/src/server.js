const express = require('express');
const cors = require('cors');
const { port } = require('./config');
const mainRouter = require('./main/main');
const carRouter = require('./car/car');
const usersRouter = require('./users/users.router');
const productsRouter = require('./products/products.router');
const ordersRouter = require('./orders/orders.router');
const imagesRouter = require('./images/images.router');

const app = express();

initMiddleware(app);
initRoutes(app);

app.listen(port);

function initMiddleware(app) {
  app.use(express.json())
  app.use(cors());
};

function initRoutes(app) {
  app.use('/', mainRouter);
  app.use('/car', carRouter);
  app.use('/users', usersRouter);
  app.use('/products', productsRouter);
  app.use('/orders', ordersRouter);
  app.use('/images', imagesRouter);
  app.use('/*', (req, res, next) => {
    res.status(404).json('SmartBin: Invalid URL')
  });
};