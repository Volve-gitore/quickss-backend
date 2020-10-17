import multer from 'multer';

const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).array('image', 12);

export { multerUploads };
