const mongoose = require("mongoose");
const { Schema } = mongoose;

// Schema untuk surat masuk
const SuratMasukSchema = new Schema({
  nomorSurat: { type: String, required: true, unique: true },
  pengirim: { type: String, required: true },
  perihal: { type: String, required: true },
  tanggalDikirim: { type: Date, required: true },
  tanggalDiterima: { type: Date, required: true },
  keterangan: { type: String },
  fileUrl: { type: String }, // URL untuk dokumen yang diunggah
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Schema untuk surat keluar - dinas
const SuratKeluarSchema = new Schema({
  nomorSurat: { type: String, required: true, unique: true },
  tujuan: { type: String, required: true },
  perihal: { type: String, required: true },
  tanggalDikeluarkan: { type: Date, required: true },
  keterangan: { type: String },
  penandatangan: { type: String },
  fileUrl: { type: String }, // URL untuk dokumen surat
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }, // Petugas desa
  status: {
    type: String,
    enum: ["Draft", "Dikirim", "Selesai"],
    default: "Draft",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Schema untuk surat keluar - permohonan warga
const SuratPermohonanSchema = new Schema({
  nomorSurat: { type: String, required: true, unique: true },
  type: {
    type: String,
    required: true,
  },
  pemohon: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Penduduk",
    // required: true,
  },
  pemohonLuarDesa: {
    namaLengkap: { type: String, required: true },
    nik: { type: String, minlength: 16, maxlength: 16 },
    alamat: {
      dusun: { type: String },
      desa: { type: String },
      kecamatan: { type: String },
      kabupaten: { type: String },
      provinsi: { type: String },
      rt: { type: String },
      rw: { type: String },
    },
  }, // Untuk pemohon dari luar desa
  keterangan: { type: String },
  keperluan: { type: String, required: true },
  tanggalSurat: { type: Date, required: true },
  dataTambahan: { type: mongoose.Schema.Types.Mixed }, // Untuk data tambahan spesifik per jenis surat
  fileUrl: { type: String }, // URL untuk dokumen surat
  // createdBy: { type: Schema.Types.ObjectId, ref: "User" }, // Petugas desa
  status: {
    type: String,
    enum: ["Menunggu", "Diproses", "Selesai", "Ditolak"],
    default: "Menunggu",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

//Data Tambahan surat
const DataTambahanSchema = new Schema({
  jenisSurat: { type: String },
  template: { type: String },
  data: { type: mongoose.Schema.Types.Mixed },
});

SuratMasukSchema.index({ nomorSurat: 1, tanggalSurat: 1 });
SuratKeluarSchema.index({ nomorSurat: 1, tanggalDikeluarkan: 1 });
SuratPermohonanSchema.index({ nomorSurat: 1, tanggalSurat: 1 });

// const Surat = mongoose.model("Surat", SuratSchema);
const SuratMasuk = mongoose.model("SuratMasuk", SuratMasukSchema);
const SuratKeluar = mongoose.model("SuratKeluar", SuratKeluarSchema);
const SuratPermohonan = mongoose.model(
  "SuratPermohonan",
  SuratPermohonanSchema
);
const DataTambahan = mongoose.model("DataTambahan", DataTambahanSchema);
module.exports = { SuratMasuk, SuratKeluar, SuratPermohonan, DataTambahan }; // Export model Surat
