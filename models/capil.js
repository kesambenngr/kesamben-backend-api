
const mongoose = require('mongoose');

// Catatan Sipil (Dokumen Catatan Sipil)
const CatatanSipilSchema = new mongoose.Schema({
  jenisDokumen: {
    type: String,
    enum: ['Akta Kelahiran', 'Akta Kematian', 'Surat Keterangan Domisili', 'Surat Pengantar Nikah', 'Surat Keterangan Usaha'],
    required: true
  },
  nomorDokumen: {
    type: String,
    required: true
  },
  tanggalTerbit: {
    type: Date,
    default: Date.now
  },
  pemohon: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Individual'
  },
  individuTerkait: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Individual'
  },
  keluarga: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Family'
  }
}, { timestamps: true });

CatatanSipilSchema.index({ jenisDokumen: 1 });
CatatanSipilSchema.index({ tanggalTerbit: 1 });
CatatanSipilSchema.index({ nomorDokumen: 1 });

const Capil = mongoose.model('CatatanSipil', CatatanSipilSchema);
module.exports = Capil;