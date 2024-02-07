const { array } = require("joi");
const { Schema, model } = require("mongoose");

const boardScheme = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: null,
    },
    deleted_at: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const Board = model("Board", boardScheme, "boards");

module.exports = Board;
