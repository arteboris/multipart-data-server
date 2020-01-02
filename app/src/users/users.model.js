const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../../', 'data/users/', 'all-users.json');

class UsersModel {
    constructor() {}

    
    get sendUsers() {
        return this._sendUsers.bind(this);
    };

    async _sendUsers(ids, allUsers, res) {
        if(ids) {
            
        } else {
            return res.status(200).json({'status': 'success', 
        'users': allUsers});
        };
    }

    get sendUserId() {
        return this._sendUserId.bind(this);
    };

    async _sendUserId(id, allUsers, res) {
        const userId = allUsers.find(elem => elem.id === id);

        if(userId) {
            return res.status(200).json({'status': 'success',
        'user': userId});
        } else {
            return res.status(400).json({'status': 'no user', 
        'user': [] });
        };
    };

    get createUser() {
        return this._createUser.bind(this);
    };

    async _createUser(user, allUsers, res) {
        const newAllUsers = [user, ...allUsers];
        try {
            await fs.writeFile(filePath, JSON.stringify(newAllUsers), err => {
                if(err) throw err;
            });

            return res.status(201).json({'status': 'success', 'user': user});

        } catch(err)  { 
           return next(err);
        };
    };


    get deleteUser() {
        return this._deleteUser.bind(this);
    };

    async _deleteUser (id, allUsers, res) {
        const findUserDel = allUsers.find(elem => elem.id === id);
        if(!findUserDel) {
            return res.status(400).json({'status': 'no user',
        'user': `there is no user with such id: ${id}`});
    } else{ 
        const newAllUsers = allUsers.filter(elem => elem.id !== id);
        try {
            await fs.writeFile(filePath, JSON.stringify(newAllUsers), err =>{
                if(err) throw err;
            });

            return res.status(200).json({ 'status': 'success',
            'user': `user with id:${id} has been deleted successfully`});
        } catch(err){
            return next(err);
        }};
    };



    get updateUser() {
        return this._updateUser.bind(this);
    };

    async _updateUser(id, changeUser, allUsers, res) {
        const findUserUpdate = allUsers.find(elem => elem.id === id);
        if(!findUserUpdate) {
            return res.status(400).json({'status': 'no user', 'user': `there is no users with such id: ${id}`});
        } else {
            const updateUser = Object.assign(findUserUpdate, changeUser);
            const newAllUsers = allUsers.map(elem => (elem.id === id) ? updateUser : elem );
            try {
                await fs.writeFile(filePath, JSON.stringify(newAllUsers), err => {
                    if(err) throw err;
                });

                return res.status(200).json({'status': 'success','user': updateUser});
            } catch(err){
                return next(err);
            };
        }
    }
};

module.exports = new UsersModel;