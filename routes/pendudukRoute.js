const express = require("express");
const router = express.Router();
const pagination = require("../middleware/pagination");

const {
  createPenduduk,
  getAllPenduduk,
  getPendudukById,
  updatePenduduk,
  deletePenduduk,
  getSemuaPenduduk,
  insertManyPenduduk,
} = require("../controllers/pendudukController");

// Membuat data penduduk baru
// @desc: Membuat data penduduk baru
// @route: POST /api/penduduk
// @access: Public
router.post("/", createPenduduk);
// Mendapatkan semua data penduduk atau mencari berdasarkan query parameters
// @desc: Mendapatkan/mencari data penduduk
// @route: GET /api/penduduk?nik=xxx&namaLengkap=xxx&jenisKelamin=xxx
// @access: Public
router.get("/", pagination, getAllPenduduk);
router.get("/all", getSemuaPenduduk);
// Mendapatkan data penduduk berdasarkan ID
// @desc: Mendapatkan data penduduk berdasarkan ID
// @route: GET /api/penduduk/:id
// @access: Public
router.get("/:id", getPendudukById);
// Memperbarui data penduduk
// @desc: Memperbarui data penduduk
// @route: PUT /api/penduduk/:id
// @access: Public
router.put("/:id", updatePenduduk);
// Menghapus data penduduk
// @desc: Menghapus data penduduk
// @route: DELETE /api/penduduk/:id
// @access: Public
router.delete("/:id", deletePenduduk);

router.post("/batch", insertManyPenduduk);

module.exports = router; // Mengexport router untuk digunakan di aplikasi lainnya.
