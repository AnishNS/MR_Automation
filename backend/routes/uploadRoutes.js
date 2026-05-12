const express = require("express");
const multer = require("multer");
const path = require("path");

const parseCSV = require("../services/parser");
const normalizeData = require("../services/normalizer");

const router = express.Router();

/* STORAGE */

const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {

    const uniqueName =
      Date.now() +
      path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

/* ROUTE */

router.post(
  "/",
  upload.single("file"),

  async (req, res) => {

    try {

      const filePath = req.file.path;

      const parsedData =
        await parseCSV(filePath);

      const normalizedData =
        normalizeData(parsedData);

      res.json({
        success: true,
        totalPosts: normalizedData.length,
        data: normalizedData,
      });

    }

    catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

module.exports = router;