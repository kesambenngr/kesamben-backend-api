const mongoose = require('mongoose');

const perangkatDesaSchema = new mongoose.Schema({
    jabatan: {
        type: String,
        required: true,
        enum: ['Kepala Desa', 'Sekretaris Desa', 'Kepala Urusan Keuangan', 'Kepala Urusan Tata Usaha dan Umum', 'Kepala Urusan Perencanaan', 'Kepala Seksi Kesejahteraan Rakyat', 'Kepala Seksi Pemerintahan', 'Kepala Seksi Pelayanan', 'Kepala Dusun',],
    },
    namaLengkap: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'penduduk',    
        required: true
    },
},
{ timestamps: true });

const PerangkatDesa = mongoose.model('perangkatDesa', perangkatDesaSchema);
module.exports = PerangkatDesa;