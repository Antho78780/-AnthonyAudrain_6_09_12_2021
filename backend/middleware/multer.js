//// importation du package multer ////
const multer = require("multer");

const MYME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png"
}

const stockage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "images")
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MYME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({storage : stockage}).single("image");
