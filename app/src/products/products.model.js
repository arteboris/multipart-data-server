const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../../', 'data/products/', 'all-products.json');

class ProductsModel {
    constructor () {}

    get sendProducts () {
        return this._sendProducts.bind(this);
    };

    async _sendProducts(idsQuery, categoryQuery, allProducts, res) {

        if(idsQuery) {
            const ids = idsQuery.split(",");

            const productsIds = allProducts.reduce((acc, elem) => {
                for(let id of ids) {
                    if(id.includes(elem.id)) acc = [...acc, elem];
                };
                return acc;
            }, []);
            
        if(productsIds.length > 0) {
            return res.status(200).json({'status': 'success','products': productsIds});
        } else if(productsIds.length === 0) {
            return  res.status(400).json({'status': 'no products', 'products': []});
        }}
        
       else if(categoryQuery) {
            const category = categoryQuery.split(",");

            const productsCategory = allProducts.reduce((acc, elem) => {
                for(let categ of category) {
                    if(categ.includes(elem.categories)) acc = [...acc, elem];
                };
                return acc;
            }, []);
            
        if(productsCategory.length > 0) {
            return res.status(200).json({'status': 'success','products': productsCategory});
        } else if(productsCategory.length === 0) {
            return  res.status(400).json({'status': 'no products', 'products': []});
        }}

        else {
           return res.status(200).json({'status': 'success','products': allProducts});
        };
    };

    get sendProductId () {
        return this._sendProductId.bind(this);
    };

    async _sendProductId(id, allProducts, res) {
        const productId = allProducts.find(elem => elem.id === id);

        if(productId) {
            return res.status(200).json({'status': 'success',
        'product': productId});
        } else {
            return res.status(400).json({'status': 'no product', 
        'product': {} });
        };
    };

    get createProduct() {
        return this._createProduct.bind(this);
    };

    async _createProduct(product, allProducts, res) {
        const newAllProducts = [product, ...allProducts];

        try {
            await fs.writeFile(filePath, JSON.stringify(newAllProducts), err => {
                if(err) throw err;
            });
            return res.status(201).json({'status': 'success', 'product': product});

        } catch(err){
            return next(err);
        };
    };

    get updateProduct() {
        return this._updateProduct.bind(this);
    };

    async _updateProduct(id, changeProduct, allProducts, res) {
        const findUpdateProduct = allProducts.find(elem => elem.id === id);

        if(findUpdateProduct){
            const updateProduct = Object.assign(findUpdateProduct, changeProduct);
            updateProduct.modified = new Date().toLocaleString();
            

            const newAllProducts = allProducts.map(elem => elem.id === id ? updateProduct : elem);

            try {
                await fs.writeFile(filePath, JSON.stringify(newAllProducts), err =>{
                    if(err) throw err;
                });
                return res.status(200).json({'status': 'success', 'product': updateProduct});
            } catch (err) {
                return next(err);
            };
        } else if (!findUpdateProduct) {
            return res.status(400).json({'status': 'no product', 'product': `there is no product with such id: ${id}`});
        };
    };
    
    get deleteProduct() {
        return this._deleteProduct.bind(this);
    };

    async _deleteProduct(id, allProducts, res){
        const findProductDel = allProducts.find(elem => elem.id === id);

        if(findProductDel) {
            const newAllProducts = allProducts.filter(elem => elem.id !== id);

            try {
                await fs.writeFile(filePath, JSON.stringify(newAllProducts), err => {
                    if(err) throw err;
                });
                return res.status(200).json({ 'status': 'success',
                'product': `product with id:${id} has been deleted successfully`});
            } catch(err) {
                return next(err);
            };            
        } else if (!findProductDel) {
            return res.status(400).json({'status': 'no product',
            'product': `there is no product with such id: ${id}`});
        };
    };
};

module.exports = new ProductsModel();