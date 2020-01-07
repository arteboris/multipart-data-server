const validator = require('node-validator');

class ProductsValidator {
    constructor () {}

    get sendProducts () {
        return this._sendProducts.bind(this);
    };

    async _sendProducts(req, res, next) {
        const url = req.url;
        const ids = req.query.ids;
        const category = req.query.category;

        if(!url.includes('?')){
            return next();
        } else if(url.includes('?') && ids || category){
            return next();
        } else {
            return res.status(404).json('SmartBin: Invalid URL');
        };

    };

    get sendProductId () {
        return this._sendProductId.bind(this);
    };

    async _sendProductId(req, res, next) {
        const id = +req.params.id;
        if(id){
            return next();
        } else {
            return res.status(404).json('SmartBin: Invalid URL');
        };
    };

    get createProduct () {
        return this._createProduct.bind(this);
    };
    
    async _createProduct(req, res, next) {
        const url = req.url;

        if(url.includes('?')) {
            return res.status(404).json('SmartBin: Invalid URL');
        } else {
        const createProductRules = validator.isObject()
        .withRequired("name", validator.isString())
        .withRequired("description", validator.isString())
        .withRequired("price", validator.isNumber())
        .withRequired("currency", validator.isString())
        .withRequired("categories", validator.isArray())

        validator.run(createProductRules, req.body, (errCount, errors) => {
            if(errCount) {
                return res.status(400).json(errors);
            };
            return next();
        });
    };
    };

    get updateProduct() {
        return this._updateProduct.bind(this);
    };

    async _updateProduct(req, res, next) {
        const id = +req.params.id;
        if(id) {
            const createProductRules = validator.isObject()
                .withOptional("name", validator.isString())
                .withOptional("description", validator.isString())
                .withOptional("price", validator.isNumber())
                .withOptional("currency", validator.isString())
                .withOptional("categories", validator.isArray())

                validator.run(createProductRules, req.body, (errCount, errors) => {
                    if(errCount) {
                        return res.status(400).json(errors);
                    };
            return next();
        });
        } else {
            return res.status(404).json('SmartBin: Invalid URL');
        }; 
    };

    get deleteProduct() {
        return this._deleteProduct.bind(this);
    };

    async _deleteProduct(req, res, next){
        const id = +req.params.id;
        if(id){
            return next();
        } else {
            return res.status(404).json('SmartBin: Invalid URL');
        };
    };
};

module.exports = new ProductsValidator();

