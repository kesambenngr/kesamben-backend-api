const router = require('express').Router();
const RiwayatPindah = require('../models/historyPenduduk');

// Get all history records
router.get('/', async (req, res) => {
  try {
    const history = await RiwayatPindah.find().populate('individu');
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new history record
router.post('/', async (req, res) => {
  const riwayat = new RiwayatPindah(req.body);
  try {
    const newRiwayat = await riwayat.save();
    res.status(201).json(newRiwayat);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
