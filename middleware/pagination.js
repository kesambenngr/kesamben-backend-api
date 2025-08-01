// paginationMiddleware.js

function pagination(req, res, next) {
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page

  // Calculate the number of documents to skip
  const skip = (page - 1) * limit;

  // Attach pagination details to the request object
  req.pagination = {
    page,
    limit,
    skip,
  };

  next();
}

module.exports = pagination;
