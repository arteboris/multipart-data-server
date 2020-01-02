const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../../', 'data/users/', 'all-users.json');

class UsersModel {
    constructor() {}

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
            next(err);
        };
    };


    get deleteUser() {
        return this._deleteUser.bind(this);
    };

    async _deleteUser (id, allUsers, res) {
        const findUserDel = allUsers.find(elem => elem.id === id);
        if(!findUserDel) res.status(400).json(`there is no users with such id: ${id}`);
        else{ 
        const newAllUsers = allUsers.filter(elem => elem.id !== id);
        try {
            await fs.writeFile(filePath, JSON.stringify(newAllUsers), err =>{
                if(err) throw err;
            });

            return res.status(200).json(`user with id:${id} has been deleted successfully`);
        }catch(err){
            next(err);
        }};
    };
};

module.exports = new UsersModel;