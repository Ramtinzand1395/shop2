const mongoose = require("mongoose");

const { Schema } = mongoose;

const voteSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    vote: Number,
    created: { type: Date, default: Date.now },
  },
  { _id: false }
);

module.exports = voteSchema;
