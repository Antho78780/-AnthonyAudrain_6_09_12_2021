
const multer = require("multer");

const MYME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png"
}

const stockage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images")
    },
    filename: (req, file, cb) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MYME_TYPES[file.mimetype];
        cb(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({stockage : stockage}).single("image");
