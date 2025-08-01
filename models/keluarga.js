const mongoose = require("mongoose");

// Family (Data Keluarga)
const keluargaSchema = new mongoose.Schema(
  {
    nokk: {
      type: String,
      required: true,
      unique: true,
    },
    kepalaKeluarga: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Penduduk",
    },
    alamat: {
      rt: String,
      rw: String,
      dusun: String,
      desa: String,
      kecamatan: String,
      kabupaten: String,
      provinsi: String,
    },
    anggota: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Penduduk",
      },
    ],
  },
  { timestamps: true }
);

keluargaSchema.index({ nokk: 1 });
keluargaSchema.index({ kepalaKeluarga: 1 });
keluargaSchema.index({ "alamat.rt": 1 });
keluargaSchema.index({ "alamat.rw": 1 });
keluargaSchema.index({ "alamat.dusun": 1 });
keluargaSchema.index({ "alamat.desa": 1 });

const Keluarga = mongoose.model("Keluarga", keluargaSchema);
module.exports = Keluarga;
