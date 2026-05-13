const express = require("express");
const upload = require("../middleware/uploadMiddleware");

const { uploadFile } = require("../controllers/uploadController");

const router = express.Router();

router.post("/", upload.array("files"), uploadFile);

module.exports = router;