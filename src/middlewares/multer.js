import multer from 'multer';

const storage = multer.memoryStorage();
// const multerUploads = multer({ storage }).array('image', 12);
const multerUploads = multer({ storage }).fields([{ name: 'image', maxCount: 12 }, { name: 'contract', maxCount: 2 }]);

export { multerUploads };
