const historyPenduduk = require('../models/historyPenduduk');
const asyncHandler = require('express-async-handler');

// Membuat data history penduduk baru
// @desc: Membuat data history penduduk baru
// @route: POST /api/history-penduduk
// @access: Private
exports.createHistoryPenduduk = asyncHandler(async (req, res) => {
    const { individu, aksi, tanggalPindah, alamatAsal, alamatTujuan, tempatMeninggal, penyebabMeninggal} = req.body;

    if (!individu || !aksi || !tanggalPindah) {
        res.status(400);
        throw new Error('Penduduk ID, aksi, dan tanggalPindah harus diisi');
    }

    const newHistoryPenduduk = new historyPenduduk({
        individu,
        aksi,
        tanggalPindah,
        alamatAsal,
        alamatTujuan,
        tempatMeninggal,
        penyebabMeninggal
    });

    await newHistoryPenduduk.save();
    res.status(201).json(newHistoryPenduduk);
});

// Mendapatkan semua data history penduduk
// @desc: Mendapatkan semua data history penduduk
// @route: GET /api/history-penduduk
// @access: Private
exports.getAllHistoryPenduduk = asyncHandler(async (req, res) => {
    const historyPendudukList = await historyPenduduk.find()
        .populate('individu', ['namaLengkap', 'nik', 'alamat'])
        .select('-__v');
    res.json(historyPendudukList);
}); 

// Mendapatkan data history penduduk berdasarkan ID
// @desc: Mendapatkan data history penduduk berdasarkan ID
// @route: GET /api/history-penduduk/:id
// @access: Private
exports.getHistoryPendudukById = asyncHandler(async (req, res) => {
    const historyPendudukItem = await historyPenduduk.findById(req.params.id)
        .populate('individu', ['namaLengkap', 'nik', 'alamat']);

    if (!historyPendudukItem) {
        res.status(404);
        throw new Error('History penduduk tidak ditemukan');
    }
    res.json(historyPendudukItem);
});

// Memperbarui data history penduduk
// @desc: Memperbarui data history penduduk
// @route: PUT /api/history-penduduk/:id
// @access: Private
exports.updateHistoryPenduduk = asyncHandler(async (req, res) => {
    const { individu, aksi, tanggalPindah, alamatAsal, alamatTujuan, tempatMeninggal, penyebabMeninggal } = req.body;

    if (!individu || !aksi || !tanggalPindah) {
        res.status(400);
        throw new Error('Penduduk ID, aksi, dan tanggalPindah harus diisi');
    }

    const historyPendudukItem = await historyPenduduk.findById(req.params.id);

    if (!historyPendudukItem) {
        res.status(404);
        throw new Error('History penduduk tidak ditemukan');
    }

    historyPendudukItem.individu = individu;
    historyPendudukItem.aksi = aksi;
    historyPendudukItem.tanggalPindah = tanggalPindah;
    historyPendudukItem.alamatAsal = alamatAsal;
    historyPendudukItem.alamatTujuan = alamatTujuan;
    historyPendudukItem.tempatMeninggal = tempatMeninggal;
    historyPendudukItem.penyebabMeninggal = penyebabMeninggal;

    await historyPendudukItem.save();
    res.json(historyPendudukItem);
});
// Menghapus data history penduduk
// @desc: Menghapus data history penduduk
// @route: DELETE /api/history-penduduk/:id
// @access: Private
exports.deleteHistoryPenduduk = asyncHandler(async (req, res) => {
    const historyPendudukItem = await historyPenduduk.findById(req.params.id);

    if (!historyPendudukItem) {
        res.status(404);
        throw new Error('History penduduk tidak ditemukan');
    }

    await historyPendudukItem.remove();
    res.json({ message: 'History penduduk berhasil dihapus' });
});

//ambil data history berdasarkan filter aksi
// @desc: Mengambil data history penduduk berdasarkan filter aksi
// @route: GET /api/history-penduduk/filter/:aksi
// @access: Private
exports.getHistoryPendudukByAksi = asyncHandler(async (req, res) => {
    const { aksi } = req.params;

    if (!aksi) {
        res.status(400);
        throw new Error('Aksi harus diisi');
    }

    const historyPendudukList = await historyPenduduk.find({ aksi })
        .populate('individu', ['namaLengkap', 'nik', 'alamat'])
        .select('-__v');

    if (historyPendudukList.length === 0) {
        res.status(404);
        throw new Error('Tidak ada history penduduk ditemukan dengan aksi tersebut');
    }

    res.json(historyPendudukList);
});