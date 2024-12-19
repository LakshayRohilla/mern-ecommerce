const express = require('express');
const { protect, admin } = require('../middleware/auth-middleware');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create the uploads folder if it doesn't exist
const uploadDir = path.join(__dirname, '../../frontend/public/uploads');
// We are addding the upload folder in the public so that we can access it later
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const router = express.Router();

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadDir);  // Specify the folder for uploads
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb({ message: 'Only image files are allowed.' });
  }
}

const upload = multer({
  storage,
});

// File upload route (protected by middleware)
router.post('/', protect, admin, upload.single('image'), (req, res, next) => {
  res.send({
    message: 'Image uploaded successfully.',
    image: `${req.file.path}`, // Respond with the image path
  });
});

module.exports = router;