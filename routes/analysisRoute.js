const express = require("express");
const router = express.Router();
const {
  createAnalysis,
  getAnalysisField,
} = require("../controllers/analysisController");

router.post("/", createAnalysis);
router.get("/:field", getAnalysisField);

module.exports = router;
