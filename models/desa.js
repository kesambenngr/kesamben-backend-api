const mongoose = require('mongoose');

// Administrasi Desa
const AdministrasiDesaSchema = new mongoose.Schema({
  namaDesa: {
    type: String,
    required: true
  },
  alamatDesa: {
    type: String,
  },
  kodeDesa: String,
  kecamatan: String,
  kabupaten: String,
  provinsi: String,
  kodePos: String,
  telpon: String,
  email: String,
  website: String,
  kepalaDesa: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'perangkatDesa'
  },
  sekretarisDesa: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'perangkatDesa'
  },
  bendaharaDesa: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'perangkatDesa'
  },
  informasiUmum: String,
}, { timestamps: true });

const DataDesa = mongoose.model('AdministrasiDesa', AdministrasiDesaSchema);
module.exports = DataDesa;