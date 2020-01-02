const fs = require('fs');
const path = require('path');
const usersModel = require('./users.model')

const filePath = path.join(__dirname, '../../', 'data/users/', 'all-users.json');

class UsersController {
    constructor() {}

    get createUser() {
        return this._createUser.bind(this);
    };

    async _createUser(req, res, next){
        
        const user = {
            id: Date.now(),
            ...req.body
        };
        try {
            await fs.readFile(filePath, 'utf8', (err, contents) => {
                if(err) throw err;
                
                const allUsers = JSON.parse(contents);
                usersModel.createUser(user, allUsers, res);
                return;
            });

        } catch(err) {
            next(err);
        };
    };


    get deleteUser() {
        return this._deleteUser.bind(this);
    };

    async _deleteUser(req, res, next) {
        const id = +req.params.id;

        try{
            await fs.readFile(filePath, 'utf8', (err, contents) => {
                if(err) throw err;

                const allUsers = JSON.parse(contents);
                usersModel.deleteUser(id, allUsers, res);
                return;
            })

        } catch (err) {
            next(err);
        };
    };
};

module.exports = new UsersController;