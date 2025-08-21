const {
  SuratMasuk,
  SuratKeluar,
  SuratPermohonan,
  DataTambahan,
} = require("../models/surat");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
// const { v4: uuidv4 } = require("uuid");

// Helper function to generate unique letter number
// const generateLetterNumber = (type) => {
//   const prefix =
//     type === "incoming" ? "IN" : type === "official" ? "OUT" : "REQ";
//   const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
//   return `${prefix}/${date}/${uuidv4().slice(0, 8)}`;
// };

// Surat masuk
//create surat masuk
//@desc: membuat surat masuk baru
//@route: POST /api/surat/suratmasuk
//@access: private
exports.createSuratMasuk = asyncHandler(async (req, res) => {
  const { tanggalDikirim, nomorSurat, pengirim, perihal } = req.body;
  if (!tanggalDikirim || !nomorSurat || !perihal || !pengirim) {
    return res
      .status(400)
      .json({ message: "tanggal, nomor, subjek dan pengirim harus diisi" });
  }
  const suratMasuk = new SuratMasuk(req.body);
  await suratMasuk.save();
  res.status(201).json({ message: "Surat Masuk created successfully" });
});

// get surat masuk by id
//@desc: get surat masuk by id
//@route: GET /api/suratmasuk/:id
//@access: private
exports.getSuratMasukById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const suratMasuk = await SuratMasuk.findById(id);
  if (!suratMasuk) {
    throw new Error("Surat tidak ditemukan", { cause: 404 });
  }
  res.json(suratMasuk);
});

//fetch surat masuk
//@desc: get all surat masuk
//@route: GET /api/suratmasuk
//@access: private
exports.getSuratMasuk = asyncHandler(async (req, res) => {
  const query = {};
  const suratMasuk = await SuratMasuk.find(query).sort({ createdAt: -1 });
  res.status(200).json(suratMasuk);
});

//hapus surat masuk
//@desc: hapus surat masuk
//@route: DELETE /api/suratmasuk/:id
//@access: private
exports.deleteSuratMasuk = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const suratMasuk = await SuratMasuk.findByIdAndDelete(id);
  if (!suratMasuk) {
    throw new Error("Surat tidak ditemukan", { cause: 404 });
  }
  res.json({ message: "Data Surat berhasil dihapus" });
});

//update surat masuk
//@desc: update surat masuk
//@route: PUT /api/suratmasuk/:id
//@access: private
exports.updateSuratMasuk = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const suratMasuk = await SuratMasuk.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!suratMasuk) {
    throw new Error("Surat tidak ditemukan", { cause: 404 });
  }
  res.json({ message: "Data Surat berhasil diupdate" });
});

//##-------SURAT DINAS ATAU SURAT KELUAR -----##

//buat surat dinas
//@desc: buat surat dinas
//@route: POST /api/suratkeluar
//@access: private
exports.createSuratKeluar = asyncHandler(async (req, res) => {
  const suratKeluar = new SuratKeluar(req.body);
  await suratKeluar.save();
  res.status(201).json({ message: "Surat Keluar created successfully" });
});

//get surat keluar
//@desc: get surat keluar
//@route: GET /api/suratkeluar
//@access: private
exports.getSuratKeluar = asyncHandler(async (req, res) => {
  const suratKeluar = await SuratKeluar.find().sort({ createdAt: -1 });
  res.json(suratKeluar);
});
//get surat keluar by id
//@desc: get surat keluar by id
//@route: GET /api/suratkeluar/:id
//@access: private
exports.getSuratKeluarById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const suratKeluar = await SuratKeluar.findById(id);
  if (!suratKeluar) {
    throw new Error("Surat tidak ditemukan", { cause: 404 });
  }
  res.json(suratKeluar);
});
//update surat keluar
//@desc: update surat keluar
//@route: PUT /api/suratkeluar/:id
//@access: private
exports.updateSuratKeluar = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const suratKeluar = await SuratKeluar.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!suratKeluar) {
    throw new Error("Surat tidak ditemukan", { cause: 404 });
  }
  res.json({ message: "Data Surat berhasil diupdate" });
});
//delete surat keluar
//@desc: delete surat keluar
//@route: DELETE /api/suratkeluar/:id
//@access: private
exports.deleteSuratKeluar = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const suratKeluar = await SuratKeluar.findByIdAndDelete(id);
  if (!suratKeluar) {
    throw new Error("Surat tidak ditemukan", { cause: 404 });
  }
  res.json({ message: "Data Surat berhasil dihapus" });
});

//##-- SURAT PERMOHONAN--##

//Create surat permohonan
//@desc: create surat permohonan
//@route: POST /api/suratpermohonan
//@access: private
exports.createSuratPermohonan = asyncHandler(async (req, res) => {
  const suratPermohonan = new SuratPermohonan(req.body);
  try {
    await suratPermohonan.save();
    res.json({ message: "Data Surat Permohonan berhasil dibuat" });
  } catch (error) {
    // Handle validation errors or other issues
    res.status(500).json({ message: error.message, stack: error.stack });
    // For other errors, you can log it and return a generic error message
    console.error(error);
  }
});

