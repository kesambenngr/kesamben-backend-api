const mongoose = require("mongoose");

const kelahiranSchema = new mongoose.Schema({
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
  kelahiran: {
    nik: { type: String, minLength: 16, maxLength: 16 },
    namaLengkap: { type: String, required: true },
    jenisKelamin: {
      type: String,
      enum: ["Laki-laki", "Perempuan"],
      required: true,
    },
    tempatDilahirkan: {
      type: String,
      enum: ["RS/RB", "Puskesmas", "Polindes", "Rumah", "Lainnya"],
      default: "RS/RB",
    },
    tempatKelahiran: { type: String },
    tanggalKelahiran: { type: Date },
    hariLahir: { type: String },
    jamLahir: { type: String },
    jenisKelahiran: {
      type: String,
      enum: ["Tunggal", "Kembar"],
      default: "Tunggal",
    },
    kelahiranKe: { type: Number },
    penolongKelahiran: {
      type: String,
      enum: ["Dokter", "Bidan/Perawat", "Dukun", "Lainnya"],
      default: "Dokter",
    },
    berat: { type: Number },
    panjang: { type: Number },
  },
  saksi: { type: mongoose.Schema.Types.Mixed },
  tanggalPengajuan: { type: Date, default: Date.now },

  fileUrl: { type: String }, // URL untuk dokumen surat
  // createdBy: { type: Schema.Types.ObjectId, ref: "User" }, // Petugas desa
  createdAt: { type: Date, default: Date.now },
});

const suratKelahiran = mongoose.model("Kelahiran", kelahiranSchema);
module.exports = suratKelahiran;
