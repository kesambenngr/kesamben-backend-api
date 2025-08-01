const mongoose = require("mongoose");

const alamatSchema = new mongoose.Schema(
  {
    rt: { type: String },
    rw: { type: String },
    dusun: { type: String },
    desa: { type: String },
    kecamatan: { type: String },
    kabupaten: { type: String },
    provinsi: { type: String },
  },
  { _id: false }
);

const orangTuaSchema = new mongoose.Schema(
  {
    ayah: { type: String },
    nikAyah: { type: String, minlength: 16, maxlength: 16 },
    ibu: { type: String },
    nikIbu: { type: String, minlength: 16, maxlength: 16 },
  },
  { _id: false }
);

// Individual (Data Individu)
const pendudukSchema = new mongoose.Schema(
  {
    nik: {
      type: String,
      required: [true, "NIK wajib diisi"],
      unique: true,
      minlength: [16, "NIK harus 16 digit"],
      maxlength: [16, "NIK harus 16 digit"],
    },
    namaLengkap: {
      type: String,
      required: true,
    },
    jenisKelamin: {
      type: String,
      enum: ["Laki-laki", "Perempuan"],
      required: true,
    },
    tempatLahir: String,
    tanggalLahir: Date,
    agama: {
      type: String,
    },
    statusPerkawinan: {
      type: String,
      enum: ["Belum Kawin", "Kawin", "Cerai Hidup", "Cerai Mati"],
      default: "Belum Kawin",
    },
    pendidikan: String,
    pekerjaan: String,
    kewarganegaraan: {
      type: String,
      enum: ["WNI", "WNA"],
      default: "WNI",
    },
    alamat: alamatSchema,
    nokk: {
      type: String,
      required: true,
      unique: false,
    },
    shdk: {
      type: String,
    },
    orangTua: orangTuaSchema,
    status: {
      type: String,
      enum: ["Hidup", "Mati", "Pindah"],
      default: "Hidup",
    },
  },
  { timestamps: true }
);

// Add custom validation for NIK format
pendudukSchema.path("nik").validate(function (nik) {
  return /^\d{16}$/.test(nik);
}, "NIK harus berupa 16 digit angka");

pendudukSchema.index({ nik: 1 });
pendudukSchema.index({ namaLengkap: 1 });
pendudukSchema.index({ "alamat.rt": 1 });
pendudukSchema.index({ "alamat.rw": 1 });
pendudukSchema.index({ "alamat.dusun": 1 });
pendudukSchema.index({ "alamat.desa": 1 });
pendudukSchema.index({ keluarga: 1 });
pendudukSchema.index({ tanggalLahir: 1 });
pendudukSchema.index({ pekerjaan: 1 });
pendudukSchema.index({ pendidikan: 1 });
pendudukSchema.index({ jenisKelamin: 1 });

//pre Save to generate Keluarga
// post Save to generate Keluarga (renamed comment to reflect 'post' hook)
pendudukSchema.post("save", async function (doc) {
  try {
    // 'this' refers to the saved 'penduduk' document
    const { nokk, _id, shdk } = this;

    // Ensure Mongoose model name is consistent. Assuming 'Keluarga' is the correct registered model name.
    const Keluarga = mongoose.model("Keluarga");

    // Correct comparison operator (===)
    if (shdk === "Kepala Keluarga") {
      // Use findOneAndUpdate consistently to find by nokk
      await Keluarga.findOneAndUpdate(
        { nokk }, // Query to find the Keluarga document by nokk
        { $addToSet: { kepalaKeluarga: _id } }, // Add _id to kepalaKeluarga array
        { upsert: true, new: true } // Create if not found, return the new/updated doc
      );
    } else {
      await Keluarga.findOneAndUpdate(
        { nokk }, // Query to find the Keluarga document by nokk
        { $addToSet: { anggota: _id } }, // Add _id to anggota array
        { upsert: true, new: true } // Create if not found, return the new/updated doc
      );
    }
  } catch (error) {
    // Corrected typo and logging the error object
    console.error("Error creating/updating family data:", error);
    // IMPORTANT: In a production environment, you might want more robust error handling here.
    // For a post-save hook, if this update fails, the 'penduduk' document is already saved.
    // Consider if you need to revert the 'penduduk' save or use a more sophisticated
    // transaction mechanism if consistency is paramount.
  }
});

// update penduduk and auto generate Keluarga
pendudukSchema.pre("update", async function (next) {
  try {
    // 'this' refers to the updated 'penduduk' document
    const { nokk, _id, shdk } = this.getUpdate().$set;
    const Keluarga = mongoose.model("Keluarga");
    if (shdk === "Kepala Keluarga") {
      await Keluarga.findOneAndUpdate(
        { nokk },
        { $addToSet: { kepalaKeluarga: _id } },
        { upsert: true, new: true }
      );
    } else {
      await Keluarga.findOneAndUpdate(
        { nokk },
        { $addToSet: { anggota: _id } },
        { upsert: true, new: true }
      );
    }
  } catch (error) {
    console.error(
      "Error updating penduduk and creating/updating Keluarga:",
      error
    );
  }
});
// insert many penduduk to auto genrate keluarga
// for dev only
pendudukSchema.post("insertMany", async function (docs) {
  try {
    for (const doc of docs) {
      const { nokk, _id, shdk } = doc;

      if (shdk === "Kepala Keluarga") {
        await mongoose
          .model("Keluarga")
          .findOneAndUpdate(
            { nokk },
            { $addToSet: { kepalaKeluarga: _id } },
            { upsert: true, new: true }
          );
      } else {
        await mongoose
          .model("Keluarga")
          .findOneAndUpdate(
            { nokk },
            { $addToSet: { anggota: _id } },
            { upsert: true, new: true }
          );
      }
    }
  } catch (error) {
    console.error("Error membuat/updating data keluarga:", error);
  }
});

const Penduduk = mongoose.model("Penduduk", pendudukSchema);
module.exports = Penduduk;
