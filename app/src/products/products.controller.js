const fs = require('fs');
const path = require('path');
const productsModel = require('./products.model');

const filePath = path.join(__dirname, '../../', 'data/products/', 'all-products.json')

class ProductsController {
    constructor () {};

    get sendProducts () {
        return this._sendProducts.bind(this);
    };

    async _sendProducts(req, res, next) {
        const idsQuery = req.query.ids;
        const categoryQuery = req.query.category;

        try {
            await fs.readFile(filePath, 'utf8', (err, contents) => {
                if(err) throw err;
                const allProducts = JSON.parse(contents);
                productsModel.sendProducts(idsQuery, categoryQuery, allProducts, res);
            });
        } catch(err) {
            return next(err);
        };
    };

    get sendProductId () {
        return this._sendProductId.bind(this);
    };

    async _sendProductId(req, res, next) {
        const id = +req.params.id;

        try {
            await fs.readFile(filePath, 'utf8', (err, contents) => {
                if(err) throw err;
                const allProducts = JSON.parse(contents);
                productsModel.sendProductId(id, allProducts, res);
            });
        } catch(err) {
            return next(err);
        };
    };

    get createProduct () {
        return this._createProduct.bind(this);
    };

    async _createProduct (req, res, next) {
        const product = {
            id: Date.now(),
            ...req.body,
            created: new Date().toLocaleString(),
        };

        try {
            await fs.readFile(filePath, 'utf8', (err, contents) => {
                if(err) throw err;
                const allProducts = JSON.parse(contents);
                productsModel.createProduct(product, allProducts, res);
            });
        } catch(err) {
            return next(err);
        };
    };

    get updateProduct() {
        return this._updateProduct.bind(this);
    };

    async _updateProduct(req, res, next) {
        const id = +req.params.id;
        const changeProduct = req.body;

        try {
            await fs.readFile(filePath, 'utf8', (err, contents) => {
                if(err) throw err;
                const allProducts = JSON.parse(contents);
                productsModel.updateProduct(id, changeProduct, allProducts, res);
            });
        } catch(err) {
            return next(err);
        };
    };

    get deleteProduct() {
        return this._deleteProduct.bind(this);
    };

    async _deleteProduct(req, res, next){
        const id = +req.params.id;

        try {
            await fs.readFile(filePath, 'utf8', (err, contents) => {
                if(err) throw err;
                const allProducts = JSON.parse(contents);
                productsModel.deleteProduct(id, allProducts, res);
            });
        } catch(err){
            return next(err);
        };
    };
};

module.exports = new ProductsController();