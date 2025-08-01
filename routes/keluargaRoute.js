const express = require("express");
const router = express.Router();
const pagination = require("../middleware/pagination");
const {
  createKeluarga,
  getAllKeluarga,
  getKeluargaById,
  updateKeluarga,
  deleteKeluarga,
  getKeluargaByNomorKK,
} = require("../controllers/keluargaController");

// Membuat data keluarga baru
// @desc: Membuat data keluarga baru
// @route: POST /api/keluarga
// @access: Public
router.post("/", createKeluarga);
// Mendapatkan semua data keluarga
// @desc: Mendapatkan semua data keluarga
// @route: GET /api/keluarga
// @access: Public
router.get("/", pagination, getAllKeluarga);
// Mendapatkan data keluarga berdasarkan ID
// @desc: Mendapatkan data keluarga berdasarkan ID
// @route: GET /api/keluarga/:id
// @access: Public
router.get("/:id", getKeluargaById);
// Memperbarui data keluarga
// @desc: Memperbarui data keluarga
// @route: PUT /api/keluarga/:id
// @access: Public
router.put("/:id", updateKeluarga);
// Menghapus data keluarga
// @desc: Menghapus data keluarga
// @route: DELETE /api/keluarga/:id
// @access: Public
router.delete("/:id", deleteKeluarga);
// Mendapatkan keluarga by nomor KK
// @desc: Mendapatakan Nomor Kartu keluarga
// @route: GET /api/keluarga/:id/anggota/:anggotaId
// @access: Public
router.get("/nokk/:nokk", getKeluargaByNomorKK);

module.exports = router; // Mengexport router untuk digunakan di aplikasi lainnya.
