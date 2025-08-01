const PerangkatDesa = require('../models/perangkatDesa');
const asyncHandler = require('express-async-handler');

// Membuat data perangkat desa baru
// @desc: Membuat data perangkat desa baru
// @route: POST /api/perangkat-desa
// @access: Private
exports.createPerangkatDesa = asyncHandler(async (req, res) => {
    const { jabatan, namaLengkap } = req.body;
    //check if namaLengkap sudah ada
    const existingPerangkatDesa = await PerangkatDesa.findOne({ namaLengkap });
    if (existingPerangkatDesa) {
        res.status(400);
        throw new Error('Perangkat desa dengan nama lengkap ini sudah ada');
    }

    if (!jabatan || !namaLengkap) {
        res.status(400);
        throw new Error('Jabatan dan nama lengkap harus diisi');
    }

    const newPerangkatDesa = new PerangkatDesa({
        jabatan,
        namaLengkap
    });

    await newPerangkatDesa.save();
    res.status(201).json(newPerangkatDesa);
});

// Mendapatkan semua data perangkat desa
// @desc: Mendapatkan semua data perangkat desa
// @route: GET /api/perangkat-desa
// @access: Private
exports.getAllPerangkatDesa = asyncHandler(async (req, res) => {
    const perangkatDesa = await PerangkatDesa.find()
        .populate('namaLengkap', ['namaLengkap', 'nik', 'alamat'])
        .select('-__v');
    res.json(perangkatDesa);
});
// Mendapatkan data perangkat desa berdasarkan ID
// @desc: Mendapatkan data perangkat desa berdasarkan ID
// @route: GET /api/perangkat-desa/:id
// @access: Private
exports.getPerangkatDesaById = asyncHandler(async (req, res) => {
    const perangkatDesa = await PerangkatDesa.findById(req.params.id)
        .populate('namaLengkap', ['namaLengkap', 'nik', 'alamat']);

    if (!perangkatDesa) {
        res.status(404);
        throw new Error('Perangkat desa tidak ditemukan');
    }
    res.json(perangkatDesa);
});

// Memperbarui data perangkat desa
// @desc: Memperbarui data perangkat desa
// @route: PUT /api/perangkat-desa/:id
// @access: Private
exports.updatePerangkatDesa = asyncHandler(async (req, res) => {
    const { jabatan, namaLengkap } = req.body;

    if (!jabatan || !namaLengkap) {
        res.status(400);
        throw new Error('Jabatan dan nama lengkap harus diisi');
    }

    const updatedPerangkatDesa = await PerangkatDesa.findByIdAndUpdate(
        req.params.id,
        { jabatan, namaLengkap },
        { new: true, runValidators: true }
    );

    if (!updatedPerangkatDesa) {
        res.status(404);
        throw new Error('Perangkat desa tidak ditemukan');
    }
    res.json(updatedPerangkatDesa);
}); 

// Menghapus data perangkat desa
// @desc: Menghapus data perangkat desa
// @route: DELETE /api/perangkat-desa/:id
// @access: Private
exports.deletePerangkatDesa = asyncHandler(async (req, res) => {
    const deletedPerangkatDesa = await PerangkatDesa.findByIdAndDelete(req.params.id);

    if (!deletedPerangkatDesa) {
        res.status(404);
        throw new Error('Perangkat desa tidak ditemukan');
    }
    res.json({ message: 'Perangkat desa berhasil dihapus' });
});