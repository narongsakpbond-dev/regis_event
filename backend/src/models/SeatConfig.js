const mongoose = require("mongoose");

const seatConfigSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    totalSeats: { type: Number, required: true, min: 0, default: 0 },
    registeredCount: { type: Number, required: true, min: 0, default: 0 },
  },
  { timestamps: true }
);

seatConfigSchema.statics.getSingleton = async function () {
  const FIXED_ID = "seat_config_singleton";
  const doc = await this.findByIdAndUpdate(
    FIXED_ID,
    { $setOnInsert: { _id: FIXED_ID, totalSeats: 0, registeredCount: 0 } },
    { new: true, upsert: true }
  );
  return doc;
};

module.exports = mongoose.model("SeatConfig", seatConfigSchema);
