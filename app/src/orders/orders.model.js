const fs = require('fs');
const path = require('path');

const filePathOrders = path.join(__dirname, '../../', 'data/orders/', 'all-orders.json');

class OrdersModel {
    constructor() {};

    get sendOrdersUser() {
        return this._sendOrdersUser.bind(this);
    };

    async _sendOrdersUser(userId, allOrders, res) {
        if(userId) {
            const ordersUser = allOrders.reduce((acc, elem) => {
                if(userId === elem.user.id) acc = [...acc, elem];
                return acc;
            }, []);

            if(ordersUser.length > 0) {
                return res.status(200).json({'status': 'success', 'orders': ordersUser})
            } else if (ordersUser.length === 0) {
                return res.status(200).json({'status': 'no orders', 'orders': null})
            }

        } else if (!userId) {
            return res.status(200).json({'status': 'success','orders': allOrders});
        };
    };

    get sendOrder () {
        return this._sendOrder.bind(this);
    };

    async _sendOrder(id, allOrders, res) {
        const orderId = allOrders.find(elem => elem.id === id);

        if(orderId) {
            return res.status(200).json({'status': 'success',
        'order': orderId});
        } else {
            return res.status(400).json({'status': 'no order', 
        'order': null });
        };
    };

    get createOrder() {
        return this._createOrder.bind(this);
    };

    async _createOrder(body, userId, productsId, allUsers, allProducts, allOrders, res){
        const user = allUsers.find(elem => elem.id === userId);
        if(!user) {
            return res.status(400).json({'status': 'failed', 'user': 'no user', 'order': null})
        } else if (user) {

            const products = allProducts.reduce((acc, elem) => {
                for(let id of productsId){
                    if(id.includes(elem.id)) acc = [...acc, elem];
                };
                return acc;
            }, []);

            if(products.length === 0) {
                return res.status(400).json({'status': 'failed', 'products': 'no products', 'order': null})
            } 
            
            else if (products.length > 0) {

                const userOrder = new Object();
                userOrder.name = user.name;
                userOrder.email = user.email;
                userOrder.id = user.id;
                const bodyOrder = new Object();
                bodyOrder.deliveryType = body.deliveryType;
                bodyOrder.deliveryAdress = body.deliveryAdress;

                const productsOrder = products.reduce((acc, elem) => {
                    const product = new Object();
                    product.name = elem.name;
                    product.description = elem.description;
                    product.price = elem.price;
                    product.categories = elem.categories;

                    return [...acc, product];
                }, []);

                const total = products.reduce((acc, elem) => {
                    return acc + elem.price;
                }, 0);

                const order = {
                    'id': Date.now(),
                    'user': userOrder,
                    'products': productsOrder,
                    'total': total,
                    'currency': 'UAH',
                    ...bodyOrder,
                    'created': new Date().toLocaleString(),
                };

                const newAllOrders = [order, ...allOrders];

                try {
                    await fs.writeFile(filePathOrders, JSON.stringify(newAllOrders), err => {
                        if(err) throw err;
                    });
                    return res.status(201).json({'status': 'success', 'order': order});
                } catch(err) {
                    return next(err);
                };
            };
        };
    };
};

module.exports = new OrdersModel();