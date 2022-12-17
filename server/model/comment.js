const mongoose = require("mongoose");

const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    content: { type: String, required: true },
    created: { type: Date, default: Date.now },
  },
  { _id: false }
);

module.exports = commentSchema;
