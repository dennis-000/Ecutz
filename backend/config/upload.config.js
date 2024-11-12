import fs from 'fs';
import multer from "multer"
import path from 'path';

//multer code
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/profilePictures"); // Directory where files will be saved
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + "-" + uniqueSuffix + "." + file.mimetype.split("/")[1]); // File naming convention
    },
});
  
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
});

export default upload