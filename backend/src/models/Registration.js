const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true, maxlength: 80 },
    lastName: { type: String, required: true, trim: true, maxlength: 80 },
    phone: { type: String, required: true, trim: true, maxlength: 20 },
  },
  { timestamps: true }
);

registrationSchema.index({ phone: 1 }, { unique: true });

registrationSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Registration", registrationSchema);
