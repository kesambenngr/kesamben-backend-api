const mongoose = require("mongoose");

const kematianSchema = new mongoose.Schema({
  namapemohon: { type: String, required: true },
  nikPemohon: { type: String, minLength: 16, maxLength: 16 },
  nokkPemohon: { type: String, minLength: 16, maxLength: 16 },
  alamat: {
    dusun: { type: String },
    rt: { type: String },
    rw: { type: String },
    desa: { type: String },
    kecamatan: { type: String },
    kabupaten: { type: String },
  },
  ayah: {
    nama: { type: String },
    tempatLahir: { type: String },
    tanggalLahir: { type: Date },
    nik: { type: String, minLength: 16, maxLength: 16 },
  },
  ibu: {
    nama: { type: String },
    tempatLahir: { type: String },
    tanggalLahir: { type: Date },
    nik: { type: String, minLength: 16, maxLength: 16 },
  },
  kematian: {
    nik: { type: String, minLength: 16, maxLength: 16, required: true },
    namaLengkap: { type: String, required: true },
    tempatLahir: { type: String },
    tanggalLahir: { type: Date },
    hariKematian: { type: String },
    tanggalKematian: { type: Date, required: true },
    tempatKematian: { type: String, required: true },
    jamKematian: { type: String },
    SebabKematian: {
      type: String,
      enum: [
        "Sakit Biasa/Tua",
        "Wabah Penyakit",
        "Kecelakaan",
        "Kriminalitas",
        "Bunuh Diri",
        "Lainnya",
      ],
      default: "Sakit Biasa/Tua",
    },
    yangMenerangkan: {
      type: String,
      enum: ["Dokter", "Tenaga Kesehatan", "Kepolisian", "Lainnya"],
      default: "Lainnya",
    },
  },
  saksi: { type: mongoose.Schema.Types.Mixed },
  tanggalPengajuan: { type: Date, default: Date.now },

  fileUrl: { type: String }, // URL untuk dokumen surat
  // createdBy: { type: Schema.Types.ObjectId, ref: "User" }, // Petugas desa
  createdAt: { type: Date, default: Date.now },
});

const suratKematian = mongoose.model("Kematian", kematianSchema);
module.exports = suratKematian;
