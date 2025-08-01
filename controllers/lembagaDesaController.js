const LembagaDesa = require('../models/lembagaDesa');
const asyncHandler = require('express-async-handler');

// Membuat data lembaga desa baru
// @desc: Membuat data lembaga desa baru
// @route: POST /api/lembaga-desa
// @access: Private
exports.createLembagaDesa = asyncHandler(async (req, res) => {
    const { namaLembaga, periode, nomorSK, tanggalSK, anggota } = req.body;

    if (!namaLembaga) {
        res.status(400);
        throw new Error('Nama lembaga desa harus diisi');
    }

    const newLembagaDesa = new LembagaDesa({
        namaLembaga,
        periode,
        nomorSK,
        tanggalSK,
        anggota
    });

    await newLembagaDesa.save();
    res.status(201).json(newLembagaDesa);
});

// Mendapatkan semua data lembaga desa
// @desc: Mendapatkan semua data lembaga desa
// @route: GET /api/lembaga-desa
// @access: Private
exports.getLembagaDesa = asyncHandler(async (req, res) => {
    const lembagaDesaList = await LembagaDesa.find()
        .populate('anggota.nama', ['namaLengkap', 'nik', 'alamat'])
        .select('-__v');
    res.json(lembagaDesaList);
}); 

// Mendapatkan data lembaga desa berdasarkan ID
// @desc: Mendapatkan data lembaga desa berdasarkan ID
// @route: GET /api/lembaga-desa/:id
// @access: Private
exports.getLembagaDesaById = asyncHandler(async (req, res) => {
    const lembagaDesaItem = await LembagaDesa.findById(req.params.id)
        .populate('anggota.nama', ['namaLengkap', 'nik', 'alamat']);

    if (!lembagaDesaItem) {
        res.status(404);
        throw new Error('Lembaga desa tidak ditemukan');
    }
    res.json(lembagaDesaItem);
});

// Memperbarui data lembaga desa
// @desc: Memperbarui data lembaga desa
// @route: PUT /api/lembaga-desa/:id
// @access: Private
exports.updateLembagaDesa = asyncHandler(async (req, res) => {  
    const { namaLembaga, periode, nomorSK, tanggalSK, anggota } = req.body;

    const lembagaDesaItem = await LembagaDesa.findById(req.params.id);

    if (!lembagaDesaItem) {
        res.status(404);
        throw new Error('Lembaga desa tidak ditemukan');
    }

    lembagaDesaItem.namaLembaga = namaLembaga || lembagaDesaItem.namaLembaga;
    lembagaDesaItem.periode = periode || lembagaDesaItem.periode;
    lembagaDesaItem.nomorSK = nomorSK || lembagaDesaItem.nomorSK;
    lembagaDesaItem.tanggalSK = tanggalSK || lembagaDesaItem.tanggalSK;
    lembagaDesaItem.anggota = anggota || lembagaDesaItem.anggota;

    await lembagaDesaItem.save();
    res.json(lembagaDesaItem);
});

// Menghapus data lembaga desa
// @desc: Menghapus data lembaga desa
// @route: DELETE /api/lembaga-desa/:id
// @access: Private
exports.deleteLembagaDesa = asyncHandler(async (req, res) => {
    const lembagaDesaItem = await LembagaDesa.findById(req.params.id);

    if (!lembagaDesaItem) {
        res.status(404);
        throw new Error('Lembaga desa tidak ditemukan');
    }

    await lembagaDesaItem.remove();
    res.json({ message: 'Lembaga desa berhasil dihapus' });
});