//get surat permohonan
//@desc: get surat permohonan
//@route: GET /api/suratpermohonan
//@access: private
/* == ORIGINAL CODE == */
/*
exports.getSuratPermohonan = asyncHandler(async (req, res) => {
  const suratPermohonan = await SuratPermohonan.find(req.query)
    .sort({ nomorSurat: -1, tanggalSurat: -1 })
    .populate("pemohon", ["namaLengkap", "nik", "alamat"]);
  res.json(suratPermohonan);
});
*/
/* == END ORIGINAL CODE == */
/* TESTING PURPOSES ONLY WITH AGGREGATE */
exports.getSuratPermohonan = asyncHandler(async (req, res) => {
  // Build the same filter you used in .find()
  const filter = { ...req.query };
  try {
    const data = await SuratPermohonan.aggregate([
      { $match: filter }, // 1. same filtering
      {
        $lookup: {
          // 2. join Penduduk only if needed
          from: mongoose.model("Penduduk").collection.name, //    collection name in MongoDB
          localField: "pemohon",
          foreignField: "_id",
          as: "pemohonPenduduk",
        },
      },
      {
        $addFields: {
          // 3. decide which one to keep
          pemohon: {
            $cond: {
              if: { $gt: [{ $size: "$pemohonPenduduk" }, 0] },
              then: { $arrayElemAt: ["$pemohonPenduduk", 0] }, // populated object
              else: "$pemohonLuarDesa", // fallback
            },
          },
        },
      },
      {
        $project: {
          // 4. clean up the shape
          nomorSurat: 1,
          type: 1,
          keterangan: 1,
          keperluan: 1,
          tanggalSurat: 1,
          dataTambahan: 1,
          fileUrl: 1,
          status: 1,
          createdAt: 1,
          updatedAt: 1,
          pemohon: 1, // the new unified field
          // hide the leftovers
          // pemohonPenduduk: 0,
          // pemohonLuarDesa: 0,
        },
      },
      { $sort: { nomorSurat: -1, tanggalSurat: -1 } },
    ]);

    res.json(data);
  } catch (err) {
    // send the actual error to the client while you’re developing
    res.status(500).json({ message: err.message, stack: err.stack });
  }
});
/* END OF TESTING AGGREGATE */

//get surat permohonan by id
//@desc: get surat permohonan by id
//@route: GET /api/suratpermohonan/:id
//@access: private
exports.getSuratPermohonanById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const suratPermohonan = await SuratPermohonan.findById(id).populate(
    "pemohon",
    ["namaLengkap", "nik", "alamat"]
  );
  if (!suratPermohonan) {
    // throw new Error("Surat tidak ditemukan", { cause: 404 });
    const err = new Error("Surat tidak ditemukan");
    err.statusCode = 404;
    return next(err);
  }
  res.json(suratPermohonan);
});

//update surat permohonan
//@desc: update surat permohonan
//@route: PUT /api/suratpermohonan/:id
//@access: private
exports.updateSuratPermohonan = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const suratPermohonan = await SuratPermohonan.findByIdAndUpdate(
    id,
    req.body,
    { new: true, runValidators: true }
  );
  if (!suratPermohonan) {
    // throw new Error("Surat tidak ditemukan", { cause: 404 });
    const err = new Error("Surat tidak ditemukan");
    err.statusCode = 404;
    return next(err);
  }
  res.json({ message: "Data Surat Permohonan berhasil diupdate" });
});

//hapus surat permohonan
//@desc: hapus surat permohonan
//@route: DELETE /api/suratpermohonan/:id
//@access: private
exports.deleteSuratPermohonan = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const suratPermohonan = await SuratPermohonan.findByIdAndDelete(id);
  if (!suratPermohonan) {
    throw new Error("Surat tidak ditemukan", { cause: 404 });
  }
  res.json({ message: "Data Surat Permohonan berhasil dihapus" });
});

//data tambahan surat / dependencies
//@desc: data tambahan surat
//@route: POST /api/surat/datatambahan
//@access: private
exports.createDataTambahan = asyncHandler(async (req, res) => {
  const data = new DataTambahan(req.body);
  await data.save();
  res.json({ message: "Data Tambahan berhasil disimpan" });
});

//@desc: get data tambahan
//@route: GET /api/surat/datatambahan
exports.getDataTambahan = asyncHandler(async (req, res) => {
  const data = await DataTambahan.find();
  res.json(data);
});

//get data tambahan by Id
//@desc: get data tambahan by Id
//@route: GET /api/surat/datatambahan/:id
//@access: private
exports.getDataTambahanById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const data = await DataTambahan.findById(id);
  if (!data) {
    throw new Error("Data Tidak di temukan", { cause: 404 });
  }
  res.json(data);
});

//update data tambahan
//@desc: update data tambahan
//@route: PUT /api/surat/datatambahan/:id
//@access: private
exports.updateDataTambahan = asyncHandler(async (req, res) => {
  const data = await DataTambahan.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!data) {
    throw new Error("Data tidak ditemukan", { cause: 404 });
  }
  res.json({ message: "Data Tambahan berhasil diupdate" });
});

//hapus data tambahan
//@desc: hapus data tambahan
//@route: DELETE /api/surat/datatambahan/:id
//@access: private
exports.deleteDataTambahan = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const data = await DataTambahan.findByIdAndDelete(id);
  if (!data) {
    throw new Error("Data tidak ditemukan", { cause: 404 });
  }
  res.json({ message: "Data Tambahan berhasil dihapus" });
});

/* untuk update status surat 
digunakan nanti untuk update status surat
*/

// Update Letter Status (for all letter types)
exports.updateLetterStatus = async (req, res) => {
  try {
    const { id, type, status } = req.body;
    if (!id || !type || !status) {
      return res
        .status(400)
        .json({ message: "ID, type, and status are required" });
    }
    let letter;
    if (type === "incoming") {
      letter = await SuratMasuk.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );
    } else if (type === "official") {
      letter = await SuratKeluar.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );
    } else if (type === "request") {
      letter = await SuratPermohonan.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );
    } else {
      return res.status(400).json({ message: "Invalid letter type" });
    }
    if (!letter) {
      return res.status(404).json({ message: "Letter not found" });
    }
    res.status(200).json({ message: "Letter status updated", data: letter });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
