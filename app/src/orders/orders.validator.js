const validator = require('node-validator');

class OrdersValidator {
    constructor(){};

    get sendOrdersUser() {
        return this._sendOrdersUser.bind(this);
    };

    async _sendOrdersUser(req, res, next) {
        const url = req.url;
        const userId = +req.query.userId;

        if(!url.includes('?')){
            return next();
        } else if(url.includes('?') && userId){
            return next();
        } else {
            return res.status(404).json('SmartBin: Invalid URL');
        };
    };

    get sendOrder () {
        return this._sendOrder.bind(this);
    };

    async _sendOrder(req, res, next) {
        const id = +req.params.id;

        if(id) {
            return next();
        } else if (!id) {
            return res.status(404).json('SmartBin: Invalid URL');
        };
    };

    get createOrder() {
        return this._createOrder.bind(this);
    };

    async _createOrder(req, res, next){
        const url = req.url;

        if(url.includes('?')) {
            return res.status(404).json('SmartBin: Invalid URL');
        } else {
            const createOrdersRules = validator.isObject()
        .withRequired("user", validator.isNumber())
        .withRequired("products", validator.isArray())
        .withRequired("deliveryType", validator.isString())
        .withRequired("deliveryAdress", validator.isString());

        validator.run(createOrdersRules, req.body, (errCount, errors) => {
            if (errCount) {
                return res.status(400).json(errors);
            };
            return next();
        });
        };  
    };
};

module.exports = new OrdersValidator();