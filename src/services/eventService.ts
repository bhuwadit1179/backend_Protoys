import { insertEvent, updateEventById } from '../db/queries/eventQueries';
import { Event } from '../db/model/eventModel';

// create event
export const createEventService = async (eventData: any): Promise<void> => {
    // Perform validation
    if (!eventData.event_name) {
        throw new Error('Event name is required.');
    }

    if (new Date(eventData.start_date) > new Date(eventData.end_date)) {
        throw new Error('Start date cannot be after end date.');
    }

    const { event_name, description, ...otherDetails } = eventData;

    // Call the query to insert the event into the database
    await insertEvent(eventData);
};



export const updateEventService = async (eventId: number, eventData: Event): Promise<void> => {
    if (!eventId || typeof eventId !== 'number') {
        throw new Error('Invalid event ID');
    }

    if (!eventData || Object.keys(eventData).length === 0) {
        throw new Error('No event data provided to update');
    }

    try {
        // Call the query to update the event in the database
        await updateEventById(eventId, eventData);
        console.log(`Event with ID ${eventId} has been successfully updated.`);
    } catch (error) {
        // Narrow the type of error
        if (error instanceof Error) {
            console.error(`Failed to update event with ID ${eventId}:`, error.message);
            throw error;
        } else {
            console.error(`Failed to update event with ID ${eventId}:`, error);
            throw new Error('An unknown error occurred');
        }
    }
}
