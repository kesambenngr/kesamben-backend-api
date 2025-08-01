const express = require("express");
const router = express.Router();
const {
  createDesa,
  updateDesa,
  getAllDesa,
} = require("../controllers/desaController");

// Membuat data desa baru
// @desc: Membuat data desa baru
// @route: POST /api/desa
// @access: Private
router.post("/", createDesa);
// Mengubah data desa
// @desc: Mengubah data desa
// @route: PUT /api/desa/:id
// @access: Private
router.put("/:id", updateDesa);
// Mengambil semua data desa
// @desc: Mengambil semua data desa
// @route: GET /api/desa
// @access: Public
router.get("/", getAllDesa);

module.exports = router; // Mengexport router untuk digunakan di aplikasi lainnya.
// Catatan: Pastikan untuk mengimpor dan menggunakan router ini di file utama aplikasi Express Anda, seperti app.js atau server.js.
