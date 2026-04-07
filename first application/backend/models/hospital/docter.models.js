import mongoose from "mongoose";

const workhourschema = mongoose.Schema({
    day: {
        type: String,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
});
const docterschema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    workInHospitals: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hospital",
        required: true,
      },
      {
        type: workhourschema,
        required: true,
      }
    ],
  },
  { timestamps: true },
);
export const Docter = mongoose.model("Docter", docterschema);
