const fs = require('fs');
const path = require('path');
const usersModel = require('./users.model')

const filePath = path.join(__dirname, '../../', 'data/users/', 'all-users.json');

class UsersController {
    constructor() {}

    
    get sendUsers() {
        return this._sendUsers.bind(this);
    };

    async _sendUsers(req, res, next) {
        const idsQuery = req.query.ids;

        try {
            await fs.readFile(filePath, 'utf8', (err, contents) => {
                if (err) throw err;
                const allUsers = JSON.parse(contents);
                usersModel.sendUsers(idsQuery, allUsers, res);
            });
        } catch(err) {
            return next(err);
        };
    };

    get sendUserId() {
        return this._sendUserId.bind(this);
    };

    async _sendUserId(req, res, next) {
        const id = +req.params.id;
        try {
            await fs.readFile(filePath, 'utf8', (err, contents) => {
                if(err) throw err;
                const allUsers = JSON.parse(contents);
                usersModel.sendUserId(id, allUsers, res);
            });
        } catch(err) {
            return next(err);
        };
    };


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
            })

        } catch (err) {
            next(err);
        };
    };

    get updateUser() {
        return this._updateUser.bind(this);
    };

    async _updateUser(req, res, next) {
        const id = +req.params.id;
        const changeUser = req.body;
        try {
            await fs.readFile(filePath, 'utf8', (err, contents) => {
                if(err) throw err;

                const allUsers = JSON.parse(contents);
                usersModel.updateUser(id, changeUser, allUsers, res);
            })

        } catch(err){
            next(err);
        };
    };
};

module.exports = new UsersController;