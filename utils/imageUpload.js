import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/userImages')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = req.body.phoneNo;
      const ext = path.extname(file.originalname);
      
      cb(null, `${uniqueSuffix}${ext}`);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedExtensions = ['.jpeg', '.jpg', '.png'];
    const ext = path.extname(file.originalname).toLowerCase();
    
    if (allowedExtensions.includes(ext)) {
      cb(null, true); // Accept file
    } else {
      cb(new Error('Only jpeg, jpg, and png files are allowed!'), false); // Reject file
    }
};

export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 } // Optional: Set file size limit (5MB here)
});