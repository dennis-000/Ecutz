import cron from 'node-cron';
import Appointment from '../models/appointment.model.js';

// Function to check and update appointments
export default async function updateExpiredAppointments() {
    const now = new Date();

    try {
        // Update all pending and in-progress appointments where the end time has passed
        const result = await Appointment.updateMany(
            {
                status: { $in: ['pending', 'in-progress'] },
                startTime: { $lte: now }, // Appointment start time is before or equal to now
                $expr: { 
                    $lte: [ 
                        { $add: ['$startTime', { $multiply: ['$duration', 60000] }] }, // startTime + duration in ms
                        now 
                    ]
                }
            },
            { $set: { status: 'completed' } }
        );

        console.log(`${result.modifiedCount === 0 ? "No" : result.modifiedCount} appointments marked as completed.`);
    } catch (error) {
        console.error('Error updating appointments:', error);
    }
}