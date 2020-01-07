const { Router } = require('express');
const multer = require('multer');
const path = require('path');
const imagesController = require('./images.controller');


const router = Router();


const temporaryImageFolder = path.join(__dirname, '../../', 'data/images');

const storage = multer.diskStorage({
    destination: (req, file, next) => {
        next(null, temporaryImageFolder);
    },
    
    filename: (req, file, next) => {
        next(null, file.originalname);
    },
});

const upload = multer(storage);

router
.post('/', upload.single('image'), imagesController.createImage )

module.exports = router;