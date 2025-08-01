const Penduduk = require("../models/penduduk");
const asyncHandler = require("express-async-handler");

exports.createAnalysis = asyncHandler(async (req, res) => {
  const { filters, groupBy, calculate, page = 1, limit = 10 } = req.body;

  // Validate inputs
  if (
    !Array.isArray(filters) ||
    !Array.isArray(groupBy) ||
    !Array.isArray(calculate)
  ) {
    return res
      .status(400)
      .json({ message: "Filters, groupBy, and calculate must be arrays" });
  }

  let query = {};
  let pipeline = [];

  // Build filters
  if (filters.length > 0) {
    filters.forEach((filter) => {
      const { field, operator, value } = filter;
      if (field === "umur") {
        const today = new Date();
        const birthYear = today.getFullYear() - parseInt(value);
        const nextYearBirthYear = today.getFullYear() - (parseInt(value) + 1);

        if (operator === "eq") {
          query.tanggalLahir = {
            $gte: new Date(
              nextYearBirthYear,
              today.getMonth(),
              today.getDate()
            ),
            $lt: new Date(birthYear, today.getMonth(), today.getDate()),
          };
        } else if (operator === "gt") {
          query.tanggalLahir = {
            $lt: new Date(birthYear, today.getMonth(), today.getDate()),
          };
        } else if (operator === "lt") {
          query.tanggalLahir = {
            $gt: new Date(nextYearBirthYear, today.getMonth(), today.getDate()),
          };
        } else if (operator === "gte") {
          query.tanggalLahir = {
            $lte: new Date(birthYear, today.getMonth(), today.getDate()),
          };
        } else if (operator === "lte") {
          query.tanggalLahir = {
            $gte: new Date(
              nextYearBirthYear,
              today.getMonth(),
              today.getDate()
            ),
          };
        }
      } else {
        // Use original field path for $match (e.g., alamat.dusun)
        switch (operator) {
          case "eq":
            query[field] = value;
            break;
          case "ne":
            query[field] = { $ne: value };
            break;
          case "contains":
            query[field] = { $regex: value, $options: "i" };
            break;
          case "startsWith":
            query[field] = { $regex: `^${value}`, $options: "i" };
            break;
          case "endsWith":
            query[field] = { $regex: `${value}$`, $options: "i" };
            break;
          case "gt":
            query[field] = { $gt: value };
            break;
          case "lt":
            query[field] = { $lt: value };
            break;
          case "gte":
            query[field] = { $gte: value };
            break;
          case "lte":
            query[field] = { $lte: value };
            break;
        }
      }
    });
    pipeline.push({ $match: query });
  }

  // Project nested fields to flat names
  const fieldMap = new Map(); // Map flat names back to original
  const projectFields = {
    tanggalLahir: "$tanggalLahir", // Always include for umur
  };
  groupBy.forEach((field) => {
    const flatField = field.replace(/\./g, "_");
    projectFields[flatField] = `$${field}`;
    fieldMap.set(flatField, field);
  });
  calculate.forEach((calc) => {
    const { field } = calc;
    const flatField = field.replace(/\./g, "_");
    projectFields[flatField] = `$${field}`;
    fieldMap.set(flatField, field);
  });
  pipeline.push({ $project: projectFields });

  // Build groupBy
  if (groupBy.length > 0) {
    const _idFields = {};
    groupBy.forEach((field) => {
      const flatField = field.replace(/\./g, "_");
      _idFields[flatField] = `$${flatField}`; // Use flat field
    });

    const groupStage = {
      $group: {
        _id: _idFields,
        count: { $sum: 1 },
      },
    };

    if (calculate.length > 0) {
      calculate.forEach((calc) => {
        const { operation, field, alias } = calc;
        const flatField = field.replace(/\./g, "_");
        const aliasName = alias || `${operation}_${field.replace(/\./g, "_")}`;
        if (operation === "avg") {
          groupStage.$group[aliasName] = { $avg: `$${flatField}` };
        } else if (operation === "sum") {
          groupStage.$group[aliasName] = { $sum: `$${flatField}` };
        } else if (operation === "min") {
          groupStage.$group[aliasName] = { $min: `$${flatField}` };
        } else if (operation === "max") {
          groupStage.$group[aliasName] = { $max: `$${flatField}` };
        }
      });
    }
    pipeline.push(groupStage);

    // Reproject to original field names
    const reprojectFields = {
      _id: 0,
      count: "$count",
    };
    groupBy.forEach((field) => {
      const flatField = field.replace(/\./g, "_");
      reprojectFields[field] = `$_id.${flatField}`;
    });
    Object.keys(groupStage.$group).forEach((key) => {
      if (key !== "_id" && key !== "count") {
        reprojectFields[key] = `$${key}`;
      }
    });
    pipeline.push({ $project: reprojectFields });
  } else if (calculate.length > 0) {
    const globalGroup = {
      $group: {
        _id: null,
      },
    };
    calculate.forEach((calc) => {
      const { operation, field, alias } = calc;
      const flatField = field.replace(/\./g, "_");
      const aliasName = alias || `${operation}_${field.replace(/\./g, "_")}`;
      if (operation === "avg") {
        globalGroup.$group[aliasName] = { $avg: `$${flatField}` };
      } else if (operation === "sum") {
        globalGroup.$group[aliasName] = { $sum: `$${flatField}` };
      } else if (operation === "min") {
        globalGroup.$group[aliasName] = { $min: `$${flatField}` };
      } else if (operation === "max") {
        globalGroup.$group[aliasName] = { $max: `$${flatField}` };
      }
    });
    pipeline.push(globalGroup);
  } else {
    const totalCount = await Penduduk.countDocuments(query);
    return res.json({ totalCount });
  }

  // Add pagination
  pipeline.push({ $skip: (parseInt(page) - 1) * parseInt(limit) });
  pipeline.push({ $limit: parseInt(limit) });

  try {
    const result = await Penduduk.aggregate(pipeline);
    res.json(result);
  } catch (error) {
    console.error("Error during data analysis:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

exports.getAnalysisField = asyncHandler(async (req, res) => {
  try {
    const { field } = req.params;
    const uniqueValues = await Penduduk.distinct(field);
    res.json(uniqueValues);
  } catch (error) {
    console.error(`Error fetching unique values for ${field}:`, error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});
