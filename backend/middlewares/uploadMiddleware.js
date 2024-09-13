import multer from 'multer';

const storage = multer.diskStorage({
    destination: () => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({storage});

export default upload;