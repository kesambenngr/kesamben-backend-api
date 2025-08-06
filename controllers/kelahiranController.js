const Kelahiran = require("../models/suratKelahiran");
const asyncHandler = require("express-async-handler");

// Membuat data kelahiran baru
// @desc: Membuat data kelahiran baru
// @route: POST /api/surat/suratKelahiran
// @access: Public
exports.createKelahiran = asyncHandler(async (req, res) => {
  const newKelahiran = new Kelahiran(req.body);
  await newKelahiran.save();
  res.status(201).json(newKelahiran);
});

//Mendapatkan semua data Kelahiran
//@desc: Mengambil semua data kelahiran
//@route: GET /api/surat/suratKelahiran
//@access: Public
exports.getAllKelahiran = asyncHandler(async (req, res) => {
  const query = {};
  const kelahiran = await Kelahiran.find(query).sort({ createdAt: -1 });
  res.status(200).json(kelahiran);
});

//mendapatkan data Surat kelahiran by ID
//@desc: Mendapatkan data kelahiran berdasarkan ID
//@route: GET /api/surat/suratKelahiran/:id
//@access: Public
exports.getKelahiranById = asyncHandler(async (req, res) => {
  const kelahiran = await Kelahiran.findById(req.params.id);
  if (!kelahiran) {
    // res.status(404).json({ message: 'Data tidak ditemukan' });
    const err = new Error("Data tidak Ditemukan");
    err.statusCode = 404;
    return next(err);
  }
  res.status(200).json(kelahiran);
});

//Memperbarui data Kelahiran
//@desc: Memperbarui data kelahiran
//@route: PUT /api/surat/suratKelahiran/:id
//@access: Public
exports.updateKelahiran = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const kelahiran = await Kelahiran.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!kelahiran) {
    // res.status(404).json({ message: 'Data tidak ditemukan' });
    const err = new Error("Data tidak Ditemukan");
    err.statusCode = 404;
    return next(err);
  }
  res.status(200).json({ message: "Data Berhasil Diperbarui" });
});

//Mengahapus data Kelahiran
//@desc: Mengahapus data kelahiran
//@route: DELETE /api/surat/suratKelahiran/:id
//@access: Public
exports.deleteKelahiran = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const kelahiran = await Kelahiran.findByIdAndDelete(id);
  if (!kelahiran) {
    // res.status(404).json({ message: 'Data tidak ditemukan' });
    const err = new Error("Data tidak Ditemukan");
    err.statusCode = 404;
    return next(err);
  }
  res.status(200).json({ message: "Data Berhasil Dihapus" });
});
