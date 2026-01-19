const Registration = require("../models/Registration");
const { register, normalizePhone } = require("../services/registration.service");

const ALLOWED_SORT_FIELDS = new Set(["firstName", "lastName", "createdAt"]);

exports.listPublicRegistrations = async (req, res) => {
  try {
    const search = (req.query.search || "").trim();
    const sort = (req.query.sort || "createdAt").trim();
    const order = (req.query.order || "desc").toLowerCase();
    const page = Math.max(parseInt(req.query.page || "1", 10), 1);
    const limitRaw = parseInt(req.query.limit || "10", 10);
    const limit = Math.min(Math.max(limitRaw, 1), 50);

    const sortField = ALLOWED_SORT_FIELDS.has(sort) ? sort : "createdAt";
    const sortOrder = order === "asc" ? 1 : -1;

    const filter = {};
    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      Registration.find(filter)
        .select("firstName lastName createdAt")
        .sort({ [sortField]: sortOrder })
        .skip(skip)
        .limit(limit)
        .lean(),
      Registration.countDocuments(filter),
    ]);

    return res.json({
      items,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit) || 1,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.createRegistration = async (req, res) => {
  try {
    const { firstName, lastName, phone } = req.body || {};

    // basic validation
    if (!firstName || !lastName || !phone) {
      return res.status(400).json({
        message: "firstName, lastName, phone are required",
      });
    }

    const cleanPhone = normalizePhone(phone);
    if (!/^\d{9,10}$/.test(cleanPhone)) {
      return res.status(400).json({
        message: "phone must be 9-10 digits",
      });
    }

    const result = await register({ firstName, lastName, phone: cleanPhone });

    if (!result.ok) {
      return res.status(result.status).json(result.error);
    }

    return res.status(201).json({
      message: "Registered successfully",
      data: result.data,
      summary: result.summary,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
