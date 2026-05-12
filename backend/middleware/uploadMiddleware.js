const multer = require("multer");
const path = require("path");

/* STORAGE CONFIG */

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

/* FILE FILTER */

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    ".csv",
    ".xlsx",
    ".txt",
    ".pdf",
    ".docx",
  ];

  const ext =
    path.extname(file.originalname).toLowerCase();

  if (allowedTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file type"));
  }
};

/* UPLOAD */

const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload;