const fs = require('fs');
const path = require('path');
const ordersModel = require('./orders.model');

const filePathUsers = path.join(__dirname, '../../', 'data/users/', 'all-users.json');
const filePathProducts = path.join(__dirname, '../../', 'data/products/', 'all-products.json');
const filePathOrders = path.join(__dirname, '../../', 'data/orders/', 'all-orders.json');

class OrdersController {
    constructor () {};

    get sendOrdersUser() {
        return this._sendOrdersUser.bind(this);
    };

    async _sendOrdersUser(req, res, next) {
        const userId = +req.query.userId;

        try{
            await fs.readFile(filePathOrders, 'utf8', (err, data) => {
                if(err) throw err;
                const allOrders = JSON.parse(data);
                ordersModel.sendOrdersUser(userId, allOrders, res);
            });
        } catch(err) {
            return next(err);
        };
    };

    get sendOrder () {
        return this._sendOrder.bind(this);
    };

    async _sendOrder(req, res, next) {
        const id = +req.params.id;

        try {
            await fs.readFile(filePathOrders, 'utf8', (err, contents) => {
                if(err) throw err;
                const allOrders = JSON.parse(contents);
                ordersModel.sendOrder(id, allOrders, res);
            });
        } catch (err) {
            return next(err);
        };
    };

    get createOrder() {
        return this._createOrder.bind(this);
    };

    async _createOrder(req, res, next){
        const body = req.body;
        const userId = req.body.user;
        const productsId = req.body.products;

        try {
            await fs.readFile(filePathUsers, 'utf8', async (err, contents) => {
                if(err) throw err;
                const allUsers = JSON.parse(contents);

                    await fs.readFile(filePathProducts, 'utf8', async (err, data) => {
                        if(err) throw err;
                        const allProducts = JSON.parse(data);

                        await fs.readFile(filePathOrders, 'utf8', (err, elem) => {
                            if(err) throw err;
                            const allOrders = JSON.parse(elem);

        ordersModel.createOrder(body, userId, productsId, allUsers, allProducts, allOrders, res);
                        });
                    });
            });
        } catch (err) {
            return next(err);
        };
    };
};

module.exports = new OrdersController;