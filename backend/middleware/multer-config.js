// in /middleware/multer-config.js

const multer = require('multer');

const MIME_TYPES = {
    'audio/mpeg': 'mp3',
    'audio/wav': 'wav',
    'video/mp4': 'mp4',    
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/x-png': 'png',
    'image/png': 'png',
    'image/webp': 'webp',
    'image/jpeg': 'jfif'        
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './backend/images');
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_').split('.')[0];
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
        console.log('extension is ', extension);
    }
});

module.exports = multer({storage: storage}).single('media');