const validator = require('node-validator');

class UsersValidator {
    constructor () {};

    get sendUsers() {
        return this._sendUsers.bind(this);
    };

    async _sendUsers(req, res, next) {
        const url = req.url;
        const ids = req.query.ids;

        if(!url.includes('?')){
            return next();
        } else if(url.includes('?') && ids){
            return next();
        } else {
            return res.status(404).json('SmartBin: Invalid URL');
        };
    };

    
    get sendUserId() {
        return this._sendUserId.bind(this);
    };

    async _sendUserId(req, res, next) {
        const id = +req.params.id;
        if(id) {
            return next();
        } else {
            return res.status(404).json('SmartBin: Invalid URL');
        };
    };
    
    get createUser () {
        return this._createUser.bind(this);
    };

    async _createUser(req, res, next) {
        const url = req.url;

        if(url.includes('?')) {
            return res.status(404).json('SmartBin: Invalid URL');
        } else {
            const createUserRules = validator.isObject()
            .withRequired("name", validator.isString())
            .withRequired("tel", validator.isNumber())
            .withRequired("email", validator.isString());
    
            validator.run(createUserRules, req.body, (errCount, errors) => {
                if (errCount) {
                    return res.status(400).json(errors);
                };
                return next();
            });
        };
    };

    get deleteUser () {
        return this._deleteUser.bind(this);
    };

    async _deleteUser(req, res, next) {
        const id = +req.params.id;
        if(id) {
            return next();
        } else {
            return res.status(404).json('SmartBin: Invalid URL');
        };
    };

    get updateUser () {
        return this._updateUser.bind(this);
    };

    async _updateUser(req, res, next){
        const id = +req.params.id;
        if(id) {
            const updateUserRules = validator.isObject()
            .withOptional("name", validator.isString())
            .withOptional("tel", validator.isNumber())
            .withOptional("email", validator.isString());

            validator.run(updateUserRules, req.body, (errCount, errors) => {
                if(errCount) {
                   return res.status(400).json(errors)
                };
                return next();
            });
        } else {
           return res.status(404).json('SmartBin: Invalid URL');
        };
    };
};

module.exports = new UsersValidator();