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
const {
  createKelahiran,
  getAllKelahiran,
  getKelahiranById,
  deleteKelahiran,
  updateKelahiran,
} = require("../controllers/kelahiranController");
const {
  createKematian,
  getAllKematian,
  getKematianById,
  deleteKematian,
  updateKematian,
} = require("../controllers/kematianController");

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

//router surat kelahiran
router.post("/suratkelahiran", createKelahiran); //insert surat kelahiran
router.get("/suratkelahiran", getAllKelahiran); // mendapatkan semua data kelahiran
router.get("/suratkelahiran/:id", getKelahiranById); // mendapatkan data kelahiran by id
router.put("/suratkelahiran/:id", updateKelahiran); // update data kelahiran
router.delete("/suratkelahiran/:id", deleteKelahiran); // menghapus data kelahiran

//router surat kematian
router.post("/suratkematian", createKematian); //insert surat kematian
router.get("/suratkematian", getAllKematian); // mendapatkan semua data kemat
router.get("/suratkematian/:id", getKematianById); // mendapatkan data kematian
router.put("/suratkematian/:id", updateKematian); // update data kematian
router.delete("/suratkematian/:id", deleteKematian); // menghapus data kematian

module.exports = router;
// Note: Ensure that the suratController.js file is correctly implemented with the necessary functions.
//     throw new Error('Semua field harus diisi');
//     }
