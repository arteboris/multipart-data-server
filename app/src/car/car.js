const express = require('express');
const path = require('path');

const router = express.Router();

const staticPath = path.join(__dirname, '../../', 'assets', 'pexels-photo-1592384.jpg');

router.get('/', (req, res, next) => {
    res.status(200).sendFile(staticPath);
});

module.exports = router;