const { Schema, model } = require("mongoose");

const listScheme = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    position: {
      type: Number,
      required: true,
    },
    deleted_at: {
      type: Date,
      default: null,
    },
    board_id: {
      type: Schema.Types.ObjectId,
      ref: "Board",
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const List = model("List", listScheme, "lists");

module.exports = List;
