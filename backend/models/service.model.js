import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String, enum: ["barber", "hairdresser", "stylist", "other"], required: true },
}, { timestamps: true });

const Service = mongoose.model("Service", ServiceSchema)
export default Service