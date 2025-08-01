const DataDesa = require("../models/desa");

// Create a new desa
// POST /api/desa
//@desc Create a new desa
//@access Private
exports.createDesa = async (req, res) => {
  try {
    const newDesa = new DataDesa(req.body);
    const savedDesa = await newDesa.save();
    res.status(201).json(savedDesa);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Ubah data desa
// PUT /api/desa/:id
//@desc Update desa data
//@access Private
exports.updateDesa = async (req, res) => {
  try {
    const updatedDesa = await DataDesa.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedDesa) {
      return res.status(404).json({ message: "Desa not found" });
    }
    res.status(200).json(updatedDesa);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get data desa
// GET /api/desa
//@desc Get all desa data
//@access Public
exports.getAllDesa = async (req, res) => {
  try {
    const desaList = await DataDesa.find();
    res.status(200).json(desaList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
