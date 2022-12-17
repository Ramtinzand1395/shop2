const mongoose = require("mongoose");

const { Schema } = mongoose;

const mediaSchema = new Schema({
  alt: String,
  name: { type: String, required: true },
  size: { type: Number, required: true },
  media: {
    data: { type: Buffer, required: true },
    contentType: { type: String, required: true },
  },
  created: {type:Date ,  default: Date.now , required:true}
});

module.exports = mongoose.models.Media || mongoose.model("Media", mediaSchema);