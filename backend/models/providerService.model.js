import mongoose from "mongoose";

const ProviderServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  provider: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the provider (User)
  service: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true }, // Reference to the general service
  price: { type: Number, required: true }, // Provider's price for the service
  duration: { type: Number, required: true }, // Duration in minutes
  availability: { type: Boolean, default: true }, // Whether the provider offers this service currently
  averageRating: { type: Number, default: 0 }, // Average rating for this provider's service
  images: [{ type: String }],
  providersDescription: { type: String},
}, { timestamps: true });

const ProviderService = mongoose.model("ProviderService", ProviderServiceSchema);
export default ProviderService;