const express = require('express');
const router = express.Router();
const {
    createHistoryPenduduk,
    getAllHistoryPenduduk,
    getHistoryPendudukById,
    updateHistoryPenduduk,
    deleteHistoryPenduduk,
    getHistoryPendudukByAksi
} = require('../controllers/historyPendudukController');

router.post('/', createHistoryPenduduk); // Membuat data history penduduk baru
router.get('/', getAllHistoryPenduduk); // Mendapatkan semua data history penduduk
router.get('/:id', getHistoryPendudukById); // Mendapatkan data history penduduk berdasarkan ID
router.put('/:id', updateHistoryPenduduk); // Memperbarui data history penduduk
router.delete('/:id', deleteHistoryPenduduk); // Menghapus data history penduduk
router.get('/aksi/:aksi', getHistoryPendudukByAksi); // Mendapatkan data history penduduk berdasarkan aksi  

module.exports = router; // Mengexport router untuk digunakan di aplikasi lainnya.
// Catatan: Pastikan untuk mengimpor dan menggunakan router ini di file utama aplikasi Express Anda, seperti app.js atau server.js.
// Pastikan juga untuk mengimpor dan menggunakan controller yang sesuai di dalam router ini.
// Contoh penggunaan:
// const historyPendudukRoutes = require('./routes/historyPendudukRoute');
// app.use('/api/history-penduduk', historyPendudukRoutes);
// Ini akan mengarahkan semua permintaan ke /api/history-penduduk ke router ini.
// Pastikan untuk menyesuaikan nama file dan path sesuai dengan struktur proyek Anda.
// Pastikan juga untuk mengimpor dan menggunakan controller yang sesuai di dalam router ini.
// Contoh penggunaan:
// const historyPendudukRoutes = require('./routes/historyPendudukRoute');
// app.use('/api/history-penduduk', historyPendudukRoutes);
// Ini akan mengarahkan semua permintaan ke /api/history-penduduk ke router ini.
// Pastikan untuk menyesuaikan nama file dan path sesuai dengan struktur proyek Anda.
// Pastikan juga untuk mengimpor dan menggunakan controller yang sesuai di dalam router ini.
