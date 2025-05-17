import mongoose, { Schema } from "mongoose";

const shortUrlSchema = new Schema(
  {
    originalUrl: {
      type: String,
      require: true,
    },
    shortUrl: {
      type: String,
      require: true,
      unique: true,
      index: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    clickCount: {
      type: Number,
      default: 0,
    },
    expiry: {
      type: Date,
    },
  },
  { timestamps: true }
);

const ShortURL = mongoose.model("Url", shortUrlSchema);
export default ShortURL;
