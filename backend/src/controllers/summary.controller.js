const SeatConfig = require("../models/SeatConfig");

exports.getSummary = async (req, res) => {
  try {
    const config = await SeatConfig.getSingleton();

    const totalSeats = config.totalSeats;
    const registeredCount = config.registeredCount;
    const remainingSeats = Math.max(0, totalSeats - registeredCount);

    return res.json({
      totalSeats,
      registeredCount,
      remainingSeats,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
