const express = require('express');
const router = express.Router();
const {
  createPerangkatDesa,
  getAllPerangkatDesa,
  getPerangkatDesaById,
  updatePerangkatDesa,
  deletePerangkatDesa,
} = require('../controllers/perangkatDesaController');

router.post('/', createPerangkatDesa); // Membuat data perangkat desa baru
router.get('/', getAllPerangkatDesa); // Mendapatkan semua data perangkat desa
router.get('/:id', getPerangkatDesaById); // Mendapatkan data perangkat desa berdasarkan ID
router.put('/:id', updatePerangkatDesa); // Memperbarui data perangkat desa
router.delete('/:id', deletePerangkatDesa); // Menghapus data perangkat desa

module.exports = router; // Mengexport router untuk digunakan di aplikasi lainnya.
// Catatan: Pastikan untuk mengimpor dan menggunakan router ini di file utama aplikasi Express Anda, seperti app.js atau server.js. 