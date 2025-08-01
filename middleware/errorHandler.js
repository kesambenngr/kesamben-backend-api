const mongoose = require('mongoose');
const { CastError } = mongoose.Error;

// middleware/errorHandler.js
module.exports = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Mengatur status code berdasarkan jenis error
  if (err instanceof CastError) {  // Jika ObjectId tidak valid
    error.statusCode = 400;
    error.message = 'Invalid ID format';
  } else if (err.name === 'ValidationError') { // Jika validasi Mongoose gagal
    const errors = Object.values(err.errors).map(el => el.message);
    error.message = errors.join(', ');
    error.statusCode = 400;
  } else if (err.statusCode) { // Jika error sudah memiliki status code
    error.statusCode = err.statusCode;
  } else {
    error.statusCode = 500;
    error.message = 'Internal Server Error';
  }

  // Kirim respons JSON dengan error
  res.status(error.statusCode || 500).json({
    success: false,
    error: {
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }
  });
};