const fs = require('fs');
const path = require('path');

class ImagesController {
    constructor() {};

    get createImage () {
        return this._createImage.bind(this);
    };

    async _createImage(req, res, next){

        const image = {
            'id': Date.now(),
            ...req.file,
        };

        const fileName = image.name;
        const filePath = path.join(__dirname, '../../', 'data/images', fileName);

        // try {
        //     await fs.writeFile(filePath, JSON.stringify(image),)
        // } catch(err) {
        //     return next(err);
        // }
        
    };
};

module.exports = new ImagesController();