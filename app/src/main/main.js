const express = require('express');

const router = express.Router();

const main = router.get('/', (req, res, next) => {
    res.status(200).json('Hello Word!!!')
});

module.exports = main;

