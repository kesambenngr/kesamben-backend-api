const Penduduk = require("../models/penduduk");
const asyncHandler = require("express-async-handler");
const pagination = require("../middleware/pagination");

// Membuat data penduduk baru
//@desc: Membuat data penduduk baru
//@route: POST /api/penduduk
//@access: Public
exports.createPenduduk = asyncHandler(async (req, res) => {
  const {
    nik,
    namaLengkap,
    jenisKelamin,
    tempatLahir,
    tanggalLahir,
    agama,
    statusPerkawinan,
    pendidikan,
    pekerjaan,
    kewarganegaraan,
    alamat,
    nokk,
    shdk,
    orangTua,
    status,
  } = req.body;
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        error: { message: "Data penduduk diperlukan" },
      });
    }

    // Validate required fields
    const requiredFields = ["nik", "namaLengkap", "jenisKelamin"];
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        error: {
          message: `Field berikut harus diisi: ${missingFields.join(", ")}`,
        },
      });
    }

    const pendudukData = {
      nik,
      namaLengkap,
      jenisKelamin,
      tempatLahir,
      tanggalLahir,
      agama,
      statusPerkawinan,
      pendidikan,
      pekerjaan,
      kewarganegaraan,
      alamat,
      nokk,
      shdk,
      orangTua,
      status: status || "Hidup", // Default to 'Hidup' if not provided
      // nik: req.body.nik,
      // namaLengkap: req.body.namaLengkap,
      // jenisKelamin: req.body.jenisKelamin,
      // tempatLahir: req.body.tempatLahir || undefined,
      // tanggalLahir: req.body.tanggalLahir ? new Date(req.body.tanggalLahir) : undefined,
      // // Add other optional fields if they exist in the request
      // ...(req.body.agama && { agama: req.body.agama }),
      // ...(req.body.statusPerkawinan && { statusPerkawinan: req.body.statusPerkawinan }),
      // ...(req.body.alamat && { alamat: req.body.alamat })
    };

    const newPenduduk = new Penduduk(pendudukData);
    await newPenduduk.save();

    res.status(201).json({
      success: true,
      data: newPenduduk,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: {
        message: error.message,
      },
    });
  }
});

// Mendapatkan semua data penduduk
//@desc: Mendapatkan semua data penduduk
//@route: GET /api/penduduk
//@access: Public
exports.getAllPenduduk = asyncHandler(async (req, res) => {
  const query = {};

  // Filter based on query parameters
  if (req.query.nik) query.nik = req.query.nik;
  if (req.query.namaLengkap)
    query.namaLengkap = { $regex: req.query.namaLengkap, $options: "i" };
  if (req.query.jenisKelamin) query.jenisKelamin = req.query.jenisKelamin;

  const penduduk = await Penduduk.find(query)
    .populate("nokk")
    .skip(req.pagination.skip)
    .limit(req.pagination.limit)
    .select("-__v");
  const jumlah = await Penduduk.countDocuments(query); // Fix: Use query
  const jumlahHalaman = Math.ceil(jumlah / req.pagination.limit);
  res.json({
    page: req.pagination.page,
    limit: req.pagination.limit,
    jumlahHalaman,
    totalItems: jumlah,
    penduduk,
  });
});
// Mendapatkan data penduduk berdasarkan ID
exports.getPendudukById = asyncHandler(async (req, res) => {
  const penduduk = await Penduduk.findById(req.params.id);
  // .populate('keluarga');

  if (!penduduk) {
    throw new Error("Penduduk tidak ditemukan", { cause: 404 });
  }
  res.json(penduduk);
});

// Memperbarui data penduduk
//@desc: Memperbarui data penduduk
//@route: PUT /api/penduduk/:id
//@access: Public
exports.updatePenduduk = asyncHandler(async (req, res) => {
  const updatedPenduduk = await Penduduk.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!updatedPenduduk) {
    throw new Error("Penduduk tidak ditemukan", { cause: 404 });
  }
  res.json(updatedPenduduk);
});

// Menghapus data penduduk
//@desc: Menghapus data penduduk
//@route: DELETE /api/penduduk/:id
//@access: Public
exports.deletePenduduk = asyncHandler(async (req, res) => {
  const deletedPenduduk = await Penduduk.findByIdAndDelete(req.params.id);

  if (!deletedPenduduk) {
    throw new Error("Penduduk tidak ditemukan", { cause: 404 });
  }
  res.json({ message: "Data penduduk berhasil dihapus" });
});

//ambil semua data penduduk tanpa pagination
exports.getSemuaPenduduk = asyncHandler(async (req, res) => {
  const penduduk = await Penduduk.find();
  res.json(penduduk);
});
// insert many penduduk
//@desc: insert many penduduk
//@route: POST /api/penduduk/batch
//@access: Public
exports.insertManyPenduduk = asyncHandler(async (req, res) => {
  const penduduks = await Penduduk.insertMany(req.body);
  res.json(penduduks);
});
