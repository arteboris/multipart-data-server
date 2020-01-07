const { Router } = require('express');
const usersValidator = require('./users.validator');
const usersController = require('./users.controller');

const router = Router();

router
.get('/', usersValidator.sendUsers,
 usersController.sendUsers)
.get('/:id', usersValidator.sendUserId,
usersController.sendUserId)
.post('/', 
usersValidator.createUser, 
usersController.createUser)
.put('/:id', usersValidator.updateUser, 
usersController.updateUser)
.delete('/:id', usersValidator.deleteUser,
 usersController.deleteUser);

module.exports = router;