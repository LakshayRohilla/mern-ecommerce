const path = require('path');
const express = require('express');
const multer = require('multer');

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/'); // null is for error, we dont have any so null. // and destination whene we would like to have our images uploaded
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}` // how you would like to have your file name
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb({ message: 'Images only!' }); // error message
  }
}

const upload = multer({
  storage,
});

router.post('/', upload.single('image'), (req, res) => { // single to allow single image upload. "image" we can put anything here which will go in "file.fieldname" in line 14.
  res.send({
    message: 'Image uploaded successfully',
    image: `/${req.file.path}`,
  });
});

module.exports = router;