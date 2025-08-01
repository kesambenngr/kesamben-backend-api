const mongoose = require('mongoose');

// Riwayat Pindah (Pindah Masuk/Keluar/Meninggal)
const RiwayatPindahSchema = new mongoose.Schema({
  individu: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Individual',
    required: true
  },
  aksi: {
    type: String,
    enum: ['Pindah Masuk', 'Pindah Keluar', 'Meninggal'],
    required: true
  },
  tanggalPindah: {
    type: Date,
    default: Date.now
  },
  alamatAsal: {
    rt: String,
    rw: String,
    desa: String,
    kabupaten: String,
    provinsi: String
  },
  alamatTujuan: {
    rt: String,
    rw: String,
    desa: String,
    kabupaten: String,
    provinsi: String
  },
  tempatMeninggal: String,
  penyebabMeninggal: String
}, { timestamps: true });

RiwayatPindahSchema.index({ individu: 1 });
RiwayatPindahSchema.index({ jenisPindah: 1 });
RiwayatPindahSchema.index({ tanggalPindah: 1 });

const RiwayatPenduduk = mongoose.model('RiwayatPenduduk', RiwayatPindahSchema);
module.exports = RiwayatPenduduk;