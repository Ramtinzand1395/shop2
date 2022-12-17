const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    title: { type: String, required: true },
    created: { type: Date, default: Date.now },
  },
);

module.exports = mongoose.models.category || mongoose.model("category" , categorySchema)