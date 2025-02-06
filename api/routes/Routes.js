const express = require("express");
const multer = require("multer");
const reportController = require("../controllers/UploadFileXML");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), reportController.uploadXML);

router.get("/getReports", reportController.getReports);

module.exports = router;
