import Appointment from "../models/appointment.model.js";
import User from "../models/user.model.js";

export const getSingleUserRatings = async (req, res) => {
  const { id } = req.params

  try{
    const appointments = await Appointment.find({ provider: id }).populate("service", "name") // Ensure "Service" is correctly registered
    .populate("customer", "name") // Ensure "User" is correctly registered
    .populate("provider", "name");
    if (appointments.length === 0) {
      return res.status(404).json({ message: "No ratings found for the user." });
    }
    res.status(200).json({ 
      message: "Ratings retrieved successfully.", 
      ratings: appointments.map(appt => ({
          service: appt.service?.title || "No Service found",
          provider: appt.provider?.name || "No provider found",
          customer: appt.customer?.name || "No customer found",
          providerService: appt.providerService?.name || "No providerService found",
          score: appt.rating.score,
          comment: appt.rating.comment || "No comment",
          date: appt.date,
          startTime: appt.startTime,
          duration: appt.duration
      }))
  });
    
  }
  catch(error){
    res.status(500).json({ message: "Internal server error.", error: error.message });
  }
}

export const rateAppointment = async (req, res) => {
  const { appointment_id } = req.params; // Appointment ID
  const { rating } = req.body; // Rating details
  const { score, comment } = rating

  try {
    const appointment = await Appointment.findById(appointment_id);

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    if (appointment.status !== "completed") {
      return res.status(400).json({ error: "Only completed appointments can be rated" });
    }

    if (appointment.rating?.score) {
      return res.status(400).json({ error: "This appointment is already rated" });
    }

    // Update the appointment rating
    appointment.rating = { score, comment };
    const updatedAppointment = await appointment.save();

    // Recalculate provider's average rating
    const providerId = appointment.provider;
    const ratings = await Appointment.aggregate([
      { $match: { provider: providerId, "rating.score": { $ne: null } } },
      { $group: { _id: null, averageRating: { $avg: "$rating.score" }, totalRatings: { $sum: 1 } } },
    ]);

    if (ratings.length > 0) {
      const { averageRating, totalRatings } = ratings[0];
      await User.findByIdAndUpdate(providerId, { averageRating, totalRatings });
    }

    res.status(200).json({ success: true, message: "Rating added and provider average updated successfully", data: updatedAppointment });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while rating the appointment" });
  }
};

export const updateAverageRating = async () => {
    try {
        const providers = await User.find({ role: "provider" });
    
        for (const provider of providers) {
          const ratings = await Appointment.aggregate([
            { $match: { provider: provider._id, "rating.score": { $ne: null } } },
            { $group: { _id: null, averageRating: { $avg: "$rating.score" }, totalRatings: { $sum: 1 } } },
          ]);
    
          if (ratings.length > 0) {
            const { averageRating, totalRatings } = ratings[0];
            await User.findByIdAndUpdate(provider._id, { averageRating, totalRatings });
          } else {
            await User.findByIdAndUpdate(provider._id, { averageRating: 0, totalRatings: 0 });
          }
        }
    
        console.log("Provider ratings updated successfully");
      } catch (error) {
        console.error("Error updating provider ratings:", error);
    }
}

// Delete Rating
export const deleteRating = async (req, res) => {
  const { appointment_id } = req.params;

  try {
      // Find the appointment
      const appointment = await Appointment.findById(appointment_id);

      if (!appointment) {
          return res.status(404).json({ message: 'Appointment not found' });
      }

      if (!appointment.rating) {
          return res.status(400).json({ message: 'No rating to delete' });
      }

      const providerId = appointment.provider;

      // Remove the rating
      appointment.rating = undefined;
      await appointment.save();

      // Recalculate the provider's average rating
      const providerAppointments = await Appointment.find({
          provider: providerId,
          rating: { $exists: true },
      });

      const totalRatings = providerAppointments.length;
      const averageRating =
          totalRatings > 0
              ? providerAppointments.reduce((sum, app) => sum + app.rating.score, 0) / totalRatings
              : 0;

      await User.findByIdAndUpdate(providerId, { averageRating });

      res.status(200).json({ success: true, message: 'Rating deleted and average updated', averageRating });
  } catch (error) {
      console.error('Error deleting rating:', error);
      res.status(500).json({success: false, message: 'Error deleting rating', error });
  }
};