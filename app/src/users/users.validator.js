const validator = require('node-validator');

class UsersValidator {
    constructor () {};
    
    get createUser () {
        return this._createUser.bind(this);
    };

    async _createUser(req, res, next) {
        const createUserRules = validator.isObject()
        .withRequired("name", validator.isString())
        .withRequired("tel", validator.isNumber())
        .withRequired("email", validator.isString());

        validator.run(createUserRules, req.body, (errCount, errors) => {
            if (errCount) {
                res.status(400).json(errors);
            };
            return next();
        });
    };
};

module.exports = new UsersValidator();