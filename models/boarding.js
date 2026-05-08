import mongoose from "mongoose";

const boardingSchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      required: true,
      minLength: 20,
    },
    availableRooms: {
      type: Number,
      required: true,
      min: 1,
    },
    images: {
      type: [String],
      required: true,

      validate: {
        validator: (value) => value.length > 0,
        message: "At least one image is required",
      },
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
        validate: {
          validator: (value) => value.length === 2,
          message: "Coordinates must contain longitude and latitude",
        },
      },
    },
    university: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "universities",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved"],
      required: true,
      default: "pending",
    },
  },
  { timestamps: true },
);

boardingSchema.index({ location: "2dsphere" });

const Boarding = mongoose.model("boardings", boardingSchema);

export default Boarding;
