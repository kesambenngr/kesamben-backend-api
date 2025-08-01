const mongoose = require('mongoose');


// data anggota lembaga desa
const anggotaSchema = new mongoose.Schema({
  nama: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Penduduk',
    required: true
  },
  jabatan: {
    type: String,
    required: true
  },
  nomorHP: {
    type: String,
    validate: {
      validator: function(v) {
        return /\d{10,15}/.test(v); // Validasi nomor HP 10-15 digit
      },
      message: props => `${props.value} bukan nomor HP yang valid!`
    }
  },
  email: {
    type: String,
    validate: {
      validator: function(v) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v); // Validasi email
      },
      message: props => `${props.value} bukan email yang valid!`
    }
  },
},
{ _id: false });

// Lembaga Desa
const LembagaDesaSchema = new mongoose.Schema({
  namaLembaga: {
    type: String,
    required: true
  },
  periode: String,
  nomorSK: String,
  tanggalSK: Date,
  anggota: anggotaSchema,
}, { timestamps: true });

LembagaDesaSchema.index({ namaLembaga: 1 });

const LembagaDesa = mongoose.model('LembagaDesa', LembagaDesaSchema);
module.exports = LembagaDesa;