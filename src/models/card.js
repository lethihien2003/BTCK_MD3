const { Schema, model } = require("mongoose");

const cardScheme = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: null,
    },
    member: [
      {
        type: Schema.Types.ObjectId,
      },
    ],
    dueDate: {
      type: Date,
      default: null,
    },
    avatar: {
      type: String,
      default: null,
    },
    list_id: {
      type: Schema.Types.ObjectId,
      ref: "List",
    },
    attachment: {
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

const Card = model("Card", cardScheme, "cards");

module.exports = Card;
