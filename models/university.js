import mongoose from "mongoose";

const universitySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
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
    },
  },
});

const University = mongoose.model("universities", universitySchema);

export default University;
