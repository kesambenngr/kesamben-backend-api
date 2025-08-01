const Surat = require('../models/surat');
const asyncHandler = require('express-async-handler');

// Membuat data surat baru
// @desc: Membuat data surat baru
// @route: POST /api/surat
// @access: Private
exports.createSurat = asyncHandler(async (req, res) => {
    const { jenisSurat, nomorSurat, tanggalSurat, isiSurat } = req.body;

    if (!jenisSurat || !nomorSurat || !tanggalSurat || !isiSurat) {
        res.status(400);
        throw new Error('Semua field harus diisi');
    }

    const newSurat = new Surat({
        jenisSurat,
        nomorSurat,
        tanggalSurat,
        isiSurat
    });

    await newSurat.save();
    res.status(201).json(newSurat);
});

// Mendapatkan semua data surat
// @desc: Mendapatkan semua data surat
// @route: GET /api/surat
// @access: Private
exports.getAllSurat = asyncHandler(async (req, res) => {
    const surat = await Surat.find()
        .populate('jenisSurat', ['namaJenisSurat'])
        .select('-__v');
    res.json(surat);
});

// Mendapatkan data surat berdasarkan ID
// @desc: Mendapatkan data surat berdasarkan ID
// @route: GET /api/surat/:id
// @access: Private 
exports.getSuratById = asyncHandler(async (req, res) => {
    const surat = await Surat.findById(req.params.id)
        .populate('jenisSurat', ['namaJenisSurat']);

    if (!surat) {
        res.status(404);
        throw new Error('Surat tidak ditemukan');
    }
    res.json(surat);
});

// Memperbarui data surat
// @desc: Memperbarui data surat
// @route: PUT /api/surat/:id
// @access: Private
exports.updateSurat = asyncHandler(async (req, res) => {
    const { jenisSurat, nomorSurat, tanggalSurat, isiSurat } = req.body;

    if (!jenisSurat || !nomorSurat || !tanggalSurat || !isiSurat) {
        res.status(400);
        throw new Error('Semua field harus diisi');
    }

    const surat = await Surat.findByIdAndUpdate(
        req.params.id,
        { jenisSurat, nomorSurat, tanggalSurat, isiSurat },
        { new: true }
    );

    if (!surat) {
        res.status(404);
        throw new Error('Surat tidak ditemukan');
    }

    res.json(surat);
});

// Menghapus data surat
// @desc: Menghapus data surat
// @route: DELETE /api/surat/:id
// @access: Private
exports.deleteSurat = asyncHandler(async (req, res) => {
    const surat = await Surat.findByIdAndDelete(req.params.id);

    if (!surat) {
        res.status(404);
        throw new Error('Surat tidak ditemukan');
    }

    res.json({ message: 'Surat berhasil dihapus' });
});
