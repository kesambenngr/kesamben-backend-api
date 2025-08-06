const Kematian = require("../models/suratKematian");
const asyncHandler = require("express-async-handler");

// Membuat data Kematian baru
// @desc: Membuat data Kematian baru
// @route: POST /api/surat/suratKematian
// @access: Public
exports.createKematian = asyncHandler(async (req, res) => {
  const newKematian = new Kematian(req.body);
  await newKematian.save();
  res.status(201).json(newKematian);
});

//Mendapatkan semua data Kematian
//@desc: Mengambil semua data Kematian
//@route: GET /api/surat/suratKematian
//@access: Public
exports.getAllKematian = asyncHandler(async (req, res) => {
  const query = {};
  const kematian = await Kematian.find(query).sort({ createdAt: -1 });
  res.status(200).json(kematian);
});

//mendapatkan data Surat Kematian by ID
//@desc: Mendapatkan data Kematian berdasarkan ID
//@route: GET /api/surat/suratKematian/:id
//@access: Public
exports.getKematianById = asyncHandler(async (req, res) => {
  const kematian = await Kematian.findById(req.params.id);
  if (!kematian) {
    // res.status(404).json({ message: 'Data tidak ditemukan' });
    const err = new Error("Data tidak Ditemukan");
    err.statusCode = 404;
    return next(err);
  }
  res.status(200).json(kematian);
});

//Memperbarui data Kematian
//@desc: Memperbarui data Kematian
//@route: PUT /api/surat/suratKematian/:id
//@access: Public
exports.updateKematian = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const kematian = await Kematian.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!kematian) {
    // res.status(404).json({ message: 'Data tidak ditemukan' });
    const err = new Error("Data tidak Ditemukan");
    err.statusCode = 404;
    return next(err);
  }
  res.status(200).json({ message: "Data Berhasil Diperbarui" });
});

//Mengahapus data Kematian
//@desc: Mengahapus data Kematian
//@route: DELETE /api/surat/suratKematian/:id
//@access: Public
exports.deleteKematian = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const kematian = await Kematian.findByIdAndDelete(id);
  if (!kematian) {
    // res.status(404).json({ message: 'Data tidak ditemukan' });
    const err = new Error("Data tidak Ditemukan");
    err.statusCode = 404;
    return next(err);
  }
  res.status(200).json({ message: "Data Berhasil Dihapus" });
});
