const express = require("express");
const router = express.Router();
const {
  createLembagaDesa,
  getLembagaDesa,
  getLembagaDesaById,
  updateLembagaDesa,
  deleteLembagaDesa,
} = require("../controllers/lembagaDesaController");

router.post("/", createLembagaDesa); // Membuat data lembaga desa baru
router.get("/", getLembagaDesa); // Mendapatkan semua data lembaga desa
router.get("/:id", getLembagaDesaById); // Mendapatkan data lembaga desa berdasarkan ID
router.put("/:id", updateLembagaDesa); // Memperbarui data lembaga desa
router.delete("/:id", deleteLembagaDesa); // Menghapus data lembaga desa

module.exports = router; // Mengexport router untuk digunakan di aplikasi lainnya.
