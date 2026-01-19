const SeatConfig = require("../models/SeatConfig");
const Registration = require("../models/Registration");

const ALLOWED_SORT_FIELDS_ADMIN = new Set(["firstName", "lastName", "phone", "createdAt"]);

exports.updateSeats = async (req, res) => {
  try {
    const { totalSeats } = req.body;

    // validate
    if (typeof totalSeats !== "number" || Number.isNaN(totalSeats) || totalSeats < 0) {
      return res.status(400).json({
        message: "totalSeats must be a non-negative number",
      });
    }

    const config = await SeatConfig.getSingleton();

    if (totalSeats < config.registeredCount) {
      return res.status(409).json({
        message: "totalSeats cannot be less than registeredCount",
        registeredCount: config.registeredCount,
      });
    }

    config.totalSeats = totalSeats;
    await config.save();

    return res.json({
      message: "Seat capacity updated successfully",
      totalSeats: config.totalSeats,
      registeredCount: config.registeredCount,
      remainingSeats: Math.max(0, config.totalSeats - config.registeredCount),
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.listAdminRegistrations = async (req, res) => {
  try {
    const search = (req.query.search || "").trim();
    const sort = (req.query.sort || "createdAt").trim();
    const order = (req.query.order || "desc").toLowerCase();
    const page = Math.max(parseInt(req.query.page || "1", 10), 1);
    const limitRaw = parseInt(req.query.limit || "10", 10);
    const limit = Math.min(Math.max(limitRaw, 1), 50);

    const sortField = ALLOWED_SORT_FIELDS_ADMIN.has(sort) ? sort : "createdAt";
    const sortOrder = order === "asc" ? 1 : -1;

    const filter = {};
    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      Registration.find(filter)
        .select("firstName lastName phone createdAt")
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