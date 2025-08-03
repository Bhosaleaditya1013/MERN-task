const express = require('express');
const router = express.Router();
const multer = require('multer');
const XLSX = require('xlsx');
const Candidate = require('../models/Candidate');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet);

    // Filter out rows with missing name (or other required fields)
    const cleanedData = data.filter(entry => entry.name && entry.name.trim() !== '');

    if (cleanedData.length === 0) {
      return res.status(400).json({ message: "No valid entries found in Excel" });
    }

    await Candidate.insertMany(cleanedData);

    res.status(200).json({ message: "Uploaded Successfully!", count: cleanedData.length });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: "Upload Failed", error });
  }
});

module.exports = router;
