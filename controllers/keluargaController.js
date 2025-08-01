const Keluarga = require("../models/keluarga");
const asyncHandler = require("express-async-handler");

// Membuat data keluarga baru
// @desc: Membuat data keluarga baru
// @route: POST /api/keluarga
// @access: Public
exports.createKeluarga = asyncHandler(async (req, res) => {
  const newKeluarga = new Keluarga(req.body);
  await newKeluarga.save();
  res.status(201).json(newKeluarga);
});

// Mendapatkan semua data keluarga
// @desc: Mendapatkan semua data keluarga
// @route: GET /api/keluarga
// @access: Public
exports.getAllKeluarga = asyncHandler(async (req, res) => {
  const keluarga = await Keluarga.find()
    .populate("kepalaKeluarga", [
      "namaLengkap",
      "nik",
      "alamat",
      "jenisKelamin",
    ])
    .populate("anggota", ["namaLengkap", "nik", "shdk"])
    .select("-__v");
  res.json(keluarga);
});

// Mendapatkan data keluarga berdasarkan ID
// @desc: Mendapatkan data keluarga berdasarkan ID
// @route: GET /api/keluarga/:id
// @access: Public
exports.getKeluargaById = asyncHandler(async (req, res) => {
  const keluarga = await Keluarga.findById(req.params.id)
    .populate("kepalaKeluarga", ["namaLengkap", "nik", "alamat"])
    .populate("anggota", ["namaLengkap", "nik", "shdk"]);

  if (!keluarga) {
    throw new Error("Keluarga tidak ditemukan", { cause: 404 });
  }
  res.json(keluarga);
});

// Memperbarui data keluarga
// @desc: Memperbarui data keluarga
// @route: PUT /api/keluarga/:id
// @access: Public
exports.updateKeluarga = asyncHandler(async (req, res) => {
  const updatedKeluarga = await Keluarga.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!updatedKeluarga) {
    throw new Error("Keluarga tidak ditemukan", { cause: 404 });
  }
  res.json(updatedKeluarga);
});

// Menghapus data keluarga
// @desc: Menghapus data keluarga
// @route: DELETE /api/keluarga/:id
// @access: Public
exports.deleteKeluarga = asyncHandler(async (req, res) => {
  const deletedKeluarga = await Keluarga.findByIdAndDelete(req.params.id);

  if (!deletedKeluarga) {
    throw new Error("Keluarga tidak ditemukan", { cause: 404 });
  }
  res.json({ message: "Data keluarga berhasil dihapus" });
});

// Mendapatkan keluarga berdasarkan Nomor KK
// @desc: Mendapatkan keluarga berdasarkan Nomor KK
// @route: GET /api/keluarga/nokk/nokk  diirect to /api/keluarga/nokk/:nokk
// @access: Public
exports.getKeluargaByNomorKK = asyncHandler(async (req, res) => {
  const keluarga = await Keluarga.findOne({ nokk: req.params.nokk })
    .populate("kepalaKeluarga", ["namaLengkap", "nik", "alamat"])
    .populate("anggota", ["namaLengkap", "nik", "shdk"]);

  if (!keluarga) {
    throw new Error("Nomor KK tidak ditemukan", { cause: 404 });
  }
  res.json(keluarga);
});
