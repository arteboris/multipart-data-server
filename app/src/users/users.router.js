const { Router } = require('express');
const usersValidator = require('./users.validator');
const usersController = require('./users.controller');

const router = Router();

router
.get('/', (req, res, next) => {
    res.status(200).json('Users!!!!');
})
.post('/', 
usersValidator.createUser, 
usersController.createUser)
.delete('/:id', usersController.deleteUser);

module.exports = router;