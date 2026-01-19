const SeatConfig = require("../models/SeatConfig");
const Registration = require("../models/Registration");

function normalizePhone(phone) {
  return String(phone || "").trim().replace(/[\s-]/g, "");
}

async function register({ firstName, lastName, phone }) {
  const cleanPhone = normalizePhone(phone);

  const cfg = await SeatConfig.findOneAndUpdate(
    { _id: "seat_config_singleton", $expr: { $lt: ["$registeredCount", "$totalSeats"] } },
    { $inc: { registeredCount: 1 } },
    { new: true }
  ).lean();

  if (!cfg) {
    return {
      ok: false,
      status: 409,
      error: { message: "Seats are full or not configured" },
    };
  }

  try {
    const created = await Registration.create({
      firstName: String(firstName).trim(),
      lastName: String(lastName).trim(),
      phone: cleanPhone,
    });

    return {
      ok: true,
      data: {
        id: created._id,
        firstName: created.firstName,
        lastName: created.lastName,
        createdAt: created.createdAt,
      },
      summary: {
        totalSeats: cfg.totalSeats,
        registeredCount: cfg.registeredCount,
        remainingSeats: Math.max(0, cfg.totalSeats - cfg.registeredCount),
      },
    };
  } catch (err) {
    await SeatConfig.updateOne(
      { _id: "seat_config_singleton", registeredCount: { $gt: 0 } },
      { $inc: { registeredCount: -1 } }
    );

    if (err && err.code === 11000) {
      return {
        ok: false,
        status: 409,
        error: { message: "This phone number is already registered" },
      };
    }

    throw err;
  }
}

module.exports = { register, normalizePhone };
