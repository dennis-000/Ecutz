import mongoose from "mongoose";
import cron from 'node-cron';
import Appointment from '../models/appointment.model.js';
import moment from 'moment-timezone'; // For time zone standardization

// Ensure indexes for frequently queried fields
const createIndexes = async () => {
    try {
        await Appointment.collection.createIndex({ startTime: 1, status: 1 });
        console.log('Indexes created for startTime and status.');
    } catch (error) {
        console.error('Error creating indexes:', error);
    }
};

// Perform a specific function before appointments start
const performPreAppointmentAction = async (appointments) => {
    for (const appointment of appointments) {
        try {
            console.log(`Performing action for appointment ID: ${appointment._id}`);
            // Example: Notify users
            // You can implement a notification system here
        } catch (error) {
            console.error(`Error performing action for appointment ID: ${appointment._id}`, error);
        }
    }
};

// Batch processing function
const processAppointmentsBatch = async (now, batchSize = 100) => {
    let hasMore = true;

    while (hasMore) {
        try {
            const appointments = await Appointment.find({
                status: { $in: ['pending', 'in-progress'] },
                $or: [
                    // Pending appointments ready to move to in-progress
                    {
                        status: 'pending',
                        startTime: { $lte: now }
                    },
                    // In-progress appointments ready to move to completed
                    {
                        status: 'in-progress',
                        $expr: {
                            $lte: [
                                { $add: ['$startTime', { $multiply: ['$duration', 60000] }] }, // startTime + duration in ms
                                now
                            ]
                        }
                    }
                ]
            }).limit(batchSize);

            if (appointments.length === 0) {
                hasMore = false;
            } else {
                const pendingToInProgress = appointments.filter(
                    app => app.status === 'pending' && app.startTime <= now
                );
                const inProgressToCompleted = appointments.filter(
                    app =>
                        app.status === 'in-progress' &&
                        moment(app.startTime).add(app.duration, 'minutes').isSameOrBefore(now)
                );

                // Update pending to in-progress
                if (pendingToInProgress.length > 0) {
                    const idsToUpdate = pendingToInProgress.map(app => app._id);
                    const result = await Appointment.updateMany(
                        { _id: { $in: idsToUpdate } },
                        { $set: { status: 'in-progress' } }
                    );
                    console.log(`${result.modifiedCount} appointments marked as in-progress.`);
                }

                // Update in-progress to completed
                if (inProgressToCompleted.length > 0) {
                    const idsToUpdate = inProgressToCompleted.map(app => app._id);
                    const result = await Appointment.updateMany(
                        { _id: { $in: idsToUpdate } },
                        { $set: { status: 'completed' } }
                    );
                    console.log(`${result.modifiedCount} appointments marked as completed.`);
                }
            }
        } catch (error) {
            console.error('Error processing batch:', error);
        }
    }
};

// Process pre-appointment actions
const processPreAppointmentActions = async (now, reminderMinutes = 30) => {
    try {
        const reminderTime = moment(now).add(reminderMinutes, 'minutes').toDate();

        const appointmentsToRemind = await Appointment.find({
            status: 'pending',
            startTime: { $lte: reminderTime, $gt: now }
        });

        if (appointmentsToRemind.length > 0) {
            console.log(`${appointmentsToRemind.length} appointments scheduled for pre-start actions.`);
            await performPreAppointmentAction(appointmentsToRemind);
        }
    } catch (error) {
        console.error('Error processing pre-appointment actions:', error);
    }
};

// Main function to check and update appointments
const updateExpiredAppointments = async () => {
    const now = moment().utc().toDate(); // Standardize to UTC

    console.log('Starting appointment status updates...');
    try {
        // Ensure indexes
        await createIndexes();

        // Perform pre-appointment actions
        await processPreAppointmentActions(now);

        // Process appointments in batches
        await processAppointmentsBatch(now);

        console.log('Appointment status updates completed.');
    } catch (error) {
        console.error('Error updating appointments:', error);
    }
};

export default updateExpiredAppointments;