const mongoose = require("mongoose");

const kematianSchema = new mongoose.Schema({
  namaPemohon: { type: String, required: true },
  nikPemohon: { type: String, minLength: 16, maxLength: 16 },
  nokkPemohon: { type: String, minLength: 16, maxLength: 16 },
  kewarganegaraan: { type: String },
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
    nik: { type: String },
  },
  ibu: {
    nama: { type: String },
    tempatLahir: { type: String },
    tanggalLahir: { type: Date },
    nik: { type: String },
  },
  kematian: {
    nik: { type: String },
    namaLengkap: { type: String, required: true },
    tempatLahir: { type: String },
    tanggalLahir: { type: Date },
    hariKematian: { type: String },
    tanggalKematian: { type: Date, required: true },
    tempatKematian: { type: String, required: true },
    jamKematian: { type: String },
    sebabKematian: {
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
  saksi: {
    satu: {
      nama: { type: String },
      nik: { type: String },
      nokk: { type: String },
      kewarganegaraan: { type: String },
    },
    dua: {
      nama: { type: String },
      nik: { type: String },
      nokk: { type: String },
      kewarganegaraan: { type: String },
    },
  },
  tanggalPengajuan: { type: Date, default: Date.now },

  fileUrl: { type: String }, // URL untuk dokumen surat
  // createdBy: { type: Schema.Types.ObjectId, ref: "User" }, // Petugas desa
  createdAt: { type: Date, default: Date.now },
});

const suratKematian = mongoose.model("Kematian", kematianSchema);
module.exports = suratKematian;
