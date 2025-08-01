const express = require("express");
const router = express.Router();
const {
  createSuratMasuk,
  getSuratMasuk,
  getSuratMasukById,
  updateSuratMasuk,
  deleteSuratMasuk,
  createSuratKeluar,
  getSuratKeluar,
  getSuratKeluarById,
  updateSuratKeluar,
  deleteSuratKeluar,
  createSuratPermohonan,
  getSuratPermohonan,
  getSuratPermohonanById,
  updateSuratPermohonan,
  deleteSuratPermohonan,
  createDataTambahan,
  getDataTambahan,
  updateDataTambahan,
  deleteDataTambahan,
  getDataTambahanById,
} = require("../controllers/suratController");

router.post("/suratmasuk", createSuratMasuk); // Membuat data surat baru
router.get("/suratmasuk", getSuratMasuk); // Mendapatkan semua data surat
router.get("/suratmasuk/:id", getSuratMasukById); // Mendapatkan data surat berdasarkan ID
router.put("/suratmasuk/:id", updateSuratMasuk); // Memperbarui data surat
router.delete("/suratmasuk/:id", deleteSuratMasuk); // Menghapus data surat

router.post("/suratkeluar", createSuratKeluar); // Membuat data surat baru
router.get("/suratkeluar", getSuratKeluar); // Mendapatkan semua data surat
router.get("/suratkeluar/:id", getSuratKeluarById); // Mendapatkan data surat berdasarkan ID
router.put("/suratkeluar/:id", updateSuratKeluar); // Memperbarui data surat
router.delete("/suratkeluar/:id", deleteSuratKeluar); // Menghapus data surat

router.post("/suratpermohonan", createSuratPermohonan); // Membuat surat baru
router.get("/suratpermohonan", getSuratPermohonan); // Mendapatkan semua surat
router.get("/suratpermohonan/:id", getSuratPermohonanById); // mendaapatkan surat tunggal berdasar id
router.put("/suratpermohonan/:id", updateSuratPermohonan); // Mengubah ataau update surat
router.delete("/suratpermohonan/:id", deleteSuratPermohonan); // Menghapus surat

//router datat tambahn surat
router.post("/datatambahan", createDataTambahan); // insert jensi dan pendukung surat
router.get("/datatambahan", getDataTambahan); // mendapatkan semua data tambahan
router.get("/datatambahan/:id", getDataTambahanById); // mendapatkan data
router.put("/datatambahan/:id", updateDataTambahan); // update data tambahan dan jenis surat
router.delete("/datatambahan/:id", deleteDataTambahan); // menghapus data tambahan

module.exports = router;
// Note: Ensure that the suratController.js file is correctly implemented with the necessary functions.
//     throw new Error('Semua field harus diisi');
//     }